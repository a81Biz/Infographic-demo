import React, { useState } from "react";

// Constantes de color
const RED = "RED";
const BLACK = "BLACK";

class Node {
  constructor(val, color = RED) {
    this.val = val;
    this.color = color;
    this.left = null;
    this.right = null;
    this.parent = null;
  }
}

// Rotaciones
const leftRotate = (root, x) => {
  const y = x.right;
  x.right = y.left;
  if (y.left) y.left.parent = x;
  y.parent = x.parent;
  if (!x.parent) root = y;
  else if (x === x.parent.left) x.parent.left = y;
  else x.parent.right = y;
  y.left = x;
  x.parent = y;
  return root;
};

const rightRotate = (root, y) => {
  const x = y.left;
  y.left = x.right;
  if (x.right) x.right.parent = y;
  x.parent = y.parent;
  if (!y.parent) root = x;
  else if (y === y.parent.left) y.parent.left = x;
  else y.parent.right = x;
  x.right = y;
  y.parent = x;
  return root;
};

// Reparación tras insertar
const fixInsert = (root, z, logs) => {
  while (z.parent && z.parent.color === RED) {
    if (z.parent === z.parent.parent?.left) {
      const y = z.parent.parent.right;
      if (y && y.color === RED) {
        logs.push("Caso 1: recoloreo");
        z.parent.color = BLACK;
        y.color = BLACK;
        z.parent.parent.color = RED;
        z = z.parent.parent;
      } else {
        if (z === z.parent.right) {
          logs.push("Caso 2: rotación izquierda");
          z = z.parent;
          root = leftRotate(root, z);
        }
        logs.push("Caso 3: rotación derecha");
        z.parent.color = BLACK;
        z.parent.parent.color = RED;
        root = rightRotate(root, z.parent.parent);
      }
    } else {
      const y = z.parent.parent.left;
      if (y && y.color === RED) {
        logs.push("Caso 1 (mirror): recoloreo");
        z.parent.color = BLACK;
        y.color = BLACK;
        z.parent.parent.color = RED;
        z = z.parent.parent;
      } else {
        if (z === z.parent.left) {
          logs.push("Caso 2 (mirror): rotación derecha");
          z = z.parent;
          root = rightRotate(root, z);
        }
        logs.push("Caso 3 (mirror): rotación izquierda");
        z.parent.color = BLACK;
        z.parent.parent.color = RED;
        root = leftRotate(root, z.parent.parent);
      }
    }
  }
  root.color = BLACK;
  return root;
};

// Inserción RBT
const insert = (root, key, logs) => {
  let z = new Node(key);
  let y = null;
  let x = root;
  while (x) {
    y = x;
    if (z.val < x.val) x = x.left;
    else x = x.right;
  }
  z.parent = y;
  if (!y) root = z;
  else if (z.val < y.val) y.left = z;
  else y.right = z;

  logs.push(`Insertar ${key} como ${z.parent ? (z.parent.left===z ? "hijo izq":"hijo der") : "raíz"}`);
  return fixInsert(root, z, logs);
};

// Visualización
const TreeNode = ({ node }) => {
  if (!node) return null;
  return (
    <div className="tree-node">
      <div className={`tree-val ${node.color==="RED"?"node-red":"node-black"}`}>{node.val}</div>
      <div className="tree-children">
        <TreeNode node={node.left} />
        <TreeNode node={node.right} />
      </div>
    </div>
  );
};

const RedBlackTree = () => {
  const [input, setInput] = useState("7,3,18,10,22,8,11,26");
  const [logs, setLogs] = useState([]);
  const [root, setRoot] = useState(null);

  const handleBuild = () => {
    const values = input.split(",").map(x=>parseInt(x.trim())).filter(x=>!isNaN(x));
    let r=null;
    const steps=[];
    for (const v of values) {
      r = insert(r,v,steps);
    }
    setRoot(r);
    setLogs(steps);
  };

  return (
    <div className="algo-card">
      <h2>Red-Black Tree</h2>
      <div className="algo-input-row">
        <label>Valores a insertar
          <input className="algo-input" value={input} onChange={e=>setInput(e.target.value)}/>
        </label>
        <button className="algo-btn" onClick={handleBuild}>Construir</button>
      </div>

      {root && (
        <div className="dp-wrap">
          <h3>Árbol Resultante</h3>
          <TreeNode node={root}/>
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
          Un Árbol Rojo-Negro mantiene el equilibrio mediante reglas de color
          y rotaciones. Todo nodo es rojo o negro, la raíz siempre es negra, 
          y no puede haber dos rojos consecutivos.
        </p>
        <h3>Pseudocódigo (inserción simplificado)</h3>
        <pre>{`insert(z):
  insertar como BST
  z.color=RED
  mientras padre(z) es RED:
    si tío(z) es RED: recolorear
    si z es "triángulo": rotación y recoloreo
  raíz.color=BLACK`}</pre>
      </div>
    </div>
  );
};

export default RedBlackTree;
