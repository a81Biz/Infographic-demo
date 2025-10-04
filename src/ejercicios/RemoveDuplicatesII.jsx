// src/ejercicios/RemoveDuplicatesII.jsx
import React, { useState } from "react";

const RemoveDuplicatesII = () => {
  const [nums, setNums] = useState("0,0,1,1,1,1,2,3,3");

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

    let k = 0; // posición de escritura
    const stepLog = [];
    const pics = [];

    pics.push({ arr: [...arr], note: "Estado inicial", k });

    for (let i = 0; i < arr.length; i++) {
      // condición clave: permitimos máximo 2 repeticiones
      if (k < 2 || arr[i] !== arr[k - 2]) {
        arr[k] = arr[i];
        stepLog.push(
          `nums[${i}] = ${arr[i]} aceptado → lo colocamos en índice ${k}`
        );
        pics.push({
          arr: [...arr],
          note: `Insertado ${arr[i]} en índice ${k}`,
          k: k + 1,
        });
        k++;
      } else {
        stepLog.push(
          `nums[${i}] = ${arr[i]} ignorado → ya hay dos copias permitidas`
        );
        pics.push({
          arr: [...arr],
          note: `Ignorado duplicado extra ${arr[i]}`,
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
      <h2>📝 Reto: Remove Duplicates from Sorted Array II</h2>
      <p>
        Dado un array <b>nums</b> ordenado en forma no decreciente, elimina los
        duplicados de forma que cada elemento aparezca <b>a lo más dos veces</b>.
        Devuelve <b>k</b>, el número de elementos válidos, dejando los primeros{" "}
        <b>k</b> con los valores correctos. El resto no importa.
      </p>

      <div className="algo-input-group">
        <label>
          nums:
          <input
            className="algo-input"
            type="text"
            value={nums}
            onChange={(e) => setNums(e.target.value)}
            placeholder="0,0,1,1,1,1,2,3,3"
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
  let k = 0;
  for (let i = 0; i < nums.length; i++) {
    if (k < 2 || nums[i] !== nums[k - 2]) {
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
                Queremos que cada número aparezca como máximo dos veces.
              </li>
              <li>
                Usamos un puntero <code>k</code>: si aún tenemos menos de 2
                elementos o el actual <code>nums[i]</code> es distinto a{" "}
                <code>nums[k-2]</code>, copiamos.
              </li>
              <li>
                Si es igual a <code>nums[k-2]</code>, significa que ya existen
                2 copias → ignoramos el elemento.
              </li>
            </ul>
          </div>

          <div className="algo-explainer">
            <h3>⏱️ Complejidad & justificación</h3>
            <p>
              <b>Tiempo:</b> <code>O(n)</code>, porque recorremos una sola vez el
              array completo.  
              <b>Espacio:</b> <code>O(1)</code>, no usamos memoria extra; solo
              trabajamos con punteros dentro del array original.
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

export default RemoveDuplicatesII;
