import React, { useState } from "react";

const DPLIS = () => {
  const [arr, setArr] = useState("10,9,2,5,3,7,101,18");
  const [steps, setSteps] = useState([]);
  const [result, setResult] = useState(null);
  const [seq, setSeq] = useState([]);

  const handleRun = () => {
    const a = arr.split(",").map(x=>parseInt(x.trim())).filter(x=>!Number.isNaN(x));
    const n=a.length;
    const dp=Array(n).fill(1);
    const parent=Array(n).fill(-1);
    const logs=[];
    let bestLen=0, bestIdx=-1;

    for (let i=0;i<n;i++){
      for (let j=0;j<i;j++){
        if (a[i]>a[j] && dp[j]+1>dp[i]){
          dp[i]=dp[j]+1; parent[i]=j;
          logs.push(`mejoro en i=${i} (a[i]=${a[i]}) con j=${j} → len ${dp[i]}`);
        }
      }
      if (dp[i]>bestLen){ bestLen=dp[i]; bestIdx=i; }
    }

    // reconstrucción
    const path=[];
    let k=bestIdx;
    while(k!==-1){ path.push(a[k]); k=parent[k]; }
    path.reverse();

    setResult(bestLen);
    setSeq(path);
    setSteps(logs);
  };

  return (
    <div className="algo-card">
      <h2>Longest Increasing Subsequence</h2>
      <div className="algo-input-row">
        <label>Array<input className="algo-input" value={arr} onChange={e=>setArr(e.target.value)}/></label>
        <button className="algo-btn" onClick={handleRun}>Resolver</button>
      </div>

      {result!==null && (
        <div className="algo-result">
          Longitud LIS: <strong>{result}</strong>
          {seq.length>0 && <div>Secuencia: {seq.map((x,i)=><span key={i} className="pill">{x}</span>)}</div>}
        </div>
      )}

      {steps.length>0 && <div className="algo-steps"><h3>Pasos</h3><ol>{steps.map((s,i)=><li key={i}>{s}</li>)}</ol></div>}

      <div className="algo-explainer">
        <h3>¿Qué estamos viendo?</h3>
        <p><code>dp[i]</code> = longitud de la LIS que termina en <code>i</code>. <code>parent[i]</code> permite reconstruir la secuencia.</p>
        <h3>Pseudocódigo</h3>
        <pre>{`dp[i]=1; parent[i]=-1
for i=0..n-1:
  for j=0..i-1:
    if a[i]>a[j] and dp[j]+1>dp[i]:
      dp[i]=dp[j]+1; parent[i]=j
Reconstrucción desde el índice con dp máximo`}</pre>
      </div>
    </div>
  );
};

export default DPLIS;
