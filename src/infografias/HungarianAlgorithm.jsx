import React, { useState } from "react";

const HungarianAlgorithm = () => {
  const [matrixStr, setMatrixStr] = useState("4,1,3;2,0,5;3,2,2");
  const [result, setResult] = useState(null);
  const [steps, setSteps] = useState([]);

  const handleRun = () => {
    const mat = matrixStr.split(";").map(r => r.split(",").map(x => parseInt(x.trim())));
    const n = mat.length;
    let best = Infinity;
    let assign = null;
    const logs = [];

    const perm = (arr, k=0) => {
      if (k === arr.length) {
        let cost=0;
        for (let i=0;i<n;i++) cost+=mat[i][arr[i]];
        logs.push(`Asignación ${arr} → costo=${cost}`);
        if (cost<best){best=cost;assign=arr.slice();}
      } else {
        for (let i=k;i<arr.length;i++){
          [arr[k],arr[i]]=[arr[i],arr[k]];
          perm(arr,k+1);
          [arr[k],arr[i]]=[arr[i],arr[k]];
        }
      }
    };
    perm([...Array(n).keys()]);
    setResult({best,assign});
    setSteps(logs);
  };

  return (
    <div className="algo-card">
      <h2>Hungarian Algorithm (simplificado)</h2>
      <label>Matriz NxN
        <input className="algo-input" value={matrixStr} onChange={e=>setMatrixStr(e.target.value)} />
      </label>
      <button className="algo-btn" onClick={handleRun}>Ejecutar</button>

      {result && <div className="algo-result">
        Costo óptimo: {result.best}, Asignación: {result.assign.join(",")}
      </div>}
      {steps.length>0 && <ol>{steps.map((s,i)=><li key={i}>{s}</li>)}</ol>}

      <div className="algo-explainer">
        <h3>¿Qué estamos viendo?</h3>
        <p>
          El problema de <strong>asignación</strong> busca emparejar filas con columnas minimizando el costo.
          Aquí usamos un método por permutaciones para ilustrar la idea, aunque el algoritmo real es más eficiente.
        </p>
        <h3>Pseudocódigo</h3>
        <pre>{`para cada permutación p de columnas:
  costo = suma(mat[i][p[i]])
  elegir mínimo costo`}</pre>
      </div>
    </div>
  );
};

export default HungarianAlgorithm;
