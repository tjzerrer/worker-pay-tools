import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { execFileSync } from "node:child_process";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, "..");
const publicDir = path.join(root, "public");
const socialDir = path.join(publicDir, "social");
const tempDir = path.join(root, ".social-preview-temp");

const edgeCandidates = [
  "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
  "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe"
];

const edgePath = edgeCandidates.find((candidate) => fs.existsSync(candidate));

if (!edgePath) {
  throw new Error("Microsoft Edge was not found at the expected install paths.");
}

const entries = [
  {
    output: "home.png",
    label: "Worker Pay Tools",
    title: "Time cards, overtime, paychecks, and salary conversions.",
    description:
      "Fast calculators for time cards, overtime, paychecks, net pay, and salary conversions.",
    eyebrow: "HOME"
  },
  {
    output: "tools/time-card-calculator.png",
    label: "Calculator",
    title: "Time Card Calculator",
    description: "Track weekly work hours, unpaid breaks, overtime, and estimated gross pay.",
    eyebrow: "TOOLS"
  },
  {
    output: "tools/hours-worked-calculator.png",
    label: "Calculator",
    title: "Hours Worked Calculator",
    description:
      "Calculate hours worked between start and end times, including overnight shifts and unpaid breaks.",
    eyebrow: "TOOLS"
  },
  {
    output: "tools/overtime-calculator.png",
    label: "Calculator",
    title: "Overtime Calculator",
    description:
      "Calculate overtime pay from hourly rate, total hours worked, overtime threshold, and multiplier.",
    eyebrow: "TOOLS"
  },
  {
    output: "tools/salary-to-hourly-calculator.png",
    label: "Calculator",
    title: "Salary to Hourly Calculator",
    description:
      "Convert annual salary to hourly pay using your weekly hours and paid weeks per year.",
    eyebrow: "TOOLS"
  },
  {
    output: "tools/hourly-to-salary-calculator.png",
    label: "Calculator",
    title: "Hourly to Salary Calculator",
    description: "Convert hourly wage to annual salary, monthly pay, weekly pay, and daily pay.",
    eyebrow: "TOOLS"
  },
  {
    output: "tools/paycheck-calculator.png",
    label: "Calculator",
    title: "Paycheck Calculator",
    description:
      "Estimate gross pay, overtime pay, deductions, and take-home pay from weekly hours.",
    eyebrow: "TOOLS"
  },
  {
    output: "tools/net-pay-estimator.png",
    label: "Calculator",
    title: "Net Pay Estimator",
    description: "Estimate take-home pay from gross pay, deduction percentage, and fixed deductions.",
    eyebrow: "TOOLS"
  },
  {
    output: "guides/how-to-calculate-work-hours.png",
    label: "Guide",
    title: "How to Calculate Work Hours",
    description:
      "Learn how to total work hours, subtract unpaid breaks, and double-check shift totals.",
    eyebrow: "GUIDES"
  },
  {
    output: "guides/how-overtime-pay-works.png",
    label: "Guide",
    title: "How Overtime Works",
    description:
      "Understand overtime pay rules, time-and-a-half, and how to estimate overtime earnings.",
    eyebrow: "GUIDES"
  },
  {
    output: "guides/salary-vs-hourly-pay.png",
    label: "Guide",
    title: "Salary vs Hourly Pay",
    description:
      "Compare salary and hourly pay using work hours, paid weeks, and effective hourly rate.",
    eyebrow: "GUIDES"
  },
  {
    output: "guides/gross-pay-vs-net-pay.png",
    label: "Guide",
    title: "Gross Pay vs Net Pay",
    description:
      "Understand gross pay vs net pay so you can compare earnings, deductions, and take-home pay more clearly.",
    eyebrow: "GUIDES"
  }
];

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function createHtml(entry) {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>${escapeHtml(entry.title)}</title>
    <style>
      :root {
        color-scheme: light;
      }
      * {
        box-sizing: border-box;
      }
      body {
        margin: 0;
        width: 1200px;
        height: 630px;
        overflow: hidden;
        font-family: Inter, Arial, sans-serif;
        color: #0f172a;
        background:
          radial-gradient(circle at top right, rgba(191, 219, 254, 0.95), rgba(243, 246, 251, 0) 40%),
          linear-gradient(180deg, #f8fbff 0%, #f3f6fb 100%);
      }
      .frame {
        position: relative;
        width: 100%;
        height: 100%;
        padding: 48px;
      }
      .shell {
        position: relative;
        width: 100%;
        height: 100%;
        border: 1px solid #d8e2ef;
        border-radius: 28px;
        background: rgba(255, 255, 255, 0.86);
        box-shadow: 0 22px 56px rgba(15, 23, 42, 0.10);
        overflow: hidden;
      }
      .brand {
        display: flex;
        align-items: center;
        gap: 16px;
        padding: 36px 40px 0;
      }
      .mark {
        display: inline-grid;
        place-items: center;
        width: 64px;
        height: 64px;
        border-radius: 20px;
        background: linear-gradient(135deg, #0f766e, #1d4ed8);
        color: #fff;
        font-size: 24px;
        font-weight: 800;
      }
      .brand-name {
        font-size: 26px;
        font-weight: 800;
      }
      .content {
        display: grid;
        grid-template-columns: minmax(0, 1.15fr) minmax(320px, 0.85fr);
        gap: 28px;
        padding: 34px 40px 40px;
      }
      .main {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
      }
      .eyebrow {
        display: inline-flex;
        align-self: flex-start;
        margin-bottom: 18px;
        padding: 10px 14px;
        border: 1px solid rgba(195, 210, 227, 0.98);
        border-radius: 999px;
        background: rgba(255, 255, 255, 0.88);
        color: #0f766e;
        font-size: 14px;
        font-weight: 800;
        letter-spacing: 0.08em;
      }
      h1 {
        margin: 0;
        max-width: 10ch;
        font-size: 64px;
        line-height: 0.96;
        letter-spacing: 0;
      }
      p {
        margin: 22px 0 0;
        max-width: 24ch;
        color: #5a6b81;
        font-size: 30px;
        line-height: 1.4;
      }
      .pill-row {
        display: flex;
        gap: 12px;
        flex-wrap: wrap;
        margin-top: 28px;
      }
      .pill {
        padding: 10px 14px;
        border: 1px solid rgba(195, 210, 227, 0.98);
        border-radius: 999px;
        background: rgba(255, 255, 255, 0.9);
        color: #0f172a;
        font-size: 16px;
        font-weight: 700;
      }
      .side {
        position: relative;
        border: 1px solid rgba(216, 226, 239, 0.94);
        border-radius: 24px;
        background:
          linear-gradient(180deg, rgba(255, 255, 255, 0.94), rgba(238, 244, 251, 0.88));
        padding: 28px;
      }
      .side::before {
        content: "";
        position: absolute;
        inset: 0;
        background:
          radial-gradient(circle at top right, rgba(15, 118, 110, 0.12), rgba(15, 118, 110, 0) 38%);
        pointer-events: none;
      }
      .side-label {
        position: relative;
        display: inline-block;
        padding: 8px 12px;
        border-radius: 999px;
        background: rgba(15, 118, 110, 0.10);
        color: #0f766e;
        font-size: 14px;
        font-weight: 800;
        letter-spacing: 0.08em;
      }
      .metric {
        position: relative;
        margin-top: 24px;
        border: 1px solid rgba(187, 230, 213, 0.98);
        border-radius: 22px;
        background: linear-gradient(180deg, rgba(241, 252, 248, 0.96), rgba(236, 249, 244, 0.88));
        padding: 20px 22px;
      }
      .metric-label {
        color: #5a6b81;
        font-size: 18px;
        font-weight: 700;
      }
      .metric-value {
        margin-top: 12px;
        color: #15803d;
        font-size: 44px;
        font-weight: 800;
      }
      .side-copy {
        position: relative;
        margin-top: 24px;
        color: #334155;
        font-size: 20px;
        line-height: 1.55;
      }
      .footer {
        position: absolute;
        right: 40px;
        bottom: 32px;
        color: #64748b;
        font-size: 18px;
        font-weight: 700;
      }
    </style>
  </head>
  <body>
    <div class="frame">
      <div class="shell">
        <div class="brand">
          <div class="mark">WP</div>
          <div class="brand-name">Worker Pay Tools</div>
        </div>
        <div class="content">
          <section class="main">
            <div>
              <div class="eyebrow">${escapeHtml(entry.eyebrow)}</div>
              <h1>${escapeHtml(entry.title)}</h1>
              <p>${escapeHtml(entry.description)}</p>
            </div>
            <div class="pill-row">
              <span class="pill">Fast checks before payday</span>
              <span class="pill">timeandpaytools.com</span>
            </div>
          </section>
          <aside class="side">
            <div class="side-label">${escapeHtml(entry.label)}</div>
            <div class="metric">
              <div class="metric-label">Built for quick worker pay math</div>
              <div class="metric-value">Fast &amp; clear</div>
            </div>
            <div class="side-copy">
              Simple tools and guides for work hours, overtime, paychecks, net pay, and salary conversions.
            </div>
          </aside>
        </div>
        <div class="footer">Worker Pay Tools</div>
      </div>
    </div>
  </body>
</html>`;
}

fs.mkdirSync(socialDir, { recursive: true });
fs.mkdirSync(path.join(socialDir, "tools"), { recursive: true });
fs.mkdirSync(path.join(socialDir, "guides"), { recursive: true });
fs.mkdirSync(tempDir, { recursive: true });

for (const entry of entries) {
  const html = createHtml(entry);
  const htmlName = entry.output.replaceAll("/", "__").replace(/\.png$/, ".html");
  const htmlPath = path.join(tempDir, htmlName);
  const outputPath = path.join(socialDir, entry.output);

  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(htmlPath, html, "utf8");

  execFileSync(
    edgePath,
    [
      "--headless",
      "--disable-gpu",
      "--hide-scrollbars",
      "--window-size=1200,630",
      `--screenshot=${outputPath}`,
      `file:///${htmlPath.replaceAll("\\", "/")}`
    ],
    { stdio: "ignore" }
  );
}

console.log(`Generated ${entries.length} social preview images in ${socialDir}`);
