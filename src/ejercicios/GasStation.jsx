import React, { useState } from "react";

const GasStation = () => {
  const [input, setInput] = useState("1,2,3,4,5;3,4,5,1,2");
  const [result, setResult] = useState(null);
  const [steps, setSteps] = useState([]);

  const handleSolve = () => {
    setResult(input);
    setSteps(["Paso 1","Paso 2"]);
  };

  return (
    <div className="algo-card">
     <h2>📝 Reto: 134. Gas Station</h2>
<p>Se te da dos arrays <code>gas</code> y <code>cost</code> donde <code>gas[i]</code> representa la cantidad de gasolina en la estación i y <code>cost[i]</code> representa el costo de ir de la estación i a la siguiente. 
Devuelve el índice de la estación desde donde puedes completar el circuito una vez, o -1 si es imposible.</p>

      <div className="algo-input-group">
        <label>gas/cost arrays:
          <input className="algo-input" value={input} onChange={(e)=>setInput(e.target.value)} />
        </label>
      </div>
      <button className="algo-btn" onClick={handleSolve}>Resolver</button>
      {result!==null && (
        <div className="algo-result"><h3>✅ Resultado:</h3><pre>{JSON.stringify(result,null,2)}</pre></div>
      )}
      {result!==null && (
        <div className="algo-steps"><h3>🧩 Pasos del algoritmo</h3><ol>{steps.map((s,i)=>(<li key={i}>{s}</li>))}</ol></div>
      )}
      {result!==null && (<>
        <div className="algo-section"><h3>📜 Pseudocódigo</h3><pre>{`func canCompleteCircuit(gas, cost):
  total=0; tank=0; start=0
  para i en 0..n-1:
    total += gas[i]-cost[i]
    tank += gas[i]-cost[i]
    si tank < 0:
      start = i+1; tank = 0
  retornar total>=0 ? start : -1`}</pre></div>
        <div className="algo-section"><h3>🧭 ¿Qué debemos hacer?</h3><p>Recorremos todas las estaciones acumulando gas-cost. Si el tanque cae negativo, reiniciamos el inicio. Al final, si el total es negativo, no hay solución.</p></div>
        <div className="algo-section"><h3>⏱️ Complejidad</h3><p>Tiempo: O(n). Espacio: O(1).</p></div>
        <div className="algo-section"><h3>💻 JavaScript</h3><pre>{`function canCompleteCircuit(gas, cost) {
  let total=0, tank=0, start=0;
  for (let i=0; i<gas.length; i++) {
    total += gas[i] - cost[i];
    tank += gas[i] - cost[i];
    if (tank < 0) {
      start = i+1;
      tank = 0;
    }
  }
  return total >= 0 ? start : -1;
}`}</pre></div>
      </>) }
    </div>
  );
};

export default GasStation;
