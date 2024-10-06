import React from 'react';
import { ArrowRight, Check, X, Zap } from 'lucide-react';

const RemoveDuplicatesInfographic = () => {
  const originalArray = [1, 2, 2, 3, 4, 4, 4, 5, 5];

  return (
    <div className="p-4 max-w-4xl mx-auto bg-gray-100 rounded-lg">
      <h1 className="text-2xl font-bold text-center mb-6">Eliminar Duplicados de un Array Ordenado</h1>
      
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4 text-center">Proceso de Eliminación de Duplicados</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-blue-100 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Código Base</h3>
            <pre className="bg-gray-800 text-white p-4 rounded overflow-x-auto text-xs">
              <code>{`function removeDuplicates(arr) {
  if (arr.length === 0) return [];
  
  const result = [arr[0]];
  
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] !== arr[i-1]) {
      result.push(arr[i]);
    }
  }
  
  return result;
}`}</code>
            </pre>
          </div>
          
          <div className="bg-green-100 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Explicación</h3>
            <ul className="list-disc list-inside text-sm">
              <li>Aprovechamos que el array está ordenado</li>
              <li>Comparamos cada elemento con el anterior</li>
              <li>Si son diferentes, agregamos el elemento actual</li>
              <li>Esto elimina duplicados consecutivos</li>
              <li>Complejidad temporal: O(n)</li>
              <li>Complejidad espacial: O(n) en el peor caso</li>
            </ul>
          </div>
        </div>
        
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Ejemplo Paso a Paso</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-200">
                  <th className="p-2">Paso</th>
                  <th className="p-2">Array Original</th>
                  <th className="p-2">Elemento Actual</th>
                  <th className="p-2">¿Diferente al Anterior?</th>
                  <th className="p-2">Resultado Parcial</th>
                </tr>
              </thead>
              <tbody>
                {originalArray.map((num, index) => {
                  const isDifferent = index === 0 || num !== originalArray[index - 1];
                  const resultArray = originalArray.slice(0, index + 1).filter((n, i, arr) => i === 0 || n !== arr[i-1]);
                  
                  return (
                    <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : ''}>
                      <td className="p-2 text-center">{index + 1}</td>
                      <td className="p-2">
                        {originalArray.map((n, i) => (
                          <span key={i} className={`inline-block w-6 text-center mx-1 ${i === index ? 'font-bold bg-yellow-200 rounded' : ''}`}>
                            {n}
                          </span>
                        ))}
                      </td>
                      <td className="p-2 text-center font-bold">{num}</td>
                      <td className="p-2 text-center">
                        {isDifferent ? (
                          <Check size={16} className="inline text-green-500" />
                        ) : (
                          <X size={16} className="inline text-red-500" />
                        )}
                      </td>
                      <td className="p-2 text-center">[{resultArray.join(', ')}]</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        
        <div className="bg-yellow-100 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-2 flex items-center">
            <Zap size={20} className="mr-2 text-yellow-500" />
            Optimizaciones Posibles
          </h3>
          <ul className="list-disc list-inside text-sm">
            <li>Modificar el array in-place para ahorrar espacio (O(1) espacio)</li>
            <li>Usar dos punteros: uno para recorrer, otro para colocar elementos únicos</li>
            <li>Implementación optimizada:</li>
          </ul>
          <pre className="bg-gray-800 text-white p-4 rounded overflow-x-auto text-xs mt-2">
            <code>{`function removeDuplicatesOptimized(arr) {
  if (arr.length === 0) return 0;
  
  let uniqueIndex = 0;
  
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] !== arr[uniqueIndex]) {
      uniqueIndex++;
      arr[uniqueIndex] = arr[i];
    }
  }
  
  return uniqueIndex + 1; // Longitud del array sin duplicados
}`}</code>
          </pre>
        </div>
      </div>
    </div>
  );
};

export default RemoveDuplicatesInfographic;