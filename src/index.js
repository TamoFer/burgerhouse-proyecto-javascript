// importacion de funciones y variables de otros archivos JS
import { listaPedidos,pedidosCompletados} from "./App.js";
import { borrarPedidosEntregados } from "./components/notifications/notifications.js";
import { mostrarCarrito, renderizarCards } from "./components/utilities/renders.js";


// al cargar la pagina, realiza comprobaciones y renders
document.addEventListener("DOMContentLoaded", () => {
  renderizarCards();
  if (localStorage.getItem("pedidoTemporal")) {
    const pedidoTemporal = JSON.parse(localStorage.getItem("pedidoTemporal"));
    pedidoTemporal.forEach((pedido) => {
      listaPedidos.push(pedido);
    });
    mostrarCarrito(listaPedidos);
  }

  if (localStorage.getItem("pedidoCompleto")) {
    const pedidoCompleto = JSON.parse(localStorage.getItem("pedidoCompleto"));
    const notificacionPedido = document.querySelector(".statusOrder");
    notificacionPedido.classList.add("badgeOrder");
    pedidosCompletados.push(pedidoCompleto);
  }
});

//chequea si hay pedidos ya entregados
setInterval(() => {
  if (localStorage.getItem("pedidoCompleto")) {
    const imprimir = JSON.parse(localStorage.getItem("pedidoCompleto"));
    borrarPedidosEntregados(imprimir);
  }
}, 15000);