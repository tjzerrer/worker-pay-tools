import { useState } from "react";
import ResultActions from "./ResultActions";

type OvertimeResults = {
  regularHours: string;
  overtimeHours: string;
  regularPay: string;
  overtimePay: string;
  totalPay: string;
};

export default function OvertimeCalculator() {
  const [rate, setRate] = useState("");
  const [hours, setHours] = useState("");
  const [threshold, setThreshold] = useState("40");
  const [multiplier, setMultiplier] = useState("1.5");
  const [results, setResults] = useState<OvertimeResults | null>(null);

  function calculate() {
    const r = Number(rate || 0);
    const h = Number(hours || 0);
    const t = Number(threshold || 40);
    const m = Number(multiplier || 1.5);

    const overtimeHours = Math.max(h - t, 0);
    const regularHours = Math.min(h, t);

    const regularPay = regularHours * r;
    const overtimePay = overtimeHours * r * m;
    const totalPay = regularPay + overtimePay;

    setResults({
      regularHours: regularHours.toFixed(2),
      overtimeHours: overtimeHours.toFixed(2),
      regularPay: regularPay.toFixed(2),
      overtimePay: overtimePay.toFixed(2),
      totalPay: totalPay.toFixed(2)
    });
  }

  function reset() {
    setRate("");
    setHours("");
    setThreshold("40");
    setMultiplier("1.5");
    setResults(null);
  }

  return (
    <div style={{ margin: "2rem 0" }}>
      <style>{`
        .ot-wrap {
          margin-top: 1.5rem;
          display: grid;
          grid-template-columns: 1fr 0.9fr;
          gap: 2rem;
          align-items: start;
        }

        .ot-card {
          border: 1px solid #d9e2ec;
          border-radius: 8px;
          padding: 1rem;
          background: #fff;
        }

        .ot-heading {
          margin-top: 0;
          margin-bottom: 0.35rem;
        }

        .ot-subtle {
          font-size: 0.92rem;
          color: #555;
          margin-top: 0;
          margin-bottom: 1rem;
          line-height: 1.4;
        }

        .ot-field {
          margin-bottom: 1rem;
        }

        .ot-label {
          display: block;
          font-weight: 600;
          margin-bottom: 0.35rem;
        }

        .ot-input {
          width: 180px;
          max-width: 100%;
          height: 36px;
          border: 1px solid #d9e2ec;
          border-radius: 8px;
          padding: 0.35rem 0.5rem;
          box-sizing: border-box;
        }

        .ot-actions {
          display: flex;
          gap: 0.75rem;
          flex-wrap: wrap;
          margin-top: 1rem;
        }

        .ot-primary-btn {
          padding: 0.7rem 1.15rem;
          border-radius: 8px;
          background: #155e75;
          color: #fff;
          border: none;
          cursor: pointer;
        }

        .ot-secondary-btn {
          padding: 0.7rem 1.15rem;
          border-radius: 8px;
          background: #f3f3f3;
          border: 1px solid #d9e2ec;
          cursor: pointer;
        }

        .ot-results-empty {
          color: #555;
        }

        .ot-results-top {
          display: grid;
          grid-template-columns: 1fr;
          gap: 0.75rem;
          margin-top: 1rem;
          margin-bottom: 1rem;
        }

        .ot-stat {
          border: 1px solid #cfe3dc;
          border-radius: 8px;
          background: #eef5f2;
          padding: 0.85rem;
        }

        .ot-stat-label {
          font-size: 0.85rem;
          color: #666;
          margin-bottom: 0.25rem;
        }

        .ot-stat-value {
          font-size: 1.2rem;
          font-weight: 700;
          color: #18794e;
        }

        .ot-breakdown p {
          margin: 0.45rem 0;
        }

        .ot-summary {
          margin-top: 1rem;
          padding: 0.85rem;
          border-radius: 8px;
          background: #fafafa;
          border: 1px solid #d9e2ec;
          line-height: 1.45;
        }

        .ot-helper {
          margin-top: 2rem;
          border: 1px solid #d9e2ec;
          border-radius: 8px;
          padding: 1rem;
          background: #fafafa;
        }

        .ot-helper h3 {
          margin-top: 0;
        }

        @media (max-width: 800px) {
          .ot-wrap {
            grid-template-columns: 1fr;
          }

          .ot-input {
            width: 100%;
          }
        }
      `}</style>

      <h2>Overtime Calculator</h2>
      <p>Estimate overtime pay based on hours worked, hourly rate, and your overtime rule.</p>

      <div className="ot-wrap">
        <div className="ot-card">
          <h3 className="ot-heading">Enter Pay Details</h3>
          <p className="ot-subtle">
            Adjust the overtime threshold and multiplier if your job uses a different rule.
          </p>

          <div className="ot-field">
            <label className="ot-label" htmlFor="rate">
              Hourly Rate ($)
            </label>
            <input
              id="rate"
              className="ot-input"
              type="number"
              min="0"
              step="0.01"
              value={rate}
              onChange={(e) => setRate(e.target.value)}
            />
          </div>

          <div className="ot-field">
            <label className="ot-label" htmlFor="hours">
              Total Hours Worked
            </label>
            <input
              id="hours"
              className="ot-input"
              type="number"
              min="0"
              step="0.01"
              value={hours}
              onChange={(e) => setHours(e.target.value)}
            />
          </div>

          <div className="ot-field">
            <label className="ot-label" htmlFor="threshold">
              Overtime Starts After
            </label>
            <input
              id="threshold"
              className="ot-input"
              type="number"
              min="0"
              step="0.01"
              value={threshold}
              onChange={(e) => setThreshold(e.target.value)}
            />
          </div>

          <div className="ot-field">
            <label className="ot-label" htmlFor="multiplier">
              Overtime Multiplier
            </label>
            <input
              id="multiplier"
              className="ot-input"
              type="number"
              min="1"
              step="0.1"
              value={multiplier}
              onChange={(e) => setMultiplier(e.target.value)}
            />
          </div>

          <div className="ot-actions">
            <button onClick={calculate} className="ot-primary-btn">
              Calculate
            </button>

            <button type="button" onClick={reset} className="ot-secondary-btn">
              Reset
            </button>
          </div>
        </div>

        <div className="ot-card">
          <h3 className="ot-heading">Results</h3>

          {!results && (
            <p className="ot-results-empty">Enter your pay details and click calculate.</p>
          )}

          {results && (
            <>
              <div className="ot-results-top">
                <div className="ot-stat">
                  <div className="ot-stat-label">Total Estimated Pay</div>
                  <div className="ot-stat-value">${results.totalPay}</div>
                </div>
              </div>

              <div className="ot-breakdown">
                <p>Regular Hours: {results.regularHours}</p>
                <p>Overtime Hours: {results.overtimeHours}</p>
                <p>Regular Pay: ${results.regularPay}</p>
                <p>Overtime Pay: ${results.overtimePay}</p>
              </div>

              <div className="ot-summary">
                You worked <strong>{results.regularHours}</strong> regular hours and{" "}
                <strong>{results.overtimeHours}</strong> overtime hours. Based on an hourly
                rate of <strong>${Number(rate || 0).toFixed(2)}</strong>, your estimated
                total pay is <strong>${results.totalPay}</strong>.
              </div>

              <ResultActions resultName="overtime result" />
            </>
          )}
        </div>
      </div>

      <div className="ot-helper">
        <h3>How we calculate this</h3>
        <p>
          We split your total hours into regular hours and overtime hours using the threshold
          you enter. Hours up to that threshold are paid at your normal hourly rate.
        </p>
        <p>
          Hours above the threshold are paid using your overtime multiplier. For example, a
          multiplier of 1.5 means overtime pay is 1.5 times your regular hourly rate.
        </p>
      </div>
    </div>
  );
}
