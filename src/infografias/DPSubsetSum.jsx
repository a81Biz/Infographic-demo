import React, { useState } from "react";

const DPSubsetSum = () => {
  const [arr, setArr] = useState("3,34,4,12,5,2");
  const [target, setTarget] = useState(9);
  const [steps,setSteps]=useState([]);
  const [result,setResult]=useState(null);
  const [choice,setChoice]=useState([]);

  const handleRun=()=>{
    const nums=arr.split(",").map(x=>parseInt(x.trim())).filter(x=>!Number.isNaN(x));
    const n=nums.length;
    const dp=Array(n+1).fill(null).map(()=>Array(target+1).fill(false));
    const prev=Array(n+1).fill(null).map(()=>Array(target+1).fill(null));
    const logs=[];
    for (let i=0;i<=n;i++) dp[i][0]=true;

    for (let i=1;i<=n;i++){
      for (let s=1;s<=target;s++){
        dp[i][s]=dp[i-1][s];
        if (!dp[i][s] && nums[i-1]<=s && dp[i-1][s-nums[i-1]]) {
          dp[i][s]=true;
          prev[i][s]=s-nums[i-1]; // tomé nums[i-1]
        }
        logs.push(`dp[${i}][${s}] = ${dp[i][s]}`);
      }
    }
    setResult(dp[n][target]);

    // reconstrucción de subconjunto
    const picked=[];
    if (dp[n][target]){
      let i=n, s=target;
      while(i>0 && s>0){
        if (prev[i][s]!==null){ // tomé i-1
          picked.push(nums[i-1]);
          s = prev[i][s];
          i--;
        } else {
          i--;
        }
      }
    }
    setChoice(picked.reverse());
    setSteps(logs);
  };

  return (
    <div className="algo-card">
      <h2>Subset Sum</h2>
      <div className="algo-input-row">
        <label>Array<input className="algo-input" value={arr} onChange={e=>setArr(e.target.value)}/></label>
        <label>Target<input className="algo-input" type="number" value={target} onChange={e=>setTarget(parseInt(e.target.value))}/></label>
        <button className="algo-btn" onClick={handleRun}>Resolver</button>
      </div>

      {result!==null && (
        <div className="algo-result">
          <strong>¿Existe subconjunto?:</strong> {result?"Sí":"No"}
          {result && choice.length>0 && <> — Subconjunto: <span className="pill">{choice.join(" + ")}</span> = {target}</>}
        </div>
      )}

      {steps.length>0 && <div className="algo-steps"><h3>Pasos (llenado DP)</h3><ol>{steps.map((s,i)=><li key={i}>{s}</li>)}</ol></div>}

      <div className="algo-explainer">
        <h3>¿Qué estamos viendo?</h3>
        <p><code>dp[i][s]</code> indica si con los primeros <code>i</code> números se puede formar suma <code>s</code>. Guardamos <code>prev</code> para reconstruir el subconjunto.</p>
        <h3>Pseudocódigo</h3>
        <pre>{`dp[0][0]=true
for i=1..n:
  for s=0..target:
    dp[i][s]=dp[i-1][s]
    if !dp[i][s] and nums[i-1]<=s and dp[i-1][s-nums[i-1]]:
      dp[i][s]=true; prev[i][s]=s-nums[i-1]
Reconstrucción desde (n,target) usando prev`}</pre>
      </div>
    </div>
  );
};

export default DPSubsetSum;
