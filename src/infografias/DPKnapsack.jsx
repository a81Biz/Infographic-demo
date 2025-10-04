import React, { useState } from "react";

const DPKnapsack = () => {
  const [weights, setWeights] = useState("1,3,4,5");
  const [values, setValues] = useState("1,4,5,7");
  const [capacity, setCapacity] = useState(7);
  const [steps, setSteps] = useState([]);
  const [result, setResult] = useState(null);
  const [picked, setPicked] = useState([]);

  const handleRun = () => {
    const w = weights.split(",").map(x=>parseInt(x.trim())).filter(x=>!Number.isNaN(x));
    const v = values.split(",").map(x=>parseInt(x.trim())).filter(x=>!Number.isNaN(x));
    const n = Math.min(w.length, v.length);
    const W = capacity;
    const dp = Array(n+1).fill(null).map(()=>Array(W+1).fill(0));
    const take = Array(n+1).fill(null).map(()=>Array(W+1).fill(false));
    const logs=[];

    for (let i=1;i<=n;i++){
      for (let c=0;c<=W;c++){
        dp[i][c] = dp[i-1][c];
        if (w[i-1] <= c && v[i-1] + dp[i-1][c-w[i-1]] > dp[i-1][c]){
          dp[i][c] = v[i-1] + dp[i-1][c-w[i-1]];
          take[i][c] = true;
        }
        logs.push(`dp[${i}][${c}] = ${dp[i][c]} ${take[i][c]?"(tomar "+i+")":""}`);
      }
    }

    // reconstrucción
    const items=[];
    let i=n, c=W;
    while(i>0 && c>=0){
      if (take[i][c]){
        items.push(i-1);
        c -= w[i-1];
      }
      i--;
    }

    setPicked(items.reverse().map(idx => ({idx, weight:w[idx], value:v[idx]})));
    setResult(dp[n][W]);
    setSteps(logs);
  };

  return (
    <div className="algo-card">
      <h2>0/1 Knapsack</h2>
      <div className="algo-input-row">
        <label>Pesos<input className="algo-input" value={weights} onChange={e=>setWeights(e.target.value)}/></label>
        <label>Valores<input className="algo-input" value={values} onChange={e=>setValues(e.target.value)}/></label>
        <label>Capacidad<input className="algo-input" type="number" value={capacity} onChange={e=>setCapacity(parseInt(e.target.value))}/></label>
        <button className="algo-btn" onClick={handleRun}>Resolver</button>
      </div>

      {result!==null && (
        <div className="algo-result">
          Valor máximo: <strong>{result}</strong>
          {picked.length>0 && (
            <div style={{marginTop:6}}>
              Ítems elegidos: {picked.map(p=><span key={p.idx} className="pill">{`#${p.idx} (w=${p.weight}, v=${p.value})`}</span>)}
            </div>
          )}
        </div>
      )}

      {steps.length>0 && <div className="algo-steps"><h3>Pasos</h3><ol>{steps.map((s,i)=><li key={i}>{s}</li>)}</ol></div>}

      <div className="algo-explainer">
        <h3>¿Qué estamos viendo?</h3>
        <p><code>dp[i][c]</code> es el valor máximo usando los primeros <code>i</code> ítems con capacidad <code>c</code>. Guardamos <code>take[i][c]</code> para reconstruir la selección.</p>
        <h3>Pseudocódigo</h3>
        <pre>{`for i=1..n:
  for c=0..W:
    dp[i][c]=dp[i-1][c]
    if w[i-1]<=c:
      dp[i][c]=max(dp[i][c], v[i-1]+dp[i-1][c-w[i-1]])
Reconstrucción bajando por i y c usando take[i][c]`}</pre>
      </div>
    </div>
  );
};

export default DPKnapsack;
