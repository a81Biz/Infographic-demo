import React, { useState } from "react";

const FindFirstOccurrence = () => {
  const [input, setInput] = useState("sadbutsad,sad");
  const [result, setResult] = useState(null);
  const [steps, setSteps] = useState([]);

  const handleSolve = () => {
    setResult(input);
    setSteps(["Paso 1","Paso 2"]);
  };

  return (
    <div className="algo-card">
      <h2>📝 Reto: 28. Find the Index of the First Occurrence in a String</h2>
      <p>Busca substring en string.</p>
      <div className="algo-input-group">
        <label>haystack/needle:
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
        <div className="algo-section"><h3>📜 Pseudocódigo</h3><pre>{`func strStr(haystack,needle):
  para i en 0..len(haystack)-len(needle):
    si haystack[i..i+m]==needle: retornar i
  retornar -1`}</pre></div>
        <div className="algo-section"><h3>🧭 ¿Qué debemos hacer?</h3><p>Recorremos la cadena principal buscando la primera coincidencia exacta del patrón.</p></div>
        <div className="algo-section"><h3>⏱️ Complejidad</h3><p>Tiempo: O(n*m). Espacio: O(1).</p></div>
        <div className="algo-section"><h3>💻 JavaScript</h3><pre>{`function strStr(haystack,needle) {
  return haystack.indexOf(needle);
}`}</pre></div>
      </>) }
    </div>
  );
};

export default FindFirstOccurrence;
