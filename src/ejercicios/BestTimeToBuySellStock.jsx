// src/ejercicios/BestTimeToBuySellStock.jsx
import React, { useState } from "react";

const BestTimeToBuySellStock = () => {
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

    let minPrice = Infinity;
    let maxProfit = 0;
    const stepLog = [];
    const pics = [];

    for (let i = 0; i < arr.length; i++) {
      if (arr[i] < minPrice) {
        minPrice = arr[i];
        stepLog.push(`Nuevo precio mínimo en día ${i}: ${minPrice}`);
      }
      let profit = arr[i] - minPrice;
      if (profit > maxProfit) {
        maxProfit = profit;
        stepLog.push(
          `Vender en día ${i} (${arr[i]}) tras comprar en ${minPrice} → beneficio = ${profit}`
        );
      }
      pics.push({
        arr: [...arr],
        note: `Día ${i}, precio=${arr[i]}, min=${minPrice}, maxProfit=${maxProfit}`,
      });
    }

    setResult(maxProfit);
    setSteps(stepLog);
    setSnapshots(pics);
  };

  return (
    <div className="algo-card">
      {/* 1) Reto */}
      <h2>📝 Reto: Best Time to Buy and Sell Stock</h2>
      <p>
        Dado un array <b>prices</b> donde <code>prices[i]</code> es el precio de
        la acción en el día <code>i</code>, encuentra el máximo beneficio que se
        puede obtener comprando en un día y vendiendo en un día posterior.
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
            Máximo beneficio = <b>{result}</b>
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
  let minPrice = Infinity;
  let maxProfit = 0;

  for (let price of prices) {
    if (price < minPrice) {
      minPrice = price;
    }
    let profit = price - minPrice;
    if (profit > maxProfit) {
      maxProfit = profit;
    }
  }
  return maxProfit;
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
                Recorrer todos los precios, guardando siempre el{" "}
                <b>precio mínimo hasta ahora</b>.
              </li>
              <li>
                En cada día, calcular beneficio = precio actual – precio mínimo.
              </li>
              <li>
                Actualizar el máximo beneficio si este nuevo valor es mayor.
              </li>
              <li>
                Al final, el máximo beneficio es la mejor compra/venta posible.
              </li>
            </ul>
          </div>

          <div className="algo-explainer">
            <h3>⏱️ Complejidad & justificación</h3>
            <p>
              <b>Tiempo:</b> <code>O(n)</code>, recorremos la lista una sola vez.  
              <b>Espacio:</b> <code>O(1)</code>, solo usamos variables auxiliares
              (<code>minPrice</code> y <code>maxProfit</code>).  
              <b>Justificación:</b> El algoritmo es lineal y óptimo porque basta
              con ir manteniendo el mínimo y evaluando cada posible venta.
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

export default BestTimeToBuySellStock;
