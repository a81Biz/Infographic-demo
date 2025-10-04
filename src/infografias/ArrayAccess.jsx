import React, { useState } from "react";

const ArrayAccess = () => {
  const [base, setBase] = useState(1000);
  const [size, setSize] = useState(4);
  const [index, setIndex] = useState(3);
  const [result, setResult] = useState(null);

  const calculateAddress = () => {
    const address = base + index * size;
    setResult(address);
  };

  return (
    <div className="algo-card">
      <h2>Array Access</h2>
      <p>
        Ejemplo de cálculo de dirección en memoria con la fórmula:
        <br />
        <strong>Dirección = Base + (índice × tamañoDato)</strong>
      </p>

      <div className="algo-input-group">
        <label>
          Dirección Base:
          <input
            type="number"
            value={base}
            onChange={(e) => setBase(parseInt(e.target.value))}
            className="algo-input"
          />
        </label>
      </div>

      <div className="algo-input-group">
        <label>
          Tamaño del Dato (bytes):
          <input
            type="number"
            value={size}
            onChange={(e) => setSize(parseInt(e.target.value))}
            className="algo-input"
          />
        </label>
      </div>

      <div className="algo-input-group">
        <label>
          Índice:
          <input
            type="number"
            value={index}
            onChange={(e) => setIndex(parseInt(e.target.value))}
            className="algo-input"
          />
        </label>
      </div>

      <button onClick={calculateAddress} className="algo-btn">
        Calcular Dirección
      </button>

      {result !== null && (
        <div className="algo-result">
          <p>
            <strong>Resultado:</strong> Dirección = {result}
          </p>
        </div>
      )}
    </div>
  );
};

export default ArrayAccess;
