import { useState } from "react";
import ResultActions from "./ResultActions";
import { formatNumber, formatNumberInput, parseNumberInput } from "./numberFormat";

export default function HoursWorkedCalculator() {
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [breakMinutes, setBreakMinutes] = useState("0");

  const [totalHours, setTotalHours] = useState("");
  const [rawHours, setRawHours] = useState("");
  const [overnight, setOvernight] = useState(false);

  function resetCalculator() {
    setStart("");
    setEnd("");
    setBreakMinutes("0");
    setTotalHours("");
    setRawHours("");
    setOvernight(false);
  }

  function calculate() {
    if (!start || !end) return;

    const startTime = new Date(`1970-01-01T${start}:00`);
    const endTime = new Date(`1970-01-01T${end}:00`);

    let diff = (endTime.getTime() - startTime.getTime()) / (1000 * 60 * 60);
    let isOvernight = false;

    if (diff < 0) {
      diff += 24;
      isOvernight = true;
    }

    const breakHours = parseNumberInput(breakMinutes) / 60;
    const finalHours = Math.max(diff - breakHours, 0);

    setRawHours(formatNumber(diff));
    setTotalHours(formatNumber(finalHours));
    setOvernight(isOvernight);
  }

  return (
    <div style={{ margin: "2rem 0" }}>
      <style>{`
        .hw-wrap {
          margin-top: 1.5rem;
          display: grid;
          grid-template-columns: 1fr 0.9fr;
          gap: 2rem;
          align-items: start;
        }

        .hw-card {
          border: 1px solid rgba(216, 226, 239, 0.94);
          border-radius: 18px;
          padding: 1.15rem;
          background: rgba(255, 255, 255, 0.82);
          box-shadow: 0 10px 24px rgba(15, 23, 42, 0.06);
          backdrop-filter: blur(12px);
        }

        .hw-heading {
          margin-top: 0;
          margin-bottom: 0.35rem;
        }

        .hw-subtle {
          font-size: 0.92rem;
          color: #555;
          margin-top: 0;
          margin-bottom: 1rem;
          line-height: 1.4;
        }

        .hw-field {
          margin-bottom: 1rem;
        }

        .hw-label {
          display: block;
          font-weight: 600;
          margin-bottom: 0.35rem;
        }

        .hw-input {
          width: 100%;
          max-width: 260px;
          height: 40px;
          border: 1px solid rgba(195, 210, 227, 0.96);
          border-radius: 12px;
          background: rgba(247, 250, 253, 0.92);
          padding: 0.45rem 0.65rem;
          box-sizing: border-box;
          color: #0f172a;
        }

        .hw-actions {
          display: flex;
          gap: 0.75rem;
          flex-wrap: wrap;
          margin-top: 1rem;
        }

        .hw-primary-btn {
          padding: 0.78rem 1.15rem;
          border-radius: 999px;
          background: #0f766e;
          color: #fff;
          border: none;
          cursor: pointer;
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.18);
        }

        .hw-secondary-btn {
          padding: 0.78rem 1.15rem;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.88);
          border: 1px solid rgba(195, 210, 227, 0.98);
          cursor: pointer;
        }

        .hw-results-empty {
          color: #555;
        }

        .hw-results-top {
          display: grid;
          grid-template-columns: 1fr;
          gap: 0.75rem;
          margin-top: 1rem;
          margin-bottom: 1rem;
        }

        .hw-stat {
          border: 1px solid rgba(187, 230, 213, 0.98);
          border-radius: 18px;
          background: linear-gradient(180deg, rgba(241, 252, 248, 0.96), rgba(236, 249, 244, 0.88));
          padding: 1rem;
        }

        .hw-stat-label {
          font-size: 0.85rem;
          color: #666;
          margin-bottom: 0.25rem;
        }

        .hw-stat-value {
          font-size: 1.2rem;
          font-weight: 700;
          color: #18794e;
        }

        .hw-note {
          margin-top: 1rem;
          padding: 0.9rem;
          border-radius: 12px;
          background: rgba(249, 251, 254, 0.92);
          border: 1px solid rgba(216, 226, 239, 0.94);
        }

        .hw-helper {
          margin-top: 2rem;
          border: 1px solid rgba(216, 226, 239, 0.94);
          border-radius: 18px;
          padding: 1.15rem;
          background: rgba(255, 255, 255, 0.78);
          box-shadow: 0 10px 24px rgba(15, 23, 42, 0.06);
        }

        .hw-helper h3 {
          margin-top: 0;
        }

        @media (max-width: 800px) {
          .hw-wrap {
            grid-template-columns: 1fr;
          }

          .hw-input {
            max-width: 100%;
          }
        }
      `}</style>

      <h2>Hours Worked Calculator</h2>
      <p>Find the number of hours worked between a start time and end time, with an optional unpaid break.</p>

      <div className="hw-wrap">
        <div className="hw-card">
          <h3 className="hw-heading">Enter Shift Details</h3>
          <p className="hw-subtle">
            Use this calculator for a single shift. Overnight shifts are handled automatically.
          </p>

          <div className="hw-field">
            <label className="hw-label" htmlFor="startTime">
              Start Time
            </label>
            <input
              id="startTime"
              className="hw-input"
              type="time"
              value={start}
              onChange={(e) => setStart(e.target.value)}
            />
          </div>

          <div className="hw-field">
            <label className="hw-label" htmlFor="endTime">
              End Time
            </label>
            <input
              id="endTime"
              className="hw-input"
              type="time"
              value={end}
              onChange={(e) => setEnd(e.target.value)}
            />
          </div>

          <div className="hw-field">
            <label className="hw-label" htmlFor="breakMinutes">
              Unpaid Break (minutes)
            </label>
            <input
              id="breakMinutes"
              className="hw-input"
              type="text"
              inputMode="decimal"
              value={breakMinutes}
              onChange={(e) => setBreakMinutes(formatNumberInput(e.target.value))}
            />
          </div>

          <div className="hw-actions">
            <button onClick={calculate} className="hw-primary-btn">
              Calculate
            </button>

            <button type="button" onClick={resetCalculator} className="hw-secondary-btn">
              Reset
            </button>
          </div>
        </div>

        <div className="hw-card">
          <h3 className="hw-heading">Results</h3>

          {!totalHours && (
            <p className="hw-results-empty">Enter your shift details and click calculate.</p>
          )}

          {totalHours && (
            <>
              <div className="hw-results-top">
                <div className="hw-stat">
                  <div className="hw-stat-label">Hours Worked</div>
                  <div className="hw-stat-value">{totalHours}</div>
                </div>
              </div>

              <p>Time between start and end: {rawHours} hours</p>
              <p>Break deducted: {breakMinutes || "0"} minutes</p>

              <div className="summary-panel">
                Your shift was <strong>{rawHours}</strong> hours before breaks,
                and after subtracting <strong>{breakMinutes || "0"}</strong>{" "}
                break minutes, your paid time is{" "}
                <strong>{totalHours}</strong> hours.
              </div>

              {overnight && (
                <div className="hw-note">
                  This shift crosses midnight, so we treated the end time as the next day.
                </div>
              )}

              <ResultActions resultName="hours worked result" />
            </>
          )}
        </div>
      </div>

      <div className="hw-helper">
        <h3>How we calculate this</h3>
        <p>
          We find the time between your start time and end time. If the end time is earlier than the
          start time, we treat the shift as an overnight shift crossing midnight.
        </p>
        <p>
          Then we subtract your unpaid break from the total shift length to get your final hours worked.
        </p>
      </div>
    </div>
  );
}
