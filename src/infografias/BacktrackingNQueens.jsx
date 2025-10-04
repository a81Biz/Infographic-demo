import React, { useState } from "react";

const BacktrackingNQueens = () => {
  const [n, setN] = useState(4);
  const [steps, setSteps] = useState([]);
  const [solution, setSolution] = useState([]);

  const solveNQueens = (n) => {
    const board = Array(n).fill().map(() => Array(n).fill(0));
    const logs = [];
    let finalBoard = [];

    const isSafe = (row, col) => {
      for (let i = 0; i < row; i++) {
        if (board[i][col] === 1) return false;
        if (col - (row - i) >= 0 && board[i][col - (row - i)] === 1) return false;
        if (col + (row - i) < n && board[i][col + (row - i)] === 1) return false;
      }
      return true;
    };

    const solve = (row) => {
      if (row === n) {
        logs.push("✅ Solución encontrada");
        finalBoard = board.map((r) => [...r]);
        return true;
      }
      for (let col = 0; col < n; col++) {
        if (isSafe(row, col)) {
          board[row][col] = 1;
          logs.push(`Coloco reina en (${row},${col})`);
          if (solve(row + 1)) return true;
          board[row][col] = 0;
          logs.push(`❌ Retroceso de (${row},${col})`);
        }
      }
      return false;
    };

    solve(0);
    return { logs, finalBoard };
  };

  const handleSolve = () => {
    const { logs, finalBoard } = solveNQueens(n);
    setSteps(logs);
    setSolution(finalBoard);
  };

  return (
    <div className="algo-card">
      <h2>Backtracking: Problema de las N-Reinas</h2>
      <label>
        Tamaño del tablero (N):
        <input
          type="number"
          value={n}
          onChange={(e) => setN(parseInt(e.target.value))}
          className="algo-input"
        />
      </label>
      <button onClick={handleSolve} className="algo-btn">Resolver</button>

      {solution.length > 0 && (
        <div>
          <h3>Tablero final:</h3>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(${n}, 40px)`,
              gap: "2px",
              margin: "1rem 0",
            }}
          >
            {solution.flat().map((cell, i) => (
              <div
                key={i}
                style={{
                  width: "40px",
                  height: "40px",
                  backgroundColor: cell === 1 ? "crimson" : "lightgray",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                  fontWeight: "bold",
                }}
              >
                {cell === 1 ? "Q" : ""}
              </div>
            ))}
          </div>
        </div>
      )}

      {steps.length > 0 && (
        <div className="algo-steps">
          <h3>Pasos:</h3>
          <ol>{steps.map((s, i) => <li key={i}>{s}</li>)}</ol>
        </div>
      )}

      <div className="algo-explainer">
        <h3>Explicación</h3>
        <p>
          El problema de las N-Reinas consiste en colocar N reinas en un tablero de N×N de manera que
          ninguna se ataque (no compartan fila, columna ni diagonal).  
          Se usa <strong>backtracking</strong>: probamos colocar reinas fila por fila, retrocediendo si encontramos un conflicto.
        </p>
      </div>
    </div>
  );
};

export default BacktrackingNQueens;
