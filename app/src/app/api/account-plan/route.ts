import OpenAI from "openai";
import { zodTextFormat } from "openai/helpers/zod";
import { NextResponse } from "next/server";

import { accountPlanSchema } from "@/lib/account-plan-schema";
import { OPPORTUNITY_TYPES, PARTNER_DNA } from "@/lib/partner-dna";

export const runtime = "nodejs";

function buildPrompt(targetCompany: string, opportunityType: string) {
  return `You are an expert B2B account planning strategist for technology partners.

Generate a detailed, actionable account plan for the following scenario.

Target company: ${targetCompany}
Opportunity type: ${opportunityType}

Partner DNA (use this context throughout the plan):
- Partner: ${PARTNER_DNA.partner}
- Vendor: ${PARTNER_DNA.vendor}
- Solutions: ${PARTNER_DNA.solutions.join(", ")}
- Services: ${PARTNER_DNA.services.join(", ")}
- Markets: ${PARTNER_DNA.markets.join(", ")}
- Target customers: ${PARTNER_DNA.targetCustomers}

Guidelines:
- Be specific to ${targetCompany} using reasonable public-market assumptions when exact data is unavailable.
- Tailor recommendations to the "${opportunityType}" opportunity motion.
- Recommend only monday.com solutions from the partner's portfolio where relevant.
- Include OptimoWork Tech services (consulting, implementation, workflow design, integrations, training) where appropriate.
- Write customer-facing content in English unless the company is clearly based in a Spanish-speaking Latin American market, in which case use Spanish.
- Keep content professional, executive-ready, and practical for a sales team.
- Do not invent specific personal names for stakeholders; use role titles instead.`;
}

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid request body. Expected JSON." },
      { status: 400 },
    );
  }

  const targetCompany =
    typeof body === "object" &&
    body !== null &&
    "targetCompany" in body &&
    typeof body.targetCompany === "string"
      ? body.targetCompany.trim()
      : "";

  const opportunityType =
    typeof body === "object" &&
    body !== null &&
    "opportunityType" in body &&
    typeof body.opportunityType === "string"
      ? body.opportunityType.trim()
      : "";

  if (!targetCompany) {
    return NextResponse.json(
      { error: "Target company is required." },
      { status: 400 },
    );
  }

  if (!OPPORTUNITY_TYPES.includes(opportunityType as (typeof OPPORTUNITY_TYPES)[number])) {
    return NextResponse.json(
      { error: "Please select a valid opportunity type." },
      { status: 400 },
    );
  }

  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json(
      {
        error:
          "OpenAI API key is not configured. Set OPENAI_API_KEY in your environment.",
      },
      { status: 500 },
    );
  }

  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  try {
    const response = await openai.responses.parse({
      model: "gpt-4o-mini",
      input: [
        {
          role: "system",
          content:
            "You produce structured B2B account plans for technology partners selling monday.com solutions.",
        },
        {
          role: "user",
          content: buildPrompt(targetCompany, opportunityType),
        },
      ],
      text: {
        format: zodTextFormat(accountPlanSchema, "account_plan"),
      },
    });

    if (response.output_parsed) {
      return NextResponse.json({ plan: response.output_parsed });
    }

    const refusalMessage = response.output
      .flatMap((item) => {
        if (item.type !== "message") return [];
        return item.content
          .filter((part) => part.type === "output_text")
          .map((part) => part.text);
      })
      .join("\n")
      .trim();

    return NextResponse.json(
      {
        error:
          refusalMessage ||
          "The model could not generate an account plan. Please try again.",
      },
      { status: 422 },
    );
  } catch (error) {
    console.error("Account plan generation failed:", error);

    return NextResponse.json(
      { error: "Failed to generate account plan. Please try again shortly." },
      { status: 502 },
    );
  }
}
