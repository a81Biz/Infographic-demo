import React from 'react';
import { ArrowRight } from 'lucide-react';

const Infographic = () => {
  const steps = [
    { title: "Entrada", description: "Recibir la cadena" },
    { title: "Preparar", description: "Eliminar espacios y convertir a minúsculas" },
    { title: "Invertir", description: "Crear una versión invertida de la cadena" },
    { title: "Comparar", description: "Comparar la cadena original con la invertida" },
    { title: "Resultado", description: "Determinar si es un palíndromo" }
  ];

  const exampleString = "Anita lava la tina";

  const LetterSquare = ({ letter, className }) => (
    <div className={`w-8 h-8 border border-blue-500 flex items-center justify-center font-bold text-sm ${className}`}>
      {letter}
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
      <h1 className="text-2xl font-bold mb-4">Verificación de Palíndromos: Paso a Paso</h1>
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
          <div className="flex flex-wrap">
            {exampleString.split('').map((char, index) => (
              <LetterSquare key={index} letter={char} className="bg-green-100 m-1" />
            ))}
          </div>
        </StepVisual>

        <StepVisual step="2. Preparar">
          <div className="flex flex-wrap">
            {exampleString.toLowerCase().replace(/\s/g, '').split('').map((char, index) => (
              <LetterSquare key={index} letter={char} className="bg-yellow-100 m-1" />
            ))}
          </div>
        </StepVisual>

        <StepVisual step="3. Invertir">
          <div className="flex flex-wrap">
            {exampleString.toLowerCase().replace(/\s/g, '').split('').reverse().map((char, index) => (
              <LetterSquare key={index} letter={char} className="bg-red-100 m-1" />
            ))}
          </div>
        </StepVisual>

        <StepVisual step="4. Comparar">
          <div className="flex flex-col">
            <div className="flex flex-wrap mb-2">
              {exampleString.toLowerCase().replace(/\s/g, '').split('').map((char, index) => (
                <LetterSquare key={index} letter={char} className="bg-purple-100 m-1" />
              ))}
            </div>
            <div className="flex justify-center items-center my-2">
              <ArrowRight className="text-gray-400 mx-2" />
              <span className="font-bold">VS</span>
              <ArrowRight className="text-gray-400 mx-2" />
            </div>
            <div className="flex flex-wrap">
              {exampleString.toLowerCase().replace(/\s/g, '').split('').reverse().map((char, index) => (
                <LetterSquare key={index} letter={char} className="bg-blue-100 m-1" />
              ))}
            </div>
          </div>
        </StepVisual>

        <StepVisual step="5. Resultado">
          <div className="bg-green-200 p-4 rounded-lg text-center w-full">
            <p className="font-bold text-lg">¡Es un palíndromo!</p>
            <p>"Anita lava la tina" se lee igual de izquierda a derecha y de derecha a izquierda.</p>
          </div>
        </StepVisual>
      </div>

      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-xl font-bold mb-2">Código en JavaScript</h2>
        <pre className="bg-gray-800 text-white p-2 rounded overflow-x-auto">
          <code>{`
function esPalindromo(str) {
  // Preparar la cadena: convertir a minúsculas y eliminar espacios
  const cadenaLimpia = str.toLowerCase().replace(/\s/g, '');
  
  // Invertir la cadena
  const cadenaInvertida = cadenaLimpia.split('').reverse().join('');
  
  // Comparar y retornar el resultado
  return cadenaLimpia === cadenaInvertida;
}

// Ejemplo de uso
const frase = "Anita lava la tina";
console.log(esPalindromo(frase)); // Imprime: true
          `.trim()}
          </code>
        </pre>
      </div>
    </div>
  );
};

export default Infographic;