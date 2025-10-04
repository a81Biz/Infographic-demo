import React, { useState } from "react";

const PalindromeCheck = () => {
  const [inputText, setInputText] = useState("");
  const [steps, setSteps] = useState([]);
  const [result, setResult] = useState(null);

  const checkPalindrome = () => {
    const clean = inputText.toLowerCase().replace(/[^a-z0-9]/g, "");
    let left = 0;
    let right = clean.length - 1;
    const stepLogs = [];

    while (left < right) {
      stepLogs.push(
        `Comparando: "${clean[left]}" (posición ${left}) con "${clean[right]}" (posición ${right})`
      );

      if (clean[left] !== clean[right]) {
        stepLogs.push(
          `❌ Diferencia encontrada: "${clean[left]}" ≠ "${clean[right]}".`
        );
        setSteps(stepLogs);
        setResult(false);
        return;
      }

      stepLogs.push(`✅ Coinciden: avanzamos -> left=${left + 1}, right=${right - 1}`);
      left++;
      right--;
    }

    stepLogs.push("✅ Todos los pares coinciden, es un palíndromo.");
    setSteps(stepLogs);
    setResult(true);
  };

  return (
    <div className="algo-card">
      <h2>Palindrome Check (Paso a Paso)</h2>
      <p>Ingresa una palabra o frase para verificar si es un palíndromo:</p>

      <input
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        type="text"
        placeholder="Escribe aquí..."
        className="algo-input"
      />

      <button onClick={checkPalindrome} className="algo-btn">
        Verificar
      </button>

      {result !== null && (
        <div className="algo-result">
          <p>
            <strong>Resultado Final:</strong>{" "}
            <span className={result ? "palindrome-yes" : "palindrome-no"}>
              {result ? "Es un palíndromo ✅" : "No es un palíndromo ❌"}
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
let right = text.length - 1;

while (left < right) {
  if (text[left] !== text[right]) return false;
  left++;
  right--;
}
return true;`}
        </pre>
      </div>
    </div>
  );
};

export default PalindromeCheck;
