import React, { useState } from "react";

const GraphAStar = () => {
  const N = 5;                 // tablero 5x5
  const start = [0, 0];        // inicio
  const goal = [4, 4];         // meta
  const [steps, setSteps] = useState([]);
  const [visited, setVisited] = useState(new Set());
  const [current, setCurrent] = useState(null);

  const heuristic = (a, b) => Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]); // Manhattan

  const aStar = () => {
    const logs = [];
    const open = [{ pos: start, g: 0, h: heuristic(start, goal), parent: null }];
    const closed = new Set();

    while (open.length > 0) {
      open.sort((a, b) => a.g + a.h - (b.g + b.h));
      const node = open.shift();
      const [x, y] = node.pos;
      setCurrent(`${x},${y}`);
      logs.push(`Expandir (${x},${y}), f=${node.g + node.h}`);
      if (x === goal[0] && y === goal[1]) {
        logs.push("🏁 Meta alcanzada");
        break;
      }
      closed.add(`${x},${y}`);
      setVisited(new Set([...closed]));

      for (const [dx, dy] of [[1,0],[-1,0],[0,1],[0,-1]]) {
        const nx = x + dx, ny = y + dy;
        const key = `${nx},${ny}`;
        if (nx < 0 || ny < 0 || nx >= N || ny >= N) continue;
        if (closed.has(key)) continue;
        const g = node.g + 1;
        const h = heuristic([nx, ny], goal);
        open.push({ pos: [nx, ny], g, h, parent: node });
        logs.push(`  Considerar (${nx},${ny}) g=${g}, h=${h}, f=${g+h}`);
      }
    }
    setSteps(logs);
  };

  const handleRun = () => {
    setVisited(new Set());
    setCurrent(null);
    aStar();
  };

  const renderCell = (x, y) => {
    const key = `${x},${y}`;
    if (current === key) return "🟦";             // actual
    if (visited.has(key)) return "🟩";            // cerrado/visitado
    if (x === goal[0] && y === goal[1]) return "🏁";
    if (x === start[0] && y === start[1]) return "🚩";
    return "⬜";
  };

  return (
    <div className="algo-card">
      <h2>A* Search</h2>
      <button onClick={handleRun} className="algo-btn">Ejecutar</button>

      <pre style={{fontSize:"24px", lineHeight:"28px", marginTop:"1rem"}}>
        {Array.from({ length: N }).map((_, i) =>
          Array.from({ length: N }).map((_, j) => renderCell(i, j)).join(" ") + "\n"
        )}
      </pre>

      {steps.length > 0 && (
        <div className="algo-steps">
          <h3>Pasos</h3>
          <ol>{steps.map((s, i) => <li key={i}>{s}</li>)}</ol>
        </div>
      )}

      <div className="algo-explainer">
        <h3>¿Qué estamos viendo?</h3>
        <p>
          Búsqueda <strong>A*</strong> en un tablero (grid). A* usa una función de costo
          <code> f(n) = g(n) + h(n) </code>, donde <code>g</code> es el costo desde el inicio y
          <code> h </code> es una heurística admisible (aquí, <em>Manhattan</em>).
          El nodo actual se ilumina en azul, los cerrados/visitados en verde, inicio 🚩 y meta 🏁.
        </p>
        <h3>Algoritmo (pseudocódigo)</h3>
        <pre>{`A*(inicio, meta):
  open = {inicio}; g[inicio]=0; h[inicio]=heurística(inicio, meta)
  mientras open no vacío:
    n = argmin_{x∈open} (g[x]+h[x])    // f
    si n = meta: reconstruir camino y terminar
    mover n de open a closed
    para cada vecino v de n:
      si v en closed: continuar
      tentative_g = g[n] + costo(n,v)
      si v no en open o tentative_g < g[v]:
        padre[v] = n; g[v] = tentative_g
        h[v] = heurística(v, meta)
        añadir v a open si no estaba`}</pre>
      </div>
    </div>
  );
};

export default GraphAStar;
