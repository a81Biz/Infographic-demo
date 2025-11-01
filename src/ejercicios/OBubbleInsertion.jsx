import React from "react";

/**
 * Caso de Estudio: O(N²) — Bubble Sort e Insertion Sort
 *
 * Visualización estilo blog técnico + esquema SVG comparativo.
 * Ambos algoritmos son cuadráticos porque usan bucles anidados:
 *   - Bubble: compara pares adyacentes y los intercambia.
 *   - Insertion: recorre cada elemento e inserta en la posición correcta.
 */

const OBubbleInsertion = () => {
  const initialArray = [5, 3, 8, 4, 2];
  const bubbleSteps = [
    "[5,3,8,4,2] → compara 5>3 → intercambia → [3,5,8,4,2]",
    "[3,5,8,4,2] → 5>8? no, sigue → [3,5,8,4,2]",
    "[3,5,8,4,2] → 8>4 → intercambia → [3,5,4,8,2]",
    "[3,5,4,8,2] → 8>2 → intercambia → [3,5,4,2,8] (fin primera pasada)",
    "Segunda pasada: repite sobre los primeros 4 elementos...",
    "→ [3,4,5,2,8] → [3,4,2,5,8] → [3,2,4,5,8] → [2,3,4,5,8]",
  ];

  const insertionSteps = [
    "[5] | 3 8 4 2 → inserta 3 en posición 0 → [3,5] | 8 4 2",
    "[3,5] | 8 4 2 → 8>5 → queda igual → [3,5,8] | 4 2",
    "[3,5,8] | 4 2 → 4<8 → desplaza → [3,4,5,8] | 2",
    "[3,4,5,8] | 2 → 2<3 → desplaza todo → [2,3,4,5,8]",
  ];

  const final = [2, 3, 4, 5, 8];

  return (
    <div className="algo-card">
      <h2>📘 Caso de Estudio — O(N²): Bubble Sort e Insertion Sort</h2>
      <p>
        Ambos algoritmos son cuadráticos porque cada elemento se compara con
        varios otros. Su rendimiento decrece rápidamente al aumentar el tamaño
        de los datos (<code>O(N × N)</code>).
      </p>

      {/* --- Esquema comparativo general --- */}
      <div className="algo-steps" style={{ overflowX: "auto" }}>
        <h3>🧩 Esquema general de comparación O(N²)</h3>
        <svg width="960" height="300" style={{ background: "#fafafa", border: "1px solid #ddd" }}>
          {/* Grid de comparaciones */}
          {Array.from({ length: 5 }).map((_, i) =>
            Array.from({ length: 5 }).map((_, j) => (
              <rect
                key={`${i}-${j}`}
                x={120 + j * 60}
                y={60 + i * 40}
                width="58"
                height="38"
                fill={i === j ? "#fef3c7" : i < j ? "#bfdbfe" : "#fecaca"}
                stroke="#9ca3af"
              />
            ))
          )}
          {/* Etiquetas fila / columna */}
          {[0, 1, 2, 3, 4].map((i) => (
            <text key={`r${i}`} x="80" y={80 + i * 40} fontSize="12" textAnchor="end">
              i={i}
            </text>
          ))}
          {[0, 1, 2, 3, 4].map((j) => (
            <text key={`c${j}`} x={150 + j * 60} y="40" fontSize="12" textAnchor="middle">
              j={j}
            </text>
          ))}
          <text x={480} y={20} textAnchor="middle" fontWeight="600" fontSize="13">
            Comparaciones posibles entre pares (i,j)
          </text>
          <rect x="680" y="230" width="12" height="12" fill="#bfdbfe" stroke="#9ca3af" />
          <text x="700" y="240" fontSize="11"> Comparación válida (i&lt;j)</text>
          <rect x="680" y="250" width="12" height="12" fill="#fecaca" stroke="#9ca3af" />
          <text x="700" y="260" fontSize="11"> Inactiva (i&gt;j)</text>
          <rect x="680" y="270" width="12" height="12" fill="#fef3c7" stroke="#9ca3af" />
          <text x="700" y="280" fontSize="11"> Diagonal (i=j)</text>
        </svg>
      </div>

      {/* --- Bubble Sort --- */}
      <div className="algo-explainer">
        <h3>💧 Bubble Sort — “burbujeo”</h3>
        <p>
          Recorre el arreglo comparando pares <code>[i]</code> y <code>[i+1]</code>,
          intercambiando si están desordenados. En cada pasada, el elemento más
          grande “burbujea” hacia el final.
        </p>
        <svg width="960" height="160" style={{ background: "#fafafa", border: "1px solid #ddd" }}>
          {/* Línea base */}
          <line x1="100" y1="80" x2="860" y2="80" stroke="#9ca3af" strokeWidth="1" />
          {initialArray.map((v, i) => (
            <g key={i}>
              <circle cx={160 + i * 140} cy="80" r="24" fill="#93c5fd" stroke="#2563eb" strokeWidth="2" />
              <text x={160 + i * 140} y="84" textAnchor="middle" fontWeight="600" fontSize="14" fill="#111">{v}</text>
            </g>
          ))}
          <text x="480" y="140" textAnchor="middle" fontSize="12">
            Fase inicial — elementos desordenados
          </text>
        </svg>

        <div className="algo-steps">
          <h4>🧭 Pasos de Bubble Sort</h4>
          <ol>{bubbleSteps.map((s, i) => <li key={i}>{s}</li>)}</ol>
        </div>
      </div>

      {/* --- Insertion Sort --- */}
      <div className="algo-explainer">
        <h3>📎 Insertion Sort — “inserción”</h3>
        <p>
          Construye el arreglo ordenado un elemento a la vez, insertando cada nuevo
          valor en su posición correcta dentro de la parte ya ordenada.
        </p>

        <svg width="960" height="160" style={{ background: "#fafafa", border: "1px solid #ddd" }}>
          {/* Línea divisoria entre ordenado / no ordenado */}
          <rect x="120" y="60" width="240" height="40" fill="#dcfce7" stroke="#16a34a" />
          <rect x="360" y="60" width="440" height="40" fill="#fee2e2" stroke="#b91c1c" />
          <text x="240" y="55" textAnchor="middle" fontSize="12" fill="#15803d">Zona ordenada</text>
          <text x="580" y="55" textAnchor="middle" fontSize="12" fill="#b91c1c">Zona pendiente</text>
          {initialArray.map((v, i) => (
            <g key={i}>
              <circle cx={160 + i * 140} cy="80" r="24" fill={i < 2 ? "#86efac" : "#fca5a5"} stroke="#111" />
              <text x={160 + i * 140} y="84" textAnchor="middle" fontWeight="600" fontSize="14">{v}</text>
            </g>
          ))}
          <text x="480" y="140" textAnchor="middle" fontSize="12">
            Fase intermedia — inserción de elemento “4”
          </text>
        </svg>

        <div className="algo-steps">
          <h4>🧭 Pasos de Insertion Sort</h4>
          <ol>{insertionSteps.map((s, i) => <li key={i}>{s}</li>)}</ol>
        </div>
      </div>

      {/* --- Pseudocódigo y complejidad --- */}
      <div className="algo-explainer">
        <h3>💻 Pseudocódigo — Bubble Sort</h3>
        <pre>{`for i from 0 to N-1:
  for j from 0 to N-i-1:
    if A[j] > A[j+1]:
      swap(A[j], A[j+1])`}</pre>

        <h3>💻 Pseudocódigo — Insertion Sort</h3>
        <pre>{`for i from 1 to N-1:
  key = A[i]
  j = i - 1
  while j >= 0 and A[j] > key:
    A[j+1] = A[j]
    j -= 1
  A[j+1] = key`}</pre>

        <h3>⏱️ Complejidad</h3>
        <p>
          <b>Tiempo:</b> <code>O(N²)</code> (comparaciones anidadas).<br/>
          <b>Espacio:</b> <code>O(1)</code> (ordenamiento in-place).<br/>
          <b>Mejor caso (Insertion):</b> <code>O(N)</code> si ya está ordenado.<br/>
          <b>Peor caso (ambos):</b> <code>O(N²)</code> cuando los datos están en orden inverso.
        </p>
      </div>

      {/* --- Resultado final --- */}
      <div className="algo-result">
        <h3>✅ Resultado final (ambos algoritmos)</h3>
        <div className="dp-array">
          {final.map((v, i) => (
            <span key={i} className="pill">{v}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OBubbleInsertion;
