import React, { useState } from 'react';
import { ArrowUpDown } from 'lucide-react';

const SQLOrderByInfografia = () => {
  const initialData = [
    { id: 1, nombre: 'Ana', edad: 28, salario: 45000.50, fecha_contratacion: '2022-03-15' },
    { id: 2, nombre: 'Carlos', edad: 35, salario: 52000.75, fecha_contratacion: '2020-11-01' },
    { id: 3, nombre: 'Elena', edad: 31, salario: 48500.25, fecha_contratacion: '2021-07-22' },
    { id: 4, nombre: 'Beto', edad: 42, salario: 60000.00, fecha_contratacion: '2019-05-10' },
    { id: 5, nombre: 'Diana', edad: 26, salario: 41000.50, fecha_contratacion: '2023-01-05' },
  ];

  const [data, setData] = useState(initialData);
  const [orderBy, setOrderBy] = useState('');
  const [orderDirection, setOrderDirection] = useState('ASC');

  const handleSort = (column) => {
    const newDirection = orderBy === column && orderDirection === 'ASC' ? 'DESC' : 'ASC';
    setOrderBy(column);
    setOrderDirection(newDirection);

    const sortedData = [...data].sort((a, b) => {
      if (a[column] < b[column]) return newDirection === 'ASC' ? -1 : 1;
      if (a[column] > b[column]) return newDirection === 'ASC' ? 1 : -1;
      return 0;
    });

    setData(sortedData);
  };

  const getQuery = () => {
    if (!orderBy) return 'SELECT * FROM empleados;';
    return `SELECT * FROM empleados ORDER BY ${orderBy} ${orderDirection};`;
  };

  return (
    <div className="p-4 max-w-3xl mx-auto bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Ordenar datos en SQL con ORDER BY</h2>
      
      <div className="mb-4 bg-white p-3 rounded shadow">
        <h3 className="font-bold mb-2">Consulta SQL:</h3>
        <code className="bg-gray-200 p-2 rounded block">{getQuery()}</code>
      </div>

      <table className="w-full bg-white shadow-md rounded mb-4">
        <thead>
          <tr className="bg-gray-200">
            {Object.keys(initialData[0]).map((column) => (
              <th key={column} className="p-2 text-left cursor-pointer" onClick={() => handleSort(column)}>
                {column}
                {orderBy === column && (
                  <ArrowUpDown className={`inline-block ml-1 ${orderDirection === 'DESC' ? 'transform rotate-180' : ''}`} size={16} />
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.id} className="border-b">
              {Object.values(row).map((value, index) => (
                <td key={index} className="p-2">{value}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <div className="text-sm">
        <h3 className="font-bold mb-2">Cómo usar ORDER BY:</h3>
        <ol className="list-decimal list-inside">
          <li>Escribe tu consulta SELECT básica</li>
          <li>Agrega la cláusula ORDER BY al final de la consulta</li>
          <li>Especifica la columna por la que quieres ordenar</li>
          <li>Opcionalmente, agrega ASC (ascendente) o DESC (descendente)</li>
          <li>Puedes ordenar por múltiples columnas separándolas por comas</li>
        </ol>
      </div>

      <div className="mt-4 text-sm">
        <h3 className="font-bold mb-2">Ejemplos:</h3>
        <ul className="list-disc list-inside">
          <li><code>ORDER BY nombre ASC</code> - Ordena alfabéticamente por nombre</li>
          <li><code>ORDER BY salario DESC</code> - Ordena por salario de mayor a menor</li>
          <li><code>ORDER BY edad ASC, salario DESC</code> - Ordena por edad ascendente y luego por salario descendente</li>
          <li><code>ORDER BY fecha_contratacion DESC</code> - Ordena por fecha de contratación, más reciente primero</li>
        </ul>
      </div>
    </div>
  );
};

export default SQLOrderByInfografia;