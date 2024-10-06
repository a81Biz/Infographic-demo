import React, { useState, useEffect, useMemo } from 'react';
import { ArrowRight, Check } from 'lucide-react';

const BusquedaLinealInfografia = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [found, setFound] = useState(false);
  const [started, setStarted] = useState(false);

  // Memoriza el array para evitar que cambie en cada renderización
  const array = useMemo(() => [3, 7, 2, 9, 1, 5], []);

  const target = 9;

  useEffect(() => {
    if (started && currentIndex < array.length && !found) {
      const timer = setTimeout(() => {
        if (array[currentIndex] === target) {
          setFound(true);
        } else {
          setCurrentIndex(currentIndex + 1);
        }
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [currentIndex, started, array, found]);

  const handleStart = () => {
    setStarted(true);
    setCurrentIndex(0);
    setFound(false);
  };

  return (
    <div className="p-4 max-w-2xl mx-auto bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Búsqueda Lineal en un Array</h2>
      <div className="mb-4 text-center">
        <p>Array: [{array.join(', ')}]</p>
        <p>Valor buscado: {target}</p>
      </div>
      <div className="flex justify-center items-center mb-4">
        {array.map((num, index) => (
          <div
            key={index}
            className={`w-12 h-12 border-2 flex items-center justify-center m-1 ${
              index === currentIndex && started
                ? 'bg-yellow-200 border-yellow-500'
                : index < currentIndex
                ? 'bg-gray-200'
                : ''
            }`}
          >
            {num}
            {index === currentIndex && started && !found && <ArrowRight className="text-yellow-500 absolute -mt-8" />}
            {found && index === currentIndex && <Check className="text-green-500 absolute -mt-8" />}
          </div>
        ))}
      </div>
      <div className="text-center mb-4">
        {!started && (
          <button onClick={handleStart} className="bg-blue-500 text-white px-4 py-2 rounded">
            Iniciar búsqueda
          </button>
        )}
        {started && !found && currentIndex < array.length && (
          <p>Buscando en el índice {currentIndex}...</p>
        )}
        {found && <p className="text-green-600">¡Elemento encontrado en el índice {currentIndex}!</p>}
        {!found && currentIndex === array.length && (
          <p className="text-red-600">Elemento no encontrado en el array.</p>
        )}
      </div>
      <div className="text-sm">
        <h3 className="font-bold mb-2">Proceso de Búsqueda Lineal:</h3>
        <ol className="list-decimal list-inside">
          <li>Comienza desde el primer elemento del array.</li>
          <li>Compara el elemento actual con el valor buscado.</li>
          <li>Si coincide, la búsqueda termina.</li>
          <li>Si no coincide, pasa al siguiente elemento.</li>
          <li>Repite los pasos 2-4 hasta encontrar el elemento o llegar al final del array.</li>
        </ol>
      </div>
    </div>
  );
};

export default BusquedaLinealInfografia;
