// src/ejercicios/O1Access.jsx
import React, { useState } from "react";

const O1Access = () => {
  const [array, setArray] = useState("10,20,30,40,50");
  const [index, setIndex] = useState("2");
  const [result, setResult] = useState(null);

  const handleAccess = () => {
    const arr = array.split(",").map((x) => x.trim()).filter((x) => x.length);
    const i = parseInt(index, 10);
    if (isNaN(i) || i < 0 || i >= arr.length) {
      setResult("❌ Índice fuera de rango");
      return;
    }
    setResult(`Elemento en índice ${i}: ${arr[i]}`);
  };

  return (
    <div className="algo-card">
      <h2>📘 Caso de Estudio: O(1) — Acceso Directo y Búsqueda Hash</h2>
      <p>
        Este ejemplo demuestra por qué acceder a un elemento por su índice o
        clave es independiente del tamaño de los datos.
      </p>

      {/* Entrada */}
      <div className="algo-input-group">
        <label>
          Array:
          <input
            className="algo-input"
            value={array}
            onChange={(e) => setArray(e.target.value)}
          />
        </label>
      </div>

      <div className="algo-input-group">
        <label>
          Índice:
          <input
            className="algo-input"
            type="number"
            value={index}
            onChange={(e) => setIndex(e.target.value)}
          />
        </label>
      </div>

      <button className="algo-btn" onClick={handleAccess}>
        Acceder
      </button>

      {/* Resultado */}
      {result && (
        <div className="algo-result">
          <h3>✅ Resultado</h3>
          <p>{result}</p>

          <div className="algo-steps" style={{ overflowX: "auto" }}>
            <h4>📊 Visualización del Array</h4>
            <table className="matrix-table">
              <thead>
                <tr>
                  <th className="matrix-cell">Índice</th>
                  {array.split(",").map((_, i) => (
                    <th key={`i-${i}`} className="matrix-cell">
                      {i}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="matrix-cell">Valor</td>
                  {array.split(",").map((x, i) => (
                    <td
                      key={`v-${i}`}
                      className={`matrix-cell ${
                        parseInt(index, 10) === i
                          ? "bg-yellow-200 font-bold"
                          : ""
                      }`}
                    >
                      {x.trim()}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>

          <div className="algo-section">
            <h4>📘 Diagrama de Memoria</h4>
            <div className="dp-array">
              {array.split(",").map((x, i) => (
                <div
                  key={`mem-${i}`}
                  className={`pill ${
                    parseInt(index, 10) === i
                      ? "bg-amber-200 border border-yellow-600"
                      : ""
                  }`}
                >
                  {x.trim()}
                </div>
              ))}
            </div>
            <p style={{ marginTop: "0.5rem" }}>
              Cada celda está en una dirección fija:{" "}
              <code>base + (i × tamaño del dato)</code>
            </p>
          </div>

          <div className="algo-explainer">
            <h3>💻 Ejemplo en JavaScript</h3>
            <pre>{`const A = [10, 20, 30, 40, 50];
const i = 2;
console.log(A[i]); // 30 → O(1)

const D = { id: 7, user: "Ana" };
console.log(D["user"]); // "Ana" → O(1) promedio`}</pre>
          </div>

          <div className="algo-explainer">
            <h3>🧭 Explicación</h3>
            <p>
              Los arrays están organizados en memoria de forma contigua. La
              fórmula <b>base + (i × tamaño del dato)</b> permite acceder
              directamente al valor sin iterar.  
              En las tablas hash, una función transforma la clave en una
              posición del arreglo interno, lo que también evita recorrerlo.
            </p>
          </div>

          <div className="algo-explainer">
            <h3>⏱️ Complejidad</h3>
            <ul>
              <li>
                <b>Tiempo:</b> O(1) constante — no crece con el tamaño de los
                datos.
              </li>
              <li>
                <b>Espacio:</b> O(1) — no se usan estructuras adicionales.
              </li>
            </ul>
          </div>

          <div className="algo-explainer">
            <h3>🧩 Casos Extremos</h3>
            <ul>
              <li>Índice fuera de rango → error inmediato.</li>
              <li>
                Colisiones en hash → peor caso O(N) si muchas claves caen en el
                mismo bucket.
              </li>
            </ul>
          </div>

          <div className="algo-explainer">
            <h3>⚖️ Comparativa</h3>
            <p>
              Si buscáramos un elemento recorriendo todo el arreglo, el costo
              sería <b>O(N)</b>.  
              Gracias al acceso directo, reducimos el esfuerzo a **O(1)**.
            </p>
          </div>

          <div className="algo-explainer">
            <h3>🧩 Conclusión</h3>
            <p>
              <b>O(1)</b> no significa “instantáneo”, sino que el número de
              operaciones es constante. Es la referencia de eficiencia máxima en
              estructuras de acceso directo.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default O1Access;
