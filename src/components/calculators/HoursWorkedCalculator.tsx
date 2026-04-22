import { useState } from "react";

export default function HoursWorkedCalculator() {
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [result, setResult] = useState("");

  function calculate() {
    if (!start || !end) return;

    const startTime = new Date(`1970-01-01T${start}:00`);
    const endTime = new Date(`1970-01-01T${end}:00`);

    let diff = (endTime.getTime() - startTime.getTime()) / (1000 * 60 * 60);

    if (diff < 0) diff += 24;

    setResult(diff.toFixed(2));
  }

  return (
    <div style={{ border: "1px solid #ccc", padding: "1rem", margin: "2rem 0" }}>
      <h2>Hours Worked Calculator</h2>

      <div style={{ display: "grid", gap: "1rem", maxWidth: "500px" }}>
        <div>
          <label>Start Time</label>
          <br />
          <input type="time" value={start} onChange={(e) => setStart(e.target.value)} />
        </div>

        <div>
          <label>End Time</label>
          <br />
          <input type="time" value={end} onChange={(e) => setEnd(e.target.value)} />
        </div>

        <div>
          <button onClick={calculate}>Calculate</button>
        </div>
      </div>

      {result && (
        <div
          style={{
            marginTop: "2rem",
            padding: "1rem",
            background: "#f7f7f7",
            border: "1px solid #ddd"
          }}
        >
          <p><strong>Total Hours:</strong> {result}</p>
        </div>
      )}
    </div>
  );
}