import React, { useState } from "react";

const CycleDetection = () => {
  const [caseType, setCaseType] = useState("cycle"); // "cycle" o "noCycle"
  const [steps, setSteps] = useState([]);
  const [result, setResult] = useState(null);

  const runDetection = () => {
    let list, next;
    if (caseType === "cycle") {
      // Lista con ciclo: 1 → 2 → 3 → 4 → 2
      list = [1, 2, 3, 4];
      next = { 0: 1, 1: 2, 2: 3, 3: 1 }; // 4 → 2 (índice 1)
    } else {
      // Lista sin ciclo: 1 → 2 → 3 → 4 → NULL
      list = [1, 2, 3, 4];
      next = { 0: 1, 1: 2, 2: 3, 3: null };
    }

    let slow = 0;
    let fast = 0;
    const logs = [];

    while (fast !== null && next[fast] !== null) {
      slow = next[slow];          // avanza 1
      fast = next[next[fast]];    // avanza 2
      logs.push(`Slow=${list[slow] ?? "NULL"} | Fast=${list[fast] ?? "NULL"}`);

      if (slow === fast) {
        logs.push("✅ Slow y Fast se encuentran → hay ciclo");
        setSteps(logs);
        setResult(true);
        return;
      }
    }

    logs.push("❌ Fast llegó a NULL → no hay ciclo");
    setSteps(logs);
    setResult(false);
  };

  return (
    <div className="algo-card">
      <h2>Cycle Detection (Floyd’s Algorithm)</h2>

      <div style={{ marginBottom: "1rem" }}>
        <label>
          <input
            type="radio"
            value="cycle"
            checked={caseType === "cycle"}
            onChange={() => setCaseType("cycle")}
          />
          Lista con ciclo (1 → 2 → 3 → 4 → 2)
        </label>
        <br />
        <label>
          <input
            type="radio"
            value="noCycle"
            checked={caseType === "noCycle"}
            onChange={() => setCaseType("noCycle")}
          />
          Lista sin ciclo (1 → 2 → 3 → 4 → NULL)
        </label>
      </div>

      <button onClick={runDetection} className="algo-btn">
        Detectar Ciclo
      </button>

      {result !== null && (
        <div className="algo-result">
          <strong>Resultado:</strong>{" "}
          {result ? (
            <span className="palindrome-yes">Ciclo detectado ✅</span>
          ) : (
            <span className="palindrome-no">No hay ciclo ❌</span>
          )}
        </div>
      )}

      {steps.length > 0 && (
        <div className="algo-steps">
          <h3>Pasos:</h3>
          <ol>
            {steps.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ol>
        </div>
      )}

      <div className="algo-explainer">
        <h3>Algoritmo (Floyd’s Tortoise & Hare)</h3>
        <pre>
{`slow = head
fast = head

while fast != null and fast.next != null:
    slow = slow.next
    fast = fast.next.next
    if slow == fast:
        return true   # ciclo detectado

return false   # si fast llega a null`}
        </pre>
      </div>
    </div>
  );
};

export default CycleDetection;
