import React, { useState } from "react";

const DivideConquerQuickSort = () => {
  const [array, setArray] = useState("5,2,8,1,9");
  const [steps, setSteps] = useState([]);
  const [result, setResult] = useState([]);

  const quickSort = (arr, logs) => {
    if (arr.length <= 1) return arr;

    const pivot = arr[arr.length - 1];
    const left = [];
    const right = [];

    logs.push(`Pivote elegido: ${pivot} en [${arr}]`);

    for (let i = 0; i < arr.length - 1; i++) {
      if (arr[i] < pivot) {
        left.push(arr[i]);
        logs.push(`${arr[i]} < ${pivot} → va a izquierda`);
      } else {
        right.push(arr[i]);
        logs.push(`${arr[i]} ≥ ${pivot} → va a derecha`);
      }
    }

    const sortedLeft = quickSort(left, logs);
    const sortedRight = quickSort(right, logs);
    const combined = [...sortedLeft, pivot, ...sortedRight];

    logs.push(`Combinado: [${combined}]`);
    return combined;
  };

  const handleSort = () => {
    const nums = array.split(",").map((x) => parseInt(x.trim()));
    const logs = [];
    const sorted = quickSort(nums, logs);
    logs.push(`🎯 Resultado final: [${sorted}]`);
    setSteps(logs);
    setResult(sorted);
  };

  return (
    <div className="algo-card">
      <h2>Divide and Conquer: Quick Sort</h2>
      <label>
        Array:
        <input
          value={array}
          onChange={(e) => setArray(e.target.value)}
          className="algo-input"
        />
      </label>
      <button onClick={handleSort} className="algo-btn">Ordenar</button>

      {result.length > 0 && (
        <div className="algo-result">
          <strong>Ordenado:</strong> [{result.join(", ")}]
        </div>
      )}

      {steps.length > 0 && (
        <div className="algo-steps">
          <h3>Pasos</h3>
          <ol>{steps.map((s, i) => <li key={i}>{s}</li>)}</ol>
        </div>
      )}

      <div className="algo-explainer">
        <h3>Explicación</h3>
        <p>
          QuickSort selecciona un <strong>pivote</strong>, divide el array en
          dos (menores a la izquierda y mayores a la derecha) y ordena cada parte
          recursivamente. Al combinar, el array queda ordenado.
        </p>
      </div>
    </div>
  );
};

export default DivideConquerQuickSort;
