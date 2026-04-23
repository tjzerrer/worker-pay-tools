export type Tool = {
  slug: string;
  title: string;
  description: string;
  category: string;
  keywords: string[];
  relatedToolSlugs: string[];
  relatedGuideSlugs?: string[];
};

export const tools: Tool[] = [
  {
    slug: "time-card-calculator",
    title: "Time Card Calculator",
    description: "Calculate total hours worked with optional unpaid breaks.",
    category: "worker-pay",
    keywords: ["time card calculator", "hours worked calculator", "work hours"],
    relatedToolSlugs: [
      "hours-worked-calculator",
      "overtime-calculator",
      "paycheck-calculator",
      "net-pay-estimator"
    ],
    relatedGuideSlugs: ["how-to-calculate-work-hours"]
  },
  {
    slug: "hours-worked-calculator",
    title: "Hours Worked Calculator",
    description: "Find the number of hours between a start time and end time.",
    category: "worker-pay",
    keywords: ["hours worked calculator", "hours between times"],
    relatedToolSlugs: ["time-card-calculator", "overtime-calculator", "net-pay-estimator"],
    relatedGuideSlugs: ["how-to-calculate-work-hours"]
  },
  {
    slug: "overtime-calculator",
    title: "Overtime Calculator",
    description: "Estimate overtime pay based on hours worked and hourly rate.",
    category: "worker-pay",
    keywords: ["overtime calculator", "overtime pay calculator"],
    relatedToolSlugs: [
      "time-card-calculator",
      "hours-worked-calculator",
      "paycheck-calculator",
      "net-pay-estimator"
    ],
    relatedGuideSlugs: ["how-overtime-pay-works"]
  },
  {
    slug: "salary-to-hourly-calculator",
    title: "Salary to Hourly Calculator",
    description: "Convert an annual salary into an hourly wage.",
    category: "worker-pay",
    keywords: ["salary to hourly calculator", "annual salary to hourly"],
    relatedToolSlugs: [
      "hourly-to-salary-calculator",
      "paycheck-calculator",
      "net-pay-estimator"
    ],
    relatedGuideSlugs: ["salary-vs-hourly-pay"]
  },
  {
    slug: "hourly-to-salary-calculator",
    title: "Hourly to Salary Calculator",
    description: "Convert an hourly wage into an annual salary estimate.",
    category: "worker-pay",
    keywords: ["hourly to salary calculator", "hourly wage to annual salary"],
    relatedToolSlugs: [
      "salary-to-hourly-calculator",
      "paycheck-calculator",
      "net-pay-estimator"
    ],
    relatedGuideSlugs: ["salary-vs-hourly-pay"]
  },
  {
    slug: "paycheck-calculator",
    title: "Paycheck Calculator",
    description: "Estimate gross pay based on hours worked and hourly rate.",
    category: "worker-pay",
    keywords: ["paycheck calculator", "gross pay calculator"],
    relatedToolSlugs: [
      "time-card-calculator",
      "overtime-calculator",
      "salary-to-hourly-calculator",
      "net-pay-estimator"
    ],
    relatedGuideSlugs: ["gross-pay-vs-net-pay"]
  },
  {
    slug: "net-pay-estimator",
    title: "Net Pay Estimator",
    description: "Estimate take-home pay after percentage and fixed deductions.",
    category: "worker-pay",
    keywords: ["net pay calculator", "take home pay calculator", "deduction calculator"],
    relatedToolSlugs: [
      "paycheck-calculator",
      "overtime-calculator",
      "time-card-calculator"
    ],
    relatedGuideSlugs: ["gross-pay-vs-net-pay"]
  }
];
