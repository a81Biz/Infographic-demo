import React, { useState, useMemo } from "react";

const parseEdges = (edgesStr) =>
  edgesStr
    .split(",")
    .map((p) => p.trim())
    .filter(Boolean)
    .map((p) => {
      const parts = p.split(/->|:/);
      if (parts.length === 3) {
        const [u, v, w] = parts.map((x) => parseInt(x.trim(), 10));
        return [u, v, w];
      }
      return null;
    })
    .filter(Boolean);

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

const NodeView = ({ idx, x, y }) => {
  return (
    <g>
      <circle cx={x} cy={y} r="20" fill="#f3f4f6" stroke="#111827" />
      <text x={x} y={y + 5} textAnchor="middle" fontWeight="bold" fontSize="14" fill="#111827">
        {idx}
      </text>
    </g>
  );
};

const PrimMST = () => {
  const [n, setN] = useState(5);
  const [edgesStr, setEdgesStr] = useState("0->1:2,0->3:6,1->2:3,1->3:8,1->4:5,2->4:7,3->4:9");
  const [steps, setSteps] = useState([]);
  const [mstEdges, setMstEdges] = useState([]);

  const edges = useMemo(() => parseEdges(edgesStr), [edgesStr]);
  const { pos, W, H } = useMemo(() => circlePositions(n), [n]);

  const runPrim = () => {
    const adj = Array.from({ length: n }, () => []);
    for (const [u, v, w] of edges) {
      adj[u].push([v, w]);
      adj[v].push([u, w]); // no dirigido
    }

    const logs = [];
    const visited = Array(n).fill(false);
    const mst = [];
    const key = Array(n).fill(Infinity);
    const parent = Array(n).fill(-1);

    key[0] = 0;

    for (let count = 0; count < n - 1; count++) {
      let u = -1;
      let min = Infinity;
      for (let v = 0; v < n; v++) {
        if (!visited[v] && key[v] < min) {
          min = key[v];
          u = v;
        }
      }
      visited[u] = true;
      logs.push(`Seleccionar nodo ${u} con clave mínima ${min}`);

      for (const [v, w] of adj[u]) {
        if (!visited[v] && w < key[v]) {
          key[v] = w;
          parent[v] = u;
          logs.push(`  Actualizar clave de ${v}: padre=${u}, peso=${w}`);
        }
      }
    }

    for (let i = 1; i < n; i++) {
      if (parent[i] !== -1) {
        mst.push([parent[i], i, key[i]]);
        logs.push(`Arista en MST: ${parent[i]}-${i} (${key[i]})`);
      }
    }

    setMstEdges(mst);
    setSteps(logs);
  };

  const isInMST = (u, v) =>
    mstEdges.some(([a, b]) => (a === u && b === v) || (a === v && b === u));

  return (
    <div className="algo-card">
      <h2>Prim’s MST</h2>
      <div className="algo-input-row">
        <label>
          Nº de nodos
          <input className="algo-input" type="number" value={n} onChange={e => setN(parseInt(e.target.value))} />
        </label>
        <label>
          Aristas (u-$gt;v:w)
          <input className="algo-input" value={edgesStr} onChange={e => setEdgesStr(e.target.value)} />
        </label>
        <button className="algo-btn" onClick={runPrim}>Ejecutar</button>
      </div>

      <svg width={W} height={H} style={{ border: "1px solid #e5e7eb", borderRadius: 8 }}>
        <ArrowDef />
        {edges.map(([u, v, w], i) => (
          <g key={i}>
            <line
              x1={pos[u].x}
              y1={pos[u].y}
              x2={pos[v].x}
              y2={pos[v].y}
              stroke={isInMST(u, v) ? "green" : "#374151"}
              strokeWidth={isInMST(u, v) ? "3" : "2"}
              opacity={0.9}
            />
            <text
              x={(pos[u].x + pos[v].x) / 2}
              y={(pos[u].y + pos[v].y) / 2 - 5}
              fontSize="11"
              fill="#111827"
              textAnchor="middle"
            >
              {w}
            </text>
          </g>
        ))}
        {Array.from({ length: n }).map((_, i) => (
          <NodeView key={i} idx={i} x={pos[i].x} y={pos[i].y} />
        ))}
      </svg>

      {mstEdges.length > 0 && (
        <div className="algo-result">
          <strong>MST:</strong>{" "}
          {mstEdges.map(([u, v, w], i) => (
            <span key={i} className="pill">{`${u}-${v} (${w})`}</span>
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
          El algoritmo de <strong>Prim</strong> construye un árbol generador mínimo expandiéndose
          desde un nodo inicial. En cada paso, selecciona la arista de menor peso que conecta
          un nodo ya incluido con uno nuevo.
        </p>
        <h3>Pseudocódigo</h3>
        <pre>{`Prim(G):
  key[v]=∞, parent[v]=-1
  key[0]=0
  repetir n-1 veces:
    u = nodo no visitado con key mínima
    marcar u como visitado
    para cada (u,v,w) en aristas:
      si !visitado[v] y w < key[v]:
        key[v]=w, parent[v]=u
  construir MST a partir de parent[]`}</pre>
      </div>
    </div>
  );
};

export default PrimMST;

