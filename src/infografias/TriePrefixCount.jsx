import React, { useState } from "react";

// Nodo Trie
class TrieNode {
  constructor() {
    this.children = {};
    this.prefixCount = 0;
    this.isEnd = false;
  }
}

class Trie {
  constructor() {
    this.root = new TrieNode();
  }

  insert(word, logs) {
    let node = this.root;
    logs.push(`Insertar palabra "${word}"`);
    for (const ch of word) {
      if (!node.children[ch]) node.children[ch] = new TrieNode();
      node = node.children[ch];
      node.prefixCount++;
      logs.push(`  letra '${ch}', contador ahora = ${node.prefixCount}`);
    }
    node.isEnd = true;
  }

  countPrefix(prefix, logs) {
    let node = this.root;
    for (const ch of prefix) {
      if (!node.children[ch]) {
        logs.push(`Prefijo "${prefix}" no encontrado`);
        return 0;
      }
      node = node.children[ch];
    }
    logs.push(`Prefijo "${prefix}" encontrado, count = ${node.prefixCount}`);
    return node.prefixCount;
  }
}

// Visualización recursiva
const TrieNodeView = ({ node, letter }) => {
  if (!node) return null;
  return (
    <div className="trie-node">
      {letter!==undefined && (
        <div className="trie-val">
          {letter} ({node.prefixCount})
        </div>
      )}
      <div className="trie-children">
        {Object.entries(node.children).map(([ch,child])=>(
          <TrieNodeView key={ch} node={child} letter={ch}/>
        ))}
      </div>
    </div>
  );
};

const TriePrefixCount = () => {
  const [words, setWords] = useState("leet,leetcode,lemon,loop,cat");
  const [prefix, setPrefix] = useState("le");
  const [logs, setLogs] = useState([]);
  const [trie, setTrie] = useState(null);
  const [count, setCount] = useState(null);

  const handleBuild = () => {
    const wlist = words.split(",").map(x=>x.trim()).filter(Boolean);
    const t = new Trie();
    const steps=[];
    wlist.forEach(w=>t.insert(w,steps));
    setTrie(t);
    setLogs(steps);
    setCount(null);
  };

  const handleQuery = () => {
    if (!trie) return;
    const steps=[];
    const c = trie.countPrefix(prefix,steps);
    setCount(c);
    setLogs(steps);
  };

  return (
    <div className="algo-card">
      <h2>Trie con Contador de Prefijos</h2>
      <div className="algo-input-row">
        <label>Palabras<input className="algo-input" value={words} onChange={e=>setWords(e.target.value)}/></label>
        <button className="algo-btn" onClick={handleBuild}>Construir</button>
      </div>
      <div className="algo-input-row">
        <label>Prefijo<input className="algo-input" value={prefix} onChange={e=>setPrefix(e.target.value)}/></label>
        <button className="algo-btn" onClick={handleQuery}>Consultar</button>
      </div>

      {trie && (
        <div className="dp-wrap">
          <h3>Visualización del Trie</h3>
          <TrieNodeView node={trie.root}/>
        </div>
      )}

      {count!==null && <div className="algo-result">Palabras con prefijo "{prefix}": <strong>{count}</strong></div>}

      {logs.length>0 && (
        <div className="algo-steps">
          <h3>Pasos</h3>
          <ol>{logs.map((s,i)=><li key={i}>{s}</li>)}</ol>
        </div>
      )}

      <div className="algo-explainer">
        <h3>¿Qué estamos viendo?</h3>
        <p>
          Cada nodo del Trie almacena un <code>prefixCount</code>, que se incrementa
          cada vez que se inserta una palabra que pasa por ese nodo.  
          Al consultar un prefijo, devolvemos el contador del último nodo.
        </p>
        <h3>Pseudocódigo</h3>
        <pre>{`insert(word):
  node=root
  para cada caracter c en word:
    si node.children[c] no existe: crear
    node=node.children[c]
    node.prefixCount++
  node.isEnd=true

countPrefix(prefix):
  node=root
  para c en prefix:
    si c no está en node.children: return 0
    node=node.children[c]
  return node.prefixCount`}</pre>
      </div>
    </div>
  );
};

export default TriePrefixCount;
