import { listaPedidos,pedidosCompletados,statusCarrito } from "./App.js";
import { borrarPedidosEntregados } from "./components/notifications/notifications.js";
import { mostrarCarrito, renderizarCards } from "./components/utilities/renders.js";

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

//chequea si hay pedidos ya entregados
setInterval(() => {
  if (localStorage.getItem("pedidoCliente")) {
    const imprimir = JSON.parse(localStorage.getItem("pedidoCliente"));
    borrarPedidosEntregados(imprimir);
  }
}, 15000);