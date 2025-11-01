// src/ejercicios/OBinarySearch.jsx
import React, { useState, useEffect } from "react";

const OBinarySearch = () => {
  const [array, setArray] = useState("1,3,5,7,9,11,13,15,17");
  const [target, setTarget] = useState("7");
  const [result, setResult] = useState(null);
  const [steps, setSteps] = useState([]);
  const [animationIndex, setAnimationIndex] = useState(0);
  const [playing, setPlaying] = useState(false);

  const handleSearch = () => {
    const arr = array.split(",").map((x) => Number(x.trim())).filter((x) => !isNaN(x));
    const t = Number(target);
    const s = [];
    let low = 0, high = arr.length - 1, found = false;

    while (low <= high) {
      const mid = Math.floor((low + high) / 2);
      s.push({ low, mid, high, state: [...arr], note: `Comparando mid=${mid} (valor=${arr[mid]})` });
      if (arr[mid] === t) {
        s.push({ low, mid, high, state: [...arr], note: `✅ Encontrado en índice ${mid}` });
        found = true;
        break;
      } else if (arr[mid] < t) {
        s.push({ low, mid, high, state: [...arr], note: `🔹 Buscando derecha (valor menor)` });
        low = mid + 1;
      } else {
        s.push({ low, mid, high, state: [...arr], note: `🔹 Buscando izquierda (valor mayor)` });
        high = mid - 1;
      }
    }
    if (!found) s.push({ state: [...arr], note: "❌ Valor no encontrado" });
    setSteps(s);
    setAnimationIndex(0);
    setPlaying(true);
    setResult(found ? `✅ Encontrado` : `❌ No encontrado`);
  };

  // Animación automática
  useEffect(() => {
    if (!playing) return;
    if (animationIndex >= steps.length - 1) { setPlaying(false); return; }
    const timer = setTimeout(() => setAnimationIndex((i) => i + 1), 1500);
    return () => clearTimeout(timer);
  }, [playing, animationIndex, steps]);

  const current = steps[animationIndex] || null;

  return (
    <div className="algo-card">
      <h2>📘 Caso de Estudio: O(log N) — Búsqueda Binaria</h2>
      <p>
        En cada paso descartamos la mitad del arreglo, reduciendo drásticamente
        el número de comparaciones necesarias.
      </p>

      {/* Entradas */}
      <div className="algo-input-group">
        <label>
          Array ordenado:
          <input className="algo-input" value={array} onChange={(e) => setArray(e.target.value)} />
        </label>
      </div>
      <div className="algo-input-group">
        <label>
          Valor a buscar:
          <input className="algo-input" value={target} onChange={(e) => setTarget(e.target.value)} />
        </label>
      </div>
      <button className="algo-btn" onClick={handleSearch}>Buscar</button>

      {/* Resultado */}
      {result && (
        <div className="algo-result">
          <h3>✅ Resultado:</h3>
          <p>{result}</p>

          {/* Visualización */}
          {current && (
            <div className="algo-steps">
              <h4>📊 Visualización (Animación Paso a Paso)</h4>
              <table className="matrix-table">
                <thead>
                  <tr>
                    <th className="matrix-cell">Índice</th>
                    {current.state.map((_, i) => (
                      <th key={`i-${i}`} className="matrix-cell">{i}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="matrix-cell">Valor</td>
                    {current.state.map((x, i) => (
                      <td key={`v-${i}`} className={`matrix-cell ${
                        i === current.mid ? "bg-yellow-200 font-bold" :
                        i >= current.low && i <= current.high ? "bg-blue-50" : "opacity-40"
                      }`}>{x}</td>
                    ))}
                  </tr>
                </tbody>
              </table>
              <p style={{marginTop:"0.6rem"}}><b>Paso {animationIndex+1}:</b> {current.note}</p>
            </div>
          )}
        </div>
      )}

      {/* Código */}
      {result && (
        <div className="algo-explainer">
          <h3>💻 Implementación en JavaScript</h3>
          <pre>{`function binarySearch(arr, target) {
  let low = 0, high = arr.length - 1;
  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    if (arr[mid] === target) return true;
    else if (arr[mid] < target) low = mid + 1;
    else high = mid - 1;
  }
  return false;
}`}</pre>
        </div>
      )}

      {/* Explicación */}
      {result && (
        <>
          <div className="algo-explainer">
            <h3>🧭 Explicación</h3>
            <ul>
              <li>Comparar el valor central (<code>mid</code>).</li>
              <li>Si es menor al objetivo → descartar la mitad izquierda.</li>
              <li>Si es mayor → descartar la mitad derecha.</li>
              <li>Repetir hasta encontrar el valor o vaciar el rango.</li>
            </ul>
          </div>

          <div className="algo-explainer">
            <h3>⏱️ Complejidad y Justificación</h3>
            <p>
              Cada iteración reduce el espacio de búsqueda a la mitad.  
              Si N = 1024, solo necesitamos ≈10 comparaciones (2¹⁰).  
              <b>Tiempo:</b> O(log N) — peor caso ≈ log₂N pasos.  
              <b>Espacio:</b> O(1) (versión iterativa).
            </p>
          </div>

          <div className="algo-explainer">
            <h3>🧩 Casos Extremos</h3>
            <ul>
              <li>Arreglo vacío → retorna false.</li>
              <li>Valor menor/mayor que todos → descarta todas las mitades.</li>
            </ul>
          </div>

          <div className="algo-explainer">
            <h3>⚖️ Comparativa</h3>
            <p>
              <b>Búsqueda Lineal O(N)</b> requiere revisar cada elemento.  
              <b>Búsqueda Binaria O(log N)</b> reduce drásticamente el número de comparaciones para grandes volúmenes de datos ordenados.
            </p>
          </div>

          <div className="algo-explainer">
            <h3>📈 Conclusión</h3>
            <p>
              La búsqueda binaria es el arquetipo de algoritmo logarítmico: 
              divide y conquista, optimizando la búsqueda en datos ordenados 
              con un costo marginal por cada duplicación de tamaño de entrada.
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default OBinarySearch;
