import React, { useState } from "react";

const DPCoinChange = () => {
  const [coins, setCoins] = useState("1,2,5");
  const [amount, setAmount] = useState(11);
  const [steps, setSteps] = useState([]);
  const [result, setResult] = useState(null);
  const [dpArr, setDpArr] = useState([]);
  const [combo, setCombo] = useState([]);

  const handleRun = () => {
    const C = coins.split(",").map(x=>parseInt(x.trim())).filter(x=>!Number.isNaN(x));
    const A = amount;
    const dp = Array(A+1).fill(Infinity);
    const prev = Array(A+1).fill(-1); // guarda última moneda usada
    const logs = [];
    dp[0]=0;

    for (let i=1; i<=A; i++){
      for (const c of C){
        if (i-c>=0 && dp[i-c]+1 < dp[i]){
          dp[i] = dp[i-c]+1;
          prev[i] = c;
        }
      }
      logs.push(`dp[${i}] = ${dp[i]===Infinity?"∞":dp[i]} ${prev[i]!==-1?`(última: ${prev[i]})`:""}`);
    }

    setResult(dp[A]===Infinity ? -1 : dp[A]);
    setSteps(logs);
    setDpArr(dp);

    // reconstrucción de monedas
    const used=[];
    if (dp[A]!==Infinity){
      let x=A;
      while (x>0){
        const c = prev[x];
        if (c===-1) break;
        used.push(c);
        x -= c;
      }
    }
    setCombo(used);
  };

  return (
    <div className="algo-card">
      <h2>Coin Change (mínimo de monedas)</h2>
      <div className="algo-input-row">
        <label>Monedas<input className="algo-input" value={coins} onChange={e=>setCoins(e.target.value)}/></label>
        <label>Cantidad<input className="algo-input" type="number" value={amount} onChange={e=>setAmount(parseInt(e.target.value))}/></label>
        <button className="algo-btn" onClick={handleRun}>Resolver</button>
      </div>

      {result!==null && (
        <div className="algo-result">
          Mínimo de monedas: <strong>{result===-1?"No posible":result}</strong>
          {combo.length>0 && (
            <div style={{marginTop:6}}>
              Composición: {combo.map((c,i)=><span key={i} className="pill">{c}</span>)} 
              <span style={{marginLeft:6}}>= {combo.reduce((a,b)=>a+b,0)}</span>
            </div>
          )}
        </div>
      )}

      {dpArr.length>0 && (
        <div style={{marginTop:12}}>
          <strong>Tabla DP (1D):</strong>
          <div className="dp-array">
            {dpArr.map((v,i)=>(
              <div key={i} className={`dp-box ${i===amount?"dp-final":""}`}>
                <div className="dp-idx">{i}</div>
                <div className="dp-val">{v===Infinity?"∞":v}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {steps.length>0 && <div className="algo-steps"><h3>Pasos</h3><ol>{steps.map((s,i)=><li key={i}>{s}</li>)}</ol></div>}

      <div className="algo-explainer">
        <h3>¿Qué estamos viendo?</h3>
        <p>Arreglo <code>dp[i]</code> con el mínimo de monedas para formar <code>i</code>. <code>prev[i]</code> guarda la última moneda usada para **reconstruir** la solución.</p>
        <h3>Pseudocódigo</h3>
        <pre>{`dp[0]=0; prev[0]=-1
for i=1..amount:
  dp[i]=∞; prev[i]=-1
  for coin in coins:
    if i-coin>=0 and dp[i-coin]+1 < dp[i]:
      dp[i]=dp[i-coin]+1
      prev[i]=coin
Reconstrucción: repetir (x -= prev[x]) desde x=amount`}</pre>
      </div>
    </div>
  );
};

export default DPCoinChange;
