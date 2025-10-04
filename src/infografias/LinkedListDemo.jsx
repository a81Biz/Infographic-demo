import React, { useState } from "react";

const LinkedListDemo = () => {
  const [list, setList] = useState([1, 2, 3]);
  const [steps, setSteps] = useState([]);

  const insertAtStart = () => {
    const logs = [];
    logs.push("Nuevo nodo [0] creado.");
    logs.push("El puntero next de [0] apunta al antiguo Head [1].");
    logs.push("Head ahora apunta al nuevo nodo [0].");

    setList([0, ...list]);
    setSteps(logs);
  };

  const deleteNode = () => {
    const logs = [];
    logs.push("Queremos eliminar el nodo [2].");
    logs.push("Recorremos la lista desde el Head.");
    logs.push("El nodo [1] apunta ahora directamente a [3], saltando [2].");
    logs.push("El nodo [2] queda aislado y puede liberarse.");

    setList(list.filter((n) => n !== 2));
    setSteps(logs);
  };

  return (
    <div className="algo-card">
      <h2>Linked List Demo</h2>
      <p>
        Lista actual: {list.map((n, i) => `[${n}]`).join(" → ")} → NULL
      </p>

      <div style={{ margin: "1rem 0" }}>
        <button onClick={insertAtStart} className="algo-btn">
          Insertar 0 al inicio
        </button>
        <button onClick={deleteNode} className="algo-btn" style={{ marginLeft: "0.5rem" }}>
          Eliminar nodo 2
        </button>
      </div>

      {steps.length > 0 && (
        <div className="algo-steps">
          <h3>Pasos:</h3>
          <ol>
            {steps.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ol>
        </div>
      )}

      <div className="algo-explainer">
        <h3>Explicación del Algoritmo</h3>
        <pre>
{`// Inserción al inicio (O(1)):
nuevo.next = head;
head = nuevo;

// Eliminación (O(1) si se tiene referencia al nodo):
prev.next = actual.next;
actual queda aislado.
`}
        </pre>
      </div>
    </div>
  );
};

export default LinkedListDemo;
