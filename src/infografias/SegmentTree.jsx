import React, { useState } from "react";

// Nodo Segment Tree
class STNode {
  constructor(l, r, sum) {
    this.l = l; // índice inicio
    this.r = r; // índice fin
    this.sum = sum; // suma de ese rango
    this.left = null;
    this.right = null;
  }
}

// Construcción
const build = (arr, l, r, logs) => {
  if (l === r) {
    logs.push(`Hoja [${l}] = ${arr[l]}`);
    return new STNode(l, r, arr[l]);
  }
  const mid = Math.floor((l + r) / 2);
  const left = build(arr, l, mid, logs);
  const right = build(arr, mid+1, r, logs);
  const node = new STNode(l, r, left.sum + right.sum);
  node.left = left;
  node.right = right;
  logs.push(`Nodo [${l},${r}] = ${node.sum}`);
  return node;
};

// Consulta
const query = (node, ql, qr, logs) => {
  if (!node || ql > node.r || qr < node.l) return 0;
  if (ql <= node.l && node.r <= qr) {
    logs.push(`Usar nodo [${node.l},${node.r}] = ${node.sum}`);
    return node.sum;
  }
  const leftSum = query(node.left, ql, qr, logs);
  const rightSum = query(node.right, ql, qr, logs);
  return leftSum + rightSum;
};

// Visualización recursiva
const TreeNode = ({ node }) => {
  if (!node) return null;
  return (
    <div className="tree-node">
      <div className="tree-val">
        [{node.l},{node.r}]<br/>
        {node.sum}
      </div>
      <div className="tree-children">
        <TreeNode node={node.left}/>
        <TreeNode node={node.right}/>
      </div>
    </div>
  );
};

const SegmentTree = () => {
  const [arrStr, setArrStr] = useState("1,3,5,7,9,11");
  const [range, setRange] = useState("1,3");
  const [logs, setLogs] = useState([]);
  const [root, setRoot] = useState(null);
  const [result, setResult] = useState(null);

  const handleBuild = () => {
    const arr = arrStr.split(",").map(x=>parseInt(x.trim())).filter(x=>!isNaN(x));
    const steps = [];
    const r = build(arr, 0, arr.length-1, steps);
    setRoot(r);
    setLogs(steps);
    setResult(null);
  };

  const handleQuery = () => {
    if (!root) return;
    const [ql,qr] = range.split(",").map(x=>parseInt(x.trim()));
    const steps=[];
    const res = query(root, ql, qr, steps);
    setResult(res);
    setLogs(steps);
  };

  return (
    <div className="algo-card">
      <h2>Segment Tree (Suma de Rangos)</h2>
      <div className="algo-input-row">
        <label>Array
          <input className="algo-input" value={arrStr} onChange={e=>setArrStr(e.target.value)}/>
        </label>
        <button className="algo-btn" onClick={handleBuild}>Construir</button>
      </div>
      <div className="algo-input-row">
        <label>Rango (i,j)
          <input className="algo-input" value={range} onChange={e=>setRange(e.target.value)}/>
        </label>
        <button className="algo-btn" onClick={handleQuery}>Consultar</button>
      </div>

      {root && (
        <div className="dp-wrap">
          <h3>Árbol Segment</h3>
          <TreeNode node={root}/>
        </div>
      )}

      {result!==null && (
        <div className="algo-result">
          Resultado de consulta {range}: <strong>{result}</strong>
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
          Un Segment Tree divide el array en intervalos [l,r]. Cada nodo guarda 
          la suma de su intervalo. Las consultas se responden combinando nodos relevantes.
        </p>
        <h3>Pseudocódigo</h3>
        <pre>{`build(l,r):
  si l==r: return nodo(arr[l])
  mid=(l+r)/2
  left=build(l,mid), right=build(mid+1,r)
  nodo.sum=left.sum+right.sum

query(node,ql,qr):
  si [l,r] fuera de rango: return 0
  si [l,r] dentro de [ql,qr]: return nodo.sum
  return query(left,ql,qr)+query(right,ql,qr)`}</pre>
      </div>
    </div>
  );
};

export default SegmentTree;
