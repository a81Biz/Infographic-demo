import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import routes from './routes';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        {routes.map((r, i) => (
          <Route key={i} path={r.path} element={<r.component />} />
        ))}
      </Routes>
    </Router>
  );
}

export default App;
