import React, { useState } from "react";

const ReverseWordsInAString = () => {
  const [input, setInput] = useState("the sky is blue");
  const [result, setResult] = useState(null);
  const [steps, setSteps] = useState([]);

  const handleSolve = () => {
    setResult(input);
    setSteps(["Paso 1","Paso 2"]);
  };

  return (
    <div className="algo-card">
      <h2>📝 Reto: 151. Reverse Words in a String</h2>
<p>Dada una cadena <code>s</code>, invierte el orden de las palabras. 
Una palabra se define como una secuencia de caracteres no espaciales. 
Debes eliminar los espacios adicionales y devolver la cadena con las palabras separadas por un solo espacio.</p>

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
        <div className="algo-section"><h3>📜 Pseudocódigo</h3><pre>{`func reverseWords(s):
  s=trim(s)
  palabras=split(s)
  retornar join(reverse(palabras)," ")`}</pre></div>
        <div className="algo-section"><h3>🧭 ¿Qué debemos hacer?</h3><p>Eliminamos espacios extra, dividimos en palabras, invertimos la lista y la unimos con un espacio.</p></div>
        <div className="algo-section"><h3>⏱️ Complejidad</h3><p>Tiempo: O(n). Espacio: O(n).</p></div>
        <div className="algo-section"><h3>💻 JavaScript</h3><pre>{`function reverseWords(s) {
  return s.trim().split(/\s+/).reverse().join(" ");
}`}</pre></div>
      </>) }
    </div>
  );
};

export default ReverseWordsInAString;
