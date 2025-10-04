import React from "react";

const GraphRepresentation = () => {
  const adjacencyList = { 0:[1,2], 1:[2], 2:[0,3], 3:[3] };
  const adjacencyMatrix = [
    [0,1,1,0],
    [0,0,1,0],
    [1,0,0,1],
    [0,0,0,1]
  ];

  return (
    <div className="algo-card">
      <h2>Representación de Grafos</h2>
      <h3>Lista de Adyacencia</h3>
      <pre>{Object.entries(adjacencyList).map(([k,v]) => k + " → " + v.join(", ") + "\n")}</pre>
      <h3>Matriz de Adyacencia</h3>
      <pre>{adjacencyMatrix.map(r=>r.join(" ")).join("\n")}</pre>

      <div className="algo-explainer">
        <h3>¿Qué estamos viendo?</h3>
        <p>Un grafo puede almacenarse como <strong>lista de adyacencia</strong> (eficiente en espacio para grafos dispersos) o
        <strong>matriz de adyacencia</strong> (acceso O(1) para comprobar arista, pero usa más memoria).</p>
      </div>
    </div>
  );
};

export default GraphRepresentation;
