import { useState } from "react";
import ResultActions from "./ResultActions";
import { formatMoney, formatNumber, formatNumberInput, parseNumberInput } from "./numberFormat";

type NetPayResults = {
  deductions: string;
  netPay: string;
  takeHomePercent: string;
};

export default function NetPayCalculator() {
  const [grossPay, setGrossPay] = useState("");
  const [deductionPercent, setDeductionPercent] = useState("");
  const [fixedDeductions, setFixedDeductions] = useState("");
  const [results, setResults] = useState<NetPayResults | null>(null);

  function calculate() {
    const gross = parseNumberInput(grossPay);
    const percent = parseNumberInput(deductionPercent);
    const fixed = parseNumberInput(fixedDeductions);
    const percentageDeductions = gross * (percent / 100);
    const totalDeductions = Math.max(percentageDeductions + fixed, 0);
    const net = Math.max(gross - totalDeductions, 0);
    const takeHomePercent = gross > 0 ? (net / gross) * 100 : 0;

    setResults({
      deductions: formatMoney(totalDeductions),
      netPay: formatMoney(net),
      takeHomePercent: formatNumber(takeHomePercent, 1)
    });
  }

  function reset() {
    setGrossPay("");
    setDeductionPercent("");
    setFixedDeductions("");
    setResults(null);
  }

  return (
    <div className="calculator-block">
      <h2>Net Pay Estimator</h2>
      <p>
        Estimate take-home pay from gross pay, a deduction percentage, and any
        fixed deductions.
      </p>

      <div className="calc-grid">
        <div className="calc-panel">
          <h3>Enter Pay Details</h3>
          <p className="muted">
            Use this for a quick estimate when you know your gross pay and want
            to subtract taxes, benefits, or other deductions.
          </p>

          <label className="calc-field compact-field" htmlFor="netPayGross">
            <span>Gross Pay ($)</span>
            <input
              id="netPayGross"
              type="text"
              inputMode="decimal"
              value={grossPay}
              onChange={(event) => setGrossPay(formatNumberInput(event.target.value))}
            />
          </label>

          <label className="calc-field compact-field" htmlFor="netPayPercent">
            <span>Estimated Deduction Percentage (%)</span>
            <input
              id="netPayPercent"
              type="text"
              inputMode="decimal"
              value={deductionPercent}
              onChange={(event) => setDeductionPercent(formatNumberInput(event.target.value))}
            />
          </label>

          <label className="calc-field compact-field" htmlFor="netPayFixed">
            <span>Additional Fixed Deductions ($)</span>
            <input
              id="netPayFixed"
              type="text"
              inputMode="decimal"
              value={fixedDeductions}
              onChange={(event) => setFixedDeductions(formatNumberInput(event.target.value))}
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

          {!results && <p className="muted">Enter your pay details and click calculate.</p>}

          {results && (
            <>
              <div className="result-card">
                <span>Estimated Net Pay</span>
                <strong>{results.netPay}</strong>
              </div>

              <dl className="result-list">
                <div>
                  <dt>Estimated deductions</dt>
                  <dd>{results.deductions}</dd>
                </div>
                <div>
                  <dt>Take-home percentage</dt>
                  <dd>{results.takeHomePercent}%</dd>
                </div>
              </dl>

              <div className="summary-panel">
                If your gross pay is{" "}
                <strong>{formatMoney(parseNumberInput(grossPay))}</strong> and
                deductions are{" "}
                <strong>{formatNumber(parseNumberInput(deductionPercent), 1)}%</strong>,
                your estimated take-home pay is{" "}
                <strong>{results.netPay}</strong>.
              </div>

              <ResultActions resultName="net pay result" />
            </>
          )}
        </div>
      </div>

      <section className="helper-panel">
        <h3>How we calculate this</h3>
        <p>
          We multiply your gross pay by the deduction percentage, then add any
          fixed deductions you entered.
        </p>
        <p>
          Estimated net pay is gross pay minus total deductions. The take-home
          percentage shows how much of your gross pay remains after deductions.
        </p>
      </section>
    </div>
  );
}
