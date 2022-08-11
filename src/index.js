import { listaPedidos } from "./Js/hamburgueseria";
import { mostrarCarrito, renderizarCards } from "./Js/renders";

document.addEventListener("DOMContentLoaded", () => {
  renderizarCards();
  if (localStorage.getItem("pedidoTemporal")) {
    const pedidoTemporal = JSON.parse(localStorage.getItem("pedidoTemporal"));
    pedidoTemporal.forEach((pedido) => {
      listaPedidos.push(pedido);
    });
    mostrarCarrito(listaPedidos);
    statusCarrito();
  }

  if (localStorage.getItem("pedidoCliente")) {
    const pedidoCliente = JSON.parse(localStorage.getItem("pedidoCliente"));
    const notificacionPedido = document.querySelector(".statusOrder");
    notificacionPedido.classList.add("badgeOrder");
    pedidosCompletados.push(pedidoCliente);
  }
});
