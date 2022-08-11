//importacion de funciones de otros modulos
import { mostrarCarrito, renderizarCards } from "./renders.js";
import { DateTime } from "./lib/luxon.js";

//definicion de constantes que utilizare en todo el codigo, agrego funcion export para modularizar el codigo
export const listaPedidos = [];
const pedidosCompletados = [];
export const menus = document.querySelector("#menus");
export const carritoBody = document.querySelector("#carrito-body");
const montoTotal = document.querySelector("#montoTotal");

renderizarCards();
//devuelve la suma total de todos los pedidos de mi lista de pedidos utilizando reduce
export function sumaTotal(array) {
  const total = array.reduce(
    (acc, pedido) => acc + pedido.precio * pedido.cantidad,
    0
  );
  const totalMonto = document.querySelector("#monto-carrito-total");
  totalMonto.textContent = `$${total}`;
  return total;
}

const btnCarrito = document.querySelector("#carritoImg");
btnCarrito.addEventListener("click", () => {
  mostrarCarrito(listaPedidos);
  sumaTotal(listaPedidos);
});

export function statusCarrito() {
  const notificacion = document.querySelector(".statusCarrito");
  notificacion.classList.add("badgeCarrito");
  const total = listaPedidos.reduce((acc, pedido) => acc + pedido.cantidad, 0);
  notificacion.textContent = total.toString();
}

class Cliente {
  constructor(nombre, telefono, direccion, fpago) {
    this.nombre = nombre;
    this.telefono = telefono;
    this.direccion = direccion;
    this.fpago = fpago;
  }
}

function resetInterface() {
  const listaPedidos = [];
  mostrarCarrito(listaPedidos);
  statusCarrito();
  window.location.reload();
}

const btnModal = document.querySelector("#modal-btn");
btnModal.addEventListener("click", () => {
  Swal.fire({
    title: "Datos de envio",
    html: `
    <input type="text" id="name" class="swal2-input" placeholder="Nombre ...">
    <input type="text" id="tel" class="swal2-input" placeholder="Telefono...">
    <input type="text" id="adress" class="swal2-input" placeholder="Direccion...">
    <div class="menu-fpago">
      <p>TOTAL $${sumaTotal(listaPedidos)}</p>
      <p>¿Como pagás?</p>
          <select id="fpago" >
            <option value="efectivo" selected>Efectivo</option>
            <option value="MercadoPago" >MercadoPago</option>
          </select>
    </div>
    `,
    showConfirmButton: true,
    confirmButtonText: "Finalizar pedido",
    focusConfirm: false,
    preConfirm: () => {
      const nombre = Swal.getPopup().querySelector("#name").value;
      const telefono = Swal.getPopup().querySelector("#tel").value;
      const direccion = Swal.getPopup().querySelector("#adress").value;
      const fpago = Swal.getPopup().querySelector("#fpago").value;
      const cliente = new Cliente(nombre, telefono, direccion, fpago);
      if (!nombre || !telefono || !direccion || !fpago) {
        Swal.showValidationMessage(
          `¡Completa todos los campos del formulario para el envio!`
        );
      }
      return { nombre, telefono, direccion, fpago };
    },
  }).then((result) => {
    const cliente = result.value;
    guardarDatos(listaPedidos, cliente);
    Swal.fire({
      icon: "success",
      text: `Excelente ${result.value.nombre}! ${calculoDemora(
        listaPedidos
      )} a ${result.value.direccion}. ¡Gracias por comprar en BurgerHouse!`,
      timer: 4000,
      showConfirmButton: false,
    });
    setTimeout(resetInterface, 4500);
  });
});

export function tiempoLlegadaPedido(array) {
  const numBurgers = array.reduce((acc, p) => acc + p.cantidad, 0);
  const hora = DateTime.now();
  const horaLlegada = hora
    .plus({ hour: numBurgers * 0.08 })
    .toLocaleString(DateTime.TIME_24_SIMPLE);
  return horaLlegada;
}

function calculoDemora(array) {
  const numBurgers = array.reduce((acc, p) => acc + p.cantidad, 0);
  const segundos = numBurgers * 900;
  let hora = Math.floor(segundos / 3600);
  hora = hora < 10 ? "0" + hora : hora;
  let minutos = Math.floor((segundos / 60) % 60);
  minutos = minutos < 10 ? "0" + minutos : minutos;
  let demora = "";

  hora < 1
    ? (demora = `Tu pedido tardara aprox. ${minutos} min`)
    : (demora = `Tu pedido tardara aprox. ${hora}:${minutos} hs`);

  return demora;
}

function guardarDatos(array, objeto) {
  const total = "$" + array.reduce((acc, p) => acc + p.precio * p.cantidad, 0);

  const dato = {
    nombre: objeto.nombre,
    adress: objeto.direccion,
    total: total,
    horaLlegada: tiempoLlegadaPedido(array),
  };

  localStorage.setItem("pedidoCliente", JSON.stringify(dato));
  localStorage.removeItem("pedidoTemporal");
}

const btnStatusOrder = document.querySelector("#deliveryImg");
btnStatusOrder.addEventListener("click", () => {
  pedidosCompletados.forEach((p) => {
    Swal.fire({
      text: `Hola ${p.nombre} ya recibimos tu pedido, estaria llegando a tu direccion (${p.adress}) a las ${p.horaLlegada}hs. 
      ¡Gracias por comprar en BURGERHOUSE!`,
      toast: true,
      position: "bottom-right",
      showConfirmButton: false,
      timer: 5000,
    });
  });
});

function borrarPedidosEntregados(obj) {
  const horaActual = DateTime.now().toLocaleString(DateTime.TIME_24_SIMPLE);
  horaActual >= obj.horaLlegada 
    ? (Swal.fire({
        title: "Status del pedido",
        text: `El delivery ya hizo entrega de tu pedido ${obj.nombre} que lo disfrutes! `,
        timer: 2000,
        icon: "success",
      }),
      setTimeout(() => {
        localStorage.clear(), window.location.reload();
      }, 2500))
    : null;
}

//chequea si hay pedidos ya pagos 
setInterval(() => {
  if (localStorage.getItem("pedidoCliente")) {
    const imprimir = JSON.parse(localStorage.getItem("pedidoCliente"));
    borrarPedidosEntregados(imprimir);
  }
}, 15000);


