
import React, { useState } from "react";

const RecursionFibonacci = () => {
  const [n, setN] = useState(6);
  const [steps, setSteps] = useState([]);
  const [result, setResult] = useState(null);

  const fib = (num, logs) => {
    if (num === 0) {
      logs.push("fib(0) = 0 (caso base)");
      return 0;
    }
    if (num === 1) {
      logs.push("fib(1) = 1 (caso base)");
      return 1;
    }
    logs.push(`fib(${num}) = fib(${num - 1}) + fib(${num - 2})`);
    return fib(num - 1, logs) + fib(num - 2, logs);
  };

  const calculateFibonacci = () => {
    const logs = [];
    const res = fib(n, logs);
    logs.push(`🎯 Resultado: fib(${n}) = ${res}`);
    setSteps(logs);
    setResult(res);
  };

  return (
    <div className="algo-card">
      <h2>Recursión: Fibonacci</h2>
      <label>
        Número (N):
        <input type="number" value={n} onChange={(e) => setN(parseInt(e.target.value))} className="algo-input"/>
      </label>
      <button onClick={calculateFibonacci} className="algo-btn">Calcular</button>

      {result !== null && <div className="algo-result"><strong>Resultado:</strong> fib({n}) = {result}</div>}

      {steps.length > 0 && <div className="algo-steps"><h3>Pasos:</h3><ol>{steps.map((s, i) => <li key={i}>{s}</li>)}</ol></div>}

      <div className="algo-explainer">
        <h3>Explicación</h3>
        <p>La sucesión de Fibonacci se define como F(0)=0, F(1)=1 y F(N)=F(N-1)+F(N-2). 
        La recursión crea un árbol de llamadas que se resuelve al llegar a los casos base.</p>
        <pre>{`function fib(n):
  if n==0: return 0
  if n==1: return 1
  return fib(n-1) + fib(n-2)`}</pre>
      </div>
    </div>
  );
};

export default RecursionFibonacci;
