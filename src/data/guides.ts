export type Guide = {
  slug: string;
  title: string;
  description: string;
  category: string;
  relatedToolSlugs?: string[];
};

export const guides: Guide[] = [
  {
    slug: "how-to-calculate-work-hours",
    title: "How to Calculate Work Hours",
    description: "Learn how to total your work hours and subtract unpaid breaks.",
    category: "worker-pay",
    relatedToolSlugs: ["time-card-calculator", "hours-worked-calculator"]
  },
  {
    slug: "how-overtime-pay-works",
    title: "How Overtime Pay Works",
    description: "A simple explanation of overtime pay and how to estimate it.",
    category: "worker-pay",
    relatedToolSlugs: ["overtime-calculator", "paycheck-calculator"]
  },
  {
    slug: "salary-vs-hourly-pay",
    title: "Salary vs Hourly Pay",
    description: "Understand the difference between salaried and hourly compensation.",
    category: "worker-pay",
    relatedToolSlugs: ["salary-to-hourly-calculator", "hourly-to-salary-calculator"]
  },
  {
    slug: "gross-pay-vs-net-pay",
    title: "Gross Pay vs Net Pay",
    description: "Understand the difference between gross pay and what you take home.",
    category: "worker-pay",
    relatedToolSlugs: ["paycheck-calculator"]
  }
];