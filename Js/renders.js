//importacion de funciones de otros modulos
import { agregarPedido,eliminarPedido} from "./accionesBtns.js";
import { menus,facturacion,guardandoLocalmente, sumaTotal} from "./hamburgueseria.js";

//render de cards
export function renderizarCards(objeto) {
  objeto.forEach((menu) => {
    let {serial,nombre,carne,medallones,guarnicion,ingredientes,precio}=menu;

    menus.innerHTML+=`
    <div class="card">
      <div class="card-info">
        <p class="text-title">${nombre}</p>
        <img src="" ></img>
        <p class="text-body">Burger ${medallones} de ${carne}  que tiene ${ingredientes} y viene con una guarnicion de ${guarnicion} </p>
        <div class="card-img"></div>
      </div>
      <div class="card-footer">
        <span class="text-title">$${precio}</span>
        <img class="btn-card" src="../iconos/agregar.png" type=button ></img>
        <img class="btn-card" src="../iconos/eliminar.png" type=button ></img>
      </div>
    </div>`
      
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
