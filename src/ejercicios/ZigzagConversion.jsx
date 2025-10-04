import React, { useState } from "react";

const ZigzagConversion = () => {
  const [input, setInput] = useState("PAYPALISHIRING");
  const [result, setResult] = useState(null);
  const [steps, setSteps] = useState([]);

  const handleSolve = () => {
    setResult(input);
    setSteps(["Paso 1","Paso 2"]);
  };

  return (
    <div className="algo-card">
      <h2>📝 Reto: 6. Zigzag Conversion</h2>
<p>Dado un texto y un número de filas, convierte la cadena a un patrón en zigzag y devuelve la lectura línea por línea. 
Este patrón se construye bajando y subiendo diagonalmente entre las filas.</p>

      <div className="algo-input-group">
        <label>texto:
          <input className="algo-input" value={input} onChange={(e)=>setInput(e.target.value)} />
        </label>
      </div>
      <button className="algo-btn" onClick={handleSolve}>Resolver</button>
      {result!==null && (
        <div className="algo-result"><h3>✅ Resultado:</h3><pre>{JSON.stringify(result,null,2)}</pre></div>
      )}
      {result!==null && (
        <div className="algo-steps"><h3>🧩 Pasos del algoritmo</h3><ol>{steps.map((s,i)=>(<li key={i}>{s}</li>))}</ol></div>
      )}
      {result!==null && (<>
        <div className="algo-section"><h3>📜 Pseudocódigo</h3><pre>{`func convert(s,numRows):
  si numRows<=1: retornar s
  filas=[""]*numRows
  cur=0; dir=-1
  para ch en s:
    filas[cur]+=ch
    si cur==0 o cur==numRows-1: dir*=-1
    cur+=dir
  retornar join(filas)`}</pre></div>
        <div className="algo-section"><h3>🧭 ¿Qué debemos hacer?</h3><p>Simulamos el recorrido en zigzag colocando cada caracter en su fila correspondiente y concatenamos las filas al final.</p></div>
        <div className="algo-section"><h3>⏱️ Complejidad</h3><p>Tiempo: O(n). Espacio: O(n).</p></div>
        <div className="algo-section"><h3>💻 JavaScript</h3><pre>{`function convert(s,numRows) {
  if (numRows<=1 || s.length<=numRows) return s;
  const rows=Array.from({length:numRows},()=>[]);
  let cur=0, dir=-1;
  for (const ch of s) {
    rows[cur].push(ch);
    if (cur===0||cur===numRows-1) dir*=-1;
    cur+=dir;
  }
  return rows.map(r=>r.join("")).join("");
}`}</pre></div>
      </>) }
    </div>
  );
};

export default ZigzagConversion;
