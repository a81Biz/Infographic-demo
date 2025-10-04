import React, { useState } from "react";

const DPFibonacci = () => {
  const [n, setN] = useState(6);
  const [steps, setSteps] = useState([]);
  const [result, setResult] = useState(null);
  const [dpArray, setDpArray] = useState([]);

  const handleRun = () => {
    if (n < 0) return;
    const dp = Array(n+1).fill(0);
    const logs = [];
    if (n >= 0) dp[0]=0;
    if (n >= 1) dp[1]=1;
    logs.push("dp[0]=0, dp[1]=1");

    for (let i=2; i<=n; i++){
      dp[i]=dp[i-1]+dp[i-2];
      logs.push(`dp[${i}] = ${dp[i-1]} + ${dp[i-2]} = ${dp[i]}`);
    }

    setDpArray(dp);
    setResult(dp[n]);
    setSteps(logs);
  };

  return (
    <div className="algo-card">
      <h2>Fibonacci con Programación Dinámica</h2>
      <label>
        N:
        <input
          type="number"
          value={n}
          onChange={(e)=>setN(parseInt(e.target.value))}
          className="algo-input"
        />
      </label>
      <button onClick={handleRun} className="algo-btn">Calcular</button>

      {result!==null && (
        <div className="algo-result">
          <strong>Resultado:</strong> fib({n}) = {result}
        </div>
      )}

      {/* Visualización del array DP */}
      {dpArray.length>0 && (
        <div style={{margin:"1rem 0"}}>
          <strong>Tabla DP:</strong>
          <div style={{display:"flex", gap:"0.5rem", marginTop:"0.5rem"}}>
            {dpArray.map((val,i)=>(
              <div key={i} style={{
                padding:"0.5rem",
                border:"1px solid #444",
                minWidth:"45px",
                textAlign:"center",
                background: i===n ? "lightgreen" : "white",
                borderRadius:"6px"
              }}>
                <div style={{fontSize:"12px", color:"#555"}}>i={i}</div>
                <div style={{fontWeight:"bold"}}>{val}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {steps.length>0 && (
        <div className="algo-steps">
          <h3>Pasos</h3>
          <ol>{steps.map((s,i)=><li key={i}>{s}</li>)}</ol>
        </div>
      )}

      <div className="algo-explainer">
        <h3>¿Qué estamos viendo?</h3>
        <p>
          Calculamos <strong>Fibonacci</strong> con un enfoque de
          <em> programación dinámica bottom-up</em>.  
          En lugar de usar recursión y repetir cálculos, construimos una
          tabla <code>dp</code> desde la base y reutilizamos resultados previos.
        </p>
        <h3>Pseudocódigo</h3>
        <pre>{`fib[0] = 0
fib[1] = 1
for i = 2 .. n:
    fib[i] = fib[i-1] + fib[i-2]
return fib[n]`}</pre>
      </div>
    </div>
  );
};

export default DPFibonacci;
