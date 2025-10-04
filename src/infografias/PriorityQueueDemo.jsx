import React, { useState } from "react";

function pushHeap(H, item, logs){
  H.push(item);
  let i = H.length - 1;
  while (i > 0) {
    const p = Math.floor((i - 1) / 2);
    if (H[p].priority > H[i].priority) {
      logs && logs.push(`Swap (${H[i].task},p${H[i].priority}) ↔ (${H[p].task},p${H[p].priority})`);
      [H[p], H[i]] = [H[i], H[p]];
      i = p;
    } else break;
  }
}
function popHeap(H, logs){
  if (H.length === 0) return null;
  const min = H[0];
  H[0] = H[H.length - 1];
  H.pop();
  let i = 0;
  while(true){
    const l = 2*i+1, r = 2*i+2;
    let s = i;
    if (l < H.length && H[l].priority < H[s].priority) s = l;
    if (r < H.length && H[r].priority < H[s].priority) s = r;
    if (s !== i){
      logs && logs.push(`Swap (${H[i].task},p${H[i].priority}) ↔ (${H[s].task},p${H[s].priority})`);
      [H[i], H[s]] = [H[s], H[i]]; i = s;
    } else break;
  }
  return min;
}

const PriorityQueueDemo = () => {
  const [heap, setHeap] = useState([{task:"A",priority:1},{task:"B",priority:3},{task:"C",priority:2}]);
  const [task, setTask] = useState("D");
  const [priority, setPriority] = useState(2);
  const [steps, setSteps] = useState([]);

  const buildHeap = () => {
    const logs = ["Construir heap de prioridades"];
    const H = [];
    for (const item of heap) pushHeap(H, {...item}, logs);
    setHeap(H);
    setSteps(logs);
  };

  const handleInsert = () => {
    const logs = [];
    const H = [...heap];
    pushHeap(H, {task, priority: Number(priority)}, logs);
    setHeap(H);
    setSteps(logs);
  };

  const handleExtract = () => {
    const logs = [];
    const H = [...heap];
    const min = popHeap(H, logs);
    logs.unshift(`Extraer siguiente: (${min.task}, p${min.priority})`);
    setHeap(H);
    setSteps(logs);
  };

  return (
    <div className="algo-card">
      <h2>Priority Queue (con Min-Heap)</h2>

      <div className="algo-input-group">
        <label>Tarea:
          <input value={task} onChange={(e)=>setTask(e.target.value)} className="algo-input" />
        </label>
      </div>
      <div className="algo-input-group">
        <label>Prioridad (menor = mayor prioridad):
          <input type="number" value={priority} onChange={(e)=>setPriority(e.target.value)} className="algo-input" />
        </label>
      </div>

      <div style={{display:"flex", gap:"8px", flexWrap:"wrap"}}>
        <button onClick={buildHeap} className="algo-btn">Construir heap</button>
        <button onClick={handleInsert} className="algo-btn">Insertar</button>
        <button onClick={handleExtract} className="algo-btn">Extraer siguiente</button>
      </div>

      <div className="algo-steps" style={{marginTop:"1rem"}}>
        <h3>Cola (heap interna):</h3>
        <p>{heap.map(x=>`(${x.task},p${x.priority})`).join(", ")}</p>
      </div>
      {steps.length>0 && <div className="algo-steps"><h3>Pasos</h3><ol>{steps.map((s,i)=><li key={i}>{s}</li>)}</ol></div>}

      <div className="algo-explainer">
        <h3>¿Qué estamos viendo?</h3>
        <p>Una <strong>cola de prioridad</strong> siempre entrega primero el elemento con mayor prioridad. Aquí la implementamos con un <strong>min-heap</strong> sobre (tarea, prioridad).</p>
      </div>
    </div>
  );
};

export default PriorityQueueDemo;
