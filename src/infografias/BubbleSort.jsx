import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, RotateCcw } from 'lucide-react';

const BubbleSortInfographic = () => {
  const initialArray = [64, 34, 25, 12, 22, 11, 90];
  const [array, setArray] = useState([...initialArray]);
  const [step, setStep] = useState(0);
  const [comparing, setComparing] = useState([]);
  const [swapping, setSwapping] = useState([]);
  const [sorted, setSorted] = useState([]);
  const [sortingComplete, setSortingComplete] = useState(false);

  const bubbleSort = (arr) => {
    const steps = [];
    const n = arr.length;
    let swapped;

    for (let i = 0; i < n - 1; i++) {
      swapped = false;
      for (let j = 0; j < n - i - 1; j++) {
        steps.push({ type: 'compare', indices: [j, j + 1], array: [...arr] });
        if (arr[j] > arr[j + 1]) {
          steps.push({ type: 'swap', indices: [j, j + 1], array: [...arr] });
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          swapped = true;
        }
      }
      steps.push({ type: 'sorted', index: n - i - 1, array: [...arr] });
      if (!swapped) break;
    }
    return steps;
  };

  const [sortSteps] = useState(bubbleSort([...initialArray]));

  const nextStep = () => {
    if (step < sortSteps.length) {
      const currentStep = sortSteps[step];
      setArray(currentStep.array);
      if (currentStep.type === 'compare') {
        setComparing(currentStep.indices);
        setSwapping([]);
      } else if (currentStep.type === 'swap') {
        setSwapping(currentStep.indices);
      } else if (currentStep.type === 'sorted') {
        setSorted([...sorted, currentStep.index]);
        setComparing([]);
        setSwapping([]);
      }
      setStep(step + 1);
    } else {
      setSortingComplete(true);
    }
  };

  const prevStep = () => {
    if (step > 0) {
      setStep(step - 1);
      const prevStep = sortSteps[step - 1];
      setArray(prevStep.array);
      if (prevStep.type === 'compare') {
        setComparing(prevStep.indices);
        setSwapping([]);
      } else if (prevStep.type === 'swap') {
        setSwapping(prevStep.indices);
      } else if (prevStep.type === 'sorted') {
        setSorted(sorted.slice(0, -1));
        setComparing([]);
        setSwapping([]);
      }
      setSortingComplete(false);
    }
  };

  const reset = () => {
    setArray([...initialArray]);
    setStep(0);
    setComparing([]);
    setSwapping([]);
    setSorted([]);
    setSortingComplete(false);
  };

  return (
    <div className="p-4 max-w-4xl mx-auto bg-gray-100 rounded-lg">
      <h1 className="text-2xl font-bold text-center mb-6">Bubble Sort Visualización</h1>
      
      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <div className="flex justify-center items-end space-x-2 mb-8">
          {array.map((value, index) => (
            <div
              key={index}
              className={`w-12 flex flex-col items-center ${
                comparing.includes(index)
                  ? 'bg-yellow-200'
                  : swapping.includes(index)
                  ? 'bg-green-200'
                  : sorted.includes(index)
                  ? 'bg-blue-200'
                  : 'bg-gray-200'
              } rounded-t-lg transition-all duration-300 ease-in-out`}
              style={{ height: `${value * 3}px` }}
            >
              <span className="mt-2 font-bold">{value}</span>
            </div>
          ))}
        </div>
        
        <div className="flex justify-center space-x-4">
          <button
            onClick={prevStep}
            disabled={step === 0}
            className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300 flex items-center"
          >
            <ArrowLeft size={16} className="mr-2" /> Anterior
          </button>
          <button
            onClick={nextStep}
            disabled={sortingComplete}
            className="px-4 py-2 bg-green-500 text-white rounded disabled:bg-gray-300 flex items-center"
          >
            Siguiente <ArrowRight size={16} className="ml-2" />
          </button>
          <button
            onClick={reset}
            className="px-4 py-2 bg-red-500 text-white rounded flex items-center"
          >
            <RotateCcw size={16} className="mr-2" /> Reiniciar
          </button>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Explicación del Bubble Sort</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>Compara elementos adyacentes y los intercambia si están en el orden incorrecto.</li>
          <li>Repite el proceso para cada elemento del array.</li>
          <li>En cada iteración, el elemento más grande "burbujea" hacia el final.</li>
          <li>El proceso se repite hasta que no se necesiten más intercambios.</li>
        </ul>
        <div className="mt-4">
          <h3 className="font-semibold">Leyenda:</h3>
          <div className="flex space-x-4 mt-2">
            <div className="flex items-center">
              <div className="w-4 h-4 bg-yellow-200 mr-2"></div>
              <span>Comparando</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-green-200 mr-2"></div>
              <span>Intercambiando</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-blue-200 mr-2"></div>
              <span>Ordenado</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BubbleSortInfographic;