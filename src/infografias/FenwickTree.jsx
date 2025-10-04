import React, { useState } from "react";

// Fenwick Tree
class Fenwick {
  constructor(n) {
    this.n = n;
    this.bit = Array(n+1).fill(0); // 1-based
  }

  update(i, delta, logs) {
    logs.push(`Actualizar posición ${i} con +${delta}`);
    while (i <= this.n) {
      this.bit[i] += delta;
      logs.push(`  → bit[${i}] = ${this.bit[i]}`);
      i += i & -i;
    }
  }

  query(i, logs) {
    let s=0;
    logs.push(`Query prefix sum hasta ${i}`);
    while (i>0) {
      logs.push(`  sum += bit[${i}] (${this.bit[i]})`);
      s+=this.bit[i];
      i -= i & -i;
    }
    return s;
  }
}

const FenwickTree = () => {
  const [arrStr, setArrStr] = useState("1,2,3,4,5");
  const [idx, setIdx] = useState(3);
  const [logs, setLogs] = useState([]);
  const [bit, setBit] = useState([]);
  const [result, setResult] = useState(null);
  const [fenwick, setFenwick] = useState(null);

  const handleBuild = () => {
    const arr = arrStr.split(",").map(x=>parseInt(x.trim())).filter(x=>!isNaN(x));
    const f = new Fenwick(arr.length);
    const steps=[];
    arr.forEach((val,i)=> f.update(i+1,val,steps));
    setFenwick(f);
    setBit([...f.bit]);
    setLogs(steps);
    setResult(null);
  };

  const handleQuery = () => {
    if (!fenwick) return;
    const steps=[];
    const res = fenwick.query(idx,steps);
    setResult(res);
    setLogs(steps);
    setBit([...fenwick.bit]);
  };

  const handleUpdate = () => {
    if (!fenwick) return;
    const delta=1;
    const steps=[];
    fenwick.update(idx,delta,steps);
    setLogs(steps);
    setBit([...fenwick.bit]);
    setResult(null);
  };

  return (
    <div className="algo-card">
      <h2>Fenwick Tree (BIT)</h2>
      <div className="algo-input-row">
        <label>Array inicial
          <input className="algo-input" value={arrStr} onChange={e=>setArrStr(e.target.value)}/>
        </label>
        <button className="algo-btn" onClick={handleBuild}>Construir</button>
      </div>
      <div className="algo-input-row">
        <label>Índice i
          <input className="algo-input" type="number" value={idx} onChange={e=>setIdx(parseInt(e.target.value))}/>
        </label>
        <button className="algo-btn" onClick={handleQuery}>Query prefix</button>
        <button className="algo-btn" onClick={handleUpdate}>Update +1</button>
      </div>

      {bit.length>0 && (
        <div className="dp-wrap">
          <h3>Estructura BIT</h3>
          <div className="dp-array">
            {bit.map((v,i)=>(
              <div key={i} className={`dp-box ${i===idx?"dp-final":""}`}>
                <div className="dp-idx">{i}</div>
                <div className="dp-val">{v}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {result!==null && <div className="algo-result">Suma prefix hasta {idx}: <strong>{result}</strong></div>}

      {logs.length>0 && (
        <div className="algo-steps">
          <h3>Pasos</h3>
          <ol>{logs.map((s,i)=><li key={i}>{s}</li>)}</ol>
        </div>
      )}

      <div className="algo-explainer">
        <h3>¿Qué estamos viendo?</h3>
        <p>
          Un Fenwick Tree guarda sumas parciales en un array auxiliar.  
          Al actualizar, se incrementan posiciones avanzando con <code>i += i & -i</code>.  
          Al consultar, se suman posiciones retrocediendo con <code>i -= i & -i</code>.
        </p>
        <h3>Pseudocódigo</h3>
        <pre>{`update(i,delta):
  mientras i<=n:
    bit[i]+=delta
    i += i & -i

query(i):
  suma=0
  mientras i>0:
    suma+=bit[i]
    i -= i & -i`}</pre>
      </div>
    </div>
  );
};

export default FenwickTree;
