import React, { useState } from 'react';
import { ArrowRight, ChevronDown, ChevronUp } from 'lucide-react';

const MinMaxArrayInfographic = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const array = [4, 2, 9, 7, 5, 1, 8];
  const [min, setMin] = useState(array[0]);
  const [max, setMax] = useState(array[0]);

  const nextStep = () => {
    if (currentIndex < array.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setMin(Math.min(min, array[currentIndex + 1]));
      setMax(Math.max(max, array[currentIndex + 1]));
    }
  };

  return (
    <div className="p-4 max-w-4xl mx-auto bg-gray-100 rounded-lg">
      <h1 className="text-2xl font-bold text-center mb-6">Encontrar Mínimo y Máximo en un Array</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-blue-100 p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">C#</h2>
          <pre className="bg-gray-800 text-white p-4 rounded overflow-x-auto">
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
          <pre className="bg-gray-800 text-white p-4 rounded overflow-x-auto">
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
        <div className="flex justify-center items-center space-x-2 mb-4">
          {array.map((num, index) => (
            <div
              key={index}
              className={`w-10 h-10 flex items-center justify-center rounded-lg 
                ${index === currentIndex ? 'bg-green-300 font-bold' : 'bg-gray-200'}
                ${num === min ? 'border-b-4 border-blue-500' : ''}
                ${num === max ? 'border-t-4 border-red-500' : ''}`}
            >
              {num}
            </div>
          ))}
        </div>
        <div className="flex justify-center items-center space-x-4 mb-4">
          <div className="text-center">
            <ChevronDown className="mx-auto" size={24} color="blue" />
            <p className="font-semibold">Min: {min}</p>
          </div>
          <div className="text-center">
            <ChevronUp className="mx-auto" size={24} color="red" />
            <p className="font-semibold">Max: {max}</p>
          </div>
        </div>
        <div className="flex justify-center">
          <button
            onClick={nextStep}
            disabled={currentIndex === array.length - 1}
            className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-300"
          >
            Siguiente Paso <ArrowRight className="inline ml-2" size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MinMaxArrayInfographic;