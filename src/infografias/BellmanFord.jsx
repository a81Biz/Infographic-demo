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

const buildGraph = (n, edges) => {
  const adj = Array.from({ length: n }, () => []);
  for (const [u, v, w] of edges) {
    adj[u].push([v, w]);
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

const NodeView = ({ idx, x, y, dist }) => {
  return (
    <g>
      <circle cx={x} cy={y} r="20" fill="#f3f4f6" stroke="#111827" />
      <text x={x} y={y + 5} textAnchor="middle" fontWeight="bold" fontSize="14" fill="#111827">
        {idx}
      </text>
      <text x={x} y={y - 28} textAnchor="middle" fontSize="11" fill="#374151">
        {dist === Infinity ? "∞" : dist}
      </text>
    </g>
  );
};

const BellmanFord = () => {
  const [n, setN] = useState(5);
  const [edgesStr, setEdgesStr] = useState("0->1:6,0->2:7,1->2:8,1->3:5,1->4:-4,2->3:-3,2->4:9,3->1:-2,4->3:7");
  const [src, setSrc] = useState(0);
  const [steps, setSteps] = useState([]);
  const [dist, setDist] = useState([]);

  const edges = useMemo(() => parseEdges(edgesStr), [edgesStr]);
  const { pos, W, H } = useMemo(() => circlePositions(n), [n]);

  const runBellmanFord = () => {
    const logs = [];
    const d = Array(n).fill(Infinity);
    d[src] = 0;

    // relajaciones
    for (let i = 1; i < n; i++) {
      logs.push(`Iteración ${i}`);
      for (const [u, v, w] of edges) {
        if (d[u] !== Infinity && d[u] + w < d[v]) {
          d[v] = d[u] + w;
          logs.push(`  Relajar arista ${u}->${v} (${w}): d[${v}] = ${d[v]}`);
        }
      }
    }

    // detectar ciclo negativo
    let negCycle = false;
    for (const [u, v, w] of edges) {
      if (d[u] !== Infinity && d[u] + w < d[v]) {
        logs.push("⚠ Ciclo negativo detectado");
        negCycle = true;
        break;
      }
    }

    if (!negCycle) logs.push(`✅ Distancias finales: [${d.join(", ")}]`);
    setSteps(logs);
    setDist(d);
  };

  return (
    <div className="algo-card">
      <h2>Bellman-Ford</h2>
      <div className="algo-input-row">
        <label>
          Nº de nodos
          <input className="algo-input" type="number" value={n} onChange={(e) => setN(parseInt(e.target.value))} />
        </label>
        <label>
          Aristas (u-&gt;v:w)
          <input className="algo-input" value={edgesStr} onChange={(e) => setEdgesStr(e.target.value)} />
        </label>
        <label>
          Fuente
          <input className="algo-input" type="number" value={src} onChange={(e) => setSrc(parseInt(e.target.value))} />
        </label>
        <button className="algo-btn" onClick={runBellmanFord}>Ejecutar</button>
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
              stroke="#374151"
              strokeWidth="2"
              markerEnd="url(#arrowhead)"
              opacity={0.8}
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
          <NodeView key={i} idx={i} x={pos[i].x} y={pos[i].y} dist={dist[i] ?? Infinity} />
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
          Bellman-Ford calcula distancias mínimas desde una fuente permitiendo aristas con peso negativo.  
          Repite N-1 veces la <em>relajación</em> de todas las aristas.  
          Si una arista aún puede relajarse después de eso, existe un <strong>ciclo negativo</strong>.
        </p>
        <h3>Pseudocódigo</h3>
        <pre>{`BellmanFord(G, src):
  d[v]=∞ para todo v
  d[src]=0
  repetir N-1 veces:
    para cada arista (u,v,w):
      si d[u]+w < d[v]:
        d[v]=d[u]+w
  para cada arista (u,v,w):
    si d[u]+w < d[v]:
      ciclo negativo detectado`}</pre>
      </div>
    </div>
  );
};

export default BellmanFord;
