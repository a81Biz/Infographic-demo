import React, { useState } from "react";

const SetOperations = () => {
  const [setA, setSetA] = useState("1,2,3,4");
  const [setB, setSetB] = useState("3,4,5,6");
  const [union, setUnion] = useState([]);
  const [intersection, setIntersection] = useState([]);
  const [difference, setDifference] = useState([]);

  const handleCompute = () => {
    const A = new Set(setA.split(",").map((x) => x.trim()).filter(Boolean));
    const B = new Set(setB.split(",").map((x) => x.trim()).filter(Boolean));
    setUnion([...new Set([...A, ...B])]);
    setIntersection([...A].filter((x) => B.has(x)));
    setDifference([...A].filter((x) => !B.has(x)));
  };

  return (
    <div className="algo-card">
      <h2>Operaciones con Sets</h2>
      <div className="algo-input-group">
        <label>Conjunto A:
          <input value={setA} onChange={(e)=>setSetA(e.target.value)} className="algo-input" />
        </label>
      </div>
      <div className="algo-input-group">
        <label>Conjunto B:
          <input value={setB} onChange={(e)=>setSetB(e.target.value)} className="algo-input" />
        </label>
      </div>
      <button onClick={handleCompute} className="algo-btn">Calcular</button>

      <div className="algo-steps" style={{marginTop:"1rem"}}>
        <p><strong>Unión (A ∪ B):</strong> {union.join(", ")}</p>
        <p><strong>Intersección (A ∩ B):</strong> {intersection.join(", ")}</p>
        <p><strong>Diferencia (A − B):</strong> {difference.join(", ")}</p>
      </div>

      <div className="algo-explainer">
        <h3>¿Qué estamos viendo?</h3>
        <p>Un <strong>set</strong> es una colección sin duplicados. Las operaciones clásicas son:
        unión, intersección y diferencia. En muchas implementaciones, comprobar pertenencia es O(1) promedio.</p>
      </div>
    </div>
  );
};

export default SetOperations;
