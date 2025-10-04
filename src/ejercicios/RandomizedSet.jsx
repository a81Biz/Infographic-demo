// src/ejercicios/RandomizedSet.jsx
import React, { useState } from "react";

class RandomizedSet {
  constructor() {
    this.map = new Map(); // valor -> índice
    this.list = [];       // almacenamiento real
  }

  insert(val) {
    if (this.map.has(val)) return false;
    this.map.set(val, this.list.length);
    this.list.push(val);
    return true;
  }

  remove(val) {
    if (!this.map.has(val)) return false;
    let idx = this.map.get(val);
    let last = this.list[this.list.length - 1];

    // swap val con el último
    this.list[idx] = last;
    this.map.set(last, idx);

    // eliminar último
    this.list.pop();
    this.map.delete(val);

    return true;
  }

  getRandom() {
    const randIdx = Math.floor(Math.random() * this.list.length);
    return this.list[randIdx];
  }
}

const RandomizedSetDemo = () => {
  const [setInstance] = useState(new RandomizedSet());
  const [output, setOutput] = useState([]);

  const handleInsert = (val) => {
    let res = setInstance.insert(Number(val));
    setOutput((prev) => [...prev, `insert(${val}) → ${res}`]);
  };

  const handleRemove = (val) => {
    let res = setInstance.remove(Number(val));
    setOutput((prev) => [...prev, `remove(${val}) → ${res}`]);
  };

  const handleRandom = () => {
    let res = setInstance.getRandom();
    setOutput((prev) => [...prev, `getRandom() → ${res}`]);
  };

  return (
    <div className="algo-card">
      {/* 1) Reto */}
      <h2>📝 Reto: Insert Delete GetRandom O(1)</h2>
      <p>
        Implementa una estructura de datos que soporte{" "}
        <code>insert</code>, <code>remove</code> y <code>getRandom</code> en{" "}
        <b>O(1)</b> promedio.
      </p>

      <div className="algo-input-group">
        <button className="algo-btn" onClick={() => handleInsert(1)}>insert(1)</button>
        <button className="algo-btn" onClick={() => handleRemove(2)}>remove(2)</button>
        <button className="algo-btn" onClick={() => handleInsert(2)}>insert(2)</button>
        <button className="algo-btn" onClick={handleRandom}>getRandom()</button>
        <button className="algo-btn" onClick={() => handleRemove(1)}>remove(1)</button>
        <button className="algo-btn" onClick={() => handleInsert(2)}>insert(2)</button>
        <button className="algo-btn" onClick={handleRandom}>getRandom()</button>
      </div>

      {/* 2) Resultado */}
      <div className="algo-result">
        <h3>✅ Resultado de operaciones:</h3>
        <ul>
          {output.map((o, idx) => (
            <li key={idx}>{o}</li>
          ))}
        </ul>
      </div>

      {/* 3) Respuesta en JavaScript */}
      <div className="algo-explainer">
        <h3>💻 Respuesta en JavaScript</h3>
        <pre>{`class RandomizedSet {
  constructor() {
    this.map = new Map(); // valor -> índice
    this.list = [];       // almacenamiento real
  }

  insert(val) {
    if (this.map.has(val)) return false;
    this.map.set(val, this.list.length);
    this.list.push(val);
    return true;
  }

  remove(val) {
    if (!this.map.has(val)) return false;
    let idx = this.map.get(val);
    let last = this.list[this.list.length - 1];
    this.list[idx] = last;
    this.map.set(last, idx);
    this.list.pop();
    this.map.delete(val);
    return true;
  }

  getRandom() {
    const randIdx = Math.floor(Math.random() * this.list.length);
    return this.list[randIdx];
  }
}`}</pre>
      </div>

      {/* 4) Explicación */}
      <div className="algo-explainer">
        <h3>🧭 ¿Qué debemos hacer?</h3>
        <ul style={{ margin: 0, paddingLeft: "1.2rem" }}>
          <li>
            Usar un <b>array</b> para almacenar los elementos y poder elegir
            uno aleatorio en O(1).
          </li>
          <li>
            Usar un <b>mapa (hash map)</b> para saber en qué índice está cada
            elemento.
          </li>
          <li>
            Para eliminar, intercambiamos con el último del array y
            actualizamos el mapa, logrando O(1).
          </li>
        </ul>
      </div>

      {/* 5) Complejidad */}
      <div className="algo-explainer">
        <h3>⏱️ Complejidad & justificación</h3>
        <p>
          <b>Tiempo:</b> O(1) promedio para insert, remove y getRandom.  
          <b>Espacio:</b> O(n) por el almacenamiento en lista + mapa.  
          <b>Justificación:</b> El array da acceso aleatorio O(1), el hash map da
          búsquedas/inserciones O(1).
        </p>
      </div>
    </div>
  );
};

export default RandomizedSetDemo;
