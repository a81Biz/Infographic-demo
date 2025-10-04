import React, { useState } from "react";

const DPMatrixChain = () => {
  const [dims, setDims] = useState("10,20,30,40,30");
  const [steps, setSteps] = useState([]);
  const [result, setResult] = useState(null);
  const [dp, setDp] = useState([]);
  const [split, setSplit] = useState([]);

  const handleRun = () => {
    const p = dims.split(",").map(x=>parseInt(x.trim())).filter(x=>!Number.isNaN(x));
    const n = p.length;
    const M = Array(n).fill(null).map(()=>Array(n).fill(0));
    const S = Array(n).fill(null).map(()=>Array(n).fill(0));
    const logs=[];

    for (let L=2; L<n; L++){
      for (let i=1; i<n-L+1; i++){
        const j=i+L-1;
        M[i][j]=Infinity;
        for (let k=i;k<j;k++){
          const q=M[i][k]+M[k+1][j]+p[i-1]*p[k]*p[j];
          if (q<M[i][j]) { M[i][j]=q; S[i][j]=k; }
        }
        logs.push(`dp[${i}][${j}] = ${M[i][j]} (k=${S[i][j]})`);
      }
    }
    setDp(M); setSplit(S);
    setResult(M[1][n-1]); setSteps(logs);
  };

  const parens = (S, i, j) => {
    if (i===j) return `A${i}`;
    const k=S[i][j];
    return `(${parens(S,i,k)}×${parens(S,k+1,j)})`;
  };

  return (
    <div className="algo-card">
      <h2>Matrix Chain Multiplication</h2>
      <div className="algo-input-row">
        <label>Dimensiones<input className="algo-input" value={dims} onChange={e=>setDims(e.target.value)}/></label>
        <button className="algo-btn" onClick={handleRun}>Resolver</button>
      </div>

      {result!==null && <div className="algo-result">Costo mínimo: <strong>{result}</strong>
        {split.length>0 && <div>Orden óptimo: <span className="pill">{parens(split,1,dims.split(",").length-1)}</span></div>}
      </div>}

      {dp.length>0 && (
        <div className="dp-wrap">
          <h3>Tabla DP (costos)</h3>
          <table className="dp-table">
            <tbody>
              {dp.map((row,i)=>(
                <tr key={i}>
                  {row.map((v,j)=> <td key={j} className="dp-cell">{v===Infinity?"∞":v}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {steps.length>0 && <div className="algo-steps"><h3>Pasos</h3><ol>{steps.map((s,i)=><li key={i}>{s}</li>)}</ol></div>}

      <div className="algo-explainer">
        <h3>¿Qué estamos viendo?</h3>
        <p>Elegimos dónde “partir” la cadena de matrices. <code>split[i][j]</code> guarda el <code>k</code> que minimiza el costo.</p>
        <h3>Pseudocódigo</h3>
        <pre>{`for L=2..n-1:
  for i=1..n-L+1:
    j=i+L-1; dp[i][j]=∞
    for k=i..j-1:
      q=dp[i][k]+dp[k+1][j]+p[i-1]*p[k]*p[j]
      si q<dp[i][j]: dp[i][j]=q; split[i][j]=k
Parentizar con split[i][j]`}</pre>
      </div>
    </div>
  );
};

export default DPMatrixChain;
