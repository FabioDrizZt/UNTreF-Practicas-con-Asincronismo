# 🎬 Seguimiento de Películas con Node.js

¡Bienvenido/a! Este repositorio contiene una aplicación de consola para gestionar un listado de películas por ver y vistas, desarrollada en Node.js. Permite agregar películas, marcarlas como vistas y guardar el progreso de manera persistente en un archivo JSON. 

## 📚 Temas tratados: Asincronismo en Node.js

### ¿Qué es el asincronismo?
El asincronismo es una característica fundamental en JavaScript y Node.js que permite ejecutar tareas que pueden tardar en completarse (como leer archivos o esperar la respuesta del usuario) sin bloquear el flujo principal del programa. Así, la aplicación puede seguir respondiendo a otras acciones mientras espera que estas tareas finalicen.

### ¿Cómo se aplica el asincronismo en este proyecto?

- **Lectura y escritura de archivos**: Se utilizan las funciones `readFile` y `writeFile` del módulo `fs/promises`, que son funciones asíncronas basadas en promesas. Esto permite leer y guardar el listado de películas sin detener la ejecución del programa.
- **Interacción con el usuario**: El método `rl.question` de la interfaz de readline es asíncrono, ya que espera la respuesta del usuario antes de continuar con la ejecución.
- **Funciones `async/await`**: Se emplean para manejar operaciones asíncronas de forma más legible y estructurada, facilitando el control del flujo de la aplicación.

#### Ejemplo de función asíncrona en el código:
```js
const cargarPeliculas = async () => {
  try {
    const data = await readFile(PATH_PELICULAS, 'utf8')
    if (data) {
      peliculas = JSON.parse(data)
      console.log('Peliculas cargadas correctamente')
    }
  } catch (error) {
    console.log('Error al cargar peliculas')
    console.log(error)
  }
}
```

## 🚀 ¿Cómo ejecutar el proyecto?
1. Clona el repositorio.
2. Instala las dependencias con `npm install`.
3. Ejecuta la aplicación con `node app.js`.

## 🛠️ Dependencias principales
- [Node.js](https://nodejs.org/)
- [chalk](https://www.npmjs.com/package/chalk) para colorear la salida en consola.

## 🤓 Autoría y aprendizaje
Este proyecto es ideal para aprender sobre asincronismo en Node.js, manejo de archivos y creación de aplicaciones interactivas de consola.

¡Explora el código y experimenta! 🍿
