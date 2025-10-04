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

const NodeView = ({ idx, x, y, color, label }) => {
  return (
    <g>
      <circle cx={x} cy={y} r="20" fill={color} stroke="#111827" />
      <text x={x} y={y + 5} textAnchor="middle" fontWeight="bold" fontSize="14" fill="#111827">
        {idx}
      </text>
      {label && (
        <text x={x} y={y + 32} textAnchor="middle" fontSize="11" fill="#374151">
          {label}
        </text>
      )}
    </g>
  );
};

const TarjanSCC = () => {
  const [n, setN] = useState(6);
  const [edgesStr, setEdgesStr] = useState("0->1,1->2,2->0,1->3,3->4,4->5,5->3");
  const [steps, setSteps] = useState([]);
  const [sccs, setSccs] = useState([]);
  const [colors, setColors] = useState({});
  const [labels, setLabels] = useState({});

  const edges = useMemo(() => parseEdges(edgesStr), [edgesStr]);
  const adj = useMemo(() => buildGraph(n, edges), [n, edges]);
  const { pos, W, H } = useMemo(() => circlePositions(n), [n]);

  const runTarjan = () => {
    let time = 0;
    const disc = Array(n).fill(-1);
    const low = Array(n).fill(-1);
    const stack = [];
    const onStack = Array(n).fill(false);
    const comps = [];
    const logs = [];
    const colorMap = {};
    const labelMap = {};
    const palette = ["#fca5a5","#fdba74","#fcd34d","#a7f3d0","#93c5fd","#d8b4fe"];

    const dfs = (u) => {
      disc[u] = low[u] = time++;
      stack.push(u);
      onStack[u] = true;
      logs.push(`Visitar ${u}: disc=${disc[u]}, low=${low[u]}`);

      for (const v of adj[u]) {
        if (disc[v] === -1) {
          dfs(v);
          low[u] = Math.min(low[u], low[v]);
        } else if (onStack[v]) {
          low[u] = Math.min(low[u], disc[v]);
          logs.push(`  Arista de retroceso ${u}->${v}: low[${u}]=${low[u]}`);
        }
      }

      if (low[u] === disc[u]) {
        const comp = [];
        let w;
        do {
          w = stack.pop();
          onStack[w] = false;
          comp.push(w);
          colorMap[w] = palette[comps.length % palette.length];
        } while (w !== u);
        comps.push(comp);
        logs.push(`SCC encontrada: {${comp.join(", ")}}`);
      }
    };

    for (let i = 0; i < n; i++) if (disc[i] === -1) dfs(i);

    // Labels con disc/low
    for (let i = 0; i < n; i++) {
      labelMap[i] = `d=${disc[i]},l=${low[i]}`;
    }

    setSteps(logs);
    setSccs(comps);
    setColors(colorMap);
    setLabels(labelMap);
  };

  return (
    <div className="algo-card">
      <h2>Tarjan’s Algorithm (SCC)</h2>
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
        <button className="algo-btn" onClick={runTarjan}>Ejecutar Tarjan</button>
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
          <NodeView
            key={i}
            idx={i}
            x={pos[i].x}
            y={pos[i].y}
            color={colors[i] || "#e5e7eb"}
            label={labels[i] || ""}
          />
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
          Tarjan usa DFS para asignar a cada nodo un índice <code>disc[u]</code> y un valor{" "}
          <code>low[u]</code> que representa el nodo más temprano alcanzable desde <code>u</code>.  
          Cuando <code>low[u] == disc[u]</code>, hemos encontrado una nueva SCC con los nodos de la pila hasta <code>u</code>.
        </p>
        <h3>Pseudocódigo</h3>
        <pre>{`Tarjan(G):
  disc[], low[] = -1
  stack = []
  para cada u en G:
    si disc[u]==-1: DFS(u)

DFS(u):
  disc[u]=low[u]=time++
  push u en stack
  para v en adj[u]:
    si disc[v]==-1: DFS(v); low[u]=min(low[u],low[v])
    sino si v en stack: low[u]=min(low[u],disc[v])
  si low[u]==disc[u]:
    extraer hasta u → nueva SCC`}</pre>
      </div>
    </div>
  );
};

export default TarjanSCC;
