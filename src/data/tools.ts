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
    description: "Track weekly work hours, unpaid breaks, overtime, and estimated gross pay.",
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
    description: "Calculate hours worked between start and end times, including overnight shifts and unpaid breaks.",
    category: "worker-pay",
    keywords: ["hours worked calculator", "hours between times"],
    relatedToolSlugs: ["time-card-calculator", "overtime-calculator", "net-pay-estimator"],
    relatedGuideSlugs: ["how-to-calculate-work-hours"]
  },
  {
    slug: "overtime-calculator",
    title: "Overtime Calculator",
    description: "Calculate overtime pay from hourly rate, total hours worked, overtime threshold, and multiplier.",
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
    description: "Convert annual salary to hourly pay using your weekly hours and paid weeks per year.",
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
    description: "Convert hourly wage to annual salary, monthly pay, weekly pay, and daily pay.",
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
    description: "Estimate gross pay, overtime pay, deductions, and take-home pay from weekly hours.",
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
    description: "Estimate take-home pay from gross pay, deduction percentage, and fixed deductions.",
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
