import React, { useState } from "react";

const BestTimeToBuySellStockII = () => {
  const [prices, setPrices] = useState("7,1,5,3,6,4");

  const [result, setResult] = useState(null);
  const [steps, setSteps] = useState([]);
  const [snapshots, setSnapshots] = useState([]);

  const handleSolve = () => {
    let arr = prices
      .split(",")
      .map((x) => x.trim())
      .filter((x) => x.length)
      .map(Number);

    let profit = 0;
    const stepLog = [];
    const pics = [];

    for (let i = 1; i < arr.length; i++) {
      if (arr[i] > arr[i - 1]) {
        let gain = arr[i] - arr[i - 1];
        profit += gain;
        stepLog.push(
          `Comprar en día ${i - 1} (${arr[i - 1]}) y vender en día ${i} (${arr[i]}) → ganancia = ${gain}`
        );
      } else {
        stepLog.push(
          `Día ${i}: precio=${arr[i]}, no hay ganancia respecto a ${arr[i - 1]}`
        );
      }
      pics.push({
        arr: [...arr],
        note: `Día ${i}, precio=${arr[i]}, beneficio acumulado=${profit}`,
      });
    }

    setResult(profit);
    setSteps(stepLog);
    setSnapshots(pics);
  };

  return (
    <div className="algo-card">
      {/* 1) Reto */}
      <h2>📝 Reto: Best Time to Buy and Sell Stock II</h2>
      <p>
        Puedes hacer múltiples transacciones (comprar y vender varias veces),
        pero nunca tener más de una acción al mismo tiempo. Calcula la{" "}
        <b>máxima ganancia total</b>.
      </p>

      <div className="algo-input-group">
        <label>
          prices:
          <input
            className="algo-input"
            type="text"
            value={prices}
            onChange={(e) => setPrices(e.target.value)}
            placeholder="7,1,5,3,6,4"
          />
        </label>
      </div>

      <button className="algo-btn" onClick={handleSolve}>
        Resolver
      </button>

      {/* 2) Resultado */}
      {result !== null && (
        <div className="algo-result">
          <h3>✅ Resultado:</h3>
          <p>
            Máxima ganancia total = <b>{result}</b>
          </p>

          <div className="algo-steps" style={{ overflowX: "auto" }}>
            <h4>📊 Visualización</h4>
            <table className="matrix-table">
              <thead>
                <tr>
                  <th className="matrix-cell">Día</th>
                  {prices.split(",").map((_, idx) => (
                    <th key={`h-${idx}`} className="matrix-cell">
                      {idx}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="matrix-cell">Precio</td>
                  {prices.split(",").map((x, idx) => (
                    <td key={`c-${idx}`} className="matrix-cell">
                      {x.trim()}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
            <ul>
              {snapshots.map((s, idx) => (
                <li key={idx}>{s.note}</li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* 3) Respuesta en JavaScript */}
      {result !== null && (
        <div className="algo-explainer">
          <h3>💻 Respuesta en JavaScript</h3>
          <pre>{`function maxProfit(prices) {
  let profit = 0;
  for (let i = 1; i < prices.length; i++) {
    if (prices[i] > prices[i - 1]) {
      profit += prices[i] - prices[i - 1];
    }
  }
  return profit;
}`}</pre>
        </div>
      )}

      {/* 4) Explicación */}
      {result !== null && (
        <>
          <div className="algo-explainer">
            <h3>🧭 ¿Qué debemos hacer?</h3>
            <ul style={{ margin: 0, paddingLeft: "1.2rem" }}>
              <li>
                Como se permite comprar y vender varias veces, basta con{" "}
                <b>aprovechar cada subida local</b>.
              </li>
              <li>
                Si <code>prices[i] &gt; prices[i-1]</code>, sumamos esa
                diferencia al beneficio total.
              </li>
              <li>
                Esto equivale a comprar en cada valle y vender en cada pico.
              </li>
            </ul>
          </div>

          <div className="algo-explainer">
            <h3>⏱️ Complejidad & justificación</h3>
            <p>
              <b>Tiempo:</b> <code>O(n)</code>, recorremos una sola vez el array.  
              <b>Espacio:</b> <code>O(1)</code>, solo usamos una variable para el
              beneficio acumulado.  
              <b>Justificación:</b> Siempre que hay una subida se puede capturar
              ese beneficio sin perder la oportunidad de mayores beneficios.
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

export default BestTimeToBuySellStockII;
