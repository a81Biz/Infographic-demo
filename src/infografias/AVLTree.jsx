import React, { useState } from "react";

// Nodo AVL
class Node {
  constructor(val) {
    this.val = val;
    this.left = null;
    this.right = null;
    this.height = 1;
  }
}

// Funciones auxiliares
const height = (n) => (n ? n.height : 0);
const getBalance = (n) => (n ? height(n.left) - height(n.right) : 0);

const rightRotate = (y) => {
  const x = y.left;
  const T2 = x.right;
  x.right = y;
  y.left = T2;
  y.height = Math.max(height(y.left), height(y.right)) + 1;
  x.height = Math.max(height(x.left), height(x.right)) + 1;
  return x;
};

const leftRotate = (x) => {
  const y = x.right;
  const T2 = y.left;
  y.left = x;
  x.right = T2;
  x.height = Math.max(height(x.left), height(x.right)) + 1;
  y.height = Math.max(height(y.left), height(y.right)) + 1;
  return y;
};

// Inserción en AVL
const insert = (node, key, logs) => {
  if (!node) {
    logs.push(`Insertar ${key}`);
    return new Node(key);
  }
  if (key < node.val) node.left = insert(node.left, key, logs);
  else if (key > node.val) node.right = insert(node.right, key, logs);
  else return node;

  node.height = 1 + Math.max(height(node.left), height(node.right));
  const balance = getBalance(node);

  // Rotaciones
  if (balance > 1 && key < node.left.val) {
    logs.push(`Rotación Derecha en ${node.val}`);
    return rightRotate(node);
  }
  if (balance < -1 && key > node.right.val) {
    logs.push(`Rotación Izquierda en ${node.val}`);
    return leftRotate(node);
  }
  if (balance > 1 && key > node.left.val) {
    logs.push(`Rotación Izquierda-Derecha en ${node.val}`);
    node.left = leftRotate(node.left);
    return rightRotate(node);
  }
  if (balance < -1 && key < node.right.val) {
    logs.push(`Rotación Derecha-Izquierda en ${node.val}`);
    node.right = rightRotate(node.right);
    return leftRotate(node);
  }

  return node;
};

// Visualización recursiva del árbol
const TreeNode = ({ node }) => {
  if (!node) return null;
  return (
    <div className="tree-node">
      <div className="tree-val">{node.val}</div>
      <div className="tree-children">
        <TreeNode node={node.left} />
        <TreeNode node={node.right} />
      </div>
    </div>
  );
};

const AVLTree = () => {
  const [input, setInput] = useState("10,20,30,40,50,25");
  const [logs, setLogs] = useState([]);
  const [root, setRoot] = useState(null);

  const handleBuild = () => {
    const values = input
      .split(",")
      .map((x) => parseInt(x.trim()))
      .filter((x) => !isNaN(x));
    let r = null;
    const steps = [];
    for (const v of values) r = insert(r, v, steps);
    setRoot(r);
    setLogs(steps);
  };

  return (
    <div className="algo-card">
      <h2>AVL Tree (Árbol Balanceado)</h2>
      <div className="algo-input-row">
        <label>Valores a insertar
          <input
            className="algo-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </label>
        <button className="algo-btn" onClick={handleBuild}>Construir</button>
      </div>

      {root && (
        <div className="dp-wrap">
          <h3>Árbol Resultante</h3>
          <TreeNode node={root} />
        </div>
      )}

      {logs.length > 0 && (
        <div className="algo-steps">
          <h3>Pasos</h3>
          <ol>{logs.map((s, i) => <li key={i}>{s}</li>)}</ol>
        </div>
      )}

      <div className="algo-explainer">
        <h3>¿Qué estamos viendo?</h3>
        <p>
          Un árbol AVL se balancea automáticamente tras cada inserción.
          Si el factor de balance (altura izquierda – derecha) excede 1 o –1,
          se realizan rotaciones.
        </p>
        <h3>Pseudocódigo</h3>
        <pre>{`insert(node, key):
  if node=null: return new Node(key)
  if key < node.val: node.left = insert(node.left,key)
  else if key > node.val: node.right = insert(node.right,key)

  actualizar altura
  balance = altura(left)-altura(right)

  if balance>1 y key<node.left.val → rotación derecha
  if balance<-1 y key>node.right.val → rotación izquierda
  if balance>1 y key>node.left.val → rotación izquierda-derecha
  if balance<-1 y key<node.right.val → rotación derecha-izquierda`}</pre>
      </div>
    </div>
  );
};

export default AVLTree;
