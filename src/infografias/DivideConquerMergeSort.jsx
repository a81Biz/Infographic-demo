import React, { useState } from "react";

const DivideConquerMergeSort = () => {
  const [array, setArray] = useState("5,2,8,1,9");
  const [steps, setSteps] = useState([]);
  const [result, setResult] = useState([]);

  const merge = (left, right, logs) => {
    let result = [];
    let i = 0, j = 0;

    logs.push(`Mezclando [${left}] con [${right}]`);

    while (i < left.length && j < right.length) {
      if (left[i] < right[j]) {
        result.push(left[i++]);
      } else {
        result.push(right[j++]);
      }
    }
    result = [...result, ...left.slice(i), ...right.slice(j)];

    logs.push(`Resultado de mezcla: [${result}]`);
    return result;
  };

  const mergeSort = (arr, logs) => {
    if (arr.length <= 1) return arr;

    const mid = Math.floor(arr.length / 2);
    logs.push(`Dividiendo [${arr}] → [${arr.slice(0, mid)}] y [${arr.slice(mid)}]`);

    const left = mergeSort(arr.slice(0, mid), logs);
    const right = mergeSort(arr.slice(mid), logs);

    return merge(left, right, logs);
  };

  const handleSort = () => {
    const nums = array.split(",").map((x) => parseInt(x.trim()));
    const logs = [];
    const sorted = mergeSort(nums, logs);
    logs.push(`🎯 Resultado final: [${sorted}]`);
    setSteps(logs);
    setResult(sorted);
  };

  return (
    <div className="algo-card">
      <h2>Divide and Conquer: Merge Sort</h2>
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
        <h3>Visualización</h3>
        <p>Cada división y mezcla se muestra en los pasos. Observa cómo el array se divide en mitades y luego se combina en orden.</p>
      </div>
    </div>
  );
};

export default DivideConquerMergeSort;
