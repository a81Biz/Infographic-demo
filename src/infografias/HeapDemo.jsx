import React, { useState } from "react";

const HeapDemo = () => {
  const [heap, setHeap] = useState([]);
  const [value, setValue] = useState(5);
  const [steps, setSteps] = useState([]);

  const insert = (val) => {
    const H = [...heap, val];
    const logs = [`Insertar ${val}`];
    let i = H.length - 1;
    while (i > 0) {
      const p = Math.floor((i - 1) / 2);
      if (H[p] > H[i]) {
        logs.push(`Swap ${H[i]} ↔ ${H[p]}`);
        [H[p], H[i]] = [H[i], H[p]];
        i = p;
      } else break;
    }
    setHeap(H);
    setSteps(logs);
  };

  const extractMin = () => {
    if (heap.length === 0) return;
    const H = [...heap];
    const logs = [`Extraer mínimo: ${H[0]}`];
    H[0] = H[H.length - 1];
    H.pop();
    let i = 0;
    while (true) {
      const l = 2 * i + 1, r = 2 * i + 2;
      let s = i;
      if (l < H.length && H[l] < H[s]) s = l;
      if (r < H.length && H[r] < H[s]) s = r;
      if (s !== i) {
        logs.push(`Swap ${H[i]} ↔ ${H[s]}`);
        [H[i], H[s]] = [H[s], H[i]];
        i = s;
      } else break;
    }
    setHeap(H);
    setSteps(logs);
  };

  const loadDemo = () => {
    setHeap([]);
    const demo = [5,3,8,4,1];
    const logs = ["Carga demo: 5,3,8,4,1"];
    let H = [];
    for (const v of demo) {
      H = [...H, v];
      let i = H.length - 1;
      while (i > 0) {
        const p = Math.floor((i - 1) / 2);
        if (H[p] > H[i]) [H[p], H[i]] = [H[i], H[p]], i = p; else break;
      }
    }
    setHeap(H);
    setSteps(logs);
  };

  return (
    <div className="algo-card">
      <h2>Heap (Min-Heap)</h2>
      <div className="algo-input-group">
        <label>Valor a insertar:
          <input type="number" value={value} onChange={(e)=>setValue(parseInt(e.target.value))} className="algo-input" />
        </label>
      </div>
      <div style={{display:"flex", gap:"8px", flexWrap:"wrap"}}>
        <button onClick={()=>insert(value)} className="algo-btn">Insertar</button>
        <button onClick={extractMin} className="algo-btn">Extraer mínimo</button>
        <button onClick={loadDemo} className="algo-btn">Cargar demo</button>
      </div>

      <div className="algo-steps" style={{marginTop:"1rem"}}>
        <h3>Heap (array):</h3>
        <p>[{heap.join(", ")}]</p>
      </div>
      {steps.length>0 && <div className="algo-steps"><h3>Pasos</h3><ol>{steps.map((s,i)=><li key={i}>{s}</li>)}</ol></div>}

      <div className="algo-explainer">
        <h3>¿Qué estamos viendo?</h3>
        <p>Un <strong>min-heap</strong> es un árbol binario completo donde cada nodo es menor o igual que sus hijos.
        Inserción y extracción del mínimo cuestan O(log n).</p>
      </div>
    </div>
  );
};

export default HeapDemo;
