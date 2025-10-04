import React, { useState } from "react";

const ProductExceptSelf = () => {
  const [nums, setNums] = useState("1,2,3,4");

  const [result, setResult] = useState(null);
  const [steps, setSteps] = useState([]);
  const [snapshots, setSnapshots] = useState([]);

  const handleSolve = () => {
    let arr = nums
      .split(",")
      .map((x) => x.trim())
      .filter((x) => x.length)
      .map(Number);

    const n = arr.length;
    let answer = new Array(n).fill(1);
    let stepLog = [];
    let pics = [];

    // Paso 1: Prefix
    let prefix = 1;
    for (let i = 0; i < n; i++) {
      answer[i] = prefix;
      stepLog.push(`Prefix en i=${i}: answer[${i}] = ${prefix}`);
      prefix *= arr[i];
      pics.push({ arr: [...answer], note: `Después de prefix i=${i}` });
    }

    // Paso 2: Suffix
    let suffix = 1;
    for (let i = n - 1; i >= 0; i--) {
      answer[i] *= suffix;
      stepLog.push(
        `Suffix en i=${i}: answer[${i}] *= ${suffix} → ${answer[i]}`
      );
      suffix *= arr[i];
      pics.push({ arr: [...answer], note: `Después de suffix i=${i}` });
    }

    setResult(answer);
    setSteps(stepLog);
    setSnapshots(pics);
  };

  return (
    <div className="algo-card">
      {/* 1) Reto */}
      <h2>📝 Reto: Producto de una matriz excepto uno mismo</h2>
      <p>
        Dado un array <b>nums</b>, devuelve un array <b>answer</b> donde{" "}
        <code>answer[i]</code> es el producto de todos los elementos excepto{" "}
        <code>nums[i]</code>. Debe hacerse en <b>O(n)</b> y sin usar división.
      </p>

      <div className="algo-input-group">
        <label>
          nums:
          <input
            className="algo-input"
            type="text"
            value={nums}
            onChange={(e) => setNums(e.target.value)}
            placeholder="1,2,3,4"
          />
        </label>
      </div>

      <button className="algo-btn" onClick={handleSolve}>
        Resolver
      </button>

      {/* 2) Resultado */}
      {result && (
        <div className="algo-result">
          <h3>✅ Resultado:</h3>
          <pre>{JSON.stringify(result)}</pre>

          {/* Visualización */}
          <div className="algo-steps" style={{ overflowX: "auto" }}>
            <h4>📊 Visualización de pasos</h4>
            <ul>
              {snapshots.map((s, idx) => (
                <li key={idx}>
                  {s.note}: {JSON.stringify(s.arr)}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* 3) Respuesta en JavaScript */}
      {result && (
        <div className="algo-explainer">
          <h3>💻 Respuesta en JavaScript</h3>
          <pre>{`var productExceptSelf = function(nums) {
  let n = nums.length;
  let answer = new Array(n).fill(1);

  // prefix
  let prefix = 1;
  for (let i = 0; i < n; i++) {
    answer[i] = prefix;
    prefix *= nums[i];
  }

  // suffix
  let suffix = 1;
  for (let i = n - 1; i >= 0; i--) {
    answer[i] *= suffix;
    suffix *= nums[i];
  }

  return answer;
};`}</pre>
        </div>
      )}

      {/* 4) Explicación */}
      {result && (
        <>
          <div className="algo-explainer">
            <h3>🧭 ¿Qué debemos hacer?</h3>
            <ul>
              <li>
                Construimos productos acumulados de izquierda a derecha
                (<b>prefix</b>).
              </li>
              <li>
                Luego multiplicamos productos acumulados de derecha a izquierda
                (<b>suffix</b>).
              </li>
              <li>
                Cada posición <code>i</code> tiene el producto de todos menos{" "}
                <code>nums[i]</code>.
              </li>
            </ul>
          </div>

          <div className="algo-explainer">
            <h3>⏱️ Complejidad & justificación</h3>
            <p>
              <b>Tiempo:</b> <code>O(n)</code>, dos pasadas lineales.  
              <b>Espacio:</b> <code>O(1)</code> extra (solo el resultado).  
              <b>Justificación:</b> El truco de prefix+suffix evita usar división
              y solo recorre el array dos veces.
            </p>
          </div>

          <div className="algo-steps">
            <h3>🧩 Pasos del algoritmo</h3>
            <ol>
              {steps.map((s, idx) => (
                <li key={idx}>{s}</li>
              ))}
            </ol>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductExceptSelf;
