import React, { useState } from 'react';

const MongoDBFilterInfografia = () => {
  const initialData = [
    { _id: 1, nombre: "Laptop", precio: 1200, stock: 50 },
    { _id: 2, nombre: "Smartphone", precio: 800, stock: 100 },
    { _id: 3, nombre: "Tablet", precio: 300, stock: 75 },
    { _id: 4, nombre: "Smartwatch", precio: 250, stock: 30 },
    { _id: 5, nombre: "Auriculares", precio: 150, stock: 200 },
  ];

  const [data, setData] = useState(initialData);
  const [precioMin, setPrecioMin] = useState("");
  const [precioMax, setPrecioMax] = useState("");
  const [stockMin, setStockMin] = useState("");

  const applyFilter = () => {
    let filteredData = [...initialData];
    if (precioMin) filteredData = filteredData.filter(item => item.precio >= Number(precioMin));
    if (precioMax) filteredData = filteredData.filter(item => item.precio <= Number(precioMax));
    if (stockMin) filteredData = filteredData.filter(item => item.stock >= Number(stockMin));
    setData(filteredData);
  };

  const getQuery = () => {
    let query = "db.productos.find(";
    let conditions = [];
    if (precioMin) conditions.push(`precio: { $gte: ${precioMin} }`);
    if (precioMax) conditions.push(`precio: { $lte: ${precioMax} }`);
    if (stockMin) conditions.push(`stock: { $gte: ${stockMin} }`);
    query += conditions.length ? "{ " + conditions.join(", ") + " }" : "";
    query += ")";
    return query;
  };

  return (
    <div className="p-4 max-w-3xl mx-auto bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Filtro Básico en MongoDB con find()</h2>
      
      <div className="mb-4 bg-white p-3 rounded shadow">
        <h3 className="font-bold mb-2">Consulta MongoDB:</h3>
        <code className="bg-gray-200 p-2 rounded block">{getQuery()}</code>
      </div>

      <div className="mb-4 flex space-x-2">
        <input
          type="number"
          placeholder="Precio mínimo"
          value={precioMin}
          onChange={(e) => setPrecioMin(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="number"
          placeholder="Precio máximo"
          value={precioMax}
          onChange={(e) => setPrecioMax(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="number"
          placeholder="Stock mínimo"
          value={stockMin}
          onChange={(e) => setStockMin(e.target.value)}
          className="border p-2 rounded"
        />
        <button onClick={applyFilter} className="bg-blue-500 text-white px-4 py-2 rounded">
          Aplicar Filtro
        </button>
      </div>

      <table className="w-full bg-white shadow-md rounded mb-4">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 text-left">ID</th>
            <th className="p-2 text-left">Nombre</th>
            <th className="p-2 text-left">Precio</th>
            <th className="p-2 text-left">Stock</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item._id} className="border-b">
              <td className="p-2">{item._id}</td>
              <td className="p-2">{item.nombre}</td>
              <td className="p-2">${item.precio}</td>
              <td className="p-2">{item.stock}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="text-sm">
        <h3 className="font-bold mb-2">Cómo usar find() con filtros en MongoDB:</h3>
        <ol className="list-decimal list-inside">
          <li>Usa <code>db.coleccion.find()</code> para consultar documentos</li>
          <li>Dentro de find(), pasa un objeto con las condiciones de filtro</li>
          <li>Usa operadores como <code>$gte</code> (mayor o igual) y <code>$lte</code> (menor o igual) para rangos</li>
          <li>Combina múltiples condiciones en el mismo objeto para AND lógico</li>
        </ol>
      </div>

      <div className="mt-4 text-sm">
        <h3 className="font-bold mb-2">Ejemplos:</h3>
        <ul className="list-disc list-inside">
          <li><code>&#123; precio: &#123; $gte: 500 &#125; &#125;</code> - Productos con precio mayor o igual a 500</li>
          <li><code>&#123; precio: &#123; $lte: 1000 &#125; &#125;</code> - Productos con precio menor o igual a 1000</li>
          <li><code>&#123; precio: &#123; $gte: 500, $lte: 1000 &#125; &#125;</code> - Productos con precio entre 500 y 1000</li>
          <li><code>&#123; stock: &#123; $gte: 50 &#125; &#125;</code> - Productos con 50 o más unidades en stock</li>
        </ul>
      </div>
    </div>
  );
};

export default MongoDBFilterInfografia;