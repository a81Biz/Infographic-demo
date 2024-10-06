import React from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const MinMaxArrayInfographic = () => {
  const array = [4, 2, 9, 7, 5, 1, 8];

  return (
    <div className="p-4 max-w-4xl mx-auto bg-gray-100 rounded-lg">
      <h1 className="text-2xl font-bold text-center mb-6">Encontrar Mínimo y Máximo en un Array</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-blue-100 p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">C#</h2>
          <pre className="bg-gray-800 text-white p-4 rounded overflow-x-auto text-xs">
            <code>{`int[] array = { 4, 2, 9, 7, 5, 1, 8 };
int min = array[0];
int max = array[0];

for (int i = 1; i < array.Length; i++)
{
    if (array[i] < min)
        min = array[i];
    if (array[i] > max)
        max = array[i];
}

Console.WriteLine($"Min: {min}, Max: {max}");`}</code>
          </pre>
        </div>
        
        <div className="bg-yellow-100 p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">JavaScript</h2>
          <pre className="bg-gray-800 text-white p-4 rounded overflow-x-auto text-xs">
            <code>{`const array = [4, 2, 9, 7, 5, 1, 8];
let min = array[0];
let max = array[0];

for (let i = 1; i < array.length; i++) {
    if (array[i] < min)
        min = array[i];
    if (array[i] > max)
        max = array[i];
}

console.log(\`Min: \${min}, Max: \${max}\`);`}</code>
          </pre>
        </div>
      </div>
      
      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4 text-center">Visualización del Proceso</h2>
        <div className="flex flex-col items-center space-y-4">
          {array.map((num, index) => (
            <div key={index} className="flex items-center space-x-4">
              <div className="w-8 text-right font-semibold">Paso {index + 1}:</div>
              <div className="flex space-x-2">
                {array.map((n, i) => (
                  <div
                    key={i}
                    className={`w-8 h-8 flex items-center justify-center rounded-lg 
                      ${i === index ? 'bg-green-300 font-bold' : 'bg-gray-200'}
                      ${(index > 0 && n === Math.min(...array.slice(0, index + 1))) ? 'border-b-2 border-blue-500' : ''}
                      ${(index > 0 && n === Math.max(...array.slice(0, index + 1))) ? 'border-t-2 border-red-500' : ''}`}
                  >
                    {n}
                  </div>
                ))}
              </div>
              <div className="flex items-center space-x-4">
                <ChevronDown className="text-blue-500" size={18} />
                <div className="font-semibold">Min: {Math.min(...array.slice(0, index + 1))}</div>
                <ChevronUp className="text-red-500" size={18} />
                <div className="font-semibold">Max: {Math.max(...array.slice(0, index + 1))}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MinMaxArrayInfographic;