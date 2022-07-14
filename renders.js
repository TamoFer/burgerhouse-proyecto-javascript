// importacion de funciones de otros modulos
import { agregarPedido,eliminarPedido} from "./accionesBtns.js";
import { hamburguesas,menus,listaPedidos,facturacion,guardandoLocalmente} from "./hamburgueseria.js";

//render de cards
export function renderizarCards() {
  hamburguesas.forEach((burger) => {

    const miCard = document.createElement("div");
    miCard.classList.add("pedido");

    const miCardTitle = document.createElement("h2");
    miCardTitle.textContent = burger.nombre;

    const miCardDescripcion = document.createElement("p");
    miCardDescripcion.textContent = `Deliciosa Hamburguesa de ${burger.carne} ${burger.medallones} que trae ${burger.ingredientes} acompañado de ${burger.guarnicion}`;

    const miCardPrecio = document.createElement("h3");
    miCardPrecio.textContent = `Precio $ ${burger.precio}`;

    const tktBoton = document.createElement("button");
    tktBoton.classList.add("btn-style--card");
    tktBoton.textContent = "Agregar";
    tktBoton.setAttribute("serial", burger.serial);
    tktBoton.addEventListener("click", agregarPedido);

    miCard.appendChild(miCardTitle);
    miCard.appendChild(miCardDescripcion);
    miCard.appendChild(miCardPrecio);
    miCard.appendChild(tktBoton);
    menus.appendChild(miCard);
  });
}

//render de carrito
export function mostrarCarrito() {
  facturacion.textContent = "";
  listaPedidos.forEach((pedido) => {
    const miTkt = document.createElement("div");
    miTkt.classList.add("descripcionTkt");
    
    const miTktDescripcion = document.createElement("p");
    miTktDescripcion.textContent = `${pedido.cantidad} x Hamburguesa ${pedido.nombre} $${pedido.precio}`;

    const tktBoton = document.createElement("button");
    tktBoton.classList.add("btn-style--tkt");
    tktBoton.textContent = "Eliminar";
    tktBoton.setAttribute("serialDelete", pedido.serial);
    tktBoton.addEventListener("click", eliminarPedido);

    miTkt.appendChild(miTktDescripcion);
    miTkt.appendChild(tktBoton);
    facturacion.appendChild(miTkt);
    guardandoLocalmente(listaPedidos);
  });

  
}
