import React, { useState } from "react";

// BFS para encontrar camino aumentante
const bfs = (residual, s, t, parent, logs) => {
  const n = residual.length;
  const visited = Array(n).fill(false);
  const q = [s];
  visited[s] = true;
  parent[s] = -1;

  while (q.length) {
    const u = q.shift();
    for (let v = 0; v < n; v++) {
      if (!visited[v] && residual[u][v] > 0) {
        parent[v] = u;
        visited[v] = true;
        q.push(v);
        if (v === t) {
          logs.push(`Camino encontrado hasta ${t}`);
          return true;
        }
      }
    }
  }
  return false;
};

const parseMatrix = (str, n) => {
  const rows = str.split(";").map(r => r.trim());
  const mat = [];
  for (let i = 0; i < n; i++) {
    const vals = rows[i].split(",").map(x => parseInt(x.trim(), 10));
    mat.push(vals);
  }
  return mat;
};

const FordFulkerson = () => {
  const [n, setN] = useState(6);
  const [matStr, setMatStr] = useState("0,16,13,0,0,0;0,0,10,12,0,0;0,4,0,0,14,0;0,0,9,0,0,20;0,0,0,7,0,4;0,0,0,0,0,0");
  const [src, setSrc] = useState(0);
  const [sink, setSink] = useState(5);
  const [steps, setSteps] = useState([]);
  const [maxFlow, setMaxFlow] = useState(null);

  const runFF = () => {
    let residual = parseMatrix(matStr, n);
    let parent = Array(n).fill(-1);
    let max_flow = 0;
    const logs = [];

    while (bfs(residual, src, sink, parent, logs)) {
      // encontrar capacidad mínima del camino
      let path_flow = Infinity;
      for (let v = sink; v !== src; v = parent[v]) {
        const u = parent[v];
        path_flow = Math.min(path_flow, residual[u][v]);
      }
      logs.push(`Flujo aumentante encontrado: ${path_flow}`);

      // actualizar capacidades residuales
      for (let v = sink; v !== src; v = parent[v]) {
        const u = parent[v];
        residual[u][v] -= path_flow;
        residual[v][u] += path_flow;
      }
      max_flow += path_flow;
      logs.push(`Flujo total actualizado: ${max_flow}`);
    }

    setMaxFlow(max_flow);
    setSteps(logs);
  };

  return (
    <div className="algo-card">
      <h2>Ford-Fulkerson (Edmonds-Karp)</h2>
      <div className="algo-input-row">
        <label>
          Nº de nodos
          <input className="algo-input" type="number" value={n} onChange={e=>setN(parseInt(e.target.value))}/>
        </label>
        <label>
          Matriz de capacidades (usar ";" para filas)
          <input className="algo-input" value={matStr} onChange={e=>setMatStr(e.target.value)}/>
        </label>
        <label>
          Fuente
          <input className="algo-input" type="number" value={src} onChange={e=>setSrc(parseInt(e.target.value))}/>
        </label>
        <label>
          Sumidero
          <input className="algo-input" type="number" value={sink} onChange={e=>setSink(parseInt(e.target.value))}/>
        </label>
        <button className="algo-btn" onClick={runFF}>Ejecutar</button>
      </div>

      {maxFlow!==null && (
        <div className="algo-result">
          Flujo máximo = <strong>{maxFlow}</strong>
        </div>
      )}

      {steps.length>0 && (
        <div className="algo-steps">
          <h3>Pasos</h3>
          <ol>{steps.map((s,i)=><li key={i}>{s}</li>)}</ol>
        </div>
      )}

      <div className="algo-explainer">
        <h3>¿Qué estamos viendo?</h3>
        <p>
          Ford-Fulkerson encuentra caminos aumentantes en la red residual hasta que no quedan más.  
          Edmonds-Karp usa BFS para garantizar <strong>O(VE²)</strong>.  
          Cada vez que se encuentra un camino, se aumenta el flujo y se actualizan capacidades.
        </p>
        <h3>Pseudocódigo</h3>
        <pre>{`maxFlow=0
mientras exista camino s-t en residual:
  path_flow = min capacidad en el camino
  para cada arista (u,v) en el camino:
    residual[u][v]-=path_flow
    residual[v][u]+=path_flow
  maxFlow += path_flow`}</pre>
      </div>
    </div>
  );
};

export default FordFulkerson;
