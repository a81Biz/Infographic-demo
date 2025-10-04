import React, { useState } from "react";

// Construcción de LPS
const buildLPS = (pat, logs) => {
  const lps = Array(pat.length).fill(0);
  let len=0, i=1;
  logs.push(`Construcción de LPS para "${pat}"`);
  while (i<pat.length) {
    if (pat[i]===pat[len]) {
      len++;
      lps[i]=len;
      logs.push(`lps[${i}] = ${len} (match '${pat[i]}')`);
      i++;
    } else {
      if (len!==0) {
        len=lps[len-1];
        logs.push(`Retroceder len → ${len}`);
      } else {
        lps[i]=0;
        logs.push(`lps[${i}] = 0`);
        i++;
      }
    }
  }
  return lps;
};

// Búsqueda con KMP
const KMPSearch = (txt, pat, logs) => {
  const lps=buildLPS(pat, logs);
  const result=[];
  let i=0, j=0;
  logs.push(`\nBúsqueda en "${txt}"`);
  while (i<txt.length) {
    if (txt[i]===pat[j]) {
      logs.push(`txt[${i}]=='${txt[i]}' coincide con pat[${j}]`);
      i++; j++;
      if (j===pat.length) {
        logs.push(`→ Patrón encontrado en índice ${i-j}`);
        result.push(i-j);
        j=lps[j-1];
      }
    } else {
      if (j!==0) {
        j=lps[j-1];
        logs.push(`Mismatch: retroceder j a ${j}`);
      } else {
        logs.push(`Mismatch: avanzar i`);
        i++;
      }
    }
  }
  return {result, lps};
};

const KMPPatternMatching = () => {
  const [text, setText] = useState("ababcabcabababd");
  const [pattern, setPattern] = useState("ababd");
  const [logs, setLogs] = useState([]);
  const [matches, setMatches] = useState([]);
  const [lps, setLps] = useState([]);

  const handleRun = () => {
    const steps=[];
    const {result,lps} = KMPSearch(text, pattern, steps);
    setMatches(result);
    setLogs(steps);
    setLps(lps);
  };

  return (
    <div className="algo-card">
      <h2>KMP Pattern Matching</h2>
      <div className="algo-input-row">
        <label>Texto<input className="algo-input" value={text} onChange={e=>setText(e.target.value)}/></label>
        <label>Patrón<input className="algo-input" value={pattern} onChange={e=>setPattern(e.target.value)}/></label>
        <button className="algo-btn" onClick={handleRun}>Buscar</button>
      </div>

      {matches.length>0 && (
        <div className="algo-result">
          Patrón encontrado en índices: {matches.map((m,i)=><span key={i} className="pill">{m}</span>)}
        </div>
      )}

      {lps.length>0 && (
        <div className="dp-wrap">
          <h3>Array LPS</h3>
          <div className="dp-array">
            {lps.map((v,i)=>(
              <div key={i} className="dp-box">
                <div className="dp-idx">{i}</div>
                <div className="dp-val">{v}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {logs.length>0 && (
        <div className="algo-steps">
          <h3>Pasos</h3>
          <ol>{logs.map((s,i)=><li key={i}>{s}</li>)}</ol>
        </div>
      )}

      <div className="algo-explainer">
        <h3>¿Qué estamos viendo?</h3>
        <p>
          KMP evita retrocesos innecesarios en el texto construyendo primero
          un array <code>lps</code> que indica la longitud del mayor prefijo
          que también es sufijo hasta cada índice.
        </p>
        <h3>Pseudocódigo</h3>
        <pre>{`buildLPS(pat):
  lps[0]=0; len=0
  for i=1..m-1:
    mientras len>0 y pat[i]!=pat[len]: len=lps[len-1]
    si pat[i]==pat[len]: len++; lps[i]=len

KMPSearch(txt,pat):
  i=0,j=0
  mientras i<n:
    si txt[i]==pat[j]: i++,j++
      si j==m: match en i-j; j=lps[j-1]
    else:
      si j!=0: j=lps[j-1]
      else: i++`}</pre>
      </div>
    </div>
  );
};

export default KMPPatternMatching;
