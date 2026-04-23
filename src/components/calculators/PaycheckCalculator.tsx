import { useState } from "react";
import ResultActions from "./ResultActions";

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

  function calculate() {
    const rate = Number(hourlyRate || 0);
    const hours = Number(hoursWorked || 0);
    const threshold = Number(overtimeThreshold || 40);
    const multiplier = Number(overtimeMultiplier || 1.5);
    const deductionRate = Number(deductionPercent || 0) / 100;

    const overtimeHours = Math.max(hours - threshold, 0);
    const regularHours = Math.min(hours, threshold);
    const grossPay = regularHours * rate + overtimeHours * rate * multiplier;
    const deductions = grossPay * Math.max(deductionRate, 0);
    const netPay = Math.max(grossPay - deductions, 0);
    const effectiveRate = hours > 0 ? grossPay / hours : 0;

    setResults({
      regularHours: regularHours.toFixed(2),
      overtimeHours: overtimeHours.toFixed(2),
      grossPay: grossPay.toFixed(2),
      deductions: deductions.toFixed(2),
      netPay: netPay.toFixed(2),
      effectiveRate: effectiveRate.toFixed(2)
    });
  }

  function reset() {
    setHourlyRate("");
    setHoursWorked("");
    setOvertimeThreshold("40");
    setOvertimeMultiplier("1.5");
    setDeductionPercent("0");
    setResults(null);
  }

  return (
    <div className="calculator-block">
      <h2>Paycheck Calculator</h2>
      <p>
        Estimate gross pay and a simple take-home amount from hours, hourly rate, overtime,
        and deductions.
      </p>

      <div className="calc-grid">
        <div className="calc-panel">
          <h3>Enter Paycheck Details</h3>

          <label className="calc-field" htmlFor="paycheckHourlyRate">
            <span>Hourly Rate ($)</span>
            <input
              id="paycheckHourlyRate"
              type="number"
              min="0"
              step="0.01"
              value={hourlyRate}
              onChange={(event) => setHourlyRate(event.target.value)}
            />
          </label>

          <label className="calc-field" htmlFor="paycheckHoursWorked">
            <span>Total Hours Worked</span>
            <input
              id="paycheckHoursWorked"
              type="number"
              min="0"
              step="0.01"
              value={hoursWorked}
              onChange={(event) => setHoursWorked(event.target.value)}
            />
          </label>

          <label className="calc-field" htmlFor="paycheckOvertimeThreshold">
            <span>Overtime Starts After</span>
            <input
              id="paycheckOvertimeThreshold"
              type="number"
              min="0"
              step="0.01"
              value={overtimeThreshold}
              onChange={(event) => setOvertimeThreshold(event.target.value)}
            />
          </label>

          <label className="calc-field" htmlFor="paycheckOvertimeMultiplier">
            <span>Overtime Multiplier</span>
            <input
              id="paycheckOvertimeMultiplier"
              type="number"
              min="1"
              step="0.1"
              value={overtimeMultiplier}
              onChange={(event) => setOvertimeMultiplier(event.target.value)}
            />
          </label>

          <label className="calc-field" htmlFor="paycheckDeductions">
            <span>Estimated Deductions (%)</span>
            <input
              id="paycheckDeductions"
              type="number"
              min="0"
              max="100"
              step="0.1"
              value={deductionPercent}
              onChange={(event) => setDeductionPercent(event.target.value)}
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
                <strong>${results.netPay}</strong>
              </div>

              <dl className="result-list">
                <div>
                  <dt>Gross pay</dt>
                  <dd>${results.grossPay}</dd>
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
                  <dd>${results.deductions}</dd>
                </div>
                <div>
                  <dt>Effective gross hourly rate</dt>
                  <dd>${results.effectiveRate}</dd>
                </div>
              </dl>

              <div className="summary-panel">
                Based on <strong>{hoursWorked || "0"}</strong> hours at{" "}
                <strong>${Number(hourlyRate || 0).toFixed(2)}</strong> per hour,
                your estimated gross pay is{" "}
                <strong>${results.grossPay}</strong> and your estimated
                take-home pay is <strong>${results.netPay}</strong>.
              </div>

              <ResultActions resultName="paycheck result" />
            </>
          )}
        </div>
      </div>

      <section className="helper-panel">
        <h3>How we calculate this</h3>
        <p>
          We split hours into regular and overtime hours, apply the overtime multiplier,
          then subtract your estimated deduction percentage from gross pay.
        </p>
      </section>
    </div>
  );
}
