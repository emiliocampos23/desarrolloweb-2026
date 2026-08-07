// Arreglo principal donde se guardan las películas
let peliculas = [
  { id: 1, nombre: "Star Wars", genero: "Ciencia Ficción", anio: 1977, calificacion: 10 },
  { id: 2, nombre: "El Padrino", genero: "Drama", anio: 1972, calificacion: 9.5 },
  { id: 3, nombre: "Toy Story", genero: "Animación", anio: 2017, calificacion: 8.2 }
];

// Id que se está editando actualmente (null si no hay edición en curso)
let idEnEdicion = null;

// Referencias al DOM
const form = document.getElementById("form-pelicula");
const inputId = document.getElementById("pelicula-id");
const inputNombre = document.getElementById("nombre");
const inputGenero = document.getElementById("genero");
const inputAnio = document.getElementById("anio");
const inputCalificacion = document.getElementById("calificacion");

const btnGuardar = document.getElementById("btn-guardar");
const btnCancelar = document.getElementById("btn-cancelar");
const formTitulo = document.getElementById("form-titulo");
const mensajeError = document.getElementById("mensaje-error");

const buscarNombre = document.getElementById("buscar-nombre");
const filtroGenero = document.getElementById("filtro-genero");
const filtroCalificacion = document.getElementById("filtro-calificacion");
const btnLimpiarFiltros = document.getElementById("btn-limpiar-filtros");

const listaPeliculas = document.getElementById("lista-peliculas");
const promedioCalificacion = document.getElementById("promedio-calificacion");

// Genera un id nuevo y único para cada película
function generarId() {
  return peliculas.length > 0 ? Math.max(...peliculas.map(p => p.id)) + 1 : 1;
}

// Muestra un mensaje de error dentro de la página (nada de alert)
function mostrarError(mensaje) {
  mensajeError.textContent = mensaje;
  mensajeError.classList.remove("oculto");
}

// Oculta el mensaje de error
function ocultarError() {
  mensajeError.textContent = "";
  mensajeError.classList.add("oculto");
}

function validarFormulario(nombre, genero, anio, calificacion) {
  if (nombre === "") {
    return "El nombre de la película es obligatorio.";
  }

  if (genero === "") {
    return "Debes seleccionar un género.";
  }

  if (anio === "" || isNaN(anio)) {
    return "El año debe ser un número válido.";
  }

  const anioNum = Number(anio);
  const anioActual = new Date().getFullYear();
  if (anioNum < 1888 || anioNum > anioActual + 1) {
    return `El año debe estar entre 1888 y ${anioActual + 1}.`;
  }

  if (calificacion === "" || isNaN(calificacion)) {
    return "La calificación debe ser un número válido.";
  }

  const calNum = Number(calificacion);
  if (calNum < 0 || calNum > 10) {
    return "La calificación debe estar entre 0 y 10.";
  }

  // Evitar nombres duplicados (ignorando la película que se está editando)
  const nombreRepetido = peliculas.find(
    p => p.nombre.toLowerCase() === nombre.toLowerCase() && p.id !== Number(inputId.value || -1)
  );
  if (nombreRepetido) {
    return "Ya existe una película registrada con ese nombre.";
  }

  return null; // sin errores
}

function agregarPelicula(nombre, genero, anio, calificacion) {
  const nuevaPelicula = {
    id: generarId(),
    nombre: nombre,
    genero: genero,
    anio: Number(anio),
    calificacion: Number(calificacion)
  };

  peliculas.push(nuevaPelicula); // push()
  renderizarPeliculas();
}

function actualizarPelicula(id, nombre, genero, anio, calificacion) {
  const indice = peliculas.findIndex(p => p.id === id); // findIndex()

  if (indice === -1) {
    mostrarError("No se encontró la película a editar.");
    return;
  }

  peliculas[indice] = {
    id: id,
    nombre: nombre,
    genero: genero,
    anio: Number(anio),
    calificacion: Number(calificacion)
  };

  renderizarPeliculas();
}

function eliminarPelicula(id) {
  const indice = peliculas.findIndex(p => p.id === id); // findIndex()

  if (indice === -1) return;

  peliculas.splice(indice, 1); // splice()
  renderizarPeliculas();

  // Si estabas editando esa misma película, cancela la edición
  if (idEnEdicion === id) {
    cancelarEdicion();
  }
}

function cargarPeliculaEnFormulario(id) {
  const pelicula = peliculas.find(p => p.id === id); // find()
  if (!pelicula) return;

  idEnEdicion = id;
  inputId.value = pelicula.id;
  inputNombre.value = pelicula.nombre;
  inputGenero.value = pelicula.genero;
  inputAnio.value = pelicula.anio;
  inputCalificacion.value = pelicula.calificacion;

  formTitulo.textContent = "Editar película";
  btnGuardar.textContent = "Guardar cambios";
  btnCancelar.classList.remove("oculto");

  ocultarError();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function cancelarEdicion() {
  idEnEdicion = null;
  form.reset();
  inputId.value = "";
  formTitulo.textContent = "Registrar película";
  btnGuardar.textContent = "Agregar película";
  btnCancelar.classList.add("oculto");
  ocultarError();
}

function obtenerPeliculasFiltradas() {
  let resultado = peliculas;

  // Búsqueda por nombre
  const textoBusqueda = buscarNombre.value.trim().toLowerCase();
  if (textoBusqueda !== "") {
    resultado = resultado.filter(p => p.nombre.toLowerCase().includes(textoBusqueda)); // filter()
  }

  // Filtro por género
  const generoSeleccionado = filtroGenero.value;
  if (generoSeleccionado !== "todos") {
    resultado = resultado.filter(p => p.genero === generoSeleccionado); // filter()
  }

  // Filtro por calificación >= 8
  if (filtroCalificacion.checked) {
    resultado = resultado.filter(p => p.calificacion >= 8); // filter()
  }

  return resultado;
}

function calcularPromedio(listaDePeliculas) {
  if (listaDePeliculas.length === 0) return null;

  const calificaciones = listaDePeliculas.map(p => p.calificacion); // map()
  const suma = calificaciones.reduce((acc, valor) => acc + valor, 0);
  return suma / calificaciones.length;
}

function renderizarPeliculas() {
  const peliculasAMostrar = obtenerPeliculasFiltradas();

  listaPeliculas.innerHTML = "";

  if (peliculasAMostrar.length === 0) {
    const mensajeVacio = document.createElement("p");
    mensajeVacio.classList.add("mensaje-vacio");
    mensajeVacio.textContent = "No hay películas que coincidan con la búsqueda/filtros.";
    listaPeliculas.appendChild(mensajeVacio);
  } else {
    peliculasAMostrar.forEach(pelicula => {
      const card = document.createElement("div");
      card.classList.add("pelicula-card");

      const claseCalificacion = pelicula.calificacion >= 8 ? "calificacion-alta" : "";

      card.innerHTML = `
        <h3>${pelicula.nombre}</h3>
        <p>Género: ${pelicula.genero}</p>
        <p>Año: ${pelicula.anio}</p>
        <p class="${claseCalificacion}">Calificación: ${pelicula.calificacion}</p>
        <div class="acciones-card">
          <button class="btn-editar" data-id="${pelicula.id}">Editar</button>
          <button class="btn-eliminar" data-id="${pelicula.id}">Eliminar</button>
        </div>
      `;

      listaPeliculas.appendChild(card);
    });
  }

  // Botones de editar y eliminar (delegación mediante querySelectorAll)
  document.querySelectorAll(".btn-editar").forEach(btn => {
    btn.addEventListener("click", () => cargarPeliculaEnFormulario(Number(btn.dataset.id)));
  });

  document.querySelectorAll(".btn-eliminar").forEach(btn => {
    btn.addEventListener("click", () => eliminarPelicula(Number(btn.dataset.id)));
  });

  // Actualizar promedio (se calcula sobre la lista filtrada visible)
  const promedio = calcularPromedio(peliculasAMostrar);
  promedioCalificacion.textContent =
    promedio === null ? "Promedio: N/A" : `Promedio: ${promedio.toFixed(2)}`;
}


form.addEventListener("submit", function (evento) {
  evento.preventDefault();
  ocultarError();

  const nombre = inputNombre.value.trim();
  const genero = inputGenero.value;
  const anio = inputAnio.value.trim();
  const calificacion = inputCalificacion.value.trim();

  const error = validarFormulario(nombre, genero, anio, calificacion);
  if (error) {
    mostrarError(error);
    return;
  }

  if (idEnEdicion === null) {
    agregarPelicula(nombre, genero, anio, calificacion);
  } else {
    actualizarPelicula(idEnEdicion, nombre, genero, anio, calificacion);
  }

  cancelarEdicion(); // limpia y resetea el formulario
});

btnCancelar.addEventListener("click", cancelarEdicion);

buscarNombre.addEventListener("input", renderizarPeliculas);
filtroGenero.addEventListener("change", renderizarPeliculas);
filtroCalificacion.addEventListener("change", renderizarPeliculas);

btnLimpiarFiltros.addEventListener("click", () => {
  buscarNombre.value = "";
  filtroGenero.value = "todos";
  filtroCalificacion.checked = false;
  renderizarPeliculas();
});

renderizarPeliculas();