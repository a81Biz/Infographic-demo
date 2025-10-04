import React, { useState } from "react";

const SlidingWindowSum = () => {
  const [arrayInput, setArrayInput] = useState("4,2,1,7,8,1,2,8,1");
  const [k, setK] = useState(3);
  const [steps, setSteps] = useState([]);
  const [result, setResult] = useState(null);

  const calculateMaxSum = () => {
    const nums = arrayInput
      .split(",")
      .map((n) => parseInt(n.trim()))
      .filter((n) => !isNaN(n));

    const stepLogs = [];
    let windowSum = 0;
    let maxSum = 0;

    // suma inicial de la primera ventana
    for (let i = 0; i < k; i++) {
      windowSum += nums[i];
    }
    maxSum = windowSum;
    stepLogs.push(`Ventana inicial [0-${k - 1}] suma=${windowSum}`);

    for (let end = k; end < nums.length; end++) {
      windowSum += nums[end] - nums[end - k];
      stepLogs.push(
        `Ventana [${end - k + 1}-${end}] → sumamos nums[${end}]=${
          nums[end]
        }, restamos nums[${end - k}]=${
          nums[end - k]
        } → nueva suma=${windowSum}`
      );
      maxSum = Math.max(maxSum, windowSum);
    }

    stepLogs.push(`🎯 Resultado final: suma máxima=${maxSum}`);
    setSteps(stepLogs);
    setResult(maxSum);
  };

  return (
    <div className="algo-card">
      <h2>Sliding Window: Subarray Máximo</h2>
      <p>
        Ingresa un array y el valor de K para calcular la suma máxima de una
        ventana fija.
      </p>

      <div className="algo-input-group">
        <label>
          Array de números (separados por comas):
          <input
            value={arrayInput}
            onChange={(e) => setArrayInput(e.target.value)}
            className="algo-input"
          />
        </label>
      </div>

      <div className="algo-input-group">
        <label>
          Tamaño de la ventana (K):
          <input
            type="number"
            value={k}
            onChange={(e) => setK(parseInt(e.target.value))}
            className="algo-input"
          />
        </label>
      </div>

      <button onClick={calculateMaxSum} className="algo-btn">
        Calcular
      </button>

      {result !== null && (
        <div className="algo-result">
          <strong>Resultado:</strong>{" "}
          <span className="palindrome-yes">Máxima suma = {result}</span>
        </div>
      )}

      {steps.length > 0 && (
        <div className="algo-steps">
          <h3>Pasos:</h3>
          <ol>
            {steps.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ol>
        </div>
      )}

      <div className="algo-explainer">
        <h3>Algoritmo (Sliding Window)</h3>
        <pre>
{`maxSum = 0
windowSum = sum(nums[0..k-1])
maxSum = windowSum

for end in range(k, nums.length):
    windowSum += nums[end] - nums[end-k]
    maxSum = max(maxSum, windowSum)

return maxSum`}
        </pre>
      </div>
    </div>
  );
};

export default SlidingWindowSum;
