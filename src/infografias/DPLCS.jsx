import React, { useState } from "react";

const DPLCS = () => {
  const [s1, setS1] = useState("ABCBDAB");
  const [s2, setS2] = useState("BDCAB");
  const [steps, setSteps] = useState([]);
  const [result, setResult] = useState("");
  const [dp, setDp] = useState([]);

  const handleRun = () => {
    const m = s1.length, n = s2.length;
    const M = Array(m+1).fill(null).map(()=>Array(n+1).fill(0));
    const logs = [];
    for (let i=1;i<=m;i++){
      for (let j=1;j<=n;j++){
        if (s1[i-1]===s2[j-1]) {
          M[i][j] = M[i-1][j-1] + 1;
          logs.push(`match '${s1[i-1]}' en (${i},${j}) → ${M[i][j]}`);
        } else {
          M[i][j] = Math.max(M[i-1][j], M[i][j-1]);
          logs.push(`no match en (${i},${j}) → max(${M[i-1][j]}, ${M[i][j-1]}) = ${M[i][j]}`);
        }
      }
    }
    // reconstrucción
    let i=m, j=n, seq=[];
    while(i>0 && j>0){
      if (s1[i-1]===s2[j-1]) { seq.unshift(s1[i-1]); i--; j--; }
      else if (M[i-1][j] >= M[i][j-1]) i--;
      else j--;
    }
    setResult(seq.join(""));
    setSteps(logs);
    setDp(M);
  };

  return (
    <div className="algo-card">
      <h2>LCS (Subsecuencia Común Más Larga)</h2>
      <div className="algo-input-row">
        <label>Cadena A<input className="algo-input" value={s1} onChange={e=>setS1(e.target.value)}/></label>
        <label>Cadena B<input className="algo-input" value={s2} onChange={e=>setS2(e.target.value)}/></label>
        <button className="algo-btn" onClick={handleRun}>Calcular</button>
      </div>

      {result && <div className="algo-result">LCS: <strong>{result}</strong> (longitud {result.length})</div>}

      {dp.length>0 && (
        <div className="dp-wrap">
          <h3>Matriz DP</h3>
          <table className="dp-table">
            <thead>
              <tr>
                <th> </th>
                <th> </th>
                {Array.from(s2).map((c, j)=> <th key={j}>{c}</th>)}
              </tr>
            </thead>
            <tbody>
              {Array.from({length: s1.length+1}).map((_, i)=>(
                <tr key={i}>
                  <th>{i===0 ? " " : s1[i-1]}</th>
                  {Array.from({length: s2.length+1}).map((_, j)=>(
                    <td key={j} className={(i>0&&j>0&&s1[i-1]===s2[j-1])?"dp-cell dp-cell--match":"dp-cell"}>
                      {dp[i]?.[j] ?? 0}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {steps.length>0 && <div className="algo-steps"><h3>Pasos</h3><ol>{steps.map((s,i)=><li key={i}>{s}</li>)}</ol></div>}

      <div className="algo-explainer">
        <h3>¿Qué estamos viendo?</h3>
        <p>Matriz DP donde <code>dp[i][j]</code> es la longitud del LCS de <code>s1[0..i-1]</code> y <code>s2[0..j-1]</code>. Las celdas de coincidencia se marcan.</p>
        <h3>Pseudocódigo</h3>
        <pre>{`for i=1..m:
  for j=1..n:
    if a[i-1]==b[j-1]:
      dp[i][j]=dp[i-1][j-1]+1
    else:
      dp[i][j]=max(dp[i-1][j], dp[i][j-1])
Reconstrucción:
i=m, j=n
mientras i>0 y j>0:
  si a[i-1]==b[j-1]: añadir a[i-1]; i--, j--
  si no: ir hacia el mayor entre dp[i-1][j] y dp[i][j-1]`}</pre>
      </div>
    </div>
  );
};

export default DPLCS;
