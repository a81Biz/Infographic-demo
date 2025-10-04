import React, { useState } from "react";

const RomanToInteger = () => {
  const [input, setInput] = useState("MCMXCIV");
  const [result, setResult] = useState(null);
  const [steps, setSteps] = useState([]);

  const handleSolve = () => {
    setResult(input);
    setSteps(["Paso 1","Paso 2"]);
  };

  return (
    <div className="algo-card">
      <h2>📝 Reto: 13. Roman to Integer</h2>
<p>Dado un número en formato romano, conviértelo a un número entero. 
Los símbolos romanos incluyen I, V, X, L, C, D y M, con las reglas estándar de restas y sumas según su posición.</p>

      <div className="algo-input-group">
        <label>roman numeral:
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
        <div className="algo-section"><h3>📜 Pseudocódigo</h3><pre>{`func romanToInt(s):
  total=0
  para i en 0..len(s)-1:
    v=map[s[i]]; next=map[s[i+1]] si existe
    si v<next: total-=v
    sino: total+=v
  retornar total`}</pre></div>
        <div className="algo-section"><h3>🧭 ¿Qué debemos hacer?</h3><p>Sumamos los valores de las letras romanas, restando cuando una letra menor precede a una mayor.</p></div>
        <div className="algo-section"><h3>⏱️ Complejidad</h3><p>Tiempo: O(n). Espacio: O(1).</p></div>
        <div className="algo-section"><h3>💻 JavaScript</h3><pre>{`function romanToInt(s) {
  const map={I:1,V:5,X:10,L:50,C:100,D:500,M:1000};
  let total=0;
  for (let i=0; i<s.length; i++) {
    const v=map[s[i]], next=i+1<s.length?map[s[i+1]]:0;
    total += v<next? -v : v;
  }
  return total;
}`}</pre></div>
      </>) }
    </div>
  );
};

export default RomanToInteger;
