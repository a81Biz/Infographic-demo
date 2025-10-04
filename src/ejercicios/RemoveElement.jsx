// src/ejercicios/RemoveElement.jsx
import React, { useState } from "react";

const RemoveElement = () => {
  const [nums, setNums] = useState("3,2,2,3");
  const [val, setVal] = useState(3);

  const [result, setResult] = useState(null);
  const [kValue, setKValue] = useState(null);
  const [steps, setSteps] = useState([]);
  const [snapshots, setSnapshots] = useState([]);

  const handleSolve = () => {
    let arr = nums
      .split(",")
      .map((x) => x.trim())
      .filter((x) => x.length)
      .map(Number);

    let k = 0; // índice donde colocamos los que se quedan
    const stepLog = [];
    const pics = [];

    pics.push({ arr: [...arr], note: "Estado inicial", k });

    for (let i = 0; i < arr.length; i++) {
      if (arr[i] !== val) {
        arr[k] = arr[i];
        stepLog.push(
          `nums[${i}] = ${arr[i]} ≠ ${val} → se queda en posición ${k}`
        );
        pics.push({
          arr: [...arr],
          note: `Colocado ${arr[i]} en índice ${k}`,
          k: k + 1,
        });
        k++;
      } else {
        stepLog.push(`nums[${i}] = ${arr[i]} == ${val} → se descarta`);
        pics.push({
          arr: [...arr],
          note: `Descartado ${arr[i]} en índice ${i}`,
          k,
        });
      }
    }

    // el resto ya no importa → los dejamos como "_"
    const finalArr = arr.slice(0, k).concat(Array(arr.length - k).fill("_"));

    setResult(finalArr);
    setKValue(k);
    setSteps(stepLog);
    setSnapshots(pics);
  };

  return (
    <div className="algo-card">
      {/* 1) Reto */}
      <h2>📝 Reto: Remove Element</h2>
      <p>
        Dado un array <b>nums</b> y un entero <b>val</b>, elimina todas las
        ocurrencias de <b>val</b> in-place. La función debe devolver <b>k</b>, el
        número de elementos distintos de <b>val</b>, y garantizar que los
        primeros <b>k</b> elementos de <b>nums</b> contengan esos valores. El
        resto no importa (puede ser subrayado).
      </p>

      <div className="algo-input-group">
        <label>
          nums:
          <input
            className="algo-input"
            type="text"
            value={nums}
            onChange={(e) => setNums(e.target.value)}
            placeholder="3,2,2,3"
          />
        </label>
      </div>

      <div className="algo-input-group">
        <label>
          val:
          <input
            className="algo-input"
            type="number"
            value={val}
            onChange={(e) => setVal(Number(e.target.value))}
            placeholder="3"
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
          <p>
            k = <b>{kValue}</b>
          </p>
          <pre>{JSON.stringify(result)}</pre>

          {/* Visualización mínima */}
          <div className="algo-steps" style={{ overflowX: "auto" }}>
            <h4>📊 Visualización</h4>
            <table className="matrix-table">
              <thead>
                <tr>
                  <th className="matrix-cell">Paso</th>
                  {result.map((_, idx) => (
                    <th key={`h-${idx}`} className="matrix-cell">
                      {idx}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {snapshots.map((s, rIdx) => (
                  <tr key={`r-${rIdx}`}>
                    <td className="matrix-cell">{s.note}</td>
                    {s.arr.map((val, cIdx) => (
                      <td
                        key={`c-${rIdx}-${cIdx}`}
                        className="matrix-cell"
                        style={{
                          background:
                            cIdx < s.k ? "#e0f2fe" : "transparent",
                          fontWeight: cIdx < s.k ? 700 : 400,
                        }}
                      >
                        {val}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 3) Respuesta en JavaScript */}
      {result && (
        <div className="algo-explainer">
          <h3>💻 Respuesta en JavaScript</h3>
          <pre>{`function removeElement(nums, val) {
  let k = 0;
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== val) {
      nums[k] = nums[i];
      k++;
    }
  }
  return k;
}`}</pre>
        </div>
      )}

      {/* 4) Explicación */}
      {result && (
        <>
          <div className="algo-explainer">
            <h3>🧭 ¿Qué debemos hacer?</h3>
            <ul style={{ margin: 0, paddingLeft: "1.2rem" }}>
              <li>
                Recorremos el array <code>nums</code> de izquierda a derecha.
              </li>
              <li>
                Cada vez que encontramos un número <b>≠ val</b>, lo colocamos en
                la posición <code>k</code> y avanzamos <code>k++</code>.
              </li>
              <li>
                Si el número es <b>== val</b>, simplemente lo ignoramos.
              </li>
              <li>
                Al final, los primeros <code>k</code> elementos son los válidos,
                y el resto no importa.
              </li>
            </ul>
          </div>

          <div className="algo-explainer">
            <h3>⏱️ Complejidad & justificación</h3>
            <p>
              <b>Tiempo:</b> <code>O(n)</code>, porque recorremos el array una
              sola vez, comparando cada elemento con <code>val</code>.  
              <b>Espacio:</b> <code>O(1)</code>, no usamos arrays extra, todo se
              hace in-place.
            </p>
          </div>

          <div className="algo-steps">
            <h3>🧩 Pasos del algoritmo (traza)</h3>
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

export default RemoveElement;
