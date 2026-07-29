"use client";

import { useState } from "react";

const opportunityTypes = ["New Prospect", "Existing Customer", "Renewal"];
const vendors = ["monday.com", "Microsoft", "Odoo", "Canva", "Other"];
const productOptions = ["CRM", "Automation", "Analytics", "Marketplace", "Support"];

export default function Home() {
  const [opportunityType, setOpportunityType] = useState("New Prospect");
  const [targetCompany, setTargetCompany] = useState("");
  const [currentVendor, setCurrentVendor] = useState("monday.com");
  const [implementedProducts, setImplementedProducts] = useState<string[]>(["CRM"]);

  const toggleProduct = (product: string) => {
    setImplementedProducts((current) =>
      current.includes(product)
        ? current.filter((item) => item !== product)
        : [...current, product],
    );
  };

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

      <main className="mx-auto flex max-w-5xl items-center justify-center px-2 py-8 sm:px-4 lg:py-12">
        <section className="w-full rounded-[32px] border border-slate-200 bg-white/95 p-6 shadow-[0_30px_80px_-25px_rgba(15,23,42,0.28)] backdrop-blur sm:p-8 lg:p-10">
          <div className="mx-auto max-w-2xl">
            <div className="mb-6 inline-flex items-center rounded-full border border-indigo-100 bg-indigo-50 px-3 py-1 text-sm font-medium text-indigo-700">
              Revenue strategy workspace
            </div>

            <h1 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
              What account do you want to develop today?
            </h1>
            <p className="mt-3 text-sm leading-6 text-slate-600 sm:text-base">
              Build a tailored go-to-market motion for your next account with a focused, executive-ready plan.
            </p>

            <div className="mt-8 space-y-6">
              <label className="block">
                <span className="mb-2 block text-sm font-medium text-slate-700">
                  Target company
                </span>
                <input
                  value={targetCompany}
                  onChange={(event) => setTargetCompany(event.target.value)}
                  placeholder="e.g. Northwind Labs"
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-indigo-400 focus:bg-white focus:ring-2 focus:ring-indigo-100"
                />
              </label>

              <div>
                <span className="mb-3 block text-sm font-medium text-slate-700">
                  Opportunity type
                </span>
                <div className="grid gap-3 sm:grid-cols-3">
                  {opportunityTypes.map((type) => {
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
              </div>

              {(opportunityType === "Existing Customer" || opportunityType === "Renewal") && (
                <div className="space-y-5 rounded-3xl border border-slate-200 bg-slate-50/70 p-4 sm:p-5">
                  <label className="block">
                    <span className="mb-2 block text-sm font-medium text-slate-700">
                      Current vendor
                    </span>
                    <select
                      value={currentVendor}
                      onChange={(event) => setCurrentVendor(event.target.value)}
                      className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                    >
                      {vendors.map((vendor) => (
                        <option key={vendor} value={vendor}>
                          {vendor}
                        </option>
                      ))}
                    </select>
                  </label>

                  <div>
                    <span className="mb-3 block text-sm font-medium text-slate-700">
                      Implemented products
                    </span>
                    <div className="grid gap-2 sm:grid-cols-2">
                      {productOptions.map((product) => {
                        const checked = implementedProducts.includes(product);
                        return (
                          <label
                            key={product}
                            className={`flex cursor-pointer items-center gap-3 rounded-2xl border px-3 py-2 text-sm transition ${
                              checked
                                ? "border-indigo-300 bg-indigo-50 text-indigo-700"
                                : "border-slate-200 bg-white text-slate-600"
                            }`}
                          >
                            <input
                              type="checkbox"
                              checked={checked}
                              onChange={() => toggleProduct(product)}
                              className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                            />
                            <span>{product}</span>
                          </label>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              <div className="rounded-2xl border border-emerald-100 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                Customer-facing content will be generated automatically in English or Spanish based on the target company’s country.
              </div>

              <button
                type="button"
                className="w-full rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 sm:w-auto"
              >
                Generate Revenue Strategy
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
