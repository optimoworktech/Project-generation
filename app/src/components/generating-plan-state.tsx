const loadingSteps = [
  "Researching account context",
  "Mapping technology landscape",
  "Identifying buying signals",
  "Building commercial strategy",
  "Drafting outbound sequence",
];

export function GeneratingPlanState({ targetCompany }: { targetCompany: string }) {
  return (
    <div
      className="mt-8 rounded-2xl border border-slate-200 bg-slate-50/80 p-6 sm:p-8"
      role="status"
      aria-live="polite"
      aria-label="Generating account plan"
    >
      <div className="flex flex-col items-center text-center sm:flex-row sm:items-start sm:text-left">
        <div className="relative flex h-14 w-14 shrink-0 items-center justify-center">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-indigo-200 opacity-40" />
          <span className="relative inline-flex h-12 w-12 animate-spin rounded-full border-4 border-indigo-100 border-t-indigo-600" />
        </div>

        <div className="mt-5 sm:mt-0 sm:ml-6">
          <h2 className="text-lg font-semibold text-slate-900">
            Generating account plan for {targetCompany}
          </h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Our AI strategist is building an executive-ready plan tailored to your opportunity
            type and partner DNA. This usually takes 15–30 seconds.
          </p>
        </div>
      </div>

      <ul className="mt-6 space-y-3">
        {loadingSteps.map((step, index) => (
          <li
            key={step}
            className="flex items-center gap-3 rounded-xl border border-white bg-white px-4 py-3 text-sm text-slate-700 shadow-sm"
            style={{ animationDelay: `${index * 120}ms` }}
          >
            <span className="inline-flex h-2 w-2 animate-pulse rounded-full bg-indigo-500" />
            {step}
          </li>
        ))}
      </ul>
    </div>
  );
}
