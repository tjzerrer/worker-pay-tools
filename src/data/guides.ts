export type GuideSection = {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
  example?: string;
  toolSlugs?: string[];
};

export type Guide = {
  slug: string;
  title: string;
  description: string;
  category: string;
  relatedToolSlugs?: string[];
  calculatorPrompt?: string;
  sections?: GuideSection[];
};

export const guides: Guide[] = [
  {
    slug: "how-to-calculate-work-hours",
    title: "How to Calculate Work Hours",
    description: "Learn how to total your work hours and subtract unpaid breaks.",
    category: "worker-pay",
    relatedToolSlugs: ["time-card-calculator", "hours-worked-calculator"],
    calculatorPrompt:
      "Want to check a shift while you read? Use the hours worked calculator for one shift, or the time card calculator for a full week.",
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
          "For example, if you worked 8.5 hours and had a 30-minute unpaid lunch, your paid time would be 8.0 hours.",
          "Breaks are usually easiest to subtract in minutes. A 15-minute break is 0.25 hours, a 30-minute break is 0.5 hours, and a 45-minute break is 0.75 hours."
        ]
      },
      {
        heading: "Double-check your total",
        paragraphs: [
          "If you work multiple days, repeat the same process for each shift and add the totals together.",
          "This helps you confirm your weekly hours before looking at overtime or paycheck estimates.",
          "When your total is close to 40 hours, check the exact minutes instead of rounding too early. Small rounding differences can change whether part of a shift counts as overtime."
        ]
      },
      {
        heading: "Common time card mistakes",
        paragraphs: [
          "The most common mistakes are forgetting to subtract unpaid lunch, treating an overnight shift as a negative number, or mixing hours and minutes in the same total.",
          "If you write down 7 hours and 30 minutes, convert it to 7.5 hours before adding it to other shifts."
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
    calculatorPrompt:
      "Have your hourly rate and weekly hours handy? Plug them into the overtime calculator to see regular pay, overtime pay, and total gross pay.",
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
          "Regular hours are paid at your normal hourly rate. Overtime hours are paid using the overtime multiplier.",
          "For a standard 40-hour weekly threshold, 46 total hours means 40 regular hours and 6 overtime hours."
        ]
      },
      {
        heading: "Example",
        paragraphs: [
          "If you make $20 per hour and work 45 hours in a week, then 40 hours are regular and 5 hours are overtime.",
          "Your regular pay would be 40 x $20 = $800. Your overtime pay would be 5 x $20 x 1.5 = $150. Your total pay would be $950."
        ]
      },
      {
        heading: "Why this matters",
        paragraphs: [
          "Understanding overtime helps you estimate your paycheck, double-check your hours, and catch mistakes before payday.",
          "It is especially useful if your schedule changes from week to week or if you regularly work extra shifts.",
          "Some jobs, states, or agreements use different overtime rules, so use your actual threshold and multiplier when you calculate."
        ]
      },
      {
        heading: "Gross pay before deductions",
        paragraphs: [
          "Overtime calculations usually estimate gross pay, which is pay before taxes, insurance, retirement contributions, or other deductions.",
          "If you want a rough take-home estimate, use the paycheck calculator after you estimate your regular and overtime pay."
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
    calculatorPrompt:
      "Comparing an offer? Use the salary to hourly calculator or hourly to salary calculator with the schedule you expect to work.",
    sections: [
      {
        heading: "Two common pay structures",
        paragraphs: [
          "Hourly pay means you are paid based on the number of hours you work.",
          "Salary usually means you are paid a fixed amount over the course of the year, regardless of small changes in weekly hours.",
          "The important comparison is not only annual pay. It is also the number of hours you expect to work for that pay."
        ]
      },
      {
        heading: "How to compare salary and hourly pay",
        paragraphs: [
          "A common full-time estimate uses 40 hours per week and 52 paid weeks per year, or 2,080 hours per year.",
          "Under that assumption, a $52,000 salary is roughly $25 per hour because $52,000 divided by 2,080 hours equals $25."
        ]
      },
      {
        heading: "When the estimate changes",
        paragraphs: [
          "The estimate changes if you work more or fewer hours, take unpaid time off, or have a schedule that changes throughout the year.",
          "For salaried jobs with long weeks, the effective hourly rate can be lower than the simple 40-hour calculation suggests."
        ]
      }
    ]
  },
  {
    slug: "gross-pay-vs-net-pay",
    title: "Gross Pay vs Net Pay",
    description:
      "Understanding the difference between gross pay and net pay helps you know what you earn versus what you actually take home.",
    category: "worker-pay",
    relatedToolSlugs: [
      "net-pay-estimator",
      "paycheck-calculator",
      "overtime-calculator",
      "time-card-calculator"
    ],
    calculatorPrompt:
      "Use the net pay estimator to compare gross pay with a simple take-home estimate after taxes and deductions.",
    sections: [
      {
        heading: "What Is Gross Pay?",
        paragraphs: [
          "Gross pay is the total amount you earn before any deductions are taken out.",
          "For hourly workers, gross pay usually starts with hours worked multiplied by your hourly rate. It can also include extra earnings."
        ],
        bullets: ["hourly wages or salary", "overtime pay", "bonuses or commissions"],
        example: "Example: 40 hours x $20 per hour = $800 gross pay."
      },
      {
        heading: "What Is Net Pay?",
        paragraphs: [
          "Net pay is your take-home pay after deductions.",
          "This is the amount that usually reaches your bank account or appears on your paycheck as take-home pay."
        ],
        bullets: [
          "taxes, including federal and state taxes",
          "Social Security and Medicare",
          "health insurance",
          "retirement contributions"
        ],
        example: "Example: $800 gross pay - $160 deductions = $640 net pay.",
        toolSlugs: ["net-pay-estimator"]
      },
      {
        heading: "Key Difference",
        paragraphs: [
          "Gross pay is what you earn. Net pay is what you actually receive.",
          "Gross pay is often used in job offers, salary comparisons, and hourly wage calculations. Net pay is the number you use for budgeting, rent, groceries, savings, and other real expenses."
        ]
      },
      {
        heading: "Why It Matters",
        paragraphs: [
          "Understanding gross pay and net pay helps you read your paycheck more clearly and plan around the money you actually take home.",
          "It also helps you compare job offers more accurately. A higher gross wage does not always mean the same increase in take-home pay after deductions."
        ],
        bullets: [
          "budget realistically",
          "compare job offers more accurately",
          "understand your paycheck",
          "plan for taxes and deductions"
        ]
      },
      {
        heading: "Quick Tip",
        paragraphs: [
          "A rough estimate is that 20% to 30% of gross pay may be deducted, depending on your tax situation, benefits, and retirement contributions.",
          "For a more accurate estimate, use the paycheck calculator. If you need to estimate weekly hours first, start with the time card calculator. If your weekly hours are over 40, the overtime calculator can help estimate gross pay before deductions."
        ],
        toolSlugs: [
          "net-pay-estimator",
          "paycheck-calculator",
          "time-card-calculator",
          "overtime-calculator"
        ]
      }
    ]
  }
];
