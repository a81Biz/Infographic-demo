import React, { useState } from "react";

const HashTableDemo = () => {
  const [key, setKey] = useState("uno");
  const [demoKeys, setDemoKeys] = useState("uno,dos,tres");
  const [table, setTable] = useState(Array(7).fill(null).map(() => []));
  const [steps, setSteps] = useState([]);

  const hash = (k) => {
    let h = 0;
    for (let i = 0; i < k.length; i++) h = (h + k.charCodeAt(i)) % 7;
    return h;
  };

  const insertKey = (k, logs) => {
    const index = hash(k);
    logs.push(`Hash("${k}") % 7 = ${index}`);
    const newTable = table.map((b) => [...b]);
    newTable[index].push(k);
    logs.push(newTable[index].length > 1 ? `Colisión en ${index} → encadenamiento` : `Insertado en índice ${index}`);
    setTable(newTable);
  };

  const handleInsert = () => {
    const logs = [];
    insertKey(key.trim(), logs);
    setSteps(logs);
  };

  const handleInsertDemo = () => {
    const logs = [];
    const keys = demoKeys.split(",").map((s) => s.trim()).filter(Boolean);
    const newTable = table.map((b) => [...b]);
    for (const k of keys) {
      const index = hash(k);
      logs.push(`Hash("${k}") % 7 = ${index}`);
      newTable[index].push(k);
      logs.push(newTable[index].length > 1 ? `Colisión en ${index} → encadenamiento` : `Insertado en índice ${index}`);
    }
    setTable(newTable);
    setSteps(logs);
  };

  return (
    <div className="algo-card">
      <h2>Hash Table (Encadenamiento)</h2>

      <div className="algo-input-group">
        <label>Clave a insertar:
          <input value={key} onChange={(e) => setKey(e.target.value)} className="algo-input" />
        </label>
      </div>

      <div className="algo-input-group">
        <label>Claves demo (separadas por coma):
          <input value={demoKeys} onChange={(e) => setDemoKeys(e.target.value)} className="algo-input" />
        </label>
      </div>

      <div style={{display:"flex", gap:"8px", flexWrap:"wrap"}}>
        <button onClick={handleInsert} className="algo-btn">Insertar clave</button>
        <button onClick={handleInsertDemo} className="algo-btn">Insertar demo</button>
      </div>

      <div className="algo-steps" style={{marginTop:"1rem"}}>
        <h3>Tabla (tamaño 7)</h3>
        <pre>
{table.map((bucket, i) => (i + ": [" + (bucket.length ? bucket.join(", ") : "") + "]\n")).join("")}
        </pre>
      </div>

      {steps.length > 0 && (
        <div className="algo-steps">
          <h3>Pasos</h3>
          <ol>{steps.map((s,i)=><li key={i}>{s}</li>)}</ol>
        </div>
      )}

      <div className="algo-explainer">
        <h3>¿Qué estamos viendo?</h3>
        <p>Una <strong>tabla hash</strong> usa una función hash para mapear claves a índices de un arreglo.
        Cuando dos claves caen en el mismo índice, ocurre una <em>colisión</em>. Aquí la resolvemos con <strong>encadenamiento</strong> (guardando una lista por casilla).</p>
        <pre>{`function hash(k):  // ejemplo simple
  h = 0
  for char in k: h = (h + ord(char)) % M
  return h

function insert(k):
  i = hash(k)
  table[i].append(k)  // encadenamiento`}</pre>
      </div>
    </div>
  );
};

export default HashTableDemo;
