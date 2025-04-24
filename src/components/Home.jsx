import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import routes from '../routes';

function Home() {
  useEffect(() => {
    document.title = 'AM | Home Infografías'; 
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Infografías disponibles</h1>
      <ul className="grid grid-cols-2 gap-4">
        {routes.map((r, idx) => (
          <li key={idx}>
            <Link
              to={r.path}
              className="block p-4 border rounded hover:bg-gray-100 transition"
            >
              {r.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
