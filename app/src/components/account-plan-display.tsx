import type { ReactNode } from "react";

import type { AccountPlan } from "@/lib/account-plan-schema";

type AccountPlanDisplayProps = {
  plan: AccountPlan;
  targetCompany: string;
  opportunityType: string;
};

function PlanSection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
      <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2">
      {items.map((item, index) => (
        <li key={`${item.slice(0, 24)}-${index}`} className="flex gap-3 text-sm leading-6 text-slate-700">
          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function AccountPlanDisplay({
  plan,
  targetCompany,
  opportunityType,
}: AccountPlanDisplayProps) {
  return (
    <div className="mt-8 space-y-5">
      <div className="rounded-2xl border border-indigo-100 bg-indigo-50 px-4 py-3 sm:px-5">
        <p className="text-sm font-medium text-indigo-800">
          Account plan for {targetCompany}
        </p>
        <p className="mt-1 text-sm text-indigo-700">{opportunityType} opportunity</p>
      </div>

      <PlanSection title="Executive Summary">
        <p className="text-sm leading-7 text-slate-700">{plan.executiveSummary}</p>
      </PlanSection>

      <div className="grid gap-5 lg:grid-cols-2">
        <PlanSection title="Company Priorities">
          <BulletList items={plan.companyPriorities} />
        </PlanSection>

        <PlanSection title="Technology Landscape">
          <BulletList items={plan.technologyLandscape} />
        </PlanSection>

        <PlanSection title="Buying Signals">
          <BulletList items={plan.buyingSignals} />
        </PlanSection>

        <PlanSection title="Business Challenges">
          <BulletList items={plan.businessChallenges} />
        </PlanSection>
      </div>

      <PlanSection title="Whitespace Opportunities">
        <BulletList items={plan.whitespaceOpportunities} />
      </PlanSection>

      <PlanSection title="Recommended monday.com Solutions">
        <div className="space-y-4">
          {plan.recommendedMondaySolutions.map((item, index) => (
            <div
              key={`${item.solution}-${index}`}
              className="rounded-xl border border-slate-100 bg-slate-50 p-4"
            >
              <h3 className="text-sm font-semibold text-slate-900">{item.solution}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                <span className="font-medium text-slate-800">Use case: </span>
                {item.useCase}
              </p>
              <p className="mt-1 text-sm leading-6 text-slate-700">
                <span className="font-medium text-slate-800">Partner services: </span>
                {item.partnerServices}
              </p>
            </div>
          ))}
        </div>
      </PlanSection>

      <PlanSection title="Key Stakeholders">
        <div className="grid gap-4 sm:grid-cols-2">
          {plan.keyStakeholders.map((stakeholder, index) => (
            <div
              key={`${stakeholder.role}-${index}`}
              className="rounded-xl border border-slate-100 bg-slate-50 p-4"
            >
              <h3 className="text-sm font-semibold text-slate-900">{stakeholder.role}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                <span className="font-medium text-slate-800">Priorities: </span>
                {stakeholder.priorities}
              </p>
              <p className="mt-1 text-sm leading-6 text-slate-700">
                <span className="font-medium text-slate-800">Approach: </span>
                {stakeholder.engagementApproach}
              </p>
            </div>
          ))}
        </div>
      </PlanSection>

      <PlanSection title="Discovery Questions">
        <ol className="space-y-2">
          {plan.discoveryQuestions.map((question, index) => (
            <li key={`${question.slice(0, 24)}-${index}`} className="flex gap-3 text-sm leading-6 text-slate-700">
              <span className="font-medium text-indigo-600">{index + 1}.</span>
              <span>{question}</span>
            </li>
          ))}
        </ol>
      </PlanSection>

      <PlanSection title="Commercial Strategy">
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-semibold text-slate-900">Positioning</h3>
            <p className="mt-2 text-sm leading-6 text-slate-700">{plan.commercialStrategy.positioning}</p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-900">Pricing approach</h3>
            <p className="mt-2 text-sm leading-6 text-slate-700">
              {plan.commercialStrategy.pricingApproach}
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-900">Proof points</h3>
            <div className="mt-2">
              <BulletList items={plan.commercialStrategy.proofPoints} />
            </div>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-900">Next steps</h3>
            <div className="mt-2">
              <BulletList items={plan.commercialStrategy.nextSteps} />
            </div>
          </div>
        </div>
      </PlanSection>

      <PlanSection title="Outbound Sequence">
        <div className="space-y-3">
          {plan.outboundSequence.map((touch) => (
            <div
              key={touch.step}
              className="rounded-xl border border-slate-100 bg-slate-50 p-4 sm:flex sm:gap-4"
            >
              <div className="mb-2 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-sm font-semibold text-white sm:mb-0">
                {touch.step}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-sm font-semibold text-slate-900">{touch.channel}</h3>
                  <span className="rounded-full bg-indigo-100 px-2 py-0.5 text-xs font-medium text-indigo-700">
                    Step {touch.step}
                  </span>
                </div>
                <p className="mt-2 text-sm leading-6 text-slate-700">
                  <span className="font-medium text-slate-800">Objective: </span>
                  {touch.objective}
                </p>
                <p className="mt-1 text-sm leading-6 text-slate-700">
                  <span className="font-medium text-slate-800">Message theme: </span>
                  {touch.messageTheme}
                </p>
              </div>
            </div>
          ))}
        </div>
      </PlanSection>
    </div>
  );
}
