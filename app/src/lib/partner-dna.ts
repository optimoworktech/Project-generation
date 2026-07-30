export const PARTNER_DNA = {
  partner: "OptimoWork Tech",
  vendor: "monday.com",
  solutions: [
    "monday work management",
    "monday CRM",
    "monday service",
    "monday dev",
    "monday AI",
  ],
  services: [
    "Consulting",
    "Implementation",
    "Workflow design",
    "Integrations",
    "Training",
  ],
  markets: ["Colombia", "Latin America"],
  targetCustomers: "Mid-market and enterprise organizations",
} as const;

export const OPPORTUNITY_TYPES = [
  "New logo",
  "Expansion",
  "Competitive displacement",
  "Cross-sell",
] as const;

export type OpportunityType = (typeof OPPORTUNITY_TYPES)[number];
