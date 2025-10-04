
import React, { useState } from "react";

const BacktrackingPermutations = () => {
  const [text, setText] = useState("ABC");
  const [steps, setSteps] = useState([]);
  const [result, setResult] = useState([]);

  const permute = (arr, l, r, logs, results) => {
    if (l === r) {
      results.push(arr.join(""));
      logs.push(`✅ Permutación: ${arr.join("")}`);
    } else {
      for (let i = l; i <= r; i++) {
        [arr[l], arr[i]] = [arr[i], arr[l]];
        logs.push(`Fijo ${arr[l]} en posición ${l}`);
        permute(arr, l + 1, r, logs, results);
        [arr[l], arr[i]] = [arr[i], arr[l]];
        logs.push(`🔄 Backtrack: deshago intercambio`);
      }
    }
  };

  const handlePermutations = () => {
    const chars = text.split("");
    const logs = [];
    const results = [];
    permute(chars, 0, chars.length - 1, logs, results);
    setSteps(logs);
    setResult(results);
  };

  return (
    <div className="algo-card">
      <h2>Backtracking: Permutaciones</h2>
      <label>
        Texto:
        <input value={text} onChange={(e) => setText(e.target.value)} className="algo-input" />
      </label>
      <button onClick={handlePermutations} className="algo-btn">Generar</button>

      {result.length > 0 && <div className="algo-result"><strong>Resultado:</strong> {result.join(", ")}</div>}
      {steps.length > 0 && <div className="algo-steps"><h3>Pasos:</h3><ol>{steps.map((s,i)=><li key={i}>{s}</li>)}</ol></div>}

      <div className="algo-explainer">
        <h3>Explicación</h3>
        <p>El algoritmo de permutaciones genera todas las combinaciones posibles fijando un carácter y recursivamente
        permutando el resto. Cuando se regresa, se aplica backtracking para restaurar el estado y probar la siguiente opción.</p>
      </div>
    </div>
  );
};

export default BacktrackingPermutations;
