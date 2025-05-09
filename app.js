// Proyecto de seguimiento de peliculas
import { createInterface } from "readline";
import chalk from "chalk";
import path from 'path';
import { readFile, writeFile } from 'fs/promises'; // Usamos fs/promises para poder leer y escribir archivos
// en lugar de __dirname usamos process.cwd() - Current Working Directory
// para poder usar archivos en el mismo directorio
const PATH_PELICULAS = path.join(process.cwd(), 'data', 'peliculas.json')
// Creamos la interfaz de usuario
// para poder leer las respuestas del usuario
// desde la consola
const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});
// Lista de peliculas en array de objetos
let peliculas = []
// Mostrar el menu de la aplicación
const mostrarMenu = () => {
  console.log(chalk.greenBright('---- Menu ----'));
  console.log(chalk.underline.bold.greenBright('Bienvenido a la aplicación de seguimiento de peliculas'));
  console.log(chalk.yellowBright('Selecciona una opción:'));
  console.log(chalk.blueBright('1. Ver listado de peliculas'));
  console.log(chalk.blueBright('2. Agregar una pelicula a "Por ver"'));
  console.log(chalk.blueBright('3. Marcar una pelicula como "Vista"'));
  console.log(chalk.blueBright('0. Salir'));
  console.log(chalk.greenBright('--------------'));
}
// Listar Peliculas Vistas y No Vistas
const mostrarListaPeliculas = () => {
  console.log(' --- Listado de peliculas --- ')
  if (peliculas.length == 0) {
    console.log('No hay peliculas')
    manejarOpcion()
  }
  /*   const peliculasVistas = peliculas.filter((pelicula) => pelicula.vista)
  const peliculasNoVistas = peliculas.filter((pelicula) => !pelicula.vista) */
  const { true: peliculasVistas, false: peliculasNoVistas } = Object.groupBy(peliculas, peli => peli.vista)
  if (!peliculasVistas) {
    console.log(chalk.redBright('No hay peliculas vistas'))
  } else {
    console.log('✔️ ', peliculasVistas?.length, ' Peliculas Vistas');
    peliculasVistas?.forEach((pelicula, index) => {
      console.log(chalk.greenBright(index + 1, pelicula.titulo))
    })
  }
  if (!peliculasNoVistas) {
    console.log(chalk.redBright('No hay peliculas no vistas'))
  } else {
    console.log(`❌ ${peliculasNoVistas?.length} peliculas no vistas`)
    peliculasNoVistas?.forEach((pelicula, index) => {
      console.log(chalk.redBright(index + 1, pelicula.titulo))
    })
  }
  manejarOpcion()
}
// Agrega una pelicula a la lista como no vista
const agregarPelicula = () => {
  rl.question('Ingrese el nombre de la pelicula: ', (pelicula) => {
    // validamos que no agregue cadena vacia
    if (pelicula.trim() === '') {
      console.log('No se puede agregar una pelicula vacia')
      manejarOpcion()
    }
    // validamos que no agregue una pelicula repetida
    if (peliculas.some(peli => peli.titulo === pelicula)) {
      console.log('Ya existe una pelicula con ese nombre')
      manejarOpcion()
    }
    // agregamos la pelicula
    peliculas.push({ titulo: pelicula.trim(), vista: false })
    guardarPeliculas()
    manejarOpcion()
  })
}
// Marcar una pelicula como vista
const marcarComoVista = () => {
  const peliculasNoVistas = peliculas.filter(peli => !peli.vista)
  console.log(`❌ ${peliculasNoVistas.length} peliculas no vistas`)
  peliculasNoVistas.forEach((pelicula, index) => {
    console.log(chalk.redBright(index + 1, pelicula.titulo))
  })
  rl.question('Ingrese el indice la pelicula: ', (peliculaIndex) => {
    // Si no la encuentra, informamos que no existe el indice
    if (peliculaIndex < 1 || peliculaIndex > peliculasNoVistas.length) {
      console.log(chalk.redBright('La pelicula en ese indice no existe'))
      return
    }
    // Si la encuentra, marcamos la pelicula como vista
    peliculas.forEach((pelicula) => {
      if (pelicula.titulo === peliculasNoVistas[peliculaIndex - 1].titulo) {
        pelicula.vista = true
      }
    })
    guardarPeliculas()
    manejarOpcion()
  })
}
// Manejar las opciones del menu
const manejarOpcion = () => {
  mostrarMenu();
  // rl.question permite que el usuario escriba una respuesta
  // y que se ejecute la función que se le pase como segundo argumento
  rl.question('Selecciona una opción: ', (opcion) => {
    switch (opcion) {
      case '1':
        mostrarListaPeliculas();
        break;
      case '2':
        agregarPelicula();
        break;
      case '3':
        marcarComoVista();
        break;
      case '0':
        // Cerramos la interfaz de usuario
        console.log(chalk.greenBright('Saliendo...'));
        rl.close();
        break;
      default:
        console.log('Opción no reconocida');
        manejarOpcion()
    }
  });
}
// Cargar peliculas desde el archivo JSON al array de peliculas
const cargarPeliculas = async () => {
  try {
    const data = await readFile(PATH_PELICULAS, 'utf8')
    if (data) {
      peliculas = JSON.parse(data)
      console.log(chalk.green('Peliculas cargadas correctamente'))
    }
  } catch (error) {
    console.log(chalk.red('Error al cargar peliculas'))
    console.log(error)
  }
}
// Guardar peliculas en el archivo JSON del array de peliculas
const guardarPeliculas = async () => {
  const pelisAGuardar = JSON.stringify(peliculas, null, 2)
  try {
    await writeFile(PATH_PELICULAS, pelisAGuardar, 'utf8')
    console.log(chalk.green('Peliculas guardadas correctamente'))
  } catch (error) {
    console.log(chalk.red('Error al guardar peliculas'))
    console.log(error)
  }
}

cargarPeliculas()
manejarOpcion()