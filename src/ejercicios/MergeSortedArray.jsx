// src/ejercicios/MergeSortedArray.jsx
import React, { useState } from "react";

const MergeSortedArray = () => {
  // Inputs con ejemplo precargado
  const [nums1, setNums1] = useState("1,2,3,0,0,0");
  const [m, setM] = useState(3);
  const [nums2, setNums2] = useState("2,5,6");
  const [n, setN] = useState(3);

  // Estado dinámico tras "Resolver"
  const [result, setResult] = useState(null);
  const [steps, setSteps] = useState([]);
  const [snapshots, setSnapshots] = useState([]); // visualización por pasos

  const normalizeArray = (arr, targetLen) => {
    const out = arr.slice(0, targetLen);
    while (out.length < targetLen) out.push(0);
    return out;
  };

  const handleSolve = () => {
    // Parseo seguro de entradas
    let arr1 = nums1
      .split(",")
      .map((x) => x.trim())
      .filter((x) => x.length)
      .map(Number);
    let arr2 = nums2
      .split(",")
      .map((x) => x.trim())
      .filter((x) => x.length)
      .map(Number);

    // Aseguramos longitud de nums1 = m+n (rellenando/truncando como LeetCode pide)
    const totalLen = (Number.isFinite(m) ? m : 0) + (Number.isFinite(n) ? n : 0);
    arr1 = normalizeArray(arr1, totalLen);

    let i = m - 1;
    let j = n - 1;
    let k = m + n - 1;

    const stepLog = [];
    const pics = [];

    // Guardamos estado inicial para visualizar
    pics.push({
      arr: [...arr1],
      placedIndex: null,
      pickedFrom: null,
      value: null,
      i, j, k, note: "Estado inicial",
    });

    while (j >= 0) {
      if (i >= 0 && arr1[i] > arr2[j]) {
        arr1[k] = arr1[i];
        stepLog.push(
          `Coloco nums1[${i}]=${arr1[k]} en posición ${k} (mayor que nums2[${j}]${j>=0?`=${arr2[j]}`:""}).`
        );
        pics.push({
          arr: [...arr1],
          placedIndex: k,
          pickedFrom: "nums1",
          value: arr1[k],
          i: i - 1,
          j,
          k,
          note: `Movido desde nums1[${i}] → nums1[${k}]`,
        });
        i--;
      } else {
        arr1[k] = arr2[j];
        stepLog.push(
          `Coloco nums2[${j}]=${arr1[k]} en posición ${k} (≥ nums1[${i}]${i>=0?`=${arr1[i]}`:"/∄"}).`
        );
        pics.push({
          arr: [...arr1],
          placedIndex: k,
          pickedFrom: "nums2",
          value: arr1[k],
          i,
          j: j - 1,
          k,
          note: `Movido desde nums2[${j}] → nums1[${k}]`,
        });
        j--;
      }
      k--;
    }

    setResult(arr1);
    setSteps(stepLog);
    setSnapshots(pics);
  };

  return (
    <div className="algo-card">
      {/* 1) Reto */}
      <h2>📝 Reto: Merge Sorted Array</h2>
      <p>
        Fusiona dos arreglos ordenados <b>nums1</b> y <b>nums2</b> en orden no
        decreciente, dejando el resultado final <b>in-place</b> en <b>nums1</b>.
        <br />
        <small>
          <i>
            nums1.length = m + n (con ceros de relleno al final), nums2.length = n.
          </i>
        </small>
      </p>

      <div className="algo-input-group">
        <label>
          nums1 (con ceros al final):
          <input
            className="algo-input"
            type="text"
            value={nums1}
            onChange={(e) => setNums1(e.target.value)}
            placeholder="1,2,3,0,0,0"
          />
        </label>
      </div>

      <div className="algo-input-group">
        <label>
          m (válidos en nums1):
          <input
            className="algo-input"
            type="number"
            value={m}
            onChange={(e) => setM(Number(e.target.value))}
            min={0}
          />
        </label>
      </div>

      <div className="algo-input-group">
        <label>
          nums2:
          <input
            className="algo-input"
            type="text"
            value={nums2}
            onChange={(e) => setNums2(e.target.value)}
            placeholder="2,5,6"
          />
        </label>
      </div>

      <div className="algo-input-group">
        <label>
          n (tamaño de nums2):
          <input
            className="algo-input"
            type="number"
            value={n}
            onChange={(e) => setN(Number(e.target.value))}
            min={0}
          />
        </label>
      </div>

      <button className="algo-btn" onClick={handleSolve}>
        Resolver
      </button>

      {/* 2) Resultado dinámico */}
      {result && (
        <div className="algo-result">
          <h3>✅ Resultado:</h3>
          <pre>{JSON.stringify(result)}</pre>

          {/* Visualización por pasos (tabla) */}
          <div className="algo-steps" style={{ overflowX: "auto" }}>
            <h4>📊 Visualización por pasos</h4>
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
                    <td className="matrix-cell">
                      {rIdx}
                      <br />
                      <small>{s.note}</small>
                    </td>
                    {s.arr.map((val, cIdx) => (
                      <td
                        key={`c-${rIdx}-${cIdx}`}
                        className="matrix-cell"
                        style={{
                          background:
                            s.placedIndex === cIdx ? "#e0f2fe" : "transparent",
                          fontWeight: s.placedIndex === cIdx ? 700 : 400,
                        }}
                        title={
                          s.placedIndex === cIdx && s.value != null
                            ? `Escribimos ${s.value} aquí`
                            : undefined
                        }
                      >
                        {val}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
            {snapshots.length > 0 && (
              <p style={{ marginTop: "0.6rem" }}>
                <b>Leyenda:</b> celda resaltada = posición escrita en ese paso.
              </p>
            )}
          </div>
        </div>
      )}

      {/* 3) Respuesta en JavaScript */}
      {result && (
        <div className="algo-explainer">
          <h3>💻 Respuesta en JavaScript</h3>
          <pre>{`function merge(nums1, m, nums2, n) {
  let i = m - 1;         // último índice válido en nums1
  let j = n - 1;         // último índice en nums2
  let k = m + n - 1;     // escribe desde el final en nums1

  while (j >= 0) {       // mientras queden elementos por fusionar en nums2
    if (i >= 0 && nums1[i] > nums2[j]) {
      nums1[k] = nums1[i];
      i--;
    } else {
      nums1[k] = nums2[j];
      j--;
    }
    k--;
  }
}`}</pre>
        </div>
      )}

      {/* 4) Explicación (qué hacer + complejidad + pasos) */}
      {result && (
        <>
          <div className="algo-explainer">
            <h3>🧭 ¿Qué debemos hacer?</h3>
            <ul style={{ margin: 0, paddingLeft: "1.2rem" }}>
              <li>
                <b>Evitar sobrescribir</b> valores no procesados en <code>nums1</code>.
              </li>
              <li>
                Usar <b>tres punteros</b> desde el final:
                <code> i = m-1</code> (último válido en <code>nums1</code>),
                <code> j = n-1</code> (último en <code>nums2</code>),
                <code> k = m+n-1</code> (posición de escritura).
              </li>
              <li>
                <b>Comparar</b> <code>nums1[i]</code> vs <code>nums2[j]</code> y
                escribir el <b>mayor</b> en <code>nums1[k]</code>.
              </li>
              <li>
                <b>Decrementar</b> el puntero de donde tomaste el elemento y también{" "}
                <code>k</code>. Repetir hasta que <code>j &lt; 0</code>.
              </li>
              <li>
                No hace falta mover más si <code>i</code> sigue ≥ 0 (ya están en su
                sitio).
              </li>
            </ul>
          </div>

          <div className="algo-explainer">
            <h3>⏱️ Complejidad & justificación</h3>
            <p style={{ margin: 0 }}>
              <b>Tiempo:</b> <code>O(m + n)</code>. Cada iteración coloca <b>exactamente
              un</b> elemento en su posición final y los punteros sólo decrecen; como
              máximo haremos <code>m + n</code> asignaciones.
              <br />
              <b>Espacio adicional:</b> <code>O(1)</code>. Todo se hace <i>in-place</i> en{" "}
              <code>nums1</code> con tres punteros; no usamos buffers auxiliares.
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

export default MergeSortedArray;
