// importacion de funciones y variables de otros archivos JS
import { comprobarPedidoTemporal, comprobarPedidoCompleto} from "./App.js";
import { borrarPedidosEntregados } from "./components/notifications/notifications.js";
import { renderizarCards } from "./components/utilities/renders.js";


// al cargar la pagina, realiza comprobaciones y renders
document.addEventListener("DOMContentLoaded", () => {
  renderizarCards();
  comprobarPedidoTemporal();
  comprobarPedidoCompleto();
});


setInterval(() => {
  borrarPedidosEntregados(comprobarPedidoCompleto());
}, 3000);


