import React, { useState } from "react";

const GraphDijkstra = () => {
  // Grafo ponderado dirigido
  const graph = {
    A: { B: 4, C: 2 },
    B: { C: 5, D: 10 },
    C: { D: 3 },
    D: {},
  };

  const positions = {
    A: { x: 50, y: 100 },
    B: { x: 150, y: 50 },
    C: { x: 150, y: 150 },
    D: { x: 250, y: 100 },
  };

  const [steps, setSteps] = useState([]);
  const [distances, setDistances] = useState({});
  const [current, setCurrent] = useState(null);

  // Implementación simple: selecciona el mínimo con un barrido (sin heap)
  const dijkstra = (src) => {
    const dist = { A: Infinity, B: Infinity, C: Infinity, D: Infinity };
    dist[src] = 0;
    const visited = new Set();
    const logs = [];

    while (visited.size < Object.keys(graph).length) {
      let u = null, best = Infinity;
      for (const node in dist) {
        if (!visited.has(node) && dist[node] < best) {
          best = dist[node];
          u = node;
        }
      }
      if (u === null) break;
      setCurrent(u);
      logs.push(`Seleccionar ${u} con distancia ${dist[u]}`);
      visited.add(u);

      for (const v in graph[u]) {
        const w = graph[u][v];
        if (dist[u] + w < dist[v]) {
          dist[v] = dist[u] + w;
          logs.push(`  Relajar ${u}→${v} (w=${w}) → dist[${v}] = ${dist[v]}`);
        }
      }
    }

    setDistances(dist);
    return logs;
  };

  const handleRun = () => {
    setDistances({});
    setCurrent(null);
    const logs = dijkstra("A");
    setSteps(logs);
  };

  return (
    <div className="algo-card">
      <h2>Dijkstra (Camino más corto)</h2>
      <button onClick={handleRun} className="algo-btn">Ejecutar</button>

      <svg width="320" height="200" style={{ border: "1px solid #ddd", marginTop: "1rem" }}>
        {/* Aristas con pesos */}
        {Object.entries(graph).map(([u, neighbors]) =>
          Object.entries(neighbors).map(([v, w], i) => (
            <g key={`${u}-${v}-${i}`}>
              <line
                x1={positions[u].x}
                y1={positions[u].y}
                x2={positions[v].x}
                y2={positions[v].y}
                stroke="#555"
                strokeWidth="2"
                markerEnd="url(#arrowhead)"
              />
              <text
                x={(positions[u].x + positions[v].x) / 2}
                y={(positions[u].y + positions[v].y) / 2 - 5}
                fontSize="12"
              >
                {w}
              </text>
            </g>
          ))
        )}
        <defs>
          <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="#555" />
          </marker>
        </defs>

        {/* Nodos con distancias */}
        {Object.keys(positions).map((node) => (
          <g key={node}>
            <circle
              cx={positions[node].x}
              cy={positions[node].y}
              r="20"
              fill={current === node ? "dodgerblue" : "lightgray"}
              stroke="black"
            />
            <text x={positions[node].x} y={positions[node].y + 5} textAnchor="middle" fontWeight="bold" fill="white">
              {node}
            </text>
            {distances[node] !== undefined && (
              <text x={positions[node].x} y={positions[node].y + 35} textAnchor="middle" fontSize="12" fill="black">
                dist={distances[node] === Infinity ? "∞" : distances[node]}
              </text>
            )}
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
          Grafo <strong>ponderado</strong> (números en aristas). Dijkstra mantiene una distancia
          mínima provisional a cada nodo; en cada iteración “fija” el nodo con menor distancia y
          <em> relaja</em> sus vecinos (actualiza si encuentra un camino más corto).
        </p>
        <h3>Algoritmo (pseudocódigo con cola de prioridad)</h3>
        <pre>{`Dijkstra(G, s):
  para todo v: dist[v] = ∞
  dist[s] = 0
  PQ = cola de prioridad por dist
  insertar (s, 0) en PQ
  mientras PQ no vacía:
    (u, du) = extraer_mín(PQ)
    para cada arista (u, v, w):
      si dist[u] + w < dist[v]:
        dist[v] = dist[u] + w
        actualizar (v, dist[v]) en PQ`}</pre>
        <p style={{marginTop: "0.5rem"}}>Nota: aquí simulamos la cola de prioridad seleccionando el mínimo por barrido para mantener el código compacto.</p>
      </div>
    </div>
  );
};

export default GraphDijkstra;
