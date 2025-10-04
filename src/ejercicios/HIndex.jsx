import React, { useState } from "react";

const HIndex = () => {
  const [citations, setCitations] = useState("3,0,6,1,5");

  const [result, setResult] = useState(null);
  const [steps, setSteps] = useState([]);
  const [snapshots, setSnapshots] = useState([]);

  const handleSolve = () => {
    let arr = citations
      .split(",")
      .map((x) => x.trim())
      .filter((x) => x.length)
      .map(Number);

    arr.sort((a, b) => b - a); // descendente

    let h = 0;
    const stepLog = [];
    const pics = [];

    for (let i = 0; i < arr.length; i++) {
      if (arr[i] >= i + 1) {
        h = i + 1;
        stepLog.push(
          `citations[${i}] = ${arr[i]} ≥ ${i + 1} → posible h=${h}`
        );
      } else {
        stepLog.push(
          `citations[${i}] = ${arr[i]} < ${i + 1} → ya no aumenta h`
        );
        break;
      }
      pics.push({
        arr: [...arr],
        note: `i=${i}, valor=${arr[i]}, h=${h}`,
      });
    }

    setResult(h);
    setSteps(stepLog);
    setSnapshots(pics);
  };

  return (
    <div className="algo-card">
      {/* 1) Reto */}
      <h2>📝 Reto: H-Index</h2>
      <p>
        Dado un array <b>citations</b>, devuelve el <b>h-index</b> de un
        investigador. El h-index es el mayor número <b>h</b> tal que hay al
        menos <b>h</b> artículos con <b>≥ h</b> citas.
      </p>

      <div className="algo-input-group">
        <label>
          citations:
          <input
            className="algo-input"
            type="text"
            value={citations}
            onChange={(e) => setCitations(e.target.value)}
            placeholder="3,0,6,1,5"
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
          <p>h-index = <b>{result}</b></p>

          {/* Visualización */}
          <div className="algo-steps" style={{ overflowX: "auto" }}>
            <h4>📊 Citations ordenadas descendentemente</h4>
            <table className="matrix-table">
              <thead>
                <tr>
                  <th className="matrix-cell">Índice</th>
                  {citations
                    .split(",")
                    .map((_, idx) => (
                      <th key={`h-${idx}`} className="matrix-cell">
                        {idx}
                      </th>
                    ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="matrix-cell">Valor</td>
                  {citations
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
          <pre>{`function hIndex(citations) {
  citations.sort((a, b) => b - a);
  let h = 0;
  for (let i = 0; i < citations.length; i++) {
    if (citations[i] >= i + 1) {
      h = i + 1;
    } else {
      break;
    }
  }
  return h;
}`}</pre>
        </div>
      )}

      {/* 4) Explicación */}
      {result !== null && (
        <>
          <div className="algo-explainer">
            <h3>🧭 ¿Qué debemos hacer?</h3>
            <ul style={{ margin: 0, paddingLeft: "1.2rem" }}>
              <li>Ordenar el array de citas en orden descendente.</li>
              <li>
                Revisar cuántos artículos cumplen con tener al menos tantas citas
                como su posición (1-indexada).
              </li>
              <li>
                El valor máximo de esa condición es el h-index.
              </li>
            </ul>
          </div>

          <div className="algo-explainer">
            <h3>⏱️ Complejidad & justificación</h3>
            <p>
              <b>Tiempo:</b> <code>O(n log n)</code> por la ordenación.  
              <b>Espacio:</b> <code>O(1)</code> si ignoramos el coste del sort
              in-place.  
              <b>Justificación:</b> Tras ordenar, basta recorrer una sola vez el
              array para determinar el h-index.
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

export default HIndex;
