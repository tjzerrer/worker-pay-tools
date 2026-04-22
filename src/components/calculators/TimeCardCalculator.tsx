import { useState } from "react";

type DayEntry = {
  start: string;
  end: string;
  breakMinutes: string;
};

export default function TimeCardCalculator() {
  const [days, setDays] = useState<DayEntry[]>([
    { start: "", end: "", breakMinutes: "0" },
    { start: "", end: "", breakMinutes: "0" },
    { start: "", end: "", breakMinutes: "0" },
    { start: "", end: "", breakMinutes: "0" },
    { start: "", end: "", breakMinutes: "0" }
  ]);

  const [hourlyRate, setHourlyRate] = useState("");
  const [totalHours, setTotalHours] = useState("");
  const [grossPay, setGrossPay] = useState("");

  function updateDay(index: number, field: keyof DayEntry, value: string) {
    const updated = [...days];
    updated[index] = { ...updated[index], [field]: value };
    setDays(updated);
  }

  function calculate() {
    let total = 0;

    for (const day of days) {
      if (!day.start || !day.end) continue;

      const startTime = new Date(`1970-01-01T${day.start}:00`);
      const endTime = new Date(`1970-01-01T${day.end}:00`);

      let diff = (endTime.getTime() - startTime.getTime()) / (1000 * 60 * 60);

      if (diff < 0) diff += 24;

      const breakHours = Number(day.breakMinutes || 0) / 60;
      const finalHours = Math.max(diff - breakHours, 0);

      total += finalHours;
    }

    setTotalHours(total.toFixed(2));
    setGrossPay((total * Number(hourlyRate || 0)).toFixed(2));
  }

  return (
    <div style={{ border: "1px solid #ccc", padding: "1rem", margin: "2rem 0" }}>
      <h2>Weekly Time Card Calculator</h2>
      <p>Enter your hours for each day to calculate total weekly hours and pay.</p>

      <div style={{ display: "grid", gap: "1rem", maxWidth: "600px" }}>
        {days.map((day, i) => (
          <div key={i} style={{ border: "1px solid #ddd", padding: "1rem" }}>
            <strong>Day {i + 1}</strong>
            <br />
            <br />

            <label>Start</label>
            <br />
            <input
              type="time"
              value={day.start}
              onChange={(e) => updateDay(i, "start", e.target.value)}
            />

            <br />
            <br />

            <label>End</label>
            <br />
            <input
              type="time"
              value={day.end}
              onChange={(e) => updateDay(i, "end", e.target.value)}
            />

            <br />
            <br />

            <label>Break (minutes)</label>
            <br />
            <input
              type="number"
              min="0"
              value={day.breakMinutes}
              onChange={(e) => updateDay(i, "breakMinutes", e.target.value)}
            />
          </div>
        ))}
      </div>

      <div style={{ marginTop: "1rem" }}>
        <label>Hourly Rate ($)</label>
        <br />
        <input
          type="number"
          min="0"
          step="0.01"
          value={hourlyRate}
          onChange={(e) => setHourlyRate(e.target.value)}
        />
      </div>

      <div style={{ marginTop: "1rem" }}>
        <button onClick={calculate}>Calculate</button>
      </div>

      {totalHours && (
        <div
          style={{
            marginTop: "2rem",
            padding: "1rem",
            background: "#f7f7f7",
            border: "1px solid #ddd"
          }}
        >
          <p><strong>Total Weekly Hours:</strong> {totalHours}</p>
          <p><strong>Estimated Gross Pay:</strong> ${grossPay}</p>
        </div>
      )}
    </div>
  );
}