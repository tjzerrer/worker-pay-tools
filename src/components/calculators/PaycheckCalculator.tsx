import { useState } from "react";
import ResultActions from "./ResultActions";
import { formatMoney, formatNumber, formatNumberInput, parseNumberInput } from "./numberFormat";

type Results = {
  regularHours: string;
  overtimeHours: string;
  grossPay: string;
  deductions: string;
  netPay: string;
  effectiveRate: string;
};

export default function PaycheckCalculator() {
  const [hourlyRate, setHourlyRate] = useState("");
  const [hoursWorked, setHoursWorked] = useState("");
  const [overtimeThreshold, setOvertimeThreshold] = useState("40");
  const [overtimeMultiplier, setOvertimeMultiplier] = useState("1.5");
  const [deductionPercent, setDeductionPercent] = useState("0");
  const [results, setResults] = useState<Results | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  function calculate() {
    const rate = parseNumberInput(hourlyRate);
    const hours = parseNumberInput(hoursWorked);
    const threshold = parseNumberInput(overtimeThreshold) || 40;
    const multiplier = parseNumberInput(overtimeMultiplier) || 1.5;
    const deductionRate = parseNumberInput(deductionPercent) / 100;
    const errors: Record<string, string> = {};

    if (rate <= 0) {
      errors.hourlyRate = "Enter an hourly rate to estimate paycheck totals.";
    }

    if (hours <= 0) {
      errors.hoursWorked = "Enter total hours worked to calculate gross pay.";
    }

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      setResults(null);
      return;
    }

    setFieldErrors({});

    const overtimeHours = Math.max(hours - threshold, 0);
    const regularHours = Math.min(hours, threshold);
    const grossPay = regularHours * rate + overtimeHours * rate * multiplier;
    const deductions = grossPay * Math.max(deductionRate, 0);
    const netPay = Math.max(grossPay - deductions, 0);
    const effectiveRate = hours > 0 ? grossPay / hours : 0;

    setResults({
      regularHours: formatNumber(regularHours),
      overtimeHours: formatNumber(overtimeHours),
      grossPay: formatMoney(grossPay),
      deductions: formatMoney(deductions),
      netPay: formatMoney(netPay),
      effectiveRate: formatMoney(effectiveRate)
    });
  }

  function reset() {
    setHourlyRate("");
    setHoursWorked("");
    setOvertimeThreshold("40");
    setOvertimeMultiplier("1.5");
    setDeductionPercent("0");
    setResults(null);
    setFieldErrors({});
  }

  return (
    <div className="calculator-block">
      <h2>Paycheck Calculator</h2>
      <p>
        Estimate gross pay and a simple take-home amount from total weekly hours,
        hourly rate, weekly overtime, and deductions.
      </p>

      <div className="calc-grid">
        <div className="calc-panel">
          <h3>Enter Paycheck Details</h3>

          {Object.keys(fieldErrors).length > 0 && (
            <div className="validation-alert">
              Add the missing required fields below to calculate a complete paycheck estimate.
            </div>
          )}

          <label className={`calc-field${fieldErrors.hourlyRate ? " has-error" : ""}`} htmlFor="paycheckHourlyRate">
            <span>Hourly Rate ($)</span>
            <input
              id="paycheckHourlyRate"
              type="text"
              inputMode="decimal"
              value={hourlyRate}
              onChange={(event) => {
                setHourlyRate(formatNumberInput(event.target.value));
                setFieldErrors((current) => {
                  const next = { ...current };
                  delete next.hourlyRate;
                  return next;
                });
              }}
            />
            {fieldErrors.hourlyRate && (
              <small className="error-message">{fieldErrors.hourlyRate}</small>
            )}
          </label>

          <label className={`calc-field${fieldErrors.hoursWorked ? " has-error" : ""}`} htmlFor="paycheckHoursWorked">
            <span>Total Hours Worked</span>
            <input
              id="paycheckHoursWorked"
              type="text"
              inputMode="decimal"
              value={hoursWorked}
              onChange={(event) => {
                setHoursWorked(formatNumberInput(event.target.value));
                setFieldErrors((current) => {
                  const next = { ...current };
                  delete next.hoursWorked;
                  return next;
                });
              }}
            />
            {fieldErrors.hoursWorked && (
              <small className="error-message">{fieldErrors.hoursWorked}</small>
            )}
          </label>

          <label className="calc-field" htmlFor="paycheckOvertimeThreshold">
            <span>Weekly Overtime Starts After</span>
            <input
              id="paycheckOvertimeThreshold"
              type="text"
              inputMode="decimal"
              value={overtimeThreshold}
              onChange={(event) => setOvertimeThreshold(formatNumberInput(event.target.value))}
            />
            <small className="field-note">
              This calculator uses total hours. For overtime after 8 hours in a
              day, use the{" "}
              <a href="/tools/time-card-calculator/">Time Card Calculator</a>.
            </small>
          </label>

          <label className="calc-field" htmlFor="paycheckOvertimeMultiplier">
            <span>Overtime Multiplier</span>
            <input
              id="paycheckOvertimeMultiplier"
              type="text"
              inputMode="decimal"
              value={overtimeMultiplier}
              onChange={(event) => setOvertimeMultiplier(formatNumberInput(event.target.value))}
            />
          </label>

          <label className="calc-field" htmlFor="paycheckDeductions">
            <span>Estimated Deductions (%)</span>
            <input
              id="paycheckDeductions"
              type="text"
              inputMode="decimal"
              value={deductionPercent}
              onChange={(event) => setDeductionPercent(formatNumberInput(event.target.value))}
            />
          </label>

          <div className="calc-actions">
            <button type="button" className="primary-button" onClick={calculate}>
              Calculate
            </button>
            <button type="button" className="secondary-button" onClick={reset}>
              Reset
            </button>
          </div>
        </div>

        <div className="calc-panel">
          <h3>Results</h3>

          {!results && <p className="muted">Enter your paycheck details and click calculate.</p>}

          {results && (
            <>
              <div className="result-card">
                <span>Estimated Take-Home Pay</span>
                <strong>{results.netPay}</strong>
              </div>

              <dl className="result-list">
                <div>
                  <dt>Gross pay</dt>
                  <dd>{results.grossPay}</dd>
                </div>
                <div>
                  <dt>Regular hours</dt>
                  <dd>{results.regularHours}</dd>
                </div>
                <div>
                  <dt>Overtime hours</dt>
                  <dd>{results.overtimeHours}</dd>
                </div>
                <div>
                  <dt>Deductions</dt>
                  <dd>{results.deductions}</dd>
                </div>
                <div>
                  <dt>Effective gross hourly rate</dt>
                  <dd>{results.effectiveRate}</dd>
                </div>
              </dl>

              <div className="summary-panel">
                Based on <strong>{hoursWorked || "0"}</strong> hours at{" "}
                <strong>{formatMoney(parseNumberInput(hourlyRate))}</strong> per hour,
                your estimated gross pay is{" "}
                <strong>{results.grossPay}</strong> and your estimated
                take-home pay is <strong>{results.netPay}</strong>.
              </div>

              <ResultActions resultName="paycheck result" />
            </>
          )}
        </div>
      </div>

      <section className="helper-panel">
        <h3>How we calculate this</h3>
        <p>
          We split your total weekly hours into regular and overtime hours using
          the weekly threshold you enter, apply the overtime multiplier, then
          subtract your estimated deduction percentage from gross pay.
        </p>
        <p>
          This calculator does not estimate daily overtime because it does not
          collect day-by-day hours. If your overtime starts after 8 hours in a
          day, use the{" "}
          <a href="/tools/time-card-calculator/">Time Card Calculator</a> instead.
        </p>
      </section>
    </div>
  );
}
