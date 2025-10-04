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

class DSU {
  constructor(n) {
    this.parent = Array(n).fill(0).map((_, i) => i);
    this.rank = Array(n).fill(0);
  }
  find(x) {
    if (this.parent[x] !== x) this.parent[x] = this.find(this.parent[x]);
    return this.parent[x];
  }
  union(x, y) {
    let rx = this.find(x), ry = this.find(y);
    if (rx === ry) return false;
    if (this.rank[rx] < this.rank[ry]) this.parent[rx] = ry;
    else if (this.rank[ry] < this.rank[rx]) this.parent[ry] = rx;
    else {
      this.parent[ry] = rx;
      this.rank[rx]++;
    }
    return true;
  }
}

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

const NodeView = ({ idx, x, y }) => (
  <g>
    <circle cx={x} cy={y} r="20" fill="#f3f4f6" stroke="#111827" />
    <text x={x} y={y + 5} textAnchor="middle" fontWeight="bold" fontSize="14" fill="#111827">
      {idx}
    </text>
  </g>
);

const KruskalMST = () => {
  const [n, setN] = useState(5);
  const [edgesStr, setEdgesStr] = useState("0->1:2,0->3:6,1->2:3,1->3:8,1->4:5,2->4:7,3->4:9");
  const [steps, setSteps] = useState([]);
  const [mstEdges, setMstEdges] = useState([]);

  const edges = useMemo(() => parseEdges(edgesStr), [edgesStr]);
  const { pos, W, H } = useMemo(() => circlePositions(n), [n]);

  const runKruskal = () => {
    const sorted = [...edges].sort((a, b) => a[2] - b[2]);
    const dsu = new DSU(n);
    const mst = [];
    const logs = [];

    for (const [u, v, w] of sorted) {
      logs.push(`Considerar arista ${u}-${v} (${w})`);
      if (dsu.union(u, v)) {
        mst.push([u, v, w]);
        logs.push(`  ✔ Aceptada en el MST`);
      } else {
        logs.push(`  ✘ Rechazada (ciclo)`);
      }
    }

    setMstEdges(mst);
    setSteps(logs);
  };

  const isInMST = (u, v) =>
    mstEdges.some(([a, b]) => (a === u && b === v) || (a === v && b === u));

  return (
    <div className="algo-card">
      <h2>Kruskal’s MST</h2>
      <div className="algo-input-row">
        <label>
          Nº de nodos
          <input className="algo-input" type="number" value={n} onChange={e => setN(parseInt(e.target.value))} />
        </label>
        <label>
          Aristas (u-&gt;v:w)
          <input className="algo-input" value={edgesStr} onChange={e => setEdgesStr(e.target.value)} />
        </label>
        <button className="algo-btn" onClick={runKruskal}>Ejecutar</button>
      </div>

      <svg width={W} height={H} style={{ border: "1px solid #e5e7eb", borderRadius: 8 }}>
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
          Kruskal ordena las aristas por peso y las va añadiendo al MST si no forman un ciclo, 
          lo cual se comprueba con <strong>Union-Find (DSU)</strong>.  
          Así se obtiene un árbol generador mínimo.
        </p>
        <h3>Pseudocódigo</h3>
        <pre>{`Kruskal(G):
  ordenar aristas por peso
  para cada arista (u,v,w):
    si find(u)!=find(v):
      union(u,v)
      añadir arista al MST`}</pre>
      </div>
    </div>
  );
};

export default KruskalMST;
