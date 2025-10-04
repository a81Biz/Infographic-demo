import React, { useState } from "react";

const DPEditDistance = () => {
  const [a, setA] = useState("kitten");
  const [b, setB] = useState("sitting");
  const [steps, setSteps] = useState([]);
  const [result, setResult] = useState(null);
  const [dp, setDp] = useState([]);
  const [ops, setOps] = useState([]);

  const handleRun = () => {
    const m=a.length, n=b.length;
    const M=Array(m+1).fill(null).map(()=>Array(n+1).fill(0));
    for (let i=0;i<=m;i++) M[i][0]=i;
    for (let j=0;j<=n;j++) M[0][j]=j;
    const logs=[];

    for (let i=1;i<=m;i++){
      for (let j=1;j<=n;j++){
        if (a[i-1]===b[j-1]) M[i][j]=M[i-1][j-1];
        else M[i][j]=1+Math.min(M[i-1][j], M[i][j-1], M[i-1][j-1]);
        logs.push(`dp[${i}][${j}] = ${M[i][j]}`);
      }
    }

    // reconstrucción de operaciones
    const actions=[];
    let i=m, j=n;
    while(i>0 || j>0){
      if (i>0 && j>0 && a[i-1]===b[j-1]) {
        actions.unshift(`= mantener '${a[i-1]}'`);
        i--; j--;
      } else if (i>0 && M[i][j] === M[i-1][j]+1) {
        actions.unshift(`- borrar '${a[i-1]}'`);
        i--;
      } else if (j>0 && M[i][j] === M[i][j-1]+1) {
        actions.unshift(`+ insertar '${b[j-1]}'`);
        j--;
      } else {
        actions.unshift(`~ reemplazar '${a[i-1]}'→'${b[j-1]}'`);
        i--; j--;
      }
    }

    setDp(M);
    setResult(M[m][n]);
    setSteps(logs);
    setOps(actions);
  };

  return (
    <div className="algo-card">
      <h2>Edit Distance (Levenshtein)</h2>
      <div className="algo-input-row">
        <label>Cadena A<input className="algo-input" value={a} onChange={e=>setA(e.target.value)}/></label>
        <label>Cadena B<input className="algo-input" value={b} onChange={e=>setB(e.target.value)}/></label>
        <button className="algo-btn" onClick={handleRun}>Calcular</button>
      </div>

      {result!==null && <div className="algo-result">Distancia mínima: <strong>{result}</strong></div>}

      {dp.length>0 && (
        <div className="dp-wrap">
          <h3>Matriz DP</h3>
          <table className="dp-table">
            <thead>
              <tr>
                <th> </th><th> </th>
                {Array.from(b).map((c, j)=><th key={j}>{c}</th>)}
              </tr>
            </thead>
            <tbody>
              {Array.from({length:a.length+1}).map((_, i)=>(
                <tr key={i}>
                  <th>{i===0?" ":a[i-1]}</th>
                  {Array.from({length:b.length+1}).map((_, j)=>(
                    <td key={j} className="dp-cell">{dp[i]?.[j] ?? 0}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {ops.length>0 && (
        <div className="algo-steps">
          <h3>Operaciones</h3>
          <ol>{ops.map((s,i)=><li key={i}>{s}</li>)}</ol>
        </div>
      )}

      <div className="algo-explainer">
        <h3>¿Qué estamos viendo?</h3>
        <p><code>dp[i][j]</code> = coste mínimo para convertir <code>a[0..i-1]</code> en <code>b[0..j-1]</code>. Reconstruimos una secuencia de operaciones óptima.</p>
        <h3>Pseudocódigo</h3>
        <pre>{`dp[i][0]=i; dp[0][j]=j
for i=1..m:
  for j=1..n:
    if a[i-1]==b[j-1]: dp[i][j]=dp[i-1][j-1]
    else: dp[i][j]=1+min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1])
Reconstrucción: desde (m,n) comparando vecinos`}</pre>
      </div>
    </div>
  );
};

export default DPEditDistance;
