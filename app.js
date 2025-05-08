// Proyecto de seguimiento de peliculas
import { createInterface } from "readline";
import chalk from "chalk";

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

let peliculas = [
  { titulo: "El viaje de Chihiro", vista: false },
  { titulo: "La casa de papel", vista: true },
  { titulo: "El secreto de la muerte", vista: true },
  { titulo: "Avengers: Endgame", vista: false },
  { titulo: "Avengers: Infinity War", vista: false },
  { titulo: "Avengers: Age of Ultron", vista: true },
  { titulo: "The Dark Knight", vista: true },
  { titulo: "Titanic", vista: true },
  { titulo: "Batman v Superman: Dawn of Justice", vista: true },
]

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
    return
  }
  /*   const peliculasVistas = peliculas.filter((pelicula) => pelicula.vista)
  const peliculasNoVistas = peliculas.filter((pelicula) => !pelicula.vista) */
  const { true: peliculasVistas, false: peliculasNoVistas } = Object.groupBy(peliculas, peli => peli.vista)
  console.log('✔️', peliculasVistas.length, ' Peliculas Vistas');
  peliculasVistas.forEach((pelicula, index) => {
    console.log(chalk.greenBright(index + 1, pelicula.titulo))
  })
  console.log(`❌ ${peliculasNoVistas.length} peliculas no vistas`)
  peliculasNoVistas.forEach((pelicula, index) => {
    console.log(chalk.redBright(index + 1, pelicula.titulo))
  })
  manejarOpcion()
}

// Agrega una pelicula a la lista como no vista
const agregarPelicula = () => {
  rl.question('Ingrese el nombre de la pelicula: ', (pelicula) => {
    // validamos que no agregue cadena vacia
    if (pelicula.trim() === '') {
      console.log('No se puede agregar una pelicula vacia')
      return
    }
    // validamos que no agregue una pelicula repetida
    if (peliculas.some(peli => peli.titulo === pelicula)) {
      console.log('Ya existe una pelicula con ese nombre')
      return
    }
    // agregamos la pelicula
    peliculas.push({ titulo: pelicula.trim(), vista: false })
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
    peliculas[peliculaIndex-1].vista = true
    manejarOpcion()
  })
}

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

manejarOpcion()