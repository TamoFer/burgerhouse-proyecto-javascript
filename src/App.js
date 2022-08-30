//importacion de funciones de otros modulos
import { mostrarCarrito} from "../src/components/utilities/renders.js";
import { DateTime } from "../src/components/lib/luxon.js";

//definicion de constantes utilizadas en todo el proyecto
export let listaPedidos = [];
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
  notificacion.classList.add("badge-carrito");
  const total = listaPedidos.reduce((acc, pedido) => acc + pedido.cantidad, 0);
  notificacion.textContent = total.toString();
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

export function borrarCarrito(listaPedidos){
  listaPedidos.forEach(e => {
    listaPedidos.pop()
  })
  localStorage.clear();
  return listaPedidos;
}

export function comprobarPedidoCompleto(){
  if (localStorage.getItem("pedidoCompleto")){
    const pedidoCompleto = JSON.parse(localStorage.getItem("pedidoCompleto"));
    const notificacionPedido = document.querySelector(".statusOrder");
    notificacionPedido.classList.add("badge-order");
    pedidosCompletados.push(pedidoCompleto);
    return pedidoCompleto;
  }
}

export function comprobarPedidoTemporal(){
  if (localStorage.getItem("pedidoTemporal")) {
    const pedidoTemporal = JSON.parse(localStorage.getItem("pedidoTemporal"));
    pedidoTemporal.forEach((pedido) => {
      listaPedidos.push(pedido);
    });
    mostrarCarrito(listaPedidos);
  }
}