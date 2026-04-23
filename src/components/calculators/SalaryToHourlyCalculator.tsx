import { useState } from "react";
import ResultActions from "./ResultActions";
import {
  formatMoney,
  formatNumberInput,
  formatWholeNumber,
  parseNumberInput
} from "./numberFormat";

type Results = {
  hourly: string;
  weekly: string;
  monthly: string;
  annual: string;
  hoursPerYear: string;
};

export default function SalaryToHourlyCalculator() {
  const [salary, setSalary] = useState("");
  const [hoursPerWeek, setHoursPerWeek] = useState("40");
  const [weeksPerYear, setWeeksPerYear] = useState("52");
  const [results, setResults] = useState<Results | null>(null);

  function calculate() {
    const annualSalary = parseNumberInput(salary);
    const weeklyHours = parseNumberInput(hoursPerWeek);
    const paidWeeks = parseNumberInput(weeksPerYear);
    const annualHours = weeklyHours * paidWeeks;
    const hourly = annualHours > 0 ? annualSalary / annualHours : 0;

    setResults({
      hourly: formatMoney(hourly),
      weekly: formatMoney(annualSalary / 52),
      monthly: formatMoney(annualSalary / 12),
      annual: formatMoney(annualSalary),
      hoursPerYear: formatWholeNumber(annualHours)
    });
  }

  function reset() {
    setSalary("");
    setHoursPerWeek("40");
    setWeeksPerYear("52");
    setResults(null);
  }

  return (
    <div className="calculator-block">
      <h2>Salary to Hourly Calculator</h2>
      <p>
        Convert an annual salary into an estimated hourly wage based on your work schedule.
      </p>

      <div className="calc-grid">
        <div className="calc-panel">
          <h3>Enter Salary Details</h3>

          <label className="calc-field" htmlFor="annualSalary">
            <span>Annual Salary ($)</span>
            <input
              id="annualSalary"
              type="text"
              inputMode="decimal"
              value={salary}
              onChange={(event) => setSalary(formatNumberInput(event.target.value))}
            />
          </label>

          <label className="calc-field" htmlFor="salaryHoursPerWeek">
            <span>Hours per Week</span>
            <input
              id="salaryHoursPerWeek"
              type="text"
              inputMode="decimal"
              value={hoursPerWeek}
              onChange={(event) => setHoursPerWeek(formatNumberInput(event.target.value))}
            />
          </label>

          <label className="calc-field" htmlFor="salaryWeeksPerYear">
            <span>Paid Weeks per Year</span>
            <input
              id="salaryWeeksPerYear"
              type="text"
              inputMode="decimal"
              value={weeksPerYear}
              onChange={(event) => setWeeksPerYear(formatNumberInput(event.target.value))}
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

          {!results && <p className="muted">Enter your salary details and click calculate.</p>}

          {results && (
            <>
              <div className="result-card">
                <span>Estimated Hourly Wage</span>
                <strong>{results.hourly}</strong>
              </div>

              <dl className="result-list">
                <div>
                  <dt>Weekly pay</dt>
                  <dd>{results.weekly}</dd>
                </div>
                <div>
                  <dt>Monthly pay</dt>
                  <dd>{results.monthly}</dd>
                </div>
                <div>
                  <dt>Annual pay</dt>
                  <dd>{results.annual}</dd>
                </div>
                <div>
                  <dt>Hours per year</dt>
                  <dd>{results.hoursPerYear}</dd>
                </div>
              </dl>

              <div className="summary-panel">
                An annual salary of <strong>{results.annual}</strong> works out
                to about <strong>{results.hourly}</strong> per hour when spread
                across <strong>{results.hoursPerYear}</strong> paid work hours
                per year.
              </div>

              <ResultActions resultName="salary to hourly result" />
            </>
          )}
        </div>
      </div>

      <section className="helper-panel">
        <h3>How we calculate this</h3>
        <p>
          We multiply your weekly hours by paid weeks per year, then divide annual salary
          by that total. The result is an hourly estimate for comparing salary and hourly offers.
        </p>
      </section>
    </div>
  );
}
