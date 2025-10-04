// src/ejercicios/RemoveDuplicates.jsx
import React, { useState } from "react";

const RemoveDuplicates = () => {
  const [nums, setNums] = useState("0,0,1,1,1,2,2,3,3,4");

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

    if (arr.length === 0) {
      setResult([]);
      setKValue(0);
      return;
    }

    let k = 1; // el primer elemento siempre es único
    const stepLog = [];
    const pics = [];

    pics.push({ arr: [...arr], note: "Estado inicial", k });

    for (let i = 1; i < arr.length; i++) {
      if (arr[i] !== arr[k - 1]) {
        arr[k] = arr[i];
        stepLog.push(
          `nums[${i}] = ${arr[i]} ≠ último único (${arr[k - 1]}) → lo colocamos en posición ${k}`
        );
        pics.push({
          arr: [...arr],
          note: `Insertado ${arr[i]} en índice ${k}`,
          k: k + 1,
        });
        k++;
      } else {
        stepLog.push(
          `nums[${i}] = ${arr[i]} == último único (${arr[k - 1]}) → se ignora (duplicado)`
        );
        pics.push({
          arr: [...arr],
          note: `Ignorado duplicado ${arr[i]}`,
          k,
        });
      }
    }

    const finalArr = arr.slice(0, k).concat(Array(arr.length - k).fill("_"));

    setResult(finalArr);
    setKValue(k);
    setSteps(stepLog);
    setSnapshots(pics);
  };

  return (
    <div className="algo-card">
      {/* 1) Reto */}
      <h2>📝 Reto: Remove Duplicates from Sorted Array</h2>
      <p>
        Dado un array <b>nums</b> ordenado en forma no decreciente, elimina los{" "}
        <b>duplicados in-place</b> de forma que cada elemento único aparezca una
        sola vez. Devuelve <b>k</b>, el número de elementos únicos, dejando los
        primeros <b>k</b> elementos de <b>nums</b> con los valores únicos en su
        orden original. El resto no importa.
      </p>

      <div className="algo-input-group">
        <label>
          nums:
          <input
            className="algo-input"
            type="text"
            value={nums}
            onChange={(e) => setNums(e.target.value)}
            placeholder="0,0,1,1,1,2,2,3,3,4"
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
          <pre>{`function removeDuplicates(nums) {
  if (nums.length === 0) return 0;
  let k = 1;
  for (let i = 1; i < nums.length; i++) {
    if (nums[i] !== nums[k - 1]) {
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
              <li>El array ya está ordenado → los duplicados estarán juntos.</li>
              <li>
                Usamos un puntero <code>k</code> para marcar dónde poner el
                siguiente valor único.
              </li>
              <li>
                Recorremos desde el segundo elemento: si <code>nums[i]</code> ≠{" "}
                <code>nums[k-1]</code>, entonces es único y lo copiamos a{" "}
                <code>nums[k]</code>.
              </li>
              <li>
                Si es igual, lo ignoramos porque ya está registrado como único.
              </li>
            </ul>
          </div>

          <div className="algo-explainer">
            <h3>⏱️ Complejidad & justificación</h3>
            <p>
              <b>Tiempo:</b> <code>O(n)</code>, recorremos una sola vez el array
              comparando cada elemento con el último único.  
              <b>Espacio:</b> <code>O(1)</code>, lo hacemos in-place, sin
              estructuras extra.
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

export default RemoveDuplicates;
