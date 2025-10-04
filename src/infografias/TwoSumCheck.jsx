import React, { useState } from "react";

const TwoSumCheck = () => {
  const [arrayInput, setArrayInput] = useState("2,7,11,15");
  const [target, setTarget] = useState(9);
  const [steps, setSteps] = useState([]);
  const [result, setResult] = useState(null);

  const checkTwoSum = () => {
    const nums = arrayInput
      .split(",")
      .map((n) => parseInt(n.trim(), 10))
      .filter((n) => !isNaN(n));

    let left = 0;
    let right = nums.length - 1;
    const stepLogs = [];

    while (left < right) {
      const sum = nums[left] + nums[right];
      stepLogs.push(
        `Comparando: nums[${left}] = ${nums[left]} + nums[${right}] = ${nums[right]} → suma = ${sum}`
      );

      if (sum === target) {
        stepLogs.push(
          `✅ Encontrado: ${nums[left]} + ${nums[right]} = ${target}`
        );
        setSteps(stepLogs);
        setResult([nums[left], nums[right]]);
        return;
      }

      if (sum < target) {
        stepLogs.push(
          `Suma (${sum}) < target (${target}) → mover puntero izquierdo (left++)`
        );
        left++;
      } else {
        stepLogs.push(
          `Suma (${sum}) > target (${target}) → mover puntero derecho (right--)`
        );
        right--;
      }
    }

    stepLogs.push("❌ No se encontraron dos números que sumen el objetivo.");
    setSteps(stepLogs);
    setResult(null);
  };

  return (
    <div className="algo-card">
      <h2>Two Sum (Paso a Paso)</h2>
      <p>
        Ingresa un array ordenado y un objetivo. El algoritmo buscará dos números que sumen ese valor.
      </p>

      <input
        value={arrayInput}
        onChange={(e) => setArrayInput(e.target.value)}
        type="text"
        placeholder="Ejemplo: 2,7,11,15"
        className="algo-input"
      />

      <input
        value={target}
        onChange={(e) => setTarget(parseInt(e.target.value, 10))}
        type="number"
        placeholder="Target"
        className="algo-input"
      />

      <button onClick={checkTwoSum} className="algo-btn">
        Verificar
      </button>

      {result && (
        <div className="algo-result">
          <p>
            <strong>Resultado Final:</strong>{" "}
            <span className="palindrome-yes">
              {result[0]} + {result[1]} = {target} ✅
            </span>
          </p>
        </div>
      )}

      {!result && steps.length > 0 && (
        <div className="algo-result">
          <p>
            <strong>Resultado Final:</strong>{" "}
            <span className="palindrome-no">
              Ninguna combinación encontrada ❌
            </span>
          </p>
        </div>
      )}

      {steps.length > 0 && (
        <div className="algo-steps">
          <h3>Pasos del Algoritmo</h3>
          <ol>
            {steps.map((s, idx) => (
              <li key={idx}>{s}</li>
            ))}
          </ol>
        </div>
      )}

      <div className="algo-explainer">
        <h3>Algoritmo (Two Pointers)</h3>
        <pre>
{`let left = 0;
let right = nums.length - 1;

while (left < right) {
  let sum = nums[left] + nums[right];
  if (sum === target) return [nums[left], nums[right]];
  if (sum < target) left++;
  else right--;
}`}
        </pre>
      </div>
    </div>
  );
};

export default TwoSumCheck;
