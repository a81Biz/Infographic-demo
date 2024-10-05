import React from 'react';
import { Database, Server } from 'lucide-react';

const Infographic = () => {
  const examples = [
    { 
      sql: "SELECT LENGTH('Hello, World!') AS longitud;",
      mongodb: "db.collection.aggregate([{ $project: { longitud: { $strLenCP: '$campo' } } }])",
      description: "Longitud básica de una cadena"
    },
    {
      sql: "SELECT CHAR_LENGTH('こんにちは') AS longitud;",
      mongodb: "db.collection.aggregate([{ $project: { longitud: { $strLenBytes: '$campo' } } }])",
      description: "Longitud con caracteres Unicode"
    },
    {
      sql: "SELECT DATALENGTH(N'Hello') AS longitud;",
      mongodb: "db.collection.aggregate([{ $project: { longitud: { $bsonSize: '$campo' } } }])",
      description: "Longitud en bytes"
    }
  ];

  const CodeBlock = ({ code, language }) => (
    <pre className="bg-gray-800 text-white p-2 rounded overflow-x-auto mt-2">
      <code>{code}</code>
    </pre>
  );

  const ExampleBlock = ({ sql, mongodb, description }) => (
    <div className="bg-white p-4 rounded shadow mb-4">
      <p className="font-semibold mb-2">{description}</p>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h4 className="font-bold flex items-center"><Database className="mr-2" size={20} /> SQL</h4>
          <CodeBlock code={sql} language="sql" />
        </div>
        <div>
          <h4 className="font-bold flex items-center"><Server className="mr-2" size={20} /> MongoDB</h4>
          <CodeBlock code={mongodb} language="javascript" />
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4">Cálculo de Longitud de Cadenas: SQL vs MongoDB</h1>
      
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-blue-100 p-4 rounded">
          <h2 className="text-xl font-bold mb-2 flex items-center"><Database className="mr-2" size={24} /> SQL</h2>
          <ul className="list-disc list-inside">
            <li>Utiliza funciones como LENGTH(), CHAR_LENGTH(), y DATALENGTH()</li>
            <li>La sintaxis puede variar ligeramente entre diferentes sistemas de bases de datos SQL</li>
            <li>Generalmente más directo para consultas simples</li>
          </ul>
        </div>
        <div className="bg-green-100 p-4 rounded">
          <h2 className="text-xl font-bold mb-2 flex items-center"><Server className="mr-2" size={24} /> MongoDB</h2>
          <ul className="list-disc list-inside">
            <li>Usa operadores de agregación como $strLenCP, $strLenBytes, y $bsonSize</li>
            <li>Permite cálculos de longitud en etapas de agregación</li>
            <li>Ofrece más opciones para manejar diferentes codificaciones</li>
          </ul>
        </div>
      </div>

      {examples.map((example, index) => (
        <ExampleBlock key={index} {...example} />
      ))}

      <div className="bg-yellow-100 p-4 rounded mt-4">
        <h2 className="text-xl font-bold mb-2">Consideraciones Importantes</h2>
        <ul className="list-disc list-inside">
          <li>SQL: La función específica puede variar según el sistema de base de datos (MySQL, PostgreSQL, SQL Server, etc.)</li>
          <li>MongoDB: $strLenCP cuenta puntos de código, $strLenBytes cuenta bytes, útil para diferentes necesidades</li>
          <li>Ambos sistemas permiten calcular longitudes en consultas más complejas y sobre múltiples registros</li>
          <li>El manejo de caracteres Unicode puede diferir, especialmente en bases de datos SQL más antiguas</li>
        </ul>
      </div>
    </div>
  );
};

export default Infographic;