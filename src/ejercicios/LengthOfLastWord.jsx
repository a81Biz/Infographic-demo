import React, { useState } from "react";

const LengthOfLastWord = () => {
  const [input, setInput] = useState("Hello World");
  const [result, setResult] = useState(null);
  const [steps, setSteps] = useState([]);

  const handleSolve = () => {
    setResult(input);
    setSteps(["Paso 1","Paso 2"]);
  };

  return (
    <div className="algo-card">
      <h2>📝 Reto: 58. Length of Last Word</h2>
<p>Dada una cadena <code>s</code> que contiene palabras y espacios, devuelve la longitud de la última palabra. 
Una palabra se define como una secuencia máxima de caracteres no espaciales.</p>

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
        <div className="algo-section"><h3>📜 Pseudocódigo</h3><pre>{`func lengthOfLastWord(s):
  s=trim(s)
  idx=última posición de espacio
  si idx==-1: retornar len(s)
  sino: retornar len(s)-idx-1`}</pre></div>
        <div className="algo-section"><h3>🧭 ¿Qué debemos hacer?</h3><p>Eliminamos espacios extremos y contamos la longitud de la última palabra.</p></div>
        <div className="algo-section"><h3>⏱️ Complejidad</h3><p>Tiempo: O(n). Espacio: O(1).</p></div>
        <div className="algo-section"><h3>💻 JavaScript</h3><pre>{`function lengthOfLastWord(s) {
  s=s.trim();
  const i=s.lastIndexOf(" ");
  return i===-1 ? s.length : s.length-i-1;
}`}</pre></div>
      </>) }
    </div>
  );
};

export default LengthOfLastWord;
