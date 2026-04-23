import { useState } from "react";
import ResultActions from "./ResultActions";

type Results = {
  annual: string;
  monthly: string;
  weekly: string;
  daily: string;
  hoursPerYear: string;
};

export default function HourlyToSalaryCalculator() {
  const [hourlyRate, setHourlyRate] = useState("");
  const [hoursPerWeek, setHoursPerWeek] = useState("40");
  const [weeksPerYear, setWeeksPerYear] = useState("52");
  const [daysPerWeek, setDaysPerWeek] = useState("5");
  const [results, setResults] = useState<Results | null>(null);

  function calculate() {
    const rate = Number(hourlyRate || 0);
    const weeklyHours = Number(hoursPerWeek || 0);
    const paidWeeks = Number(weeksPerYear || 0);
    const workDays = Number(daysPerWeek || 0);
    const weeklyPay = rate * weeklyHours;
    const annualPay = weeklyPay * paidWeeks;
    const dailyPay = workDays > 0 ? weeklyPay / workDays : 0;

    setResults({
      annual: annualPay.toFixed(2),
      monthly: (annualPay / 12).toFixed(2),
      weekly: weeklyPay.toFixed(2),
      daily: dailyPay.toFixed(2),
      hoursPerYear: (weeklyHours * paidWeeks).toFixed(0)
    });
  }

  function reset() {
    setHourlyRate("");
    setHoursPerWeek("40");
    setWeeksPerYear("52");
    setDaysPerWeek("5");
    setResults(null);
  }

  return (
    <div className="calculator-block">
      <h2>Hourly to Salary Calculator</h2>
      <p>
        Estimate annual salary, monthly pay, and weekly pay from an hourly wage.
      </p>

      <div className="calc-grid">
        <div className="calc-panel">
          <h3>Enter Hourly Details</h3>

          <label className="calc-field" htmlFor="hourlyWage">
            <span>Hourly Wage ($)</span>
            <input
              id="hourlyWage"
              type="number"
              min="0"
              step="0.01"
              value={hourlyRate}
              onChange={(event) => setHourlyRate(event.target.value)}
            />
          </label>

          <label className="calc-field" htmlFor="hourlyHoursPerWeek">
            <span>Hours per Week</span>
            <input
              id="hourlyHoursPerWeek"
              type="number"
              min="0"
              step="0.25"
              value={hoursPerWeek}
              onChange={(event) => setHoursPerWeek(event.target.value)}
            />
          </label>

          <label className="calc-field" htmlFor="hourlyWeeksPerYear">
            <span>Paid Weeks per Year</span>
            <input
              id="hourlyWeeksPerYear"
              type="number"
              min="1"
              max="52"
              step="1"
              value={weeksPerYear}
              onChange={(event) => setWeeksPerYear(event.target.value)}
            />
          </label>

          <label className="calc-field" htmlFor="hourlyDaysPerWeek">
            <span>Days per Week</span>
            <input
              id="hourlyDaysPerWeek"
              type="number"
              min="1"
              max="7"
              step="1"
              value={daysPerWeek}
              onChange={(event) => setDaysPerWeek(event.target.value)}
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

          {!results && <p className="muted">Enter your hourly details and click calculate.</p>}

          {results && (
            <>
              <div className="result-card">
                <span>Estimated Annual Salary</span>
                <strong>${results.annual}</strong>
              </div>

              <dl className="result-list">
                <div>
                  <dt>Monthly pay</dt>
                  <dd>${results.monthly}</dd>
                </div>
                <div>
                  <dt>Weekly pay</dt>
                  <dd>${results.weekly}</dd>
                </div>
                <div>
                  <dt>Daily pay</dt>
                  <dd>${results.daily}</dd>
                </div>
                <div>
                  <dt>Hours per year</dt>
                  <dd>{results.hoursPerYear}</dd>
                </div>
              </dl>

              <div className="summary-panel">
                At <strong>${Number(hourlyRate || 0).toFixed(2)}</strong> per
                hour, working <strong>{hoursPerWeek || "0"}</strong> hours per
                week for <strong>{weeksPerYear || "0"}</strong> paid weeks
                gives an estimated annual salary of{" "}
                <strong>${results.annual}</strong>.
              </div>

              <ResultActions resultName="hourly to salary result" />
            </>
          )}
        </div>
      </div>

      <section className="helper-panel">
        <h3>How we calculate this</h3>
        <p>
          We multiply hourly wage by weekly hours, then multiply that weekly pay by
          paid weeks per year. This gives a gross annual estimate before taxes or deductions.
        </p>
      </section>
    </div>
  );
}
