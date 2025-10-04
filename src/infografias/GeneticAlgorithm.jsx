import React, { useState } from "react";

const randomChar=()=>String.fromCharCode(97+Math.floor(Math.random()*26));
const mutate=(s)=> {
  const arr=s.split("");
  const i=Math.floor(Math.random()*arr.length);
  arr[i]=randomChar();
  return arr.join("");
};

const GeneticAlgorithm = () => {
  const [target,setTarget]=useState("hola");
  const [logs,setLogs]=useState([]);
  const [result,setResult]=useState(null);

  const handleRun=()=>{
    let pop=Array(10).fill(0).map(()=>Array(target.length).fill(0).map(randomChar).join(""));
    const steps=[];
    let best=null;
    for (let gen=0;gen<50;gen++){
      pop.sort((a,b)=>{
        const fa=[...a].filter((c,i)=>c===target[i]).length;
        const fb=[...b].filter((c,i)=>c===target[i]).length;
        return fb-fa;
      });
      best=pop[0];
      steps.push(`Gen ${gen}: mejor=${best}`);
      if(best===target) break;
      for(let i=5;i<10;i++) pop[i]=mutate(pop[i]);
    }
    setResult(best);
    setLogs(steps);
  };

  return (
    <div className="algo-card">
      <h2>Genetic Algorithm (ejemplo simple)</h2>
      <label>Target<input className="algo-input" value={target} onChange={e=>setTarget(e.target.value)}/></label>
      <button className="algo-btn" onClick={handleRun}>Ejecutar</button>

      {result && <div className="algo-result">Mejor encontrado: {result}</div>}
      {logs.length>0 && <ol>{logs.map((s,i)=><li key={i}>{s}</li>)}</ol>}

      <div className="algo-explainer">
        <h3>¿Qué estamos viendo?</h3>
        <p>
          Un <strong>algoritmo genético</strong> simula evolución biológica:
          población inicial → selección de mejores → cruce/mutación → nueva generación.
        </p>
        <h3>Pseudocódigo</h3>
        <pre>{`Inicializar población aleatoria
mientras no converja:
  evaluar fitness de cada individuo
  seleccionar los mejores
  cruzar/mutar para formar nueva población
devolver mejor individuo`}</pre>
      </div>
    </div>
  );
};

export default GeneticAlgorithm;
