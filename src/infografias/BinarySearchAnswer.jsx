import React, { useState } from "react";

const BinarySearchAnswer = () => {
  const [boardsStr, setBoardsStr] = useState("7,5,9,13");
  const [k, setK] = useState(5);
  const [logs, setLogs] = useState([]);
  const [result, setResult] = useState(null);

  const canCut = (boards, length, k) => {
    let count = 0;
    for (const b of boards) count += Math.floor(b / length);
    return count >= k;
  };

  const handleRun = () => {
    const boards = boardsStr.split(",").map(x=>parseInt(x.trim())).filter(x=>!isNaN(x));
    let low = 1, high = Math.max(...boards), ans = 0;
    const steps=[];
    while (low <= high) {
      const mid = Math.floor((low+high)/2);
      steps.push(`Probar longitud ${mid}`);
      if (canCut(boards, mid, k)) {
        ans = mid;
        steps.push(`  ✔ posible, aumentar low`);
        low = mid+1;
      } else {
        steps.push(`  ✘ imposible, reducir high`);
        high = mid-1;
      }
    }
    setResult(ans);
    setLogs(steps);
  };

  return (
    <div className="algo-card">
      <h2>Binary Search en Respuesta</h2>
      <label>Tablas<input className="algo-input" value={boardsStr} onChange={e=>setBoardsStr(e.target.value)}/></label>
      <label>K cortes<input className="algo-input" type="number" value={k} onChange={e=>setK(parseInt(e.target.value))}/></label>
      <button className="algo-btn" onClick={handleRun}>Ejecutar</button>

      {result!==null && <div className="algo-result">Longitud máxima posible: {result}</div>}
      {logs.length>0 && <ol>{logs.map((s,i)=><li key={i}>{s}</li>)}</ol>}

      <div className="algo-explainer">
        <h3>¿Qué estamos viendo?</h3>
        <p>Probamos longitudes posibles en un rango usando búsqueda binaria.</p>
        <pre>{`low=1, high=max
mientras low<=high:
  mid=(low+high)/2
  si se pueden cortar k piezas de longitud mid:
    ans=mid, low=mid+1
  sino: high=mid-1`}</pre>
      </div>
    </div>
  );
};

export default BinarySearchAnswer;
