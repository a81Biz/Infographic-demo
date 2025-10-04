import React, { useState } from "react";

const Candy = () => {
  const [input, setInput] = useState("1,0,2");
  const [result, setResult] = useState(null);
  const [steps, setSteps] = useState([]);

  const handleSolve = () => {
    setResult(input);
    setSteps(["Paso 1","Paso 2"]);
  };

  return (
    <div className="algo-card">
  <h2>📝 Reto: 135. Candy</h2>
<p>Se te da un array <code>ratings</code> que representa la calificación de cada niño. 
Debes distribuir caramelos de forma que cada niño tenga al menos un caramelo y que los niños con una calificación más alta que sus vecinos reciban más caramelos. 
Devuelve el número mínimo total de caramelos necesarios.</p>
      <div className="algo-input-group">
        <label>ratings array:
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
        <div className="algo-explainer"><h3>📜 Pseudocódigo</h3><pre>{`func candy(ratings):
  n=len(ratings); candies=[1]*n
  para i=1..n-1:
    si ratings[i]>ratings[i-1]: candies[i]=candies[i-1]+1
  para i=n-2..0:
    si ratings[i]>ratings[i+1]: candies[i]=max(candies[i],candies[i+1]+1)
  retornar sum(candies)`}</pre></div>
        <div className="algo-explainer "><h3>🧭 ¿Qué debemos hacer?</h3><p>Primero de izquierda a derecha asignamos caramelos extra a los niños con rating mayor que su vecino izquierdo. Luego de derecha a izquierda corregimos comparando con el vecino derecho.</p></div>
        <div className="algo-explainer "><h3>⏱️ Complejidad</h3><p>Tiempo: O(n). Espacio: O(n).</p></div>
        <div className="algo-explainer "><h3>💻 JavaScript</h3><pre>{`function candy(ratings) {
  const n = ratings.length;
  const candies = Array(n).fill(1);
  for (let i=1; i<n; i++) {
    if (ratings[i] > ratings[i-1]) candies[i] = candies[i-1]+1;
  }
  for (let i=n-2; i>=0; i--) {
    if (ratings[i] > ratings[i+1]) candies[i] = Math.max(candies[i], candies[i+1]+1);
  }
  return candies.reduce((a,b)=>a+b,0);
}`}</pre></div>
      </>) }
    </div>
  );
};

export default Candy;
