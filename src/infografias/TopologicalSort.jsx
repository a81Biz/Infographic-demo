import React, { useMemo, useState } from "react";

/**
 * Topological Sort (Kahn's Algorithm) con visualización:
 * - Cola de nodos con in-degree 0
 * - Extracción en orden
 * - Decremento de in-degree en vecinos
 * - Detección de ciclo si no se visitan todos
 */

const parseEdges = (edgesStr) =>
  edgesStr
    .split(",")
    .map((p) => p.trim())
    .filter(Boolean)
    .map((p) => {
      // formatos soportados: "u->v" o "u v"
      if (p.includes("->")) {
        const [u, v] = p.split("->").map((x) => parseInt(x.trim(), 10));
        return [u, v];
      }
      const [u, v] = p.split(/\s+/).map((x) => parseInt(x.trim(), 10));
      return [u, v];
    })
    .filter(
      (pair) =>
        Array.isArray(pair) &&
        pair.length === 2 &&
        !Number.isNaN(pair[0]) &&
        !Number.isNaN(pair[1])
    );

const buildGraph = (n, edges) => {
  const adj = Array.from({ length: n }, () => []);
  const indeg = Array(n).fill(0);
  for (const [u, v] of edges) {
    if (u >= 0 && u < n && v >= 0 && v < n) {
      adj[u].push(v);
      indeg[v]++;
    }
  }
  return { adj, indeg };
};

const circlePositions = (n, W = 420, H = 320, R = 120) => {
  const cx = W / 2;
  const cy = H / 2;
  const twoPi = Math.PI * 2;
  const pos = {};
  for (let i = 0; i < n; i++) {
    const theta = (i / n) * twoPi - Math.PI / 2; // arranca arriba
    pos[i] = {
      x: cx + R * Math.cos(theta),
      y: cy + R * Math.sin(theta),
    };
  }
  return { pos, W, H };
};

const ArrowDef = () => (
  <defs>
    <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
      <polygon points="0 0, 10 3.5, 0 7" fill="#374151" />
    </marker>
  </defs>
);

const NodeView = ({ idx, x, y, color, indeg }) => {
  const fill =
    color === "current" ? "dodgerblue" : color === "done" ? "limegreen" : "#e5e7eb";
  const textColor = color === "pending" ? "#111827" : "white";
  return (
    <g>
      <circle cx={x} cy={y} r="20" fill={fill} stroke="#111827" />
      <text
        x={x}
        y={y + 5}
        fontWeight="bold"
        textAnchor="middle"
        fontSize="14"
        fill={textColor}
      >
        {idx}
      </text>
      {/* badge de indegree */}
      <g transform={`translate(${x + 16}, ${y - 20})`}>
        <rect width="26" height="18" rx="6" fill="#fff" stroke="#9ca3af" />
        <text x="13" y="13" fontSize="12" textAnchor="middle" fill="#111827">
          {indeg}
        </text>
      </g>
    </g>
  );
};

const TopologicalSort = () => {
  const [n, setN] = useState(6);
  const [edgesStr, setEdgesStr] = useState("0->1,0->2,1->3,2->3,3->4,2->5");
  const [steps, setSteps] = useState([]);
  const [order, setOrder] = useState([]);
  const [current, setCurrent] = useState(null);
  const [vis, setVis] = useState(new Set());
  const [indegSnap, setIndegSnap] = useState([]);

  const edges = useMemo(() => parseEdges(edgesStr), [edgesStr]);
  const { adj, indeg } = useMemo(() => buildGraph(n, edges), [n, edges]);
  const { pos, W, H } = useMemo(() => circlePositions(n), [n]);

  const runKahn = () => {
    const logs = [];
    const inDeg = indeg.slice();
    const q = [];
    for (let i = 0; i < n; i++) if (inDeg[i] === 0) q.push(i);
    logs.push(`Inicializar cola con in-degree 0: [${q.join(", ")}]`);
    const topo = [];
    const done = new Set();

    while (q.length) {
      const u = q.shift();
      setCurrent(u);
      logs.push(`Extraer ${u} de la cola → añadir al orden`);
      topo.push(u);
      done.add(u);
      setVis(new Set([...done]));
      setIndegSnap(inDeg.slice());

      for (const v of adj[u]) {
        inDeg[v]--;
        logs.push(`  Decrementar indegree de ${v} → ${inDeg[v]}`);
        if (inDeg[v] === 0) {
          q.push(v);
          logs.push(`  Encolar ${v} (ahora indegree 0)`);
        }
      }
      logs.push(`Cola actual: [${q.join(", ")}]`);
    }

    if (topo.length !== n) {
      logs.push(
        "⚠ Detectado ciclo: no se pudo visitar a todos los nodos. El orden topológico no existe."
      );
    } else {
      logs.push(`✅ Orden topológico: [${topo.join(", ")}]`);
    }

    setSteps(logs);
    setOrder(topo);
    setCurrent(null);
    setIndegSnap(inDeg);
    setVis(done);
  };

  const nodeColor = (i) => {
    if (current === i) return "current";
    if (vis.has(i)) return "done";
    return "pending";
  };

  return (
    <div className="algo-card">
      <h2>Topological Sort (Kahn)</h2>

      <div className="algo-input-row">
        <label>
          Nº de nodos (0..n-1)
          <input
            className="algo-input"
            type="number"
            value={n}
            min={1}
            onChange={(e) => setN(Math.max(1, parseInt(e.target.value, 10) || 1))}
          />
        </label>
        <label>
          Aristas dirigidas
          <input
            className="algo-input"
            value={edgesStr}
            onChange={(e) => setEdgesStr(e.target.value)}
            placeholder="Formato: u->v, u->v ..."
          />
        </label>
        <button className="algo-btn" onClick={runKahn}>
          Ejecutar Kahn
        </button>
      </div>

      <svg width={W} height={H} style={{ border: "1px solid #e5e7eb", borderRadius: 8 }}>
        <ArrowDef />
        {/* Aristas */}
        {edges.map(([u, v], i) => (
          <line
            key={`${u}-${v}-${i}`}
            x1={pos[u]?.x ?? 0}
            y1={pos[u]?.y ?? 0}
            x2={pos[v]?.x ?? 0}
            y2={pos[v]?.y ?? 0}
            stroke="#374151"
            strokeWidth="2"
            markerEnd="url(#arrowhead)"
            opacity={0.9}
          />
        ))}
        {/* Nodos */}
        {Array.from({ length: n }).map((_, i) => (
          <NodeView
            key={i}
            idx={i}
            x={pos[i].x}
            y={pos[i].y}
            color={nodeColor(i)}
            indeg={indegSnap.length ? indegSnap[i] : indeg[i]}
          />
        ))}
      </svg>

      {order.length > 0 && order.length === n && (
        <div className="algo-result" style={{ marginTop: 8 }}>
          <strong>Orden topológico:</strong>{" "}
          {order.map((x, i) => (
            <span key={i} className="pill">
              {x}
            </span>
          ))}
        </div>
      )}
      {order.length > 0 && order.length !== n && (
        <div className="algo-result" style={{ marginTop: 8, color: "#b91c1c" }}>
          <strong>No hay orden topológico (hay ciclo)</strong>
        </div>
      )}

      {steps.length > 0 && (
        <div className="algo-steps">
          <h3>Pasos</h3>
          <ol>
            {steps.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ol>
        </div>
      )}

      <div className="algo-explainer">
        <h3>¿Qué estamos viendo?</h3>
        <p>
          Un grafo <strong>DAG</strong> (dirigido acíclico) puede ordenarse de modo que toda arista
          vaya de un nodo anterior a uno posterior. Kahn usa los nodos con <em>in-degree = 0</em>:
          los extrae, los añade al orden y decrementa el in-degree de sus vecinos. Si al final no
          se visitan todos los nodos, existe un <strong>ciclo</strong> y el orden no existe.
        </p>
        <h3>Pseudocódigo (Kahn)</h3>
        <pre>{`inDeg[v] = número de aristas que llegan a v
Q = { v | inDeg[v] == 0 }
orden = []

mientras Q no vacía:
  u = Q.pop()
  añadir u a orden
  para cada vecino v de u:
    inDeg[v]--
    si inDeg[v] == 0: Q.push(v)

si |orden| != n: existe ciclo (no hay topological sort)
`}</pre>
      </div>
    </div>
  );
};

export default TopologicalSort;
