// src/ejercicios/MajorityElement.jsx
import React, { useState } from "react";

const MajorityElement = () => {
  const [nums, setNums] = useState("2,2,1,1,1,2,2");

  const [result, setResult] = useState(null);
  const [steps, setSteps] = useState([]);
  const [snapshots, setSnapshots] = useState([]);

  const handleSolve = () => {
    let arr = nums
      .split(",")
      .map((x) => x.trim())
      .filter((x) => x.length)
      .map(Number);

    let candidate = null;
    let count = 0;
    const stepLog = [];
    const pics = [];

    for (let i = 0; i < arr.length; i++) {
      if (count === 0) {
        candidate = arr[i];
        count = 1;
        stepLog.push(
          `count=0 → nuevo candidato = ${candidate}, count = 1`
        );
      } else if (arr[i] === candidate) {
        count++;
        stepLog.push(
          `nums[${i}] = ${arr[i]} igual a candidato → count = ${count}`
        );
      } else {
        count--;
        stepLog.push(
          `nums[${i}] = ${arr[i]} distinto a candidato → count = ${count}`
        );
      }

      pics.push({
        arr: [...arr],
        note: `i=${i}, candidato=${candidate}, count=${count}`,
        idx: i,
      });
    }

    setResult(candidate);
    setSteps(stepLog);
    setSnapshots(pics);
  };

  return (
    <div className="algo-card">
      {/* 1) Reto */}
      <h2>📝 Reto: Majority Element</h2>
      <p>
        Dado un array <b>nums</b> de tamaño <b>n</b>, encuentra el{" "}
        <b>elemento mayoritario</b>, es decir, el que aparece más de{" "}
        <code>⌊n/2⌋</code> veces. Puedes asumir que siempre existe.
      </p>

      <div className="algo-input-group">
        <label>
          nums:
          <input
            className="algo-input"
            type="text"
            value={nums}
            onChange={(e) => setNums(e.target.value)}
            placeholder="2,2,1,1,1,2,2"
          />
        </label>
      </div>

      <button className="algo-btn" onClick={handleSolve}>
        Resolver
      </button>

      {/* 2) Resultado */}
      {result !== null && (
        <div className="algo-result">
          <h3>✅ Resultado:</h3>
          <p>
            Majority Element = <b>{result}</b>
          </p>

          {/* Visualización mínima */}
          <div className="algo-steps" style={{ overflowX: "auto" }}>
            <h4>📊 Visualización</h4>
            <table className="matrix-table">
              <thead>
                <tr>
                  <th className="matrix-cell">Índice</th>
                  {nums.split(",").map((_, idx) => (
                    <th key={`h-${idx}`} className="matrix-cell">
                      {idx}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="matrix-cell">nums</td>
                  {nums
                    .split(",")
                    .map((x, idx) => (
                      <td key={`c-${idx}`} className="matrix-cell">
                        {x.trim()}
                      </td>
                    ))}
                </tr>
              </tbody>
            </table>
            <ul>
              {snapshots.map((s, idx) => (
                <li key={idx}>{s.note}</li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* 3) Respuesta en JavaScript */}
      {result !== null && (
        <div className="algo-explainer">
          <h3>💻 Respuesta en JavaScript</h3>
          <pre>{`function majorityElement(nums) {
  let candidate = null;
  let count = 0;

  for (let num of nums) {
    if (count === 0) {
      candidate = num;
      count = 1;
    } else if (num === candidate) {
      count++;
    } else {
      count--;
    }
  }
  return candidate;
}`}</pre>
        </div>
      )}

      {/* 4) Explicación */}
      {result !== null && (
        <>
          <div className="algo-explainer">
            <h3>🧭 ¿Qué debemos hacer?</h3>
            <ul style={{ margin: 0, paddingLeft: "1.2rem" }}>
              <li>
                El elemento mayoritario aparece más de <code>n/2</code> veces, lo
                que significa que “domina” sobre cualquier otro.
              </li>
              <li>
                Usamos el algoritmo de <b>Boyer–Moore Voting</b>: llevamos un{" "}
                <code>candidate</code> y un contador <code>count</code>.
              </li>
              <li>
                Si <code>count == 0</code>, elegimos el elemento actual como nuevo
                candidato.
              </li>
              <li>
                Si el siguiente número es igual al candidato, incrementamos{" "}
                <code>count</code>, de lo contrario lo decrementamos.
              </li>
              <li>
                Al final, el candidato restante será el elemento mayoritario.
              </li>
            </ul>
          </div>

          <div className="algo-explainer">
            <h3>⏱️ Complejidad & justificación</h3>
            <p>
              <b>Tiempo:</b> <code>O(n)</code>, recorremos el array una sola vez.  
              <b>Espacio:</b> <code>O(1)</code>, sólo usamos dos variables
              adicionales (<code>candidate</code> y <code>count</code>).  
              <b>Justificación:</b> El mayoritario siempre existe, y por lo tanto
              el candidato final será el correcto.
            </p>
          </div>

          <div className="algo-steps">
            <h3>🧩 Pasos del algoritmo (traza)</h3>
            <ol>
              {steps.map((s, idx) => (
                <li key={idx}>{s}</li>
              ))}
            </ol>
          </div>
        </>
      )}
    </div>
  );
};

export default MajorityElement;
