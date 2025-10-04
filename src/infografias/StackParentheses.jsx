
import React, { useState } from "react";

const StackParentheses = () => {
  const [inputText, setInputText] = useState("({[]})");
  const [steps, setSteps] = useState([]);
  const [result, setResult] = useState(null);

  const checkParentheses = () => {
    const stack = [];
    const pairs = { ")": "(", "}": "{", "]": "[" };
    const stepLogs = [];

    for (let i = 0; i < inputText.length; i++) {
      const char = inputText[i];
      if (["(", "{", "["].includes(char)) {
        stack.push(char);
        stepLogs.push(`Push '${char}' → Stack: [${stack.join(", ")}]`);
      } else if (pairs[char]) {
        const top = stack.pop();
        stepLogs.push(`Pop '${top}' para cerrar '${char}' → Stack: [${stack.join(", ")}]`);
        if (top !== pairs[char]) {
          stepLogs.push(`❌ Error: '${char}' no cierra correctamente.`);
          setSteps(stepLogs);
          setResult(false);
          return;
        }
      }
    }

    if (stack.length === 0) {
      stepLogs.push("✅ Todos los paréntesis están balanceados.");
      setResult(true);
    } else {
      stepLogs.push("❌ Stack no vacío → paréntesis desbalanceados.");
      setResult(false);
    }

    setSteps(stepLogs);
  };

  return (
    <div className="algo-card">
      <h2>Stack: Verificación de Paréntesis</h2>
      <input value={inputText} onChange={(e) => setInputText(e.target.value)} className="algo-input" />
      <button onClick={checkParentheses} className="algo-btn">Verificar</button>

      {result !== null && (
        <div className="algo-result">
          <strong>Resultado Final:</strong>{" "}
          {result ? <span className="palindrome-yes">Balanceado ✅</span> : <span className="palindrome-no">No balanceado ❌</span>}
        </div>
      )}

      {steps.length > 0 && (
        <div className="algo-steps">
          <h3>Pasos:</h3>
          <ol>{steps.map((s, i) => <li key={i}>{s}</li>)}</ol>
        </div>
      )}
    </div>
  );
};

export default StackParentheses;
