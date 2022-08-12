//importacion de funciones de otros modulos
import { mostrarCarrito} from "../src/components/utilities/renders.js";
import { DateTime } from "../src/components/lib/luxon.js";

//definicion de constantes utilizadas en todo el proyecto
export const listaPedidos = [];
export const pedidosCompletados = [];
export const menus = document.querySelector("#menus");
export const carritoBody = document.querySelector("#carrito-body");

//suma del precio de todo el carrito
export function sumaTotal(array) {
  const total = array.reduce(
    (acc, pedido) => acc + pedido.precio * pedido.cantidad,
    0
  );
  const totalMonto = document.querySelector("#monto-carrito-total");
  totalMonto.textContent = `$${total}`;
  return total;
}


// contador del carrito de compra
export function statusCarrito() {
  const notificacion = document.querySelector(".statusCarrito");
  notificacion.classList.add("badgeCarrito");
  const total = listaPedidos.reduce((acc, pedido) => acc + pedido.cantidad, 0);
  notificacion.textContent = total.toString();
}

// reseteo carrito de compra 
export function resetInterface() {
  const listaPedidos = [];
  mostrarCarrito(listaPedidos);
  window.location.reload();
}

// calculo con modulo luxon el horario de llegada de un pedido pago
export function tiempoLlegadaPedido(array) {
  const numBurgers = array.reduce((acc, p) => acc + p.cantidad, 0);
  const hora = DateTime.now();
  const horaLlegada = hora
    .plus({ hour: numBurgers * 0.08 })
    .toLocaleString(DateTime.TIME_24_SIMPLE);
  return horaLlegada;
}

//calculo tiempo demora por cada burger del pedido (15min/u)
export function calculoDemora(array) {
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

// creo objeto con datos necesarios del pedido y cliente
export function guardarDatos(array, objeto) {
  const total = "$" + array.reduce((acc, p) => acc + p.precio * p.cantidad, 0);

  const dato = {
    nombre: objeto.nombre,
    adress: objeto.direccion,
    total: total,
    horaLlegada: tiempoLlegadaPedido(array),
  };

  localStorage.setItem("pedidoCompleto", JSON.stringify(dato));
  localStorage.removeItem("pedidoTemporal");
}




