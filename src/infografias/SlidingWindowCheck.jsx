import React, { useState } from "react";

const SlidingWindowCheck = () => {
  const [inputText, setInputText] = useState("abcabcbb");
  const [steps, setSteps] = useState([]);
  const [result, setResult] = useState(null);

  const checkSlidingWindow = () => {
    let left = 0;
    let seen = new Set();
    let maxLength = 0;
    const stepLogs = [];

    for (let right = 0; right < inputText.length; right++) {
      const char = inputText[right];

      stepLogs.push(
        `➡️ Avanzamos R=${right}, char="${char}". Ventana actual: [${left},${right}]`
      );

      // Si ya vimos este char, movemos L hasta que sea válido
      while (seen.has(char)) {
        stepLogs.push(
          `⚠️ "${char}" ya está en la ventana → eliminamos "${inputText[left]}" (L=${left}) y movemos L`
        );
        seen.delete(inputText[left]);
        left++;
      }

      seen.add(char);
      const currentLength = right - left + 1;
      maxLength = Math.max(maxLength, currentLength);

      stepLogs.push(
        `✅ Ventana válida: "${inputText.slice(left, right + 1)}" (longitud=${currentLength}), max=${maxLength}`
      );
    }

    stepLogs.push(`🎯 Resultado final: Longitud máxima = ${maxLength}`);
    setSteps(stepLogs);
    setResult(maxLength);
  };

  return (
    <div className="algo-card">
      <h2>Sliding Window: Substring más largo sin repetir</h2>
      <p>
        Ingresa un string para encontrar el substring más largo sin caracteres repetidos.
      </p>

      <input
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        type="text"
        placeholder="Ejemplo: abcabcbb"
        className="algo-input"
      />

      <button onClick={checkSlidingWindow} className="algo-btn">
        Verificar
      </button>

      {result !== null && (
        <div className="algo-result">
          <p>
            <strong>Resultado Final:</strong>{" "}
            <span className="palindrome-yes">
              Longitud máxima = {result}
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
        <h3>Algoritmo (Sliding Window)</h3>
        <pre>
{`let left = 0;
let seen = new Set();
let maxLength = 0;

for (let right = 0; right < text.length; right++) {
  while (seen.has(text[right])) {
    seen.delete(text[left]);
    left++;
  }
  seen.add(text[right]);
  maxLength = Math.max(maxLength, right - left + 1);
}`}
        </pre>
      </div>
    </div>
  );
};

export default SlidingWindowCheck;
