
import React, { useState } from "react";

const QueueSimulation = () => {
  const [queue, setQueue] = useState(["D1", "D2", "D3"]);
  const [steps, setSteps] = useState([]);

  const processQueue = () => {
    const logs = [];
    let currentQueue = [...queue];
    while (currentQueue.length > 0) {
      const doc = currentQueue.shift();
      logs.push(`Procesando ${doc} → Cola: [${currentQueue.join(", ")}]`);
    }
    setSteps(logs);
  };

  return (
    <div className="algo-card">
      <h2>Queue: Simulación de Impresora</h2>
      <p>Cola inicial: [D1, D2, D3]</p>
      <button onClick={processQueue} className="algo-btn">Procesar Cola</button>

      {steps.length > 0 && (
        <div className="algo-steps">
          <h3>Pasos:</h3>
          <ol>{steps.map((s, i) => <li key={i}>{s}</li>)}</ol>
        </div>
      )}
    </div>
  );
};

export default QueueSimulation;
