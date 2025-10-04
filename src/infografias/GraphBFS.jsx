import React, { useState } from "react";

const GraphBFS = () => {
  const graph = {
    0: [1, 2],
    1: [2],
    2: [0, 3],
    3: [3, 4],
    4: [],
  };

  const positions = {
    0: { x: 100, y: 50 },
    1: { x: 50, y: 150 },
    2: { x: 150, y: 150 },
    3: { x: 100, y: 250 },
    4: { x: 200, y: 250 },
  };

  const [steps, setSteps] = useState([]);
  const [visited, setVisited] = useState(new Set());
  const [current, setCurrent] = useState(null);
  const [queue, setQueue] = useState([]);

  const bfs = (start) => {
    const logs = [];
    const seen = new Set();
    const q = [start];
    seen.add(start);
    logs.push(`Encolar ${start}`);

    while (q.length > 0) {
      const v = q.shift();
      setCurrent(v);
      logs.push(`Visitar ${v}`);
      seen.add(v);
      setVisited(new Set([...seen]));
      setQueue([...q]);

      for (const n of graph[v]) {
        if (!seen.has(n)) {
          seen.add(n);
          q.push(n);
          logs.push(`  Descubrir ${n}, encolar`);
        }
      }
    }

    return logs;
  };

  const handleRun = () => {
    setVisited(new Set());
    setCurrent(null);
    setQueue([]);
    const logs = bfs(0); // inicio fijo en 0
    setSteps(logs);
  };

  const getNodeColor = (node) => {
    if (current === node) return "dodgerblue";  // actual
    if (visited.has(node)) return "limegreen";  // ya visitado
    return "lightgray";
  };

  return (
    <div className="algo-card">
      <h2>BFS en Grafo</h2>
      <button onClick={handleRun} className="algo-btn">Ejecutar BFS</button>

      <svg width="300" height="300" style={{ border: "1px solid #ddd", marginTop: "1rem" }}>
        {Object.entries(graph).map(([u, neighbors]) =>
          neighbors.map((v, i) => (
            <line
              key={`${u}-${v}-${i}`}
              x1={positions[u].x}
              y1={positions[u].y}
              x2={positions[v].x}
              y2={positions[v].y}
              stroke="#555"
              strokeWidth="2"
              markerEnd="url(#arrowhead)"
            />
          ))
        )}
        <defs>
          <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="#555" />
          </marker>
        </defs>

        {Object.keys(positions).map((node) => (
          <g key={node}>
            <circle
              cx={positions[node].x}
              cy={positions[node].y}
              r="20"
              fill={getNodeColor(Number(node))}
              stroke="black"
            />
            <text x={positions[node].x} y={positions[node].y + 5} textAnchor="middle" fontWeight="bold" fill="white">
              {node}
            </text>
          </g>
        ))}
      </svg>

      {queue.length > 0 && (
        <div className="algo-result">
          <strong>Cola actual:</strong> [{queue.join(", ")}]
        </div>
      )}

      {steps.length > 0 && (
        <div className="algo-steps">
          <h3>Pasos</h3>
          <ol>{steps.map((s, i) => <li key={i}>{s}</li>)}</ol>
        </div>
      )}

      <div className="algo-explainer">
        <h3>¿Qué estamos viendo?</h3>
        <p>
          <strong>BFS</strong> explora por <em>niveles</em> desde el nodo inicial usando una
          <strong> cola</strong>. El nodo actual se pinta en azul; los visitados en verde.
          A diferencia de DFS, BFS garantiza la menor cantidad de aristas desde el origen en grafos no ponderados.
        </p>
        <h3>Algoritmo (pseudocódigo)</h3>
        <pre>{`BFS(s):
  crear cola Q
  marcar s como visitado; encolar s
  mientras Q no vacía:
    v = desencolar
    para cada vecino n de v:
      si n no visitado:
        marcar n; encolar n`}</pre>
      </div>
    </div>
  );
};

export default GraphBFS;
