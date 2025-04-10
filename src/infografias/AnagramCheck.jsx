import React from 'react';
import { ArrowRight } from 'lucide-react';

const Infographic = () => {
  const steps = [
    { title: "Entrada", description: "Recibir las dos cadenas" },
    { title: "Preparar", description: "Convertir a minúsculas y eliminar espacios" },
    { title: "Contar", description: "Contar la frecuencia de cada carácter" },
    { title: "Comparar", description: "Comparar los conteos de caracteres" },
    { title: "Resultado", description: "Determinar si son anagramas" }
  ];

  const exampleString1 = "Dormitorio";
  const exampleString2 = "Dormitorio";

  const LetterSquare = ({ letter, className }) => (
    <div className={`w-8 h-8 border border-blue-500 flex items-center justify-center font-bold text-sm ${className}`}>
      {letter}
    </div>
  );

  const CountSquare = ({ letter, count, className }) => (
    <div className={`w-16 h-16 border border-blue-500 flex flex-col items-center justify-center font-bold text-sm ${className}`}>
      <div>{letter}</div>
      <div>{count}</div>
    </div>
  );

  const StepVisual = ({ step, children }) => (
    <div className="mb-4">
      <h3 className="font-semibold mb-2">{step}</h3>
      <div className="flex items-center flex-wrap">
        {children}
      </div>
    </div>
  );

  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4">Verificación de Anagramas: Paso a Paso</h1>
      
      <div className="flex justify-between mb-6">
        {steps.map((step, index) => (
          <div key={index} className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold mb-2">
              {index + 1}
            </div>
            <div className="text-center">
              <h3 className="font-semibold">{step.title}</h3>
              <p className="text-sm">{step.description}</p>
            </div>
            {index < steps.length - 1 && (
              <ArrowRight className="text-gray-400 mt-2" />
            )}
          </div>
        ))}
      </div>

      <div className="bg-white p-4 rounded shadow mb-4">
        <StepVisual step="1. Entrada">
          <div className="flex flex-col w-full">
            <div className="flex flex-wrap mb-2">
              {exampleString1.split('').map((char, index) => (
                <LetterSquare key={index} letter={char} className="bg-green-100 m-1" />
              ))}
            </div>
            <div className="flex flex-wrap">
              {exampleString2.split('').map((char, index) => (
                <LetterSquare key={index} letter={char} className="bg-yellow-100 m-1" />
              ))}
            </div>
          </div>
        </StepVisual>

        <StepVisual step="2. Preparar">
          <div className="flex flex-col w-full">
            <div className="flex flex-wrap mb-2">
              {exampleString1.toLowerCase().replace(/s/g, '').split('').map((char, index) => (
                <LetterSquare key={index} letter={char} className="bg-green-200 m-1" />
              ))}
            </div>
            <div className="flex flex-wrap">
              {exampleString2.toLowerCase().replace(/s/g, '').split('').map((char, index) => (
                <LetterSquare key={index} letter={char} className="bg-yellow-200 m-1" />
              ))}
            </div>
          </div>
        </StepVisual>

        <StepVisual step="3. Contar">
          <div className="flex flex-col w-full">
            <div className="flex flex-wrap mb-2 justify-center">
              {[...new Set(exampleString1.toLowerCase().replace(/s/g, '').split(''))].map((char, index) => (
                <CountSquare 
                  key={index} 
                  letter={char} 
                  count={exampleString1.toLowerCase().split(char).length - 1}
                  className="bg-green-300 m-1" 
                />
              ))}
            </div>
            <div className="flex flex-wrap justify-center">
              {[...new Set(exampleString2.toLowerCase().replace(/s/g, '').split(''))].map((char, index) => (
                <CountSquare 
                  key={index} 
                  letter={char} 
                  count={exampleString2.toLowerCase().split(char).length - 1}
                  className="bg-yellow-300 m-1" 
                />
              ))}
            </div>
          </div>
        </StepVisual>

        <StepVisual step="4. Comparar">
          <div className="w-full text-center">
            <p className="font-bold mb-2">Comparación de conteos:</p>
            <div className="flex justify-center items-center">
              <div className="bg-green-300 p-2 rounded">
                {JSON.stringify([...new Set(exampleString1.toLowerCase().replace(/s/g, '').split(''))].reduce((acc, char) => {
                  acc[char] = exampleString1.toLowerCase().split(char).length - 1;
                  return acc;
                }, {}), null, 2)}
              </div>
              <span className="mx-4 font-bold">=</span>
              <div className="bg-yellow-300 p-2 rounded">
                {JSON.stringify([...new Set(exampleString2.toLowerCase().replace(/s/g, '').split(''))].reduce((acc, char) => {
                  acc[char] = exampleString2.toLowerCase().split(char).length - 1;
                  return acc;
                }, {}), null, 2)}
              </div>
            </div>
          </div>
        </StepVisual>

        <StepVisual step="5. Resultado">
          <div className="bg-green-200 p-4 rounded-lg text-center w-full">
            <p className="font-bold text-lg">¡Son anagramas!</p>
            <p>"Dormitorio" y "Dormitorio" tienen los mismos caracteres en la misma cantidad.</p>
          </div>
        </StepVisual>
      </div>

      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-xl font-bold mb-2">Código en JavaScript</h2>
        <pre className="bg-gray-800 text-white p-2 rounded overflow-x-auto">
          <code>{`
function sonAnagramas(str1, str2) {
  // Preparar las cadenas
  const limpiarCadena = (str) => str.toLowerCase().replace(/s/g, '');
  const cadena1 = limpiarCadena(str1);
  const cadena2 = limpiarCadena(str2);
  
  // Verificar longitud
  if (cadena1.length !== cadena2.length) return false;
  
  // Contar caracteres
  const conteo = {};
  for (let char of cadena1) {
    conteo[char] = (conteo[char] || 0) + 1;
  }
  
  // Comparar conteos
  for (let char of cadena2) {
    if (!conteo[char]) return false;
    conteo[char]--;
  }
  
  return true;
}

// Ejemplo de uso
const palabra1 = "Dormitorio";
const palabra2 = "Dormitorio";
console.log(sonAnagramas(palabra1, palabra2)); // Imprime: true
          `.trim()}
          </code>
        </pre>
      </div>
    </div>
  );
};

export default Infographic;