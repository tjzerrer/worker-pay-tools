import { useState } from "react";
import ResultActions from "./ResultActions";
import {
  formatMoney,
  formatNumberInput,
  formatWholeNumber,
  parseNumberInput
} from "./numberFormat";

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
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  function calculate() {
    const rate = parseNumberInput(hourlyRate);
    const weeklyHours = parseNumberInput(hoursPerWeek);
    const paidWeeks = parseNumberInput(weeksPerYear);
    const workDays = parseNumberInput(daysPerWeek);
    const errors: Record<string, string> = {};

    if (rate <= 0) {
      errors.hourlyRate = "Enter an hourly wage to calculate a salary.";
    }

    if (weeklyHours <= 0) {
      errors.hoursPerWeek = "Enter hours per week greater than zero.";
    }

    if (paidWeeks <= 0) {
      errors.weeksPerYear = "Enter paid weeks per year greater than zero.";
    }

    if (workDays <= 0) {
      errors.daysPerWeek = "Enter days per week greater than zero.";
    }

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      setResults(null);
      return;
    }

    setFieldErrors({});
    const weeklyPay = rate * weeklyHours;
    const annualPay = weeklyPay * paidWeeks;
    const dailyPay = workDays > 0 ? weeklyPay / workDays : 0;

    setResults({
      annual: formatMoney(annualPay),
      monthly: formatMoney(annualPay / 12),
      weekly: formatMoney(weeklyPay),
      daily: formatMoney(dailyPay),
      hoursPerYear: formatWholeNumber(weeklyHours * paidWeeks)
    });
  }

  function reset() {
    setHourlyRate("");
    setHoursPerWeek("40");
    setWeeksPerYear("52");
    setDaysPerWeek("5");
    setResults(null);
    setFieldErrors({});
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

          {Object.keys(fieldErrors).length > 0 && (
            <div className="validation-alert">
              Add the missing information below to calculate a complete hourly-to-salary estimate.
            </div>
          )}

          <label className={`calc-field${fieldErrors.hourlyRate ? " has-error" : ""}`} htmlFor="hourlyWage">
            <span>Hourly Wage ($)</span>
            <input
              id="hourlyWage"
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

          <label className={`calc-field${fieldErrors.hoursPerWeek ? " has-error" : ""}`} htmlFor="hourlyHoursPerWeek">
            <span>Hours per Week</span>
            <input
              id="hourlyHoursPerWeek"
              type="text"
              inputMode="decimal"
              value={hoursPerWeek}
              onChange={(event) => {
                setHoursPerWeek(formatNumberInput(event.target.value));
                setFieldErrors((current) => {
                  const next = { ...current };
                  delete next.hoursPerWeek;
                  return next;
                });
              }}
            />
            {fieldErrors.hoursPerWeek && (
              <small className="error-message">{fieldErrors.hoursPerWeek}</small>
            )}
          </label>

          <label className={`calc-field${fieldErrors.weeksPerYear ? " has-error" : ""}`} htmlFor="hourlyWeeksPerYear">
            <span>Paid Weeks per Year</span>
            <input
              id="hourlyWeeksPerYear"
              type="text"
              inputMode="decimal"
              value={weeksPerYear}
              onChange={(event) => {
                setWeeksPerYear(formatNumberInput(event.target.value));
                setFieldErrors((current) => {
                  const next = { ...current };
                  delete next.weeksPerYear;
                  return next;
                });
              }}
            />
            {fieldErrors.weeksPerYear && (
              <small className="error-message">{fieldErrors.weeksPerYear}</small>
            )}
          </label>

          <label className={`calc-field${fieldErrors.daysPerWeek ? " has-error" : ""}`} htmlFor="hourlyDaysPerWeek">
            <span>Days per Week</span>
            <input
              id="hourlyDaysPerWeek"
              type="text"
              inputMode="decimal"
              value={daysPerWeek}
              onChange={(event) => {
                setDaysPerWeek(formatNumberInput(event.target.value));
                setFieldErrors((current) => {
                  const next = { ...current };
                  delete next.daysPerWeek;
                  return next;
                });
              }}
            />
            {fieldErrors.daysPerWeek && (
              <small className="error-message">{fieldErrors.daysPerWeek}</small>
            )}
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
                <strong>{results.annual}</strong>
              </div>

              <dl className="result-list">
                <div>
                  <dt>Monthly pay</dt>
                  <dd>{results.monthly}</dd>
                </div>
                <div>
                  <dt>Weekly pay</dt>
                  <dd>{results.weekly}</dd>
                </div>
                <div>
                  <dt>Daily pay</dt>
                  <dd>{results.daily}</dd>
                </div>
                <div>
                  <dt>Hours per year</dt>
                  <dd>{results.hoursPerYear}</dd>
                </div>
              </dl>

              <div className="summary-panel">
                At <strong>{formatMoney(parseNumberInput(hourlyRate))}</strong> per
                hour, working <strong>{hoursPerWeek || "0"}</strong> hours per
                week for <strong>{weeksPerYear || "0"}</strong> paid weeks
                gives an estimated annual salary of{" "}
                <strong>{results.annual}</strong>.
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
