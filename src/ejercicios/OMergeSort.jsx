import React from "react";

/**
 * Merge Sort — Árbol "Híbrido" (Dividir ↑↓ Fusionar)
 *
 * Mitad superior (azul):  División por mitades (top-down), sin considerar valores.
 * Mitad inferior (verde): Fusión ordenada (bottom-up), comparando valores.
 *
 * Esquema de colores:
 *   - Azul  (#3b82f6): división (mitad izq./der.)
 *   - Verde (#16a34a): fusión (sube hacia el resultado)
 *   - Amarillo (#f59e0b): nodos que participan en ambas fases (intermedios)
 *
 * Ejemplo fijo: [5,3,8,4,2,7,1,6]
 */

const OMergeSort = () => {
  // ------- Datos fijos del ejemplo -------
  const IN0  = [5,3,8,4,2,7,1,6];
  const L1   = [5,3,8,4];           // mitad izquierda
  const R1   = [2,7,1,6];           // mitad derecha
  const L2a  = [5,3];               // mitad de L1
  const L2b  = [8,4];               // mitad de L1
  const R2a  = [2,7];               // mitad de R1
  const R2b  = [1,6];               // mitad de R1
  const leaves = [[5],[3],[8],[4],[2],[7],[1],[6]];

  // Fases de fusión (pares -> cuartetos -> final)
  const M2a = [3,5];     // merge([5],[3])
  const M2b = [4,8];     // merge([8],[4])
  const M2c = [2,7];     // merge([2],[7])  (ya está ordenado)
  const M2d = [1,6];     // merge([1],[6])  (ya está ordenado)
  const M3a = [3,4,5,8]; // merge([3,5],[4,8])
  const M3b = [1,2,6,7]; // merge([2,7],[1,6])
  const OUT = [1,2,3,4,5,6,7,8]; // merge([3,4,5,8],[1,2,6,7])

  // ------- Pasos textuales (división y fusión) -------
  const divisionSteps = [
    `IN: [${IN0}] → mitades: [${L1}] + [${R1}]`,
    `[${L1}] → mitades: [${L2a}] + [${L2b}]`,
    `[${R1}] → mitades: [${R2a}] + [${R2b}]`,
    `[${L2a}] → [5] + [3]`,
    `[${L2b}] → [8] + [4]`,
    `[${R2a}] → [2] + [7]`,
    `[${R2b}] → [1] + [6]`,
  ];

  const mergeSteps = [
    `merge([5],[3]) → [${M2a}]`,
    `merge([8],[4]) → [${M2b}]`,
    `merge([2],[7]) → [${M2c}]`,
    `merge([1],[6]) → [${M2d}]`,
    `merge([${M2a}],[${M2b}]) → [${M3a}]`,
    `merge([${M2c}],[${M2d}]) → [${M3b}]`,
    `merge([${M3a}],[${M3b}]) → [${OUT}]`,
  ];

  // ------- SVG helpers -------
  // Coordenadas pensadas para 1000x740 aprox.
  const N = {
    // División (top half)
    root:    { x: 500, y: 70,  label: `IN: [${IN0}]`, color: "#3b82f6" },
    L1:      { x: 300, y: 150, label: `IN: [${L1}]`,  color: "#3b82f6" },
    R1:      { x: 700, y: 150, label: `IN: [${R1}]`,  color: "#3b82f6" },
    L2a:     { x: 200, y: 230, label: `IN: [${L2a}]`, color: "#3b82f6" },
    L2b:     { x: 400, y: 230, label: `IN: [${L2b}]`, color: "#3b82f6" },
    R2a:     { x: 600, y: 230, label: `IN: [${R2a}]`, color: "#3b82f6" },
    R2b:     { x: 800, y: 230, label: `IN: [${R2b}]`, color: "#3b82f6" },
    leaf1:   { x: 120, y: 310, label: `[5]`, color: "#f59e0b" },
    leaf2:   { x: 240, y: 310, label: `[3]`, color: "#f59e0b" },
    leaf3:   { x: 360, y: 310, label: `[8]`, color: "#f59e0b" },
    leaf4:   { x: 480, y: 310, label: `[4]`, color: "#f59e0b" },
    leaf5:   { x: 600, y: 310, label: `[2]`, color: "#f59e0b" },
    leaf6:   { x: 720, y: 310, label: `[7]`, color: "#f59e0b" },
    leaf7:   { x: 840, y: 310, label: `[1]`, color: "#f59e0b" },
    leaf8:   { x: 960, y: 310, label: `[6]`, color: "#f59e0b" },

    // Fusión (bottom half)
    M2a:     { x: 180, y: 470, label: `[${M2a}]`, color: "#16a34a" },
    M2b:     { x: 420, y: 470, label: `[${M2b}]`, color: "#16a34a" },
    M2c:     { x: 620, y: 470, label: `[${M2c}]`, color: "#16a34a" },
    M2d:     { x: 820, y: 470, label: `[${M2d}]`, color: "#16a34a" },
    M3a:     { x: 300, y: 550, label: `[${M3a}]`, color: "#16a34a" },
    M3b:     { x: 700, y: 550, label: `[${M3b}]`, color: "#16a34a" },
    OUT:     { x: 500, y: 630, label: `[${OUT}]`,   color: "#16a34a" },
  };

  const Link = ({ from, to, color, label }) => (
    <>
      <line x1={from.x} y1={from.y + 24} x2={to.x} y2={to.y - 24}
            stroke={color} strokeWidth="2" markerEnd="url(#arrow)" />
      {label && (
        <text x={(from.x + to.x)/2} y={(from.y + to.y)/2 - 6}
              textAnchor="middle" fontSize="11" fill={color}>{label}</text>
      )}
    </>
  );

  const Node = ({ node }) => (
    <g>
      <rect x={node.x - 80} y={node.y - 22} width="160" height="44" rx="10"
            fill="#fff" stroke={node.color} strokeWidth="2" />
      <text x={node.x} y={node.y + 4} textAnchor="middle"
            fontSize="12" fontWeight="600" fill="#111">
        {node.label}
      </text>
    </g>
  );

  return (
    <div className="algo-card">
      <h2>📘 Caso de Estudio — Merge Sort (O(N log N), profundidad O(log N))</h2>
      <p>
        <b>¿Qué es?</b> Un algoritmo de ordenamiento por <i>divide &amp; conquer</i> que
        <b> divide el arreglo en mitades</b> (sin mirar valores) y luego <b>fusiona</b> las mitades
        ya ordenadas. La altura del árbol de división es ≈ <code>log₂N</code>, y en cada nivel la fusión
        recorre <code>N</code> elementos → <b>O(N log N)</b> en tiempo total.
      </p>

      {/* Leyenda */}
      <div className="algo-explainer" style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
          <span style={{ width: 14, height: 14, background: "#3b82f6", borderRadius: 3 }}></span> División (azul)
        </span>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
          <span style={{ width: 14, height: 14, background: "#16a34a", borderRadius: 3 }}></span> Fusión (verde)
        </span>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
          <span style={{ width: 14, height: 14, background: "#f59e0b", borderRadius: 3 }}></span> Hojas / base (1 elem.)
        </span>
      </div>

      {/* SVG Árbol Híbrido */}
      <div className="algo-steps" style={{ overflowX: "auto" }}>
        <h3>🌳 Árbol de División (arriba) y Fusión (abajo)</h3>
        <svg width="1080" height="710" style={{ background: "#fafafa", border: "1px solid #e5e7eb" }}>
          <defs>
            <marker id="arrow" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="#4b5563" />
            </marker>
          </defs>

          {/* División — enlaces azules (top-down) */}
          <Link from={N.root} to={N.L1} color="#3b82f6" label="mitad izq." />
          <Link from={N.root} to={N.R1} color="#3b82f6" label="mitad der." />
          <Link from={N.L1} to={N.L2a} color="#3b82f6" label="mitad izq." />
          <Link from={N.L1} to={N.L2b} color="#3b82f6" label="mitad der." />
          <Link from={N.R1} to={N.R2a} color="#3b82f6" label="mitad izq." />
          <Link from={N.R1} to={N.R2b} color="#3b82f6" label="mitad der." />
          {/* a hojas */}
          <Link from={N.L2a} to={N.leaf1} color="#3b82f6" />
          <Link from={N.L2a} to={N.leaf2} color="#3b82f6" />
          <Link from={N.L2b} to={N.leaf3} color="#3b82f6" />
          <Link from={N.L2b} to={N.leaf4} color="#3b82f6" />
          <Link from={N.R2a} to={N.leaf5} color="#3b82f6" />
          <Link from={N.R2a} to={N.leaf6} color="#3b82f6" />
          <Link from={N.R2b} to={N.leaf7} color="#3b82f6" />
          <Link from={N.R2b} to={N.leaf8} color="#3b82f6" />

          {/* Fusión — enlaces verdes (bottom-up) */}
          {/* hojas -> pares fusionados */}
          <Link from={N.leaf1} to={N.M2a} color="#16a34a" label="merge ↑" />
          <Link from={N.leaf2} to={N.M2a} color="#16a34a" />
          <Link from={N.leaf3} to={N.M2b} color="#16a34a" label="merge ↑" />
          <Link from={N.leaf4} to={N.M2b} color="#16a34a" />
          <Link from={N.leaf5} to={N.M2c} color="#16a34a" label="merge ↑" />
          <Link from={N.leaf6} to={N.M2c} color="#16a34a" />
          <Link from={N.leaf7} to={N.M2d} color="#16a34a" label="merge ↑" />
          <Link from={N.leaf8} to={N.M2d} color="#16a34a" />

          {/* pares -> cuartetos */}
          <Link from={N.M2a} to={N.M3a} color="#16a34a" />
          <Link from={N.M2b} to={N.M3a} color="#16a34a" />
          <Link from={N.M2c} to={N.M3b} color="#16a34a" />
          <Link from={N.M2d} to={N.M3b} color="#16a34a" />

          {/* cuartetos -> final */}
          <Link from={N.M3a} to={N.OUT} color="#16a34a" />
          <Link from={N.M3b} to={N.OUT} color="#16a34a" />

          {/* Nodos — División */}
          <Node node={N.root} />
          <Node node={N.L1} />
          <Node node={N.R1} />
          <Node node={N.L2a} />
          <Node node={N.L2b} />
          <Node node={N.R2a} />
          <Node node={N.R2b} />

          {/* Nodos — Hojas (base, amarillos) */}
          <Node node={N.leaf1} />
          <Node node={N.leaf2} />
          <Node node={N.leaf3} />
          <Node node={N.leaf4} />
          <Node node={N.leaf5} />
          <Node node={N.leaf6} />
          <Node node={N.leaf7} />
          <Node node={N.leaf8} />

          {/* Nodos — Fusión */}
          <Node node={N.M2a} />
          <Node node={N.M2b} />
          <Node node={N.M2c} />
          <Node node={N.M2d} />
          <Node node={N.M3a} />
          <Node node={N.M3b} />
          <Node node={N.OUT} />
        </svg>
      </div>

      {/* Texto: ¿Qué hace? ¿Cómo funciona? */}
      <div className="algo-explainer">
        <h3>¿Qué hace y cómo funciona?</h3>
        <ol style={{ margin: 0, paddingLeft: "1.2rem" }}>
          <li><b>Dividir (arriba, azul):</b> toma el arreglo y lo parte exactamente por la mitad, sin mirar los valores. Repite este proceso en cada mitad hasta tener subarreglos de un solo elemento (hojas amarillas).</li>
          <li><b>Conquistar/Fusionar (abajo, verde):</b> combina pares de subarreglos ordenados comparando sus elementos (como un zip ordenado). Los pares generan cuartetos, y así sucesivamente, hasta reconstruir el arreglo completo y ordenado.</li>
          <li><b>Por qué O(N log N):</b> la altura del árbol de división es <code>log₂N</code> y en cada nivel, la fusión recorre en total <code>N</code> elementos → <code>N × log₂N</code>.</li>
        </ol>
      </div>

      {/* Pasos concretos (todos, sin animación) */}
      <div className="algo-steps">
        <h3>🧭 Pasos de la división</h3>
        <ol>{divisionSteps.map((s, i) => <li key={i}>{s}</li>)}</ol>

        <h3 style={{ marginTop: "1rem" }}>🧭 Pasos de la fusión</h3>
        <ol>{mergeSteps.map((s, i) => <li key={i}>{s}</li>)}</ol>
      </div>

      {/* Pseudocódigo y Complejidad */}
      <div className="algo-explainer">
        <h3>💻 Pseudocódigo</h3>
        <pre>{`mergeSort(A):
  si |A| <= 1: regresa A
  mid = |A| / 2
  left  = mergeSort(A[0..mid-1])
  right = mergeSort(A[mid..end])
  return merge(left, right)

merge(left, right):
  res = []
  i = j = 0
  mientras i < |left| y j < |right|:
    res.push(left[i] < right[j] ? left[i++] : right[j++])
  agregar left[i..] y right[j..] a res
  regresar res`}</pre>

        <h3>⏱️ Complejidad</h3>
        <p>
          <b>Tiempo:</b> <code>O(N log N)</code> (mejor/promedio/peor caso).<br/>
          <b>Espacio:</b> <code>O(N)</code> (memoria auxiliar de fusión).<br/>
          <b>Altura del árbol:</b> <code>log₂N</code>.
        </p>
      </div>

      {/* Resultado final (resumen visual) */}
      <div className="algo-result">
        <h3>✅ Resultado final</h3>
        <div className="dp-array">
          {OUT.map((v, i) => (
            <span key={i} className="pill">{v}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OMergeSort;
