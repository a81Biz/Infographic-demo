import React, { useState } from "react";

const DFSPathMaze = () => {
  const initialMaze = [
    [0, 0, 1, 0],
    [1, 0, 1, 0],
    [0, 0, 0, 0],
    [0, 1, 1, 0],
  ];

  const [maze, setMaze] = useState(initialMaze);
  const [steps, setSteps] = useState([]);
  const [path, setPath] = useState([]);

  const solveDFS = (x, y, logs, visited, currentPath) => {
    if (x === 3 && y === 3) {
      logs.push("🏁 Llegamos a la salida en (3,3)");
      currentPath.push([x, y]);
      setPath([...currentPath]);
      return true;
    }

    if (
      x < 0 ||
      y < 0 ||
      x >= 4 ||
      y >= 4 ||
      maze[x][y] === 1 ||
      visited[x][y]
    ) {
      return false;
    }

    logs.push(`Visito (${x},${y})`);
    visited[x][y] = true;
    currentPath.push([x, y]);

    if (
      solveDFS(x + 1, y, logs, visited, [...currentPath]) ||
      solveDFS(x, y + 1, logs, visited, [...currentPath]) ||
      solveDFS(x - 1, y, logs, visited, [...currentPath]) ||
      solveDFS(x, y - 1, logs, visited, [...currentPath])
    ) {
      return true;
    }

    logs.push(`❌ Retroceso desde (${x},${y})`);
    return false;
  };

  const handleSolve = () => {
    const logs = [];
    const visited = Array(4)
      .fill()
      .map(() => Array(4).fill(false));
    solveDFS(0, 0, logs, visited, []);
    setSteps(logs);
  };

  const renderCell = (x, y) => {
    if (maze[x][y] === 1) return "⬛";
    if (x === 3 && y === 3) return "🏁";
    if (path.some(([px, py]) => px === x && py === y)) return "🟩";
    return "⬜";
  };

  return (
    <div className="algo-card">
      <h2>DFS en Laberinto</h2>
      <button onClick={handleSolve} className="algo-btn">Resolver</button>

      <div className="algo-steps">
        <h3>Mapa del laberinto</h3>
        <pre>
          {maze.map((row, i) =>
            row.map((_, j) => renderCell(i, j)).join(" ") + "\n"
          )}
        </pre>
      </div>

      {steps.length > 0 && (
        <div className="algo-steps">
          <h3>Pasos de búsqueda</h3>
          <ol>{steps.map((s, i) => <li key={i}>{s}</li>)}</ol>
        </div>
      )}

      <div className="algo-explainer">
        <h3>Explicación</h3>
        <p>
          DFS explora el laberinto en profundidad. Intenta moverse hacia abajo, derecha, arriba y
          izquierda. Marca celdas visitadas y retrocede cuando no hay salida. El objetivo es
          llegar a (3,3) 🏁.
        </p>
      </div>
    </div>
  );
};

export default DFSPathMaze;
