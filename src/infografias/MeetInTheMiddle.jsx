import React, { useState } from "react";

const subsetSums = (arr) => {
  const res=[];
  const n=arr.length;
  for (let mask=0; mask<(1<<n); mask++) {
    let sum=0;
    for (let i=0; i<n; i++) if (mask&(1<<i)) sum+=arr[i];
    res.push(sum);
  }
  return res;
};

const MeetInTheMiddle = () => {
  const [arrStr, setArrStr] = useState("3,34,4,12,5,2");
  const [target, setTarget] = useState(9);
  const [logs, setLogs] = useState([]);
  const [result, setResult] = useState(null);

  const handleRun = () => {
    const arr = arrStr.split(",").map(x=>parseInt(x.trim())).filter(x=>!isNaN(x));
    const mid = Math.floor(arr.length/2);
    const left = arr.slice(0,mid);
    const right = arr.slice(mid);

    const sumL = subsetSums(left);
    const sumR = subsetSums(right).sort((a,b)=>a-b);
    const steps=[`Suma izquierda: ${sumL}`, `Suma derecha: ${sumR}`];

    let found=false;
    for (const s of sumL) {
      const need=target-s;
      if (sumR.includes(need)) {
        steps.push(`Encontrado: ${s}+${need}=${target}`);
        found=true;
        break;
      }
    }

    setResult(found);
    setLogs(steps);
  };

  return (
    <div className="algo-card">
      <h2>Meet in the Middle</h2>
      <label>Array<input className="algo-input" value={arrStr} onChange={e=>setArrStr(e.target.value)}/></label>
      <label>Objetivo<input className="algo-input" type="number" value={target} onChange={e=>setTarget(parseInt(e.target.value))}/></label>
      <button className="algo-btn" onClick={handleRun}>Ejecutar</button>

      {result!==null && <div className="algo-result">{result?"✔ Existe subconjunto":"✘ No encontrado"}</div>}
      {logs.length>0 && <ol>{logs.map((s,i)=><li key={i}>{s}</li>)}</ol>}

      <div className="algo-explainer">
        <p>Dividimos el array en 2 mitades, calculamos todos los subconjuntos de cada lado y luego buscamos combinaciones.</p>
      </div>
    </div>
  );
};

export default MeetInTheMiddle;
