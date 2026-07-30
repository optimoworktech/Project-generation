import { z } from "zod";

export const accountPlanSchema = z.object({
  executiveSummary: z
    .string()
    .describe("A concise executive summary tailored to the target account and opportunity type."),
  companyPriorities: z
    .array(z.string())
    .describe("3-5 strategic priorities the target company is likely focused on."),
  technologyLandscape: z
    .array(z.string())
    .describe("Current and likely technology stack, tools, and digital maturity signals."),
  buyingSignals: z
    .array(z.string())
    .describe("Observable or inferred buying signals that indicate readiness to engage."),
  businessChallenges: z
    .array(z.string())
    .describe("Key business and operational challenges the account may be facing."),
  whitespaceOpportunities: z
    .array(z.string())
    .describe("Untapped areas where the partner can create value."),
  recommendedMondaySolutions: z
    .array(
      z.object({
        solution: z.string(),
        useCase: z.string(),
        partnerServices: z.string(),
      }),
    )
    .describe("Recommended monday.com products mapped to use cases and partner services."),
  keyStakeholders: z
    .array(
      z.object({
        role: z.string(),
        priorities: z.string(),
        engagementApproach: z.string(),
      }),
    )
    .describe("4-6 likely stakeholders with engagement guidance."),
  discoveryQuestions: z
    .array(z.string())
    .describe("8-12 high-quality discovery questions for initial conversations."),
  commercialStrategy: z
    .object({
      positioning: z.string(),
      pricingApproach: z.string(),
      proofPoints: z.array(z.string()),
      nextSteps: z.array(z.string()),
    })
    .describe("Commercial approach including positioning, pricing, proof points, and next steps."),
  outboundSequence: z
    .array(
      z.object({
        step: z.number(),
        channel: z.string(),
        objective: z.string(),
        messageTheme: z.string(),
      }),
    )
    .describe("A 5-7 step multi-touch outbound sequence."),
});

export type AccountPlan = z.infer<typeof accountPlanSchema>;

export type AccountPlanRequest = {
  targetCompany: string;
  opportunityType: string;
};
