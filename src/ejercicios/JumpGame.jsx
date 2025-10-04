// src/ejercicios/JumpGame.jsx
import React, { useState } from "react";

const JumpGame = () => {
  const [nums, setNums] = useState("2,3,1,1,4");

  const [result, setResult] = useState(null);
  const [steps, setSteps] = useState([]);
  const [snapshots, setSnapshots] = useState([]);

  const handleSolve = () => {
    let arr = nums
      .split(",")
      .map((x) => x.trim())
      .filter((x) => x.length)
      .map(Number);

    let maxReach = 0;
    const lastIndex = arr.length - 1;
    const stepLog = [];
    const pics = [];

    for (let i = 0; i < arr.length; i++) {
      if (i > maxReach) {
        stepLog.push(`Índice ${i} no alcanzable (maxReach=${maxReach}) → false`);
        setResult(false);
        setSteps(stepLog);
        return;
      }
      maxReach = Math.max(maxReach, i + arr[i]);
      stepLog.push(
        `En índice ${i}, valor=${arr[i]}, actualizamos maxReach=${maxReach}`
      );
      pics.push({
        arr: [...arr],
        note: `i=${i}, maxReach=${maxReach}`,
        idx: i,
      });
      if (maxReach >= lastIndex) {
        stepLog.push(`Se puede alcanzar el último índice (maxReach=${maxReach}) → true`);
        setResult(true);
        setSteps(stepLog);
        setSnapshots(pics);
        return;
      }
    }

    setResult(false);
    setSteps(stepLog);
    setSnapshots(pics);
  };

  return (
    <div className="algo-card">
      {/* 1) Reto */}
      <h2>📝 Reto: Jump Game</h2>
      <p>
        Dado un array <b>nums</b>, donde cada elemento indica la longitud máxima
        de salto desde esa posición, determina si puedes llegar al último índice.
      </p>

      <div className="algo-input-group">
        <label>
          nums:
          <input
            className="algo-input"
            type="text"
            value={nums}
            onChange={(e) => setNums(e.target.value)}
            placeholder="2,3,1,1,4"
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
          <p>{result ? "true (puedes llegar)" : "false (no puedes llegar)"}</p>

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
                  <td className="matrix-cell">Valor</td>
                  {nums.split(",").map((x, idx) => (
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
          <pre>{`function canJump(nums) {
  let maxReach = 0;
  for (let i = 0; i < nums.length; i++) {
    if (i > maxReach) return false;
    maxReach = Math.max(maxReach, i + nums[i]);
    if (maxReach >= nums.length - 1) return true;
  }
  return true;
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
                Recorremos el array y mantenemos <code>maxReach</code>, la
                posición más lejana alcanzable hasta el momento.
              </li>
              <li>
                Si en algún índice <code>i</code> no se puede alcanzar (
                <code>i &gt; maxReach</code>), entonces devolvemos{" "}
                <code>false</code>.
              </li>
              <li>
                Si en algún momento <code>maxReach</code> alcanza o supera el
                último índice, devolvemos <code>true</code>.
              </li>
            </ul>
          </div>

          <div className="algo-explainer">
            <h3>⏱️ Complejidad & justificación</h3>
            <p>
              <b>Tiempo:</b> <code>O(n)</code>, recorremos el array una sola vez.  
              <b>Espacio:</b> <code>O(1)</code>, sólo usamos una variable extra.  
              <b>Justificación:</b> Estrategia greedy que asegura la mejor opción
              en cada paso (mantener el salto más largo posible).
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

export default JumpGame;
