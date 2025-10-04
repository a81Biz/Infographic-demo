import React, { useState } from "react";

const IntegerToRoman = () => {
  const [input, setInput] = useState("1994");
  const [result, setResult] = useState(null);
  const [steps, setSteps] = useState([]);

  const handleSolve = () => {
    setResult(input);
    setSteps(["Paso 1","Paso 2"]);
  };

  return (
    <div className="algo-card">
      <h2>📝 Reto: 12. Integer to Roman</h2>
<p>Dado un número entero, conviértelo a su representación en numerales romanos. 
El resultado debe cumplir las reglas estándar de los símbolos I, V, X, L, C, D y M.</p>

      <div className="algo-input-group">
        <label>integer:
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
        <div className="algo-section"><h3>📜 Pseudocódigo</h3><pre>{`func intToRoman(num):
  vals=[1000,900,500,400,100,90,50,40,10,9,5,4,1]
  syms=[M,CM,D,CD,C,XC,L,XL,X,IX,V,IV,I]
  out=""
  para i en 0..len(vals)-1:
    mientras num>=vals[i]:
      out+=syms[i]; num-=vals[i]
  retornar out`}</pre></div>
        <div className="algo-section"><h3>🧭 ¿Qué debemos hacer?</h3><p>Aplicamos greedy restando los valores romanos más grandes posibles sucesivamente.</p></div>
        <div className="algo-section"><h3>⏱️ Complejidad</h3><p>Tiempo: O(1). Espacio: O(1).</p></div>
        <div className="algo-section"><h3>💻 JavaScript</h3><pre>{`function intToRoman(num) {
  const vals=[1000,900,500,400,100,90,50,40,10,9,5,4,1];
  const syms=["M","CM","D","CD","C","XC","L","XL","X","IX","V","IV","I"];
  let out="";
  for (let i=0;i<vals.length;i++){
    while(num>=vals[i]) { out+=syms[i]; num-=vals[i]; }
  }
  return out;
}`}</pre></div>
      </>) }
    </div>
  );
};

export default IntegerToRoman;
