import React, { useState } from "react";

const LongestCommonPrefix = () => {
  const [input, setInput] = useState("flower,flow,flight");
  const [result, setResult] = useState(null);
  const [steps, setSteps] = useState([]);

  const handleSolve = () => {
    setResult(input);
    setSteps(["Paso 1","Paso 2"]);
  };

  return (
    <div className="algo-card">
      <h2>📝 Reto: 14. Longest Common Prefix</h2>
<p>Escribe una función para encontrar el prefijo común más largo entre un conjunto de cadenas. 
Si no hay prefijo común, devuelve una cadena vacía <code>""</code>.</p>

      <div className="algo-input-group">
        <label>palabras:
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
        <div className="algo-section"><h3>📜 Pseudocódigo</h3><pre>{`func longestCommonPrefix(strs):
  si vacío: retornar ""
  p=strs[0]
  para s en strs[1..]:
    mientras s no comience con p:
      p=p[:-1]
      si p=="": retornar ""
  retornar p`}</pre></div>
        <div className="algo-section"><h3>🧭 ¿Qué debemos hacer?</h3><p>Iniciamos con el primer string como prefijo y lo reducimos hasta que todos los demás lo compartan.</p></div>
        <div className="algo-section"><h3>⏱️ Complejidad</h3><p>Tiempo: O(S). Espacio: O(1).</p></div>
        <div className="algo-section"><h3>💻 JavaScript</h3><pre>{`function longestCommonPrefix(strs) {
  if(!strs.length) return "";
  let p=strs[0];
  for (let i=1; i<strs.length; i++) {
    while (strs[i].indexOf(p)!==0) {
      p=p.slice(0,-1);
      if (!p) return "";
    }
  }
  return p;
}`}</pre></div>
      </>) }
    </div>
  );
};

export default LongestCommonPrefix;
