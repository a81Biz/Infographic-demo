// src/ejercicios/RotateArray.jsx
import React, { useState } from "react";

const RotateArray = () => {
  const [nums, setNums] = useState("1,2,3,4,5,6,7");
  const [k, setK] = useState(3);

  const [result, setResult] = useState(null);
  const [steps, setSteps] = useState([]);
  const [snapshots, setSnapshots] = useState([]);

  const reverse = (arr, start, end) => {
    while (start < end) {
      [arr[start], arr[end]] = [arr[end], arr[start]];
      start++;
      end--;
    }
  };

  const handleSolve = () => {
    let arr = nums
      .split(",")
      .map((x) => x.trim())
      .filter((x) => x.length)
      .map(Number);

    let n = arr.length;
    let kSteps = k % n;
    const stepLog = [];
    const pics = [];

    // Estado inicial
    pics.push({ arr: [...arr], note: "Estado inicial" });

    // 1. Invertir todo
    reverse(arr, 0, n - 1);
    stepLog.push(`Invertimos todo el array`);
    pics.push({ arr: [...arr], note: "Después de invertir todo" });

    // 2. Invertir primeros k
    reverse(arr, 0, kSteps - 1);
    stepLog.push(`Invertimos los primeros ${kSteps} elementos`);
    pics.push({ arr: [...arr], note: `Después de invertir [0..${kSteps - 1}]` });

    // 3. Invertir los n-k restantes
    reverse(arr, kSteps, n - 1);
    stepLog.push(`Invertimos los últimos ${n - kSteps} elementos`);
    pics.push({ arr: [...arr], note: `Después de invertir [${kSteps}..${n - 1}]` });

    setResult(arr);
    setSteps(stepLog);
    setSnapshots(pics);
  };

  return (
    <div className="algo-card">
      {/* 1) Reto */}
      <h2>📝 Reto: Rotate Array</h2>
      <p>
        Dado un array <b>nums</b>, rota sus elementos hacia la derecha{" "}
        <b>k</b> posiciones. Hazlo <b>in-place</b> con <b>O(1)</b> espacio extra.
      </p>

      <div className="algo-input-group">
        <label>
          nums:
          <input
            className="algo-input"
            type="text"
            value={nums}
            onChange={(e) => setNums(e.target.value)}
            placeholder="1,2,3,4,5,6,7"
          />
        </label>
      </div>

      <div className="algo-input-group">
        <label>
          k:
          <input
            className="algo-input"
            type="number"
            value={k}
            onChange={(e) => setK(Number(e.target.value))}
            placeholder="3"
          />
        </label>
      </div>

      <button className="algo-btn" onClick={handleSolve}>
        Resolver
      </button>

      {/* 2) Resultado */}
      {result && (
        <div className="algo-result">
          <h3>✅ Resultado:</h3>
          <pre>{JSON.stringify(result)}</pre>

          {/* Visualización mínima */}
          <div className="algo-steps" style={{ overflowX: "auto" }}>
            <h4>📊 Visualización por pasos</h4>
            <table className="matrix-table">
              <thead>
                <tr>
                  <th className="matrix-cell">Paso</th>
                  {result.map((_, idx) => (
                    <th key={`h-${idx}`} className="matrix-cell">
                      {idx}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {snapshots.map((s, rIdx) => (
                  <tr key={`r-${rIdx}`}>
                    <td className="matrix-cell">{s.note}</td>
                    {s.arr.map((val, cIdx) => (
                      <td key={`c-${rIdx}-${cIdx}`} className="matrix-cell">
                        {val}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 3) Respuesta en JavaScript */}
      {result && (
        <div className="algo-explainer">
          <h3>💻 Respuesta en JavaScript</h3>
          <pre>{`function rotate(nums, k) {
  const n = nums.length;
  k = k % n;

  function reverse(arr, start, end) {
    while (start < end) {
      [arr[start], arr[end]] = [arr[end], arr[start]];
      start++;
      end--;
    }
  }

  reverse(nums, 0, n - 1);       // Invertir todo
  reverse(nums, 0, k - 1);       // Invertir primeros k
  reverse(nums, k, n - 1);       // Invertir resto
}`}</pre>
        </div>
      )}

      {/* 4) Explicación */}
      {result && (
        <>
          <div className="algo-explainer">
            <h3>🧭 ¿Qué debemos hacer?</h3>
            <ul style={{ margin: 0, paddingLeft: "1.2rem" }}>
              <li>Rotar significa mover elementos al final al inicio.</li>
              <li>
                Para hacerlo en <b>O(1) espacio</b>, usamos el truco de
                invertir:
                <ul>
                  <li>Invertimos todo el array.</li>
                  <li>Invertimos los primeros <code>k</code>.</li>
                  <li>Invertimos los últimos <code>n-k</code>.</li>
                </ul>
              </li>
              <li>
                Esto coloca los elementos en la posición correcta en sólo{" "}
                <code>O(n)</code> operaciones.
              </li>
            </ul>
          </div>

          <div className="algo-explainer">
            <h3>⏱️ Complejidad & justificación</h3>
            <p>
              <b>Tiempo:</b> <code>O(n)</code>, ya que cada elemento se toca un
              número constante de veces.  
              <b>Espacio:</b> <code>O(1)</code>, sólo usamos punteros para
              intercambiar in-place.  
              <b>Justificación:</b> Los tres reverses garantizan la rotación sin
              arrays adicionales.
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

export default RotateArray;
