import React, { useState } from "react";

const JumpGameII = () => {
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

    let jumps = 0;
    let currentEnd = 0;
    let farthest = 0;
    const stepLog = [];
    const pics = [];

    for (let i = 0; i < arr.length - 1; i++) {
      farthest = Math.max(farthest, i + arr[i]);
      stepLog.push(
        `En índice ${i}, valor=${arr[i]}, farthest actualizado a ${farthest}`
      );
      pics.push({
        arr: [...arr],
        note: `i=${i}, farthest=${farthest}, currentEnd=${currentEnd}, jumps=${jumps}`,
      });

      if (i === currentEnd) {
        jumps++;
        currentEnd = farthest;
        stepLog.push(`Alcanzamos el límite actual → salto #${jumps}, nuevo currentEnd=${currentEnd}`);
      }
    }

    setResult(jumps);
    setSteps(stepLog);
    setSnapshots(pics);
  };

  return (
    <div className="algo-card">
      {/* 1) Reto */}
      <h2>📝 Reto: Jump Game II</h2>
      <p>
        Dado un array <b>nums</b>, donde cada elemento indica la longitud máxima
        de salto desde esa posición, devuelve el <b>mínimo número de saltos</b>{" "}
        para llegar al último índice. Se garantiza que es alcanzable.
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
          <p>Mínimo número de saltos = <b>{result}</b></p>

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
          <pre>{`function jump(nums) {
  let jumps = 0;
  let currentEnd = 0;
  let farthest = 0;

  for (let i = 0; i < nums.length - 1; i++) {
    farthest = Math.max(farthest, i + nums[i]);
    if (i === currentEnd) {
      jumps++;
      currentEnd = farthest;
    }
  }
  return jumps;
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
                Mantenemos el alcance máximo (`farthest`) mientras recorremos el array.
              </li>
              <li>
                Cada vez que alcanzamos el final del rango actual (`currentEnd`), incrementamos
                el número de saltos y expandimos el rango al nuevo `farthest`.
              </li>
              <li>
                Al final, el número de veces que ampliamos el rango es el mínimo de saltos necesarios.
              </li>
            </ul>
          </div>

          <div className="algo-explainer">
            <h3>⏱️ Complejidad & justificación</h3>
            <p>
              <b>Tiempo:</b> <code>O(n)</code>, recorremos el array una sola vez.  
              <b>Espacio:</b> <code>O(1)</code>, solo usamos variables auxiliares.  
              <b>Justificación:</b> Estrategia greedy que elige siempre el rango más lejano disponible
              al momento de dar un salto.
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

export default JumpGameII;
