import React, { useState } from "react";

const BitmaskTSP = () => {
  const [matrixStr, setMatrixStr] = useState("0,10,15,20;10,0,35,25;15,35,0,30;20,25,30,0");
  const [steps, setSteps] = useState([]);
  const [result, setResult] = useState(null);

  const handleRun = () => {
    const rows = matrixStr.split(";").map(r => r.split(",").map(x => parseInt(x.trim())));
    const n = rows.length;
    const dp = Array.from({ length: 1 << n }, () => Array(n).fill(Infinity));
    dp[1][0] = 0; // Start at nodo 0
    const logs = [];

    for (let mask = 1; mask < (1 << n); mask++) {
      for (let u = 0; u < n; u++) {
        if (!(mask & (1 << u))) continue;
        for (let v = 0; v < n; v++) {
          if (mask & (1 << v)) continue;
          const next = mask | (1 << v);
          if (dp[next][v] > dp[mask][u] + rows[u][v]) {
            dp[next][v] = dp[mask][u] + rows[u][v];
            logs.push(`dp[${next}][${v}] = ${dp[next][v]} (desde ${u})`);
          }
        }
      }
    }
    const full = (1 << n) - 1;
    let ans = Infinity;
    for (let u = 0; u < n; u++) ans = Math.min(ans, dp[full][u] + rows[u][0]);
    setResult(ans);
    setSteps(logs);
  };

  return (
    <div className="algo-card">
      <h2>Bitmask DP (TSP)</h2>
      <label>Matriz de distancias
        <input className="algo-input" value={matrixStr} onChange={e=>setMatrixStr(e.target.value)} />
      </label>
      <button className="algo-btn" onClick={handleRun}>Ejecutar</button>

      {result !== null && <div className="algo-result">Costo mínimo TSP: {result}</div>}
      {steps.length > 0 && <ol>{steps.map((s,i)=><li key={i}>{s}</li>)}</ol>}

      <div className="algo-explainer">
        <h3>¿Qué estamos viendo?</h3>
        <p>
          El <strong>TSP con bitmask DP</strong> recorre todos los subconjuntos de nodos.
          <code>dp[mask][u]</code> representa el costo mínimo de visitar el subconjunto "mask" terminando en "u".
          Al final, buscamos volver al nodo inicial.
        </p>
        <h3>Pseudocódigo</h3>
        <pre>{`dp[1<<0][0] = 0
for mask in 1..(1<<n)-1:
  for u in nodos dentro de mask:
    for v fuera de mask:
      dp[mask|1<<v][v] = min(dp[mask][u] + dist[u][v])
ans = min(dp[(1<<n)-1][u] + dist[u][0])`}</pre>
      </div>
    </div>
  );
};

export default BitmaskTSP;
