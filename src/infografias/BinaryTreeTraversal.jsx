import React, { useState } from "react";

const BinaryTreeTraversal = () => {
  const tree = {
    value: 10,
    left: { value: 5, left: { value: 3 }, right: { value: 7 } },
    right: { value: 15, left: { value: 12 }, right: { value: 20 } },
  };

  const inorder = (node, logs) => {
    if (!node) return;
    inorder(node.left, logs);
    logs.push(node.value);
    inorder(node.right, logs);
  };

  const preorder = (node, logs) => {
    if (!node) return;
    logs.push(node.value);
    preorder(node.left, logs);
    preorder(node.right, logs);
  };

  const postorder = (node, logs) => {
    if (!node) return;
    postorder(node.left, logs);
    postorder(node.right, logs);
    logs.push(node.value);
  };

  const [traversals, setTraversals] = useState(null);

  const handleTraverse = () => {
    const inLogs = [], preLogs = [], postLogs = [];
    inorder(tree, inLogs); preorder(tree, preLogs); postorder(tree, postLogs);
    setTraversals({ in: inLogs, pre: preLogs, post: postLogs });
  };

  const renderTree = (node) => {
    if (!node) return null;
    return (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", margin: "1rem" }}>
        <div
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            backgroundColor: "steelblue",
            color: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: "bold",
          }}
        >
          {node.value}
        </div>
        {(node.left || node.right) && (
          <div style={{ display: "flex", justifyContent: "center" }}>
            {renderTree(node.left)}
            {renderTree(node.right)}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="algo-card">
      <h2>Recorridos de Árbol Binario</h2>
      <button onClick={handleTraverse} className="algo-btn">Recorrer</button>

      <div style={{ margin: "2rem 0" }}>
        <h3>Visualización del Árbol</h3>
        {renderTree(tree)}
      </div>

      {traversals && (
        <div className="algo-steps">
          <h3>Resultados</h3>
          <p><strong>In-order:</strong> {traversals.in.join(", ")}</p>
          <p><strong>Pre-order:</strong> {traversals.pre.join(", ")}</p>
          <p><strong>Post-order:</strong> {traversals.post.join(", ")}</p>
        </div>
      )}

      <div className="algo-explainer">
        <h3>Explicación</h3>
        <p>
          Un árbol binario puede recorrerse de varias formas:  
          - <strong>In-order:</strong> izquierda → raíz → derecha  
          - <strong>Pre-order:</strong> raíz → izquierda → derecha  
          - <strong>Post-order:</strong> izquierda → derecha → raíz  
        </p>
      </div>
    </div>
  );
};

export default BinaryTreeTraversal;
