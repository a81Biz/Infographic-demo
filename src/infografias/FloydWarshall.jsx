import React, { useState } from "react";

const parseMatrix = (str, n) => {
  const rows = str.split(";").map(r => r.trim());
  const mat = [];
  for (let i = 0; i < n; i++) {
    const vals = rows[i].split(",").map(x => {
      const v = x.trim();
      return v === "∞" ? Infinity : parseInt(v, 10);
    });
    mat.push(vals);
  }
  return mat;
};

const FloydWarshall = () => {
  const [n, setN] = useState(4);
  const [matStr, setMatStr] = useState("0,5,∞,10;∞,0,3,∞;∞,∞,0,1;∞,∞,∞,0");
  const [steps, setSteps] = useState([]);
  const [matrix, setMatrix] = useState([]);

  const runFW = () => {
    let dist = parseMatrix(matStr, n);
    const logs = [];
    logs.push("Matriz inicial:");
    logs.push(JSON.stringify(dist));

    for (let k = 0; k < n; k++) {
      logs.push(`--- Iteración con k=${k} ---`);
      for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
          if (dist[i][k] + dist[k][j] < dist[i][j]) {
            logs.push(`Actualizar dist[${i}][${j}] = dist[${i}][${k}] + dist[${k}][${j}]`);
            dist[i][j] = dist[i][k] + dist[k][j];
          }
        }
      }
      logs.push("Matriz actualizada:");
      logs.push(JSON.stringify(dist));
    }
    setMatrix(dist);
    setSteps(logs);
  };

  return (
    <div className="algo-card">
      <h2>Floyd-Warshall</h2>
      <div className="algo-input-row">
        <label>
          Nº de nodos
          <input
            className="algo-input"
            type="number"
            value={n}
            onChange={e => setN(parseInt(e.target.value))}
          />
        </label>
        <label>
          Matriz (usar "∞" para infinito, ";" para filas)
          <input
            className="algo-input"
            value={matStr}
            onChange={e => setMatStr(e.target.value)}
          />
        </label>
        <button className="algo-btn" onClick={runFW}>Ejecutar</button>
      </div>

      {matrix.length > 0 && (
        <div className="dp-wrap">
          <h3>Matriz final de distancias</h3>
          <table className="matrix-table">
            <tbody>
              {matrix.map((row,i) => (
                <tr key={i}>
                  {row.map((val,j) => (
                    <td key={j} className="matrix-cell">
                      {val===Infinity ? "∞" : val}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {steps.length > 0 && (
        <div className="algo-steps">
          <h3>Pasos</h3>
          <ol>{steps.map((s,i)=><li key={i}>{s}</li>)}</ol>
        </div>
      )}

      <div className="algo-explainer">
        <h3>¿Qué estamos viendo?</h3>
        <p>
          Floyd-Warshall es un algoritmo de <strong>programación dinámica</strong> 
          que calcula las distancias mínimas entre todos los pares de nodos.  
          Itera usando cada nodo k como intermediario y actualiza la matriz.
        </p>
        <h3>Pseudocódigo</h3>
        <pre>{`for k=0..n-1:
  for i=0..n-1:
    for j=0..n-1:
      if dist[i][k] + dist[k][j] < dist[i][j]:
        dist[i][j] = dist[i][k] + dist[k][j]`}</pre>
      </div>
    </div>
  );
};

export default FloydWarshall;
