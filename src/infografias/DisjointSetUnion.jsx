import React, { useState } from "react";

class DSU {
  constructor(n) {
    this.parent = Array(n).fill(0).map((_,i)=>i);
    this.rank = Array(n).fill(0);
  }

  find(x, logs) {
    if (this.parent[x] !== x) {
      logs.push(`Path compression en ${x}`);
      this.parent[x] = this.find(this.parent[x], logs);
    }
    return this.parent[x];
  }

  union(x, y, logs) {
    let rootX = this.find(x, logs);
    let rootY = this.find(y, logs);
    if (rootX === rootY) {
      logs.push(`Ya están unidos: ${x} y ${y}`);
      return;
    }
    if (this.rank[rootX] < this.rank[rootY]) {
      this.parent[rootX] = rootY;
      logs.push(`Union: root ${rootX} → ${rootY}`);
    } else if (this.rank[rootX] > this.rank[rootY]) {
      this.parent[rootY] = rootX;
      logs.push(`Union: root ${rootY} → ${rootX}`);
    } else {
      this.parent[rootY] = rootX;
      this.rank[rootX]++;
      logs.push(`Union con aumento de rango: ${rootY} → ${rootX}`);
    }
  }

  groups() {
    const sets = {};
    for (let i=0;i<this.parent.length;i++) {
      const root = this.find(i, []);
      if (!sets[root]) sets[root]=[];
      sets[root].push(i);
    }
    return Object.values(sets);
  }
}

const DisjointSetUnion = () => {
  const [n, setN] = useState(6);
  const [pairsStr, setPairsStr] = useState("0-1,1-2,3-4");
  const [logs, setLogs] = useState([]);
  const [groups, setGroups] = useState([]);

  const handleRun = () => {
    const pairs = pairsStr.split(",")
      .map(p=>p.split("-").map(x=>parseInt(x.trim())))
      .filter(p=>p.length===2 && !isNaN(p[0]) && !isNaN(p[1]));
    const dsu = new DSU(n);
    const steps=[];
    pairs.forEach(([a,b]) => dsu.union(a,b,steps));
    setGroups(dsu.groups());
    setLogs(steps);
  };

  return (
    <div className="algo-card">
      <h2>Disjoint Set Union (Union-Find)</h2>
      <div className="algo-input-row">
        <label>N nodos
          <input type="number" className="algo-input" value={n} onChange={e=>setN(parseInt(e.target.value))}/>
        </label>
        <label>Pares a unir
          <input className="algo-input" value={pairsStr} onChange={e=>setPairsStr(e.target.value)}/>
        </label>
        <button className="algo-btn" onClick={handleRun}>Ejecutar</button>
      </div>

      {groups.length>0 && (
        <div className="dp-wrap">
          <h3>Conjuntos finales</h3>
          <div style={{display:"flex",gap:"1rem",flexWrap:"wrap"}}>
            {groups.map((g,idx)=>(
              <div key={idx} style={{padding:"6px",border:"1px solid #ddd",borderRadius:"8px",background:"#f9fafb"}}>
                Grupo {idx}: {g.map(x=><span key={x} className="pill">{x}</span>)}
              </div>
            ))}
          </div>
        </div>
      )}

      {logs.length>0 && (
        <div className="algo-steps">
          <h3>Pasos</h3>
          <ol>{logs.map((s,i)=><li key={i}>{s}</li>)}</ol>
        </div>
      )}

      <div className="algo-explainer">
        <h3>¿Qué estamos viendo?</h3>
        <p>
          El DSU mantiene conjuntos disjuntos mediante un array de padres.  
          Con <strong>path compression</strong>, las búsquedas se hacen más rápidas.  
          Con <strong>union by rank</strong>, se minimiza la altura de los árboles.
        </p>
        <h3>Pseudocódigo</h3>
        <pre>{`find(x):
  si parent[x]!=x:
    parent[x]=find(parent[x])
  return parent[x]

union(x,y):
  rootX=find(x), rootY=find(y)
  si rootX==rootY: return
  si rank[rootX]<rank[rootY]: parent[rootX]=rootY
  si rank[rootX]>rank[rootY]: parent[rootY]=rootX
  si iguales: parent[rootY]=rootX; rank[rootX]++`}</pre>
      </div>
    </div>
  );
};

export default DisjointSetUnion;
