//importacion de funciones de otros modulos
import { agregarPedido,eliminarPedido} from "./accionesBtns.js";
import { menus,facturacion,guardandoLocalmente, sumaTotal} from "./hamburgueseria.js";

//render de cards
export function renderizarCards(objeto) {
  objeto.forEach((menu) => {
    let {serial,nombre,carne,medallones,guarnicion,ingredientes,precio}=menu;

    const miCard = document.createElement("div");
    miCard.classList.add("pedido");

    const miCardTitle = document.createElement("h2");
    miCardTitle.textContent = nombre;

    const miCardDescripcion = document.createElement("p");
    miCardDescripcion.textContent = `Deliciosa Hamburguesa de ${carne} ${medallones} que trae ${ingredientes} acompañado de ${guarnicion}`;

    const miCardPrecio = document.createElement("h4");
    miCardPrecio.textContent = `Precio $ ${precio}`;

    const tktBoton = document.createElement("button");
    tktBoton.classList.add("btn");
    tktBoton.classList.add("btn-info");
    tktBoton.textContent = "Agregar";
    tktBoton.setAttribute("serial", serial);
    tktBoton.addEventListener("click", agregarPedido);

    miCard.appendChild(miCardTitle);
    miCard.appendChild(miCardDescripcion);
    miCard.appendChild(miCardPrecio);
    miCard.appendChild(tktBoton);
    menus.appendChild(miCard);
  });
};

//render de carrito
export function mostrarCarrito(listaPedidos) {
  facturacion.textContent = "";
  listaPedidos.forEach((pedido) => {
    let {serial,nombre,precio,cantidad}= pedido;
    const miTkt = document.createElement("div");
    miTkt.classList.add("descripcionTkt");
    
    const miTktDescripcion = document.createElement("p");
    miTktDescripcion.textContent = `${cantidad} x Hamburguesa ${nombre} `;

    const tktBoton = document.createElement("button");
    tktBoton.classList.add("btn");
    tktBoton.classList.add("btn-danger");
    tktBoton.textContent = "Eliminar";
    tktBoton.setAttribute("serialDelete",serial);
    tktBoton.addEventListener("click", eliminarPedido);

    miTkt.appendChild(miTktDescripcion);
    miTkt.appendChild(tktBoton);
    facturacion.appendChild(miTkt);
  });
  guardandoLocalmente(listaPedidos);
  sumaTotal(listaPedidos);
}
