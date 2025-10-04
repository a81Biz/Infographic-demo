import React, { useState } from "react";

const TrappingRainWater = () => {
  const [input, setInput] = useState("0,1,0,2,1,0,1,3,2,1,2,1");
  const [result, setResult] = useState(null);
  const [steps, setSteps] = useState([]);

  const handleSolve = () => {
  const h = input.split(",").map(x => Number(x.trim())).filter(x => !isNaN(x));
  let l = 0, r = h.length - 1, leftMax = 0, rightMax = 0, water = 0;
  const stepLog = [];

  while (l < r) {
    if (h[l] <= h[r]) {
      leftMax = Math.max(leftMax, h[l]);
      const trapped = Math.max(0, leftMax - h[l]);
      if (trapped > 0) stepLog.push(`Índice ${l}: atrapamos ${trapped} unidad(es) de agua`);
      l++;
      water += trapped;
    } else {
      rightMax = Math.max(rightMax, h[r]);
      const trapped = Math.max(0, rightMax - h[r]);
      if (trapped > 0) stepLog.push(`Índice ${r}: atrapamos ${trapped} unidad(es) de agua`);
      r--;
      water += trapped;
    }
  }

  setResult(water);
  setSteps(stepLog);
};


  return (
    <div className="algo-card">
      <h2>📝 Reto: 42. Trapping Rain Water</h2>
<p>Dada una lista de alturas no negativas que representan un mapa de elevación donde el ancho de cada barra es 1, 
calcula cuánta agua se puede acumular entre las barras después de llover.</p>
      <div className="algo-input-group">
        <label>height array:
          <input className="algo-input" value={input} onChange={(e)=>setInput(e.target.value)} />
        </label>
      </div>
      <button className="algo-btn" onClick={handleSolve}>Resolver</button>
      {result!==null && (
        <div className="algo-result"><h3>✅ Resultado:</h3><pre>{JSON.stringify(result,null,2)}</pre></div>
      )}
      {result!==null && (
        <div className="algo-steps"><h3>🧩 Pasos del algoritmo</h3><ol>{steps.map((s,i)=>(<li key={i}>{s}</li>))}</ol></div>
      )}
      {result!==null && (<>
        <div className="algo-section"><h3>📜 Pseudocódigo</h3><pre>{`func trap(h):
  l=0; r=n-1; leftMax=0; rightMax=0; water=0
  mientras l<r:
    si h[l]<=h[r]:
      leftMax=max(leftMax,h[l])
      water += max(0,leftMax-h[l])
      l++
    sino:
      rightMax=max(rightMax,h[r])
      water += max(0,rightMax-h[r])
      r--
  retornar water`}</pre></div>
        <div className="algo-section"><h3>🧭 ¿Qué debemos hacer?</h3><p>Usamos dos punteros con máximos acumulados a izquierda y derecha. El agua en cada índice depende del menor de estos máximos menos la altura local.</p></div>
        <div className="algo-section"><h3>⏱️ Complejidad</h3><p>Tiempo: O(n). Espacio: O(1).</p></div>
        <div className="algo-section"><h3>💻 JavaScript</h3><pre>{`function trap(h) {
  let l=0, r=h.length-1, leftMax=0, rightMax=0, water=0;
  while (l<r) {
    if (h[l]<=h[r]) {
      leftMax = Math.max(leftMax,h[l]);
      water += Math.max(0, leftMax-h[l]);
      l++;
    } else {
      rightMax = Math.max(rightMax,h[r]);
      water += Math.max(0, rightMax-h[r]);
      r--;
    }
  }
  return water;
}`}</pre></div>
      </>) }
    </div>
  );
};

export default TrappingRainWater;
