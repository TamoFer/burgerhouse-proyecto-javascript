//importacion de funciones de otros modulos
import { agregarPedido,eliminarPedido} from "../btn-actions/accionesBtns.js";
import { getBD } from "./getData.js";
import { menus,carritoBody} from "../.././App.js";


//render de cards
export async function renderizarCards() {
  const objeto = await getBD();
  objeto.forEach((menu) => {
    let { serial, nombre, descripcion, precio, imagen } = menu;

    const miCard = document.createElement("div");
    miCard.classList.add("card");

    const miCardInfo = document.createElement("div");
    miCardInfo.classList.add("card-info");

    const miCardTextTitle = document.createElement("p");
    miCardTextTitle.classList.add("text-title");
    miCardTextTitle.innerText = nombre;

    const miCardImg = document.createElement("img");
    miCardImg.setAttribute("src", imagen);

    const miCardDescripcion = document.createElement("p");
    miCardDescripcion.classList.add("text-body");
    miCardDescripcion.innerText = descripcion;

    const miCardFooter = document.createElement("div");
    miCardFooter.classList.add("card-footer");

    const miCardPrecio = document.createElement("span");
    miCardPrecio.classList.add("text-title--precio");
    miCardPrecio.innerText = `precio $${precio}`;

    const miCardIcons = document.createElement("div");

    const miCardIconAgregar = document.createElement("img");
    miCardIconAgregar.setAttribute("src", "../../../public/icons/agregar.png");
    miCardIconAgregar.setAttribute("serial", serial);
    miCardIconAgregar.setAttribute("type", "button");
    miCardIconAgregar.addEventListener("click", agregarPedido);

    const miCardIconEliminar = document.createElement("img");
    miCardIconEliminar.setAttribute("src", "../../../public/icons/eliminar.png");
    miCardIconEliminar.setAttribute("serialDelete", serial);
    miCardIconEliminar.setAttribute("type", "button");
    miCardIconEliminar.addEventListener("click", eliminarPedido);


    miCardInfo.appendChild(miCardTextTitle);
    miCardInfo.appendChild(miCardImg);
    miCardInfo.appendChild(miCardDescripcion);
    miCardIcons.appendChild(miCardIconAgregar);
    miCardIcons.appendChild(miCardIconEliminar);
    miCardFooter.appendChild(miCardPrecio);
    miCardFooter.appendChild(miCardIcons);
    miCard.appendChild(miCardInfo);
    miCard.appendChild(miCardFooter);
    menus.appendChild(miCard);

  });

}

//render de carrito
export function mostrarCarrito(listaPedidos) {
  carritoBody.textContent = "";
  listaPedidos.forEach((pedido) => {
    let {serial,nombre,cantidad,imagen}= pedido;
    const miTkt = document.createElement("div");
    miTkt.classList.add("descripcionTkt");
    
    const miTktDescripcion = document.createElement("p");
    miTktDescripcion.classList.add("carrito-detalle");
    miTktDescripcion.textContent = `${cantidad}u. ${nombre}`;

    const miTktImg= document.createElement("img");
    miTktImg.setAttribute("id","carritoImg");
    miTktImg.setAttribute("src", imagen);

    const tktBoton = document.createElement("button");
    tktBoton.classList.add("btn");
    tktBoton.classList.add("btn-danger");
    tktBoton.textContent = "Eliminar";
    tktBoton.setAttribute("serialDelete",serial);
    tktBoton.addEventListener("click", eliminarPedido);

    
    miTkt.appendChild(miTktImg);
    miTkt.appendChild(miTktDescripcion);
    miTkt.appendChild(tktBoton);
    carritoBody.appendChild(miTkt);
  });
  localStorage.setItem("pedidoTemporal", JSON.stringify(listaPedidos));
}