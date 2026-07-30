"use client";

import { FormEvent, useState } from "react";

import { AccountPlanDisplay } from "@/components/account-plan-display";
import { GeneratingPlanState } from "@/components/generating-plan-state";
import type { AccountPlan } from "@/lib/account-plan-schema";
import { OPPORTUNITY_TYPES, type OpportunityType } from "@/lib/partner-dna";

type RequestState = "idle" | "loading" | "success" | "error";

export default function Home() {
  const [opportunityType, setOpportunityType] = useState<OpportunityType>("New logo");
  const [targetCompany, setTargetCompany] = useState("");
  const [requestState, setRequestState] = useState<RequestState>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [plan, setPlan] = useState<AccountPlan | null>(null);
  const [submittedCompany, setSubmittedCompany] = useState("");
  const [submittedOpportunityType, setSubmittedOpportunityType] = useState<OpportunityType>("New logo");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const company = targetCompany.trim();
    if (!company) {
      setErrorMessage("Please enter a target company.");
      setRequestState("error");
      return;
    }

    setRequestState("loading");
    setErrorMessage(null);
    setPlan(null);
    setSubmittedCompany(company);
    setSubmittedOpportunityType(opportunityType);

    try {
      const response = await fetch("/api/account-plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          targetCompany: company,
          opportunityType,
        }),
      });

      const data = (await response.json()) as { plan?: AccountPlan; error?: string };

      if (!response.ok) {
        throw new Error(data.error ?? "Unable to generate the account plan.");
      }

      if (!data.plan) {
        throw new Error("The server returned an empty account plan.");
      }

      setPlan(data.plan);
      setRequestState("success");
    } catch (error) {
      setRequestState("error");
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong while generating the account plan.",
      );
    }
  };

  const isLoading = requestState === "loading";

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(99,102,241,0.18),_transparent_55%),linear-gradient(135deg,_#f8fafc_0%,_#eef2ff_100%)] px-4 py-6 text-slate-900 sm:px-6 lg:px-8">
      <header className="mx-auto flex w-full max-w-6xl items-center justify-between rounded-full border border-white/70 bg-white/80 px-5 py-3 shadow-sm backdrop-blur sm:px-7">
        <div>
          <p className="text-xl font-semibold tracking-tight text-slate-900">RevGen AI</p>
          <p className="text-sm text-slate-500">
            AI Revenue Operating System for Technology Partners
          </p>
        </div>
        <div className="rounded-full bg-indigo-600 px-3 py-1 text-sm font-medium text-white shadow-sm">
          B2B Growth Copilot
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-2 py-8 sm:px-4 lg:py-12">
        <section className="w-full rounded-[32px] border border-slate-200 bg-white/95 p-6 shadow-[0_30px_80px_-25px_rgba(15,23,42,0.28)] backdrop-blur sm:p-8 lg:p-10">
          <div className="mx-auto max-w-3xl">
            <div className="mb-6 inline-flex items-center rounded-full border border-indigo-100 bg-indigo-50 px-3 py-1 text-sm font-medium text-indigo-700">
              Revenue strategy workspace
            </div>

            <h1 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
              What account do you want to develop today?
            </h1>
            <p className="mt-3 text-sm leading-6 text-slate-600 sm:text-base">
              Build a tailored go-to-market motion for your next account with a focused, executive-ready plan.
            </p>

            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
              <label className="block">
                <span className="mb-2 block text-sm font-medium text-slate-700">
                  Target company
                </span>
                <input
                  value={targetCompany}
                  onChange={(event) => setTargetCompany(event.target.value)}
                  placeholder="e.g. Northwind Labs"
                  disabled={isLoading}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-indigo-400 focus:bg-white focus:ring-2 focus:ring-indigo-100 disabled:cursor-not-allowed disabled:opacity-60"
                />
              </label>

              <fieldset disabled={isLoading}>
                <legend className="mb-3 block text-sm font-medium text-slate-700">
                  Opportunity type
                </legend>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                  {OPPORTUNITY_TYPES.map((type) => {
                    const isSelected = opportunityType === type;
                    return (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setOpportunityType(type)}
                        className={`rounded-2xl border px-4 py-3 text-sm font-medium transition ${
                          isSelected
                            ? "border-indigo-600 bg-indigo-600 text-white shadow-sm"
                            : "border-slate-200 bg-white text-slate-700 hover:border-indigo-300 hover:bg-indigo-50"
                        }`}
                      >
                        {type}
                      </button>
                    );
                  })}
                </div>
              </fieldset>

              <div className="rounded-2xl border border-emerald-100 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                Customer-facing content will be generated automatically in English or Spanish based on the target company&apos;s country.
              </div>

              {errorMessage && (
                <div
                  role="alert"
                  className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
                >
                  {errorMessage}
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-500 sm:w-auto"
              >
                {isLoading ? "Generating Account Plan..." : "Generate Account Plan"}
              </button>
            </form>

            {isLoading && <GeneratingPlanState targetCompany={submittedCompany} />}

            {requestState === "success" && plan && (
              <AccountPlanDisplay
                plan={plan}
                targetCompany={submittedCompany}
                opportunityType={submittedOpportunityType}
              />
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
