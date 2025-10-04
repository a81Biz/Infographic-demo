import React, { useState } from "react";

const RabinKarp = () => {
  const [text, setText] = useState("GEEKS FOR GEEKS");
  const [pattern, setPattern] = useState("GEEK");
  const [logs, setLogs] = useState([]);
  const [matches, setMatches] = useState([]);

  const d = 256; // número de caracteres posibles
  const q = 101; // número primo para módulo

  const handleRun = () => {
    const n = text.length;
    const m = pattern.length;
    let h = 1;
    const steps = [];

    // valor de h = (d^(m-1)) % q
    for (let i=0;i<m-1;i++) h = (h*d)%q;

    // calcular hash inicial
    let p=0, t=0;
    for (let i=0;i<m;i++) {
      p = (d*p + pattern.charCodeAt(i))%q;
      t = (d*t + text.charCodeAt(i))%q;
    }
    steps.push(`Hash patrón = ${p}`);

    const found=[];
    for (let i=0;i<=n-m;i++) {
      steps.push(`Ventana ${i}-${i+m-1}: hash=${t}`);
      if (p===t) {
        steps.push(`  Posible match en ${i}, verificar caracteres...`);
        if (text.slice(i,i+m)===pattern) {
          steps.push(`  ✔ Match confirmado en índice ${i}`);
          found.push(i);
        } else {
          steps.push(`  ✘ Falsa alarma (colisión hash)`);
        }
      }
      if (i<n-m) {
        t = (d*(t - text.charCodeAt(i)*h) + text.charCodeAt(i+m))%q;
        if (t<0) t+=q;
      }
    }
    setMatches(found);
    setLogs(steps);
  };

  return (
    <div className="algo-card">
      <h2>Rabin-Karp Pattern Matching</h2>
      <div className="algo-input-row">
        <label>Texto
          <input className="algo-input" value={text} onChange={e=>setText(e.target.value)}/>
        </label>
        <label>Patrón
          <input className="algo-input" value={pattern} onChange={e=>setPattern(e.target.value)}/>
        </label>
        <button className="algo-btn" onClick={handleRun}>Buscar</button>
      </div>

      {matches.length>0 && (
        <div className="algo-result">
          Patrón encontrado en índices: {matches.map((m,i)=><span key={i} className="pill">{m}</span>)}
        </div>
      )}
      {matches.length===0 && logs.length>0 && (
        <div className="algo-result">No se encontraron coincidencias.</div>
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
          Rabin-Karp usa un <strong>rolling hash</strong> para evitar recalcular 
          desde cero cada ventana. Si el hash coincide con el del patrón, 
          verificamos carácter por carácter para evitar colisiones.
        </p>
        <h3>Pseudocódigo</h3>
        <pre>{`precompute h = (d^(m-1)) mod q
hash patrón p, hash primera ventana t

para i=0..n-m:
  si p==t:
    verificar caracteres
    si iguales → match
  si i<n-m:
    actualizar t usando fórmula rolling hash:
    t = (d*(t - txt[i]*h) + txt[i+m]) mod q`}</pre>
      </div>
    </div>
  );
};

export default RabinKarp;
