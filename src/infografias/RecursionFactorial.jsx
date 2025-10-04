
import React, { useState } from "react";

const RecursionFactorial = () => {
  const [n, setN] = useState(5);
  const [steps, setSteps] = useState([]);
  const [result, setResult] = useState(null);

  const calculateFactorial = () => {
    const logs = [];

    const factorial = (num) => {
      if (num === 0) {
        logs.push("Caso base: 0! = 1");
        return 1;
      }
      logs.push(`factorial(${num}) = ${num} * factorial(${num - 1})`);
      return num * factorial(num - 1);
    };

    const res = factorial(n);
    logs.push(`🎯 Resultado final: ${n}! = ${res}`);
    setSteps(logs);
    setResult(res);
  };

  return (
    <div className="algo-card">
      <h2>Recursión: Factorial</h2>
      <p>Calcula el factorial de un número usando recursión.</p>

      <label>
        Número (N):
        <input
          type="number"
          value={n}
          onChange={(e) => setN(parseInt(e.target.value))}
          className="algo-input"
        />
      </label>

      <button onClick={calculateFactorial} className="algo-btn">Calcular</button>

      {result !== null && (
        <div className="algo-result"><strong>Resultado:</strong> {n}! = {result}</div>
      )}

      {steps.length > 0 && (
        <div className="algo-steps"><h3>Pasos:</h3><ol>{steps.map((s, i) => <li key={i}>{s}</li>)}</ol></div>
      )}

      <div className="algo-explainer">
        <h3>Explicación</h3>
        <p>El factorial de un número es el producto de ese número por todos los enteros positivos menores. 
        Se define recursivamente como factorial(N) = N * factorial(N-1). 
        El caso base es 0! = 1. La pila de llamadas resuelve las llamadas en orden inverso.</p>
        <pre>{`function factorial(n):
  if n == 0:
    return 1
  else:
    return n * factorial(n-1)`}</pre>
      </div>
    </div>
  );
};

export default RecursionFactorial;
