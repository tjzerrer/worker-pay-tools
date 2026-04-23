import { useMemo, useState } from "react";

type DayEntry = {
  start: string;
  end: string;
  breakMinutes: string;
};

type PayBreakdown = {
  regularHours: string;
  overtimeHours: string;
  regularPay: string;
  overtimePay: string;
};

type OvertimeRule = "weekly40" | "daily8";

const emptyDay = (): DayEntry => ({
  start: "",
  end: "",
  breakMinutes: "0"
});

export default function TimeCardCalculator() {
  const [days, setDays] = useState<DayEntry[]>([
    emptyDay(),
    emptyDay(),
    emptyDay(),
    emptyDay(),
    emptyDay()
  ]);

  const [hourlyRate, setHourlyRate] = useState("");
  const [overtimeRule, setOvertimeRule] = useState<OvertimeRule>("weekly40");
  const [totalHours, setTotalHours] = useState("");
  const [grossPay, setGrossPay] = useState("");
  const [breakdown, setBreakdown] = useState<PayBreakdown | null>(null);

  function updateDay(index: number, field: keyof DayEntry, value: string) {
    setDays((prev) =>
      prev.map((day, i) => (i === index ? { ...day, [field]: value } : day))
    );
  }

  function addDay() {
    setDays((prev) => [...prev, emptyDay()]);
  }

  function removeDay(index: number) {
    if (days.length === 1) return;
    setDays((prev) => prev.filter((_, i) => i !== index));
  }

  function resetCalculator() {
    setDays([emptyDay(), emptyDay(), emptyDay(), emptyDay(), emptyDay()]);
    setHourlyRate("");
    setOvertimeRule("weekly40");
    setTotalHours("");
    setGrossPay("");
    setBreakdown(null);
  }

  function calculate() {
    let total = 0;
    let dailyRegularTotal = 0;
    let dailyOvertimeTotal = 0;

    for (const day of days) {
      if (!day.start || !day.end) continue;

      const startTime = new Date(`1970-01-01T${day.start}:00`);
      const endTime = new Date(`1970-01-01T${day.end}:00`);

      let diff = (endTime.getTime() - startTime.getTime()) / (1000 * 60 * 60);

      if (diff < 0) diff += 24;

      const breakHours = Number(day.breakMinutes || 0) / 60;
      const finalHours = Math.max(diff - breakHours, 0);

      total += finalHours;
      dailyRegularTotal += Math.min(finalHours, 8);
      dailyOvertimeTotal += Math.max(finalHours - 8, 0);
    }

    const overtimeHours =
      overtimeRule === "daily8" ? dailyOvertimeTotal : Math.max(total - 40, 0);
    const regularHours =
      overtimeRule === "daily8" ? dailyRegularTotal : Math.min(total, 40);
    const rate = Number(hourlyRate || 0);

    const regularPay = regularHours * rate;
    const overtimePay = overtimeHours * rate * 1.5;
    const totalPay = regularPay + overtimePay;

    setTotalHours(total.toFixed(2));
    setGrossPay(totalPay.toFixed(2));
    setBreakdown({
      regularHours: regularHours.toFixed(2),
      overtimeHours: overtimeHours.toFixed(2),
      regularPay: regularPay.toFixed(2),
      overtimePay: overtimePay.toFixed(2)
    });
  }

  const usedDays = useMemo(
    () => days.filter((day) => day.start && day.end).length,
    [days]
  );

  const overtimeLabel =
    overtimeRule === "daily8"
      ? "Overtime after 8 hours per day"
      : "Overtime after 40 hours per week";

  return (
    <div style={{ margin: "2rem 0" }}>
      <style>{`
        .tc-wrap {
          margin-top: 1.5rem;
          display: grid;
          grid-template-columns: 1.15fr 0.85fr;
          gap: 2rem;
          align-items: start;
        }

        .tc-card {
          border: 1px solid #d9e2ec;
          border-radius: 8px;
          padding: 1rem;
          background: #fff;
        }

        .tc-heading {
          margin-top: 0;
          margin-bottom: 0.35rem;
        }

        .tc-subtle {
          font-size: 0.92rem;
          color: #555;
          margin-top: 0;
          margin-bottom: 1rem;
          line-height: 1.4;
        }

        .tc-grid-head,
        .tc-grid-row {
          display: grid;
          grid-template-columns: 68px 1fr 1fr 78px 34px;
          gap: 0.45rem;
          align-items: center;
        }

        .tc-grid-head {
          font-weight: 700;
          font-size: 0.95rem;
          margin-bottom: 0.45rem;
        }

        .tc-grid-row {
          margin-bottom: 0.65rem;
        }

        .tc-day-label {
          font-weight: 600;
        }

        .tc-input {
          width: 100%;
          box-sizing: border-box;
          height: 34px;
          border: 1px solid #d9e2ec;
          border-radius: 8px;
          padding: 0.3rem 0.45rem;
        }

        .tc-remove {
          width: 30px;
          height: 30px;
          padding: 0;
          border-radius: 8px;
          background: #f3f3f3;
          border: 1px solid #d9e2ec;
          cursor: pointer;
          line-height: 1;
        }

        .tc-remove:disabled {
          background: #ddd;
          cursor: not-allowed;
        }

        .tc-actions {
          display: flex;
          gap: 0.75rem;
          flex-wrap: wrap;
          margin-top: 1rem;
        }

        .tc-secondary-btn {
          padding: 0.6rem 1rem;
          border-radius: 8px;
          background: #f3f3f3;
          border: 1px solid #d9e2ec;
          cursor: pointer;
        }

        .tc-primary-btn {
          margin-top: 1rem;
          padding: 0.7rem 1.15rem;
          border-radius: 8px;
          background: #155e75;
          color: #fff;
          border: none;
          cursor: pointer;
        }

        .tc-field {
          margin-top: 1rem;
        }

        .tc-radio-group {
          display: grid;
          gap: 0.45rem;
          margin-top: 0.45rem;
        }

        .tc-radio-option {
          display: flex;
          gap: 0.5rem;
          align-items: flex-start;
          max-width: 330px;
          line-height: 1.35;
        }

        .tc-radio-option input {
          margin-top: 0.18rem;
        }

        .tc-radio-option span {
          font-weight: 600;
        }

        .tc-rate-input {
          margin-top: 0.35rem;
          width: 140px;
          max-width: 100%;
          height: 36px;
          border: 1px solid #d9e2ec;
          border-radius: 8px;
          padding: 0.35rem 0.5rem;
          box-sizing: border-box;
        }

        .tc-results-empty {
          color: #555;
        }

        .tc-results-top {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.75rem;
          margin-top: 1rem;
          margin-bottom: 1rem;
        }

        .tc-stat {
          border: 1px solid #cfe3dc;
          border-radius: 8px;
          background: #eef5f2;
          padding: 0.8rem;
        }

        .tc-stat-label {
          font-size: 0.85rem;
          color: #666;
          margin-bottom: 0.25rem;
        }

        .tc-stat-value {
          font-size: 1.15rem;
          font-weight: 700;
          color: #18794e;
        }

        .tc-breakdown p {
          margin: 0.45rem 0;
        }

        .tc-total-pay {
          margin-top: 1rem;
          padding-top: 1rem;
          border-top: 1px solid #d9e2ec;
          font-size: 1.2rem;
        }

        .tc-helper {
          margin-top: 2rem;
          border: 1px solid #d9e2ec;
          border-radius: 8px;
          padding: 1rem;
          background: #fafafa;
        }

        .tc-helper h3 {
          margin-top: 0;
        }

        .tc-badge-row {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
          margin-top: 0.75rem;
          margin-bottom: 0.5rem;
        }

        .tc-badge {
          display: inline-block;
          padding: 0.25rem 0.55rem;
          border: 1px solid #d9e2ec;
          border-radius: 8px;
          background: #f8f8f8;
          font-size: 0.85rem;
        }

        @media (max-width: 900px) {
          .tc-wrap {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 640px) {
          .tc-grid-head {
            display: none;
          }

          .tc-grid-row {
            grid-template-columns: 1fr;
            gap: 0.45rem;
            border: 1px solid #d9e2ec;
            border-radius: 8px;
            padding: 0.75rem;
            margin-bottom: 0.85rem;
            background: #fcfcfc;
          }

          .tc-mobile-label {
            display: block;
            font-size: 0.82rem;
            color: #666;
            margin-bottom: 0.2rem;
          }

          .tc-remove {
            width: 100%;
            height: 34px;
          }

          .tc-results-top {
            grid-template-columns: 1fr;
          }

          .tc-rate-input {
            width: 100%;
          }
        }

        @media (min-width: 641px) {
          .tc-mobile-label {
            display: none;
          }
        }
      `}</style>

      <h2>Weekly Time Card Calculator</h2>
      <p>Enter your hours for each day to calculate total weekly hours and estimated pay.</p>

      <div className="tc-wrap">
        <div className="tc-card">
          <h3 className="tc-heading">Enter Hours</h3>
          <p className="tc-subtle">
            Leave unused days blank, or add and remove days as needed.
          </p>

          <div className="tc-grid-head">
            <div>Day</div>
            <div>Start</div>
            <div>End</div>
            <div>Break</div>
            <div></div>
          </div>

          {days.map((day, i) => (
            <div key={i} className="tc-grid-row">
              <div className="tc-day-label">Day {i + 1}</div>

              <div>
                <span className="tc-mobile-label">Start</span>
                <input
                  className="tc-input"
                  type="time"
                  value={day.start}
                  onChange={(e) => updateDay(i, "start", e.target.value)}
                />
              </div>

              <div>
                <span className="tc-mobile-label">End</span>
                <input
                  className="tc-input"
                  type="time"
                  value={day.end}
                  onChange={(e) => updateDay(i, "end", e.target.value)}
                />
              </div>

              <div>
                <span className="tc-mobile-label">Break (min)</span>
                <input
                  className="tc-input"
                  type="number"
                  min="0"
                  value={day.breakMinutes}
                  onChange={(e) => updateDay(i, "breakMinutes", e.target.value)}
                  placeholder="0"
                />
              </div>

              <div>
                <span className="tc-mobile-label">Remove</span>
                <button
                  type="button"
                  onClick={() => removeDay(i)}
                  disabled={days.length === 1}
                  className="tc-remove"
                  aria-label={`Remove day ${i + 1}`}
                  title={`Remove day ${i + 1}`}
                >
                  ×
                </button>
              </div>
            </div>
          ))}

          <div className="tc-actions">
            <button type="button" onClick={addDay} className="tc-secondary-btn">
              Add Day
            </button>

            <button
              type="button"
              onClick={resetCalculator}
              className="tc-secondary-btn"
            >
              Reset
            </button>
          </div>

          <div className="tc-field">
            <label htmlFor="hourlyRate">
              <strong>Hourly Rate ($)</strong>
            </label>
            <br />
            <input
              id="hourlyRate"
              className="tc-rate-input"
              type="number"
              min="0"
              step="0.01"
              value={hourlyRate}
              onChange={(e) => setHourlyRate(e.target.value)}
            />
          </div>

          <fieldset className="tc-field" style={{ border: 0, padding: 0 }}>
            <legend>
              <strong>Overtime Rule</strong>
            </legend>
            <div className="tc-radio-group">
              <label className="tc-radio-option">
                <input
                  type="radio"
                  name="overtimeRule"
                  value="weekly40"
                  checked={overtimeRule === "weekly40"}
                  onChange={() => setOvertimeRule("weekly40")}
                />
                <span>Over 40 hours per week</span>
              </label>
              <label className="tc-radio-option">
                <input
                  type="radio"
                  name="overtimeRule"
                  value="daily8"
                  checked={overtimeRule === "daily8"}
                  onChange={() => setOvertimeRule("daily8")}
                />
                <span>Over 8 hours per day</span>
              </label>
            </div>
          </fieldset>

          <button onClick={calculate} className="tc-primary-btn">
            Calculate
          </button>
        </div>

        <div className="tc-card">
          <h3 className="tc-heading">Results</h3>

          {!totalHours && (
            <p className="tc-results-empty">Enter your hours and click calculate.</p>
          )}

          {totalHours && (
            <>
              <div className="tc-badge-row">
                <span className="tc-badge">Days used: {usedDays}</span>
                <span className="tc-badge">{overtimeLabel}</span>
              </div>

              <div className="tc-results-top">
                <div className="tc-stat">
                  <div className="tc-stat-label">Total Hours</div>
                  <div className="tc-stat-value">{totalHours}</div>
                </div>

                <div className="tc-stat">
                  <div className="tc-stat-label">Estimated Pay</div>
                  <div className="tc-stat-value">${grossPay}</div>
                </div>
              </div>

              {breakdown && (
                <div className="tc-breakdown">
                  <p>Regular Hours: {breakdown.regularHours}</p>
                  <p>Overtime Hours: {breakdown.overtimeHours}</p>
                  <p>Regular Pay: ${breakdown.regularPay}</p>
                  <p>Overtime Pay: ${breakdown.overtimePay}</p>
                </div>
              )}

              <div className="tc-total-pay">
                <strong>Total Pay: ${grossPay}</strong>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="tc-helper">
        <h3>How we calculate this</h3>
        <p>
          For each day, we subtract your unpaid break from the total time between
          your start and end times. Then we add up all daily hours for the week.
        </p>
        <p>
          Choose the overtime rule that applies to your situation. Weekly
          overtime counts hours above 40 in the week. Daily overtime counts
          hours above 8 on each day. Overtime is estimated at 1.5 times your
          hourly rate.
        </p>
      </div>
    </div>
  );
}
