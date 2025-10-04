// routes.js
// Infografías
const infografiaModules = import.meta.glob("./infografias/*.jsx", { eager: true });
// Ejercicios
const ejercicioModules = import.meta.glob("./ejercicios/*.jsx", { eager: true });

function normalizeName(filePath) {
  // ./ejercicios/MergeSortedArray.jsx -> MergeSortedArray
  return filePath
    .split("/")
    .pop()
    .replace(".jsx", "");
}

const routes = [
  ...Object.entries(infografiaModules).map(([path, module]) => {
    const name = normalizeName(path);
    return {
      path: `/${name}`,
      name: `Infografía: ${name}`,
      component: module.default,
    };
  }),
  ...Object.entries(ejercicioModules).map(([path, module]) => {
    const name = normalizeName(path);
    return {
      path: `/${name}`,
      name: `Ejercicio: ${name}`,
      component: module.default,
    };
  }),
];

export default routes;
