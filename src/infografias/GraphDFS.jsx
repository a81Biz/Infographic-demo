import React, { useState } from "react";

const GraphDFS = () => {
  // Grafo fijo de ejemplo (dirigido)
  const graph = {
    0: [1, 2],
    1: [2],
    2: [0, 3],
    3: [3, 4],
    4: [],
  };

  // Posiciones para dibujar los nodos
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

  const dfs = (v, logs, seen) => {
    setCurrent(v);
    seen.add(v);
    logs.push(`Visito nodo ${v}`);
    setVisited(new Set([...seen]));

    for (const n of graph[v]) {
      if (!seen.has(n)) {
        logs.push(`Desde ${v} → DFS(${n})`);
        dfs(n, logs, seen);
      } else {
        logs.push(`Desde ${v} veo ${n} ya visitado`);
      }
    }
  };

  const handleRun = () => {
    const logs = [];
    const seen = new Set();
    dfs(0, logs, seen); // inicio fijo en 0
    setSteps(logs);
  };

  const getNodeColor = (node) => {
    if (current === node) return "dodgerblue";   // actual
    if (visited.has(node)) return "limegreen";   // visitado
    return "lightgray";                          // no visitado
  };

  return (
    <div className="algo-card">
      <h2>DFS en Grafo</h2>
      <button onClick={handleRun} className="algo-btn">Ejecutar DFS</button>

      <svg width="300" height="300" style={{ border: "1px solid #ddd", marginTop: "1rem" }}>
        {/* Aristas */}
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

        {/* Nodos */}
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

      {steps.length > 0 && (
        <div className="algo-steps">
          <h3>Pasos</h3>
          <ol>{steps.map((s, i) => <li key={i}>{s}</li>)}</ol>
        </div>
      )}

      <div className="algo-explainer">
        <h3>¿Qué estamos viendo?</h3>
        <p>
          Grafo <strong>dirigido</strong> con nodos (círculos) y aristas (flechas). Al correr <strong>DFS</strong>:
          el nodo <em>actual</em> se pinta en azul y los <em>visitados</em> en verde. DFS explora en profundidad: baja
          por un camino hasta no poder continuar y recién entonces retrocede.
        </p>
        <h3>Algoritmo (pseudocódigo)</h3>
        <pre>{`DFS(v):
  marcar v como visitado
  para cada vecino n de v:
    si n no visitado:
      DFS(n)`}</pre>
      </div>
    </div>
  );
};

export default GraphDFS;
