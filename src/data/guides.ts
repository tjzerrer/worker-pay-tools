export type GuideSection = {
  heading: string;
  paragraphs: string[];
};

export type Guide = {
  slug: string;
  title: string;
  description: string;
  category: string;
  relatedToolSlugs?: string[];
  sections?: GuideSection[];
};

export const guides: Guide[] = [
  {
    slug: "how-to-calculate-work-hours",
    title: "How to Calculate Work Hours",
    description: "Learn how to total your work hours and subtract unpaid breaks.",
    category: "worker-pay",
    relatedToolSlugs: ["time-card-calculator", "hours-worked-calculator"],
    sections: [
      {
        heading: "Start with your shift length",
        paragraphs: [
          "To calculate work hours, first find the total time between your start time and end time.",
          "If your shift crosses midnight, treat the end time as happening on the next day."
        ]
      },
      {
        heading: "Subtract unpaid breaks",
        paragraphs: [
          "Once you know the full shift length, subtract any unpaid break time.",
          "For example, if you worked 8.5 hours and had a 30-minute unpaid lunch, your paid time would be 8.0 hours."
        ]
      },
      {
        heading: "Double-check your total",
        paragraphs: [
          "If you work multiple days, repeat the same process for each shift and add the totals together.",
          "This helps you confirm your weekly hours before looking at overtime or paycheck estimates."
        ]
      }
    ]
  },
  {
    slug: "how-overtime-pay-works",
    title: "How Overtime Works",
    description: "A simple explanation of overtime pay and how to estimate it.",
    category: "worker-pay",
    relatedToolSlugs: ["overtime-calculator", "time-card-calculator"],
    sections: [
      {
        heading: "What overtime means",
        paragraphs: [
          "Overtime is extra pay for hours worked beyond a certain threshold. In many cases, that threshold is 40 hours in a workweek.",
          "A common overtime rule is time-and-a-half, which means each overtime hour is paid at 1.5 times your normal hourly rate."
        ]
      },
      {
        heading: "How overtime pay is calculated",
        paragraphs: [
          "First, separate your total hours into regular hours and overtime hours.",
          "Regular hours are paid at your normal hourly rate. Overtime hours are paid using the overtime multiplier."
        ]
      },
      {
        heading: "Example",
        paragraphs: [
          "If you make $20 per hour and work 45 hours in a week, then 40 hours are regular and 5 hours are overtime.",
          "Your regular pay would be 40 × $20 = $800. Your overtime pay would be 5 × $20 × 1.5 = $150. Your total pay would be $950."
        ]
      },
      {
        heading: "Why this matters",
        paragraphs: [
          "Understanding overtime helps you estimate your paycheck, double-check your hours, and catch mistakes before payday.",
          "It is especially useful if your schedule changes from week to week or if you regularly work extra shifts."
        ]
      }
    ]
  },
  {
    slug: "salary-vs-hourly-pay",
    title: "Salary vs Hourly Pay",
    description: "Understand the difference between salaried and hourly compensation.",
    category: "worker-pay",
    relatedToolSlugs: ["salary-to-hourly-calculator", "hourly-to-salary-calculator"],
    sections: [
      {
        heading: "Two common pay structures",
        paragraphs: [
          "Hourly pay means you are paid based on the number of hours you work.",
          "Salary usually means you are paid a fixed amount over the course of the year, regardless of small changes in weekly hours."
        ]
      }
    ]
  },
  {
    slug: "gross-pay-vs-net-pay",
    title: "Gross Pay vs Net Pay",
    description: "Understand the difference between gross pay and what you take home.",
    category: "worker-pay",
    relatedToolSlugs: ["paycheck-calculator"],
    sections: [
      {
        heading: "Gross pay",
        paragraphs: [
          "Gross pay is the amount you earn before taxes and deductions are taken out."
        ]
      },
      {
        heading: "Net pay",
        paragraphs: [
          "Net pay is what you actually take home after taxes, insurance, retirement contributions, and other deductions."
        ]
      }
    ]
  }
];