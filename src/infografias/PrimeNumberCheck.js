import React from 'react';
import { Check, XCircle, ArrowRightCircle } from 'lucide-react';

function PrimeCheckerInfographic() {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>¿Cómo Comprobar si un Número es Primo?</h1>

      <div style={styles.section}>
        <h2>Paso 1: Entender qué es un número primo</h2>
        <p>
          Un número primo es un número mayor que 1 que solo es divisible entre 1 y sí mismo. Ejemplos: 2, 3, 5, 7.
        </p>
      </div>

      <div style={styles.section}>
        <h2>Paso 2: Lógica Básica</h2>
        <ul>
          <li><ArrowRightCircle /> Si el número es menor que 2, no es primo. <XCircle /></li>
          <li><ArrowRightCircle /> Si el número es divisible por cualquier número entre 2 y la raíz cuadrada del número, no es primo. <XCircle /></li>
          <li><ArrowRightCircle /> Si no es divisible por ningún número en ese rango, ¡es un número primo! <Check /></li>
        </ul>
      </div>

      <div style={styles.section}>
        <h2>Paso 3: Código en C#</h2>
        <pre style={styles.code}>
          {`
public bool IsPrime(int number) {
  if (number < 2) return false;
  for (int i = 2; i * i <= number; i++) {
    if (number % i == 0) return false;
  }
  return true;
}
          `}
        </pre>
      </div>

      <div style={styles.section}>
        <h2>Paso 4: Código en JavaScript</h2>
        <pre style={styles.code}>
          {`
function isPrime(num) {
  if (num < 2) return false;
  for (let i = 2; i * i <= num; i++) {
    if (num % i === 0) return false;
  }
  return true;
}
          `}
        </pre>
      </div>

      <div style={styles.section}>
        <h2>Paso 5: Diagrama de Flujo</h2>
        <div style={styles.flow}>
          <div>
            <ArrowRightCircle />
            <p>¿El número es menor que 2?</p>
            <XCircle />
            <p>No es primo</p>
          </div>

          <ArrowRightCircle style={styles.arrow} />
          
          <div>
            <ArrowRightCircle />
            <p>¿Es divisible entre 2 y √n?</p>
            <XCircle />
            <p>No es primo</p>
          </div>

          <ArrowRightCircle style={styles.arrow} />

          <div>
            <Check />
            <p>Es primo</p>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    maxWidth: '800px',
    margin: '0 auto',
  },
  title: {
    fontSize: '2em',
    textAlign: 'center',
    marginBottom: '20px',
  },
  section: {
    marginBottom: '30px',
  },
  code: {
    backgroundColor: '#f4f4f4',
    padding: '10px',
    borderRadius: '5px',
    fontFamily: 'monospace',
  },
  flow: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    textAlign: 'center',
  },
  arrow: {
    margin: '0 20px',
  },
};

export default PrimeCheckerInfographic;
