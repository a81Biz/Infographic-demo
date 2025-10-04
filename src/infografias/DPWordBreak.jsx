import React, { useState } from "react";

const DPWordBreak = () => {
  const [s, setS] = useState("leetcode");
  const [dict, setDict] = useState("leet,code");
  const [steps, setSteps] = useState([]);
  const [result, setResult] = useState(null);
  const [segments, setSegments] = useState([]);

  const handleRun = () => {
    const words=new Set(dict.split(",").map(x=>x.trim()).filter(Boolean));
    const n=s.length;
    const dp=Array(n+1).fill(false);
    const prev=Array(n+1).fill(-1);
    dp[0]=true;
    const logs=[];

    for (let i=1;i<=n;i++){
      for (let j=0;j<i;j++){
        if (dp[j] && words.has(s.slice(j,i))){
          dp[i]=true; prev[i]=j;
          logs.push(`dp[${i}]=true usando "${s.slice(j,i)}" (desde ${j})`);
          break;
        }
      }
    }
    setResult(dp[n]);

    // reconstrucción
    const parts=[];
    if (dp[n]){
      let i=n;
      while(i>0){
        const j=prev[i];
        parts.unshift(s.slice(j,i));
        i=j;
      }
    }
    setSegments(parts);
    setSteps(logs);
  };

  return (
    <div className="algo-card">
      <h2>Word Break</h2>
      <div className="algo-input-row">
        <label>Cadena<input className="algo-input" value={s} onChange={e=>setS(e.target.value)}/></label>
        <label>Diccionario<input className="algo-input" value={dict} onChange={e=>setDict(e.target.value)}/></label>
        <button className="algo-btn" onClick={handleRun}>Resolver</button>
      </div>

      {result!==null && (
        <div className="algo-result">
          ¿Segmentable?: <strong>{result?"Sí":"No"}</strong>
          {result && segments.length>0 && <div>Segmentación: {segments.map((p,i)=><span key={i} className="pill">{p}</span>)}</div>}
        </div>
      )}

      {steps.length>0 && <div className="algo-steps"><h3>Pasos</h3><ol>{steps.map((s,i)=><li key={i}>{s}</li>)}</ol></div>}

      <div className="algo-explainer">
        <h3>¿Qué estamos viendo?</h3>
        <p><code>dp[i]</code> indica si <code>s[0..i)</code> puede segmentarse. <code>prev[i]</code> guarda el corte para reconstruir.</p>
        <h3>Pseudocódigo</h3>
        <pre>{`dp[0]=true
for i=1..n:
  for j=0..i-1:
    if dp[j] and s[j..i] in dict:
      dp[i]=true; prev[i]=j; break
Reconstrucción: cortes siguiendo prev desde i=n`}</pre>
      </div>
    </div>
  );
};

export default DPWordBreak;
