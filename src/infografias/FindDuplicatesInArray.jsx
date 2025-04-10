import React from 'react';
import { Hash, Check, X } from 'lucide-react';

const IdentifyDuplicatesInfographic = () => {
  const array = [3, 1, 4, 1, 5, 9, 2, 6, 5, 3];

  return (
    <div className="p-4 max-w-4xl mx-auto bg-gray-100 rounded-lg">
      <h1 className="text-2xl font-bold text-center mb-6">Identificar Duplicados en un Array</h1>
      
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4 text-center">Proceso de Identificación</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-blue-100 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Código</h3>
            <pre className="bg-gray-800 text-white p-4 rounded overflow-x-auto text-xs">
              <code>{`function findDuplicates(arr) {
  const seen = new Set();
  const duplicates = [];
  
  for (const num of arr) {
    if (seen.has(num)) {
      duplicates.push(num);
    } else {
      seen.add(num);
    }
  }
  
  return duplicates;
}`}</code>
            </pre>
          </div>
          
          <div className="bg-green-100 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Explicación</h3>
            <ul className="list-disc list-inside text-sm">
              <li>Usamos un Set para almacenar números únicos</li>
              <li>Recorremos el array una sola vez</li>
              <li>Si el número ya está en el Set, es un duplicado</li>
              <li>Si no, lo agregamos al Set</li>
              <li>Retornamos la lista de duplicados</li>
            </ul>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-2">Paso</th>
                <th className="p-2">Array</th>
                <th className="p-2">Elemento Actual</th>
                <th className="p-2">Set</th>
                <th className="p-2">Duplicados</th>
                <th className="p-2">¿Es Duplicado?</th>
              </tr>
            </thead>
            <tbody>
              {array.map((num, index) => {
                const seenSet = new Set(array.slice(0, index));
                const isDuplicate = seenSet.has(num);
                seenSet.add(num);
                const duplicates = array.slice(0, index + 1).filter((n, i, arr) => arr.indexOf(n) !== i);
                
                return (
                  <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : ''}>
                    <td className="p-2 text-center">{index + 1}</td>
                    <td className="p-2">
                      {array.map((n, i) => (
                        <span key={i} className={`inline-block w-6 text-center mx-1 ${i === index ? 'font-bold bg-yellow-200 rounded' : ''}`}>
                          {n}
                        </span>
                      ))}
                    </td>
                    <td className="p-2 text-center font-bold">{num}</td>
                    <td className="p-2 text-center">
                      <Hash size={16} className="inline mr-1" />
                      {[...seenSet].join(', ')}
                    </td>
                    <td className="p-2 text-center">{duplicates.join(', ')}</td>
                    <td className="p-2 text-center">
                      {isDuplicate ? (
                        <Check size={16} className="inline text-green-500" />
                      ) : (
                        <X size={16} className="inline text-red-500" />
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default IdentifyDuplicatesInfographic;