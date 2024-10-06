import React from 'react';
import { ArrowRight } from 'lucide-react';

const Infographic = () => {
  const steps = [
    { title: "Entrada", description: "Comenzar con una cadena" },
    { title: "Convertir", description: "Convertir la cadena a un array de caracteres" },
    { title: "Invertir", description: "Invertir el orden del array" },
    { title: "Unir", description: "Unir el array de vuelta en una cadena" },
    { title: "Salida", description: "Devolver la cadena invertida" }
  ];

  const exampleString = "HOLA";

  const LetterSquare = ({ letter, className }) => (
    <div className={`w-10 h-10 border-2 border-blue-500 flex items-center justify-center font-bold text-lg ${className}`}>
      {letter}
    </div>
  );

  const StepVisual = ({ step, children }) => (
    <div className="mb-4">
      <h3 className="font-semibold mb-2">{step}</h3>
      <div className="flex items-center space-x-2">
        {children}
      </div>
    </div>
  );

  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4">Invirtiendo una Cadena: Visualización Paso a Paso</h1>
      
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
          {exampleString.split('').map((char, index) => (
            <LetterSquare key={index} letter={char} className="bg-green-100" />
          ))}
        </StepVisual>

        <StepVisual step="2. Convertir">
          {exampleString.split('').map((char, index) => (
            <React.Fragment key={index}>
              <LetterSquare letter={char} className="bg-yellow-100" />
              {index < exampleString.length - 1 && <span className="font-bold text-black-400">,</span>}
            </React.Fragment>
          ))}
        </StepVisual>

        <StepVisual step="3. Invertir">
          {exampleString.split('').reverse().map((char, index) => (
            <React.Fragment key={index}>
              <LetterSquare letter={char} className="bg-red-100" />
              {index < exampleString.length - 1 && <span className="font-bold text-black-400">,</span>}
            </React.Fragment>
          ))}
        </StepVisual>

        <StepVisual step="4. Unir">
          {exampleString.split('').reverse().map((char, index) => (
            <LetterSquare key={index} letter={char} className="bg-purple-100" />
          ))}
        </StepVisual>

        <StepVisual step="5. Salida">
          {exampleString.split('').reverse().map((char, index) => (
            <LetterSquare key={index} letter={char} className="bg-blue-100" />
          ))}
        </StepVisual>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-bold mb-2">C#</h2>
          <pre className="bg-gray-800 text-white p-2 rounded overflow-x-auto">
            <code>{`
string Invertir(string s) {
  // Convertir la cadena a un array de caracteres
  char[] arrayDeCaracteres = s.ToCharArray();
  // Invertir el array
  Array.Reverse(arrayDeCaracteres);
  // Devolver una nueva cadena a partir del array invertido
  return new string(arrayDeCaracteres);
}
            `.trim()}
            </code>
          </pre>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-bold mb-2">JavaScript</h2>
          <pre className="bg-gray-800 text-white p-2 rounded overflow-x-auto">
            <code>{`
function invertir(s) {
  // Dividir la cadena en un array, 
  // invertirlo y unirlo de nuevo
  return s.split('').reverse().join('');
}
            `.trim()}
            </code>
          </pre>
        </div>
      </div>
    </div>
  );
};

export default Infographic;