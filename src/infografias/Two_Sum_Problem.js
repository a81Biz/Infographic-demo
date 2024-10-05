import React from 'react';
import { ArrowRight, CheckCircle, XCircle } from 'lucide-react';

const TwoSumInfographic = () => {
  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-center mb-6">Encontrar dos números que suman un objetivo</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-gray-100 p-4 rounded-lg">
          <h2 className="text-lg font-semibold mb-2">Paso 1: Inicialización</h2>
          <ul className="list-disc list-inside">
            <li>Array: [2, 7, 11, 15]</li>
            <li>Objetivo: 9</li>
            <li>Inicializar diccionario vacío</li>
          </ul>
        </div>
        
        <div className="bg-blue-100 p-4 rounded-lg">
          <h2 className="text-lg font-semibold mb-2">Paso 2: Iterar array</h2>
          <p>Para cada número:</p>
          <ol className="list-decimal list-inside">
            <li>Calcular complemento</li>
            <li>Buscar complemento</li>
          </ol>
        </div>
        
        <div className="bg-green-100 p-4 rounded-lg">
          <h2 className="text-lg font-semibold mb-2">Paso 3: Comprobación</h2>
          <p>Si el complemento existe:</p>
          <ul className="list-disc list-inside">
            <li>Retornar índices</li>
            <li>Si no: Añadir al diccionario</li>
          </ul>
        </div>
      </div>
      
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <h2 className="text-lg font-semibold mb-2">Código Python:</h2>
        <pre className="bg-gray-800 text-white p-4 rounded overflow-x-auto">
          <code>{`def encontrar_suma(nums, objetivo):
    visto = {}
    for i, num in enumerate(nums):
        complemento = objetivo - num
        if complemento in visto:
            return [visto[complemento], i]
        visto[num] = i`}</code>
        </pre>
      </div>
      
      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4 text-center">Ejemplo visual: [2, 7, 11, 15], Objetivo = 9</h2>
        <div className="flex justify-center items-center space-x-4 mb-4">
          {[2, 7, 11, 15].map((num, index) => (
            <div key={index} className={`w-12 h-12 flex items-center justify-center rounded-lg ${index < 2 ? 'bg-green-200' : 'bg-gray-200'}`}>
              {num}
            </div>
          ))}
        </div>
        <div className="flex justify-center items-center space-x-2">
          <div className="text-center">
            <p>Complemento: 7</p>
            <XCircle className="mx-auto mt-2" size={24} color="red" />
            <p>Añadir 2 al dict</p>
          </div>
          <ArrowRight size={24} />
          <div className="text-center">
            <p>Complemento: 2</p>
            <CheckCircle className="mx-auto mt-2" size={24} color="green" />
            <p>¡Encontrado!</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TwoSumInfographic;