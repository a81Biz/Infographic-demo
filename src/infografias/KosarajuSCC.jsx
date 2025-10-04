import React, { useState, useMemo } from "react";

const parseEdges = (edgesStr) =>
  edgesStr
    .split(",")
    .map((p) => p.trim())
    .filter(Boolean)
    .map((p) => {
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
  for (const [u, v] of edges) {
    if (u >= 0 && u < n && v >= 0 && v < n) {
      adj[u].push(v);
    }
  }
  return adj;
};

const circlePositions = (n, W = 420, H = 320, R = 120) => {
  const cx = W / 2;
  const cy = H / 2;
  const twoPi = Math.PI * 2;
  const pos = {};
  for (let i = 0; i < n; i++) {
    const theta = (i / n) * twoPi - Math.PI / 2;
    pos[i] = { x: cx + R * Math.cos(theta), y: cy + R * Math.sin(theta) };
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

const NodeView = ({ idx, x, y, color }) => {
  return (
    <g>
      <circle cx={x} cy={y} r="20" fill={color} stroke="#111827" />
      <text x={x} y={y + 5} textAnchor="middle" fontWeight="bold" fontSize="14" fill="#111827">
        {idx}
      </text>
    </g>
  );
};

const KosarajuSCC = () => {
  const [n, setN] = useState(6);
  const [edgesStr, setEdgesStr] = useState("0->1,1->2,2->0,1->3,3->4,4->5,5->3");
  const [steps, setSteps] = useState([]);
  const [sccs, setSccs] = useState([]);
  const [colors, setColors] = useState({});

  const edges = useMemo(() => parseEdges(edgesStr), [edgesStr]);
  const adj = useMemo(() => buildGraph(n, edges), [n, edges]);
  const adjT = useMemo(() => {
    const trans = Array.from({ length: n }, () => []);
    for (const [u, v] of edges) {
      trans[v].push(u);
    }
    return trans;
  }, [n, edges]);
  const { pos, W, H } = useMemo(() => circlePositions(n), [n]);

  const runKosaraju = () => {
    const logs = [];
    const visited = Array(n).fill(false);
    const stack = [];

    const dfs1 = (u) => {
      visited[u] = true;
      for (const v of adj[u]) {
        if (!visited[v]) dfs1(v);
      }
      stack.push(u);
      logs.push(`DFS1: finaliza ${u}, push stack`);
    };

    for (let i = 0; i < n; i++) if (!visited[i]) dfs1(i);

    logs.push(`Stack tras DFS1: [${stack.join(", ")}]`);

    const visited2 = Array(n).fill(false);
    const comps = [];
    const colorMap = {};
    let palette = ["#fca5a5","#fdba74","#fcd34d","#a7f3d0","#93c5fd","#d8b4fe"];

    const dfs2 = (u, comp, cidx) => {
      visited2[u] = true;
      comp.push(u);
      colorMap[u] = palette[cidx % palette.length];
      for (const v of adjT[u]) {
        if (!visited2[v]) dfs2(v, comp, cidx);
      }
    };

    while (stack.length) {
      const u = stack.pop();
      if (!visited2[u]) {
        const comp = [];
        dfs2(u, comp, comps.length);
        comps.push(comp);
        logs.push(`Nueva SCC encontrada: {${comp.join(", ")}}`);
      }
    }

    setSteps(logs);
    setSccs(comps);
    setColors(colorMap);
  };

  return (
    <div className="algo-card">
      <h2>Kosaraju’s Algorithm (SCC)</h2>
      <div className="algo-input-row">
        <label>
          Nº de nodos
          <input
            className="algo-input"
            type="number"
            value={n}
            onChange={(e) => setN(parseInt(e.target.value))}
          />
        </label>
        <label>
          Aristas dirigidas
          <input className="algo-input" value={edgesStr} onChange={(e) => setEdgesStr(e.target.value)} />
        </label>
        <button className="algo-btn" onClick={runKosaraju}>Ejecutar Kosaraju</button>
      </div>

      <svg width={W} height={H} style={{ border: "1px solid #e5e7eb", borderRadius: 8 }}>
        <ArrowDef />
        {edges.map(([u, v], i) => (
          <line
            key={i}
            x1={pos[u].x}
            y1={pos[u].y}
            x2={pos[v].x}
            y2={pos[v].y}
            stroke="#374151"
            strokeWidth="2"
            markerEnd="url(#arrowhead)"
            opacity={0.8}
          />
        ))}
        {Array.from({ length: n }).map((_, i) => (
          <NodeView key={i} idx={i} x={pos[i].x} y={pos[i].y} color={colors[i] || "#e5e7eb"} />
        ))}
      </svg>

      {sccs.length > 0 && (
        <div className="algo-result">
          <strong>SCCs encontradas:</strong>{" "}
          {sccs.map((c, i) => (
            <span key={i} className="pill">{`{${c.join(", ")}}`}</span>
          ))}
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
          Kosaraju encuentra <strong>componentes fuertemente conexas</strong> en un grafo dirigido.  
          Primero realiza un DFS y guarda los nodos por orden de finalización.  
          Luego, sobre el grafo transpuesto, hace DFS en ese orden inverso, agrupando SCCs.
        </p>
        <h3>Pseudocódigo</h3>
        <pre>{`Kosaraju(G):
  stack = []
  visited = {}
  para cada nodo u en G:
    si !visited[u]: DFS1(u)

  G^T = transponer(G)
  visited = {}
  mientras stack no vacío:
    u = stack.pop()
    si !visited[u]:
      DFS2(u) → nueva SCC`}</pre>
      </div>
    </div>
  );
};

export default KosarajuSCC;
