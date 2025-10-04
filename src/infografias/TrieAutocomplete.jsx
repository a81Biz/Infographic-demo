import React, { useState } from "react";

class TrieNode {
  constructor() {
    this.children = {};
    this.isEnd = false;
  }
}

class Trie {
  constructor() {
    this.root = new TrieNode();
    this.words = [];
  }

  insert(word) {
    let node = this.root;
    for (let char of word) {
      if (!node.children[char]) node.children[char] = new TrieNode();
      node = node.children[char];
    }
    node.isEnd = true;
    this.words.push(word);
  }

  searchSteps(prefix) {
    let node = this.root;
    const logs = [];
    for (let char of prefix) {
      if (!node.children[char]) {
        logs.push(`❌ '${char}' no encontrado`);
        return { logs, suggestions: [] };
      }
      logs.push(`✅ '${char}' encontrado`);
      node = node.children[char];
    }
    logs.push(`Prefijo completo encontrado: "${prefix}"`);

    // recolectar palabras que empiezan con el prefijo
    const suggestions = this.words.filter((w) => w.startsWith(prefix));
    return { logs, suggestions };
  }

  getTree(node = this.root, indent = "") {
    let output = "";
    for (let char in node.children) {
      output += `${indent}└── ${char}\n`;
      output += this.getTree(node.children[char], indent + "   ");
    }
    return output;
  }
}

const TrieAutocomplete = () => {
  const trie = new Trie();
  ["casa", "cabo", "carro"].forEach((w) => trie.insert(w));

  const [prefix, setPrefix] = useState("ca");
  const [steps, setSteps] = useState([]);
  const [suggestions, setSuggestions] = useState([]);

  const handleSearch = () => {
    const { logs, suggestions } = trie.searchSteps(prefix);
    setSteps(logs);
    setSuggestions(suggestions);
  };

  return (
    <div className="algo-card">
      <h2>Trie Autocomplete</h2>

      <label>
        Prefijo:
        <input
          value={prefix}
          onChange={(e) => setPrefix(e.target.value)}
          className="algo-input"
        />
      </label>
      <button onClick={handleSearch} className="algo-btn">
        Buscar
      </button>

      <div className="algo-steps">
        <h3>Palabras almacenadas</h3>
        <p>{"casa, cabo, carro"}</p>
      </div>

      {steps.length > 0 && (
        <div className="algo-steps">
          <h3>Pasos de búsqueda</h3>
          <ol>{steps.map((s, i) => <li key={i}>{s}</li>)}</ol>
        </div>
      )}

      {suggestions.length > 0 && (
        <div className="algo-result">
          <strong>Sugerencias:</strong> {suggestions.join(", ")}
        </div>
      )}

      <div className="algo-explainer">
        <h3>Visualización del Trie</h3>
        <pre>
{`(root)
└── c
   └── a
      ├── s → a → [end]
      ├── b → o → [end]
      └── r → r → o → [end]`}
        </pre>
      </div>
    </div>
  );
};

export default TrieAutocomplete;
