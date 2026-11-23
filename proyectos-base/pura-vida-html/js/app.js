// Datos locales del laboratorio: alimentan el menú, las cards y la tabla.
const enlacesMenu = [
  { texto: "Inicio", url: "#inicio" },
  { texto: "Tours", url: "#tours" },
  { texto: "Reservas", url: "#reservas" },
  { texto: "Contacto", url: "#contacto" }
];

const tours = [
  {
    nombre: "Volcán Arenal",
    descripcion: "Caminata por senderos de lava y aguas termales.",
    precio: 85,
    imagen: "https://picsum.photos/seed/arenal/600/400"
  },
  {
    nombre: "Manuel Antonio",
    descripcion: "Playas de arena blanca y monos cariblancos.",
    precio: 70,
    imagen: "https://picsum.photos/seed/manuelantonio/600/400"
  },
  {
    nombre: "Monteverde",
    descripcion: "Puentes colgantes sobre el bosque nuboso.",
    precio: 95,
    imagen: "https://picsum.photos/seed/monteverde/600/400"
  },
  {
    nombre: "Río Celeste",
    descripcion: "Caminata hasta la catarata de aguas turquesas en Tenorio.",
    precio: 80,
    imagen: "https://picsum.photos/seed/rioceleste/600/400"
  }
];

const reservas = [
  { id: 1, cliente: "Ana Mora", tour: "Volcán Arenal", fecha: "2026-11-02", personas: 2, estado: "Confirmada" },
  { id: 2, cliente: "Luis Rojas", tour: "Monteverde", fecha: "2026-11-05", personas: 4, estado: "Pendiente" },
  { id: 3, cliente: "María Solano", tour: "Manuel Antonio", fecha: "2026-11-09", personas: 3, estado: "Confirmada" },
  { id: 4, cliente: "Carlos Vega", tour: "Volcán Arenal", fecha: "2026-11-12", personas: 1, estado: "Cancelada" },
  { id: 5, cliente: "Sofía Jiménez", tour: "Río Celeste", fecha: "2026-11-15", personas: 2, estado: "Pendiente" },
  { id: 6, cliente: "Diego Castro", tour: "Monteverde", fecha: "2026-11-18", personas: 3, estado: "Cancelada" }
];

// Menú: creación explícita de elementos del DOM.
function crearMenu() {
  const lista = document.getElementById("lista-menu");

  enlacesMenu.forEach(function (enlace) {
    const li = document.createElement("li");
    li.classList.add("nav-item");

    const a = document.createElement("a");
    a.classList.add("nav-link");
    a.href = enlace.url;
    a.textContent = enlace.texto;

    li.appendChild(a);
    lista.appendChild(li);
  });
}

// innerHTML utiliza únicamente los datos locales definidos arriba.
function crearCards() {
  const contenedor = document.getElementById("contenedor-tours");

  tours.forEach(function (tour) {
    const columna = document.createElement("div");
    columna.className = "col-12 col-md-6 col-lg-4";

    columna.innerHTML = `
      <div class="card card-tour h-100 shadow-sm">
        <img src="${tour.imagen}" class="card-img-top" alt="${tour.nombre}">
        <div class="card-body d-flex flex-column">
          <h5 class="card-title">${tour.nombre}</h5>
          <p class="card-text">${tour.descripcion}</p>
          <p class="precio mt-auto">$${tour.precio}</p>
          <a href="#reservas" class="btn btn-success">Reservar</a>
        </div>
      </div>
    `;

    contenedor.appendChild(columna);
  });
}

function obtenerColorEstado(estado) {
  if (estado === "Confirmada") return "bg-success";
  if (estado === "Pendiente") return "bg-warning text-dark";
  return "bg-danger";
}

function crearTabla() {
  const cuerpo = document.getElementById("cuerpo-tabla");

  reservas.forEach(function (reserva) {
    const fila = document.createElement("tr");
    fila.innerHTML = `
      <td>${reserva.id}</td>
      <td>${reserva.cliente}</td>
      <td>${reserva.tour}</td>
      <td>${reserva.fecha}</td>
      <td>${reserva.personas}</td>
      <td><span class="badge ${obtenerColorEstado(reserva.estado)}">${reserva.estado}</span></td>
    `;
    cuerpo.appendChild(fila);
  });
}

document.addEventListener("DOMContentLoaded", function () {
  crearMenu();
  crearCards();
  crearTabla();
});
