import React, { useState } from "react";

const LinearProgramming2D = () => {
  const [logs,setLogs]=useState([]);
  const [result,setResult]=useState(null);

  const handleRun=()=>{
    // Ejemplo: maximizar z=3x+2y sujeto a x+y<=4, x>=0,y>=0
    const corners=[[0,0],[4,0],[0,4]];
    const steps=[];
    let bestVal=-Infinity, bestPt=null;
    for (const [x,y] of corners){
      const val=3*x+2*y;
      steps.push(`P(${x},${y}) → z=${val}`);
      if(val>bestVal){bestVal=val;bestPt=[x,y];}
    }
    setLogs(steps);
    setResult({bestVal,bestPt});
  };

  return (
    <div className="algo-card">
      <h2>Linear Programming (2D)</h2>
      <button className="algo-btn" onClick={handleRun}>Ejecutar ejemplo</button>

      {result && <div className="algo-result">
        Óptimo en ({result.bestPt.join(",")}) con z={result.bestVal}
      </div>}
      {logs.length>0 && <ol>{logs.map((s,i)=><li key={i}>{s}</li>)}</ol>}

      <div className="algo-explainer">
        <h3>¿Qué estamos viendo?</h3>
        <p>
          Representamos un problema de programación lineal en 2D.
          La región factible es un polígono y el óptimo siempre ocurre en un vértice.
        </p>
        <h3>Pseudocódigo</h3>
        <pre>{`Dada función objetivo z=ax+by
y restricciones lineales:
  encontrar vértices de la región factible
  evaluar z en cada vértice
  elegir el máximo/minimo`}</pre>
      </div>
    </div>
  );
};

export default LinearProgramming2D;
