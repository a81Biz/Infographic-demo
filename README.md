# 🧠 Infographic Demo

**Infographic Demo** es una aplicación interactiva construida en React que explica paso a paso distintos algoritmos mediante visualizaciones didácticas. Está pensada para enseñar conceptos como verificación de anagramas, búsqueda lineal, burbuja, entre otros, de forma visual, clara y escalable.

---

## 🚀 Tecnologías usadas

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS v3.4.1](https://tailwindcss.com/)
- [Lucide Icons](https://lucide.dev/icons/)

---

## 📦 Instalación y ejecución

```bash
# Clona el repositorio
git clone https://github.com/a81Biz/Infographic-demo.git
cd Infographic-demo

# Instala las dependencias
npm install

# Inicia el servidor de desarrollo
npm run dev
```

---

## 🔁 Intento de migración (NO EXITOSO)

Se intentó migrar a Tailwind CSS v4.0.0 para aprovechar mejoras en rendimiento y compatibilidad a futuro. Sin embargo, la migración provocó errores graves con la configuración de PostCSS al usar Vite:

```bash
[plugin:vite:css] [postcss] It looks like you're trying to use `tailwindcss` directly as a PostCSS plugin.
The PostCSS plugin has moved to a separate package...
```

También surgió un conflicto con los módulos ESM vs CommonJS al detectar sintaxis de `export default` en `postcss.config.js`, obligando a modificar `"type": "module"` en `package.json`, lo cual rompía otras herramientas.

---

## ❌ Problemas detectados tras la migración

- TailwindCSS v4 requiere `@tailwindcss/postcss`, lo cual **no es compatible directamente con Vite** sin configuraciones adicionales.
- Las clases de Tailwind no se renderizaban, dejando el sitio **sin estilos visibles**.
- Los íconos y estilos visuales desaparecieron.
- El rendimiento de desarrollo disminuyó por overhead en el `postcss.config.js`.

---

## ✅ Solución adoptada

Revertimos a **Tailwind v3.4.1** y restauramos el funcionamiento original sin conflictos ni advertencias. Esto permite mantener la compatibilidad con:

- Configuración Vite estándar.
- PostCSS clásico.
- Sintaxis de módulos comunes.
- Flujo visual esperado por los usuarios.

### 📦 Versiones estables usadas:

```json
"tailwindcss": "^3.4.1",
"postcss": "^8.4.38",
"autoprefixer": "^10.4.19"
```

---

## 🛠 Archivos clave

### tailwind.config.js

```js
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

### postcss.config.js

```js
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

---

## 🌐 Vista previa

Puedes ver una versión en producción aquí:

🔗 [https://a81.biz/Infographic-demo](https://a81.biz/Infographic-demo)

---

## 🧠 Contribuciones

Este proyecto está pensado para ser educativo y abierto a mejoras. Si deseas aportar más visualizaciones o mejoras visuales, ¡siéntete libre de hacer un pull request!

---

## 🗂️ Estructura del Proyecto

```
├── public/
├── src/
│   ├── components/
│   ├── infografias/
│   ├── App.jsx
│   ├── index.jsx
├── tailwind.config.js
├── postcss.config.js
├── vite.config.js
└── index.css
```

---

## 📄 Licencia

Este proyecto está bajo la licencia MIT.
