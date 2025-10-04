import React, { useState } from "react";

const TextJustification = () => {
  const [input, setInput] = useState("This is an example of text justification.,16");
  const [result, setResult] = useState(null);
  const [steps, setSteps] = useState([]);

  const handleSolve = () => {
    setResult(input);
    setSteps(["Paso 1","Paso 2"]);
  };

  return (
    <div className="algo-card">
      <h2>📝 Reto: 68. Text Justification</h2>
<p>Dado un array de palabras y un ancho máximo <code>maxWidth</code>, formatea el texto para que cada línea tenga exactamente <code>maxWidth</code> caracteres. 
Cada línea (excepto la última) debe estar completamente justificada repartiendo los espacios uniformemente entre las palabras.</p>

      <div className="algo-input-group">
        <label>texto/maxWidth:
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
        <div className="algo-section"><h3>📜 Pseudocódigo</h3><pre>{`func fullJustify(words,maxWidth):
  i=0; lines=[]
  mientras i<len(words):
    seleccionar palabras [i..j]
    si última línea o una palabra:
      unir con espacios y pad derecha
    sino:
      distribuir espacios uniformes
    agregar línea
    i=j+1
  retornar lines`}</pre></div>
        <div className="algo-section"><h3>🧭 ¿Qué debemos hacer?</h3><p>Construimos líneas greedy con las palabras que caben, luego distribuimos espacios uniformemente. La última línea se alinea a la izquierda.</p></div>
        <div className="algo-section"><h3>⏱️ Complejidad</h3><p>Tiempo: O(n). Espacio: O(n).</p></div>
        <div className="algo-section"><h3>💻 JavaScript</h3><pre>{`function fullJustify(words, maxWidth) {
  const lines=[];
  let i=0;
  while (i<words.length) {
    let j=i, len=words[i].length;
    while (j+1<words.length && len+1+words[j+1].length<=maxWidth) {
      j++; len+=1+words[j].length;
    }
    const isLast=(j===words.length-1);
    const gaps=j-i;
    let line="";
    if (gaps===0||isLast) {
      line=words.slice(i,j+1).join(" ");
      line+=" ".repeat(maxWidth-line.length);
    } else {
      const totalChars=words.slice(i,j+1).reduce((a,w)=>a+w.length,0);
      const totalSpaces=maxWidth-totalChars;
      const base=Math.floor(totalSpaces/gaps);
      let extra=totalSpaces%gaps;
      for (let k=i;k<=j;k++) {
        line+=words[k];
        if (k<j) {
          line+=" ".repeat(base+(extra>0?1:0));
          if (extra>0) extra--;
        }
      }
    }
    lines.push(line);
    i=j+1;
  }
  return lines;
}`}</pre></div>
      </>) }
    </div>
  );
};

export default TextJustification;
