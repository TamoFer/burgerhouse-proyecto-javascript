//importacion de funciones de otros modulos
import { getBD } from "../utilities/getData.js";
import {calculoDemora, guardarDatos, listaPedidos, pedidosCompletados, statusCarrito, sumaTotal } from "../../App.js";
import { mostrarCarrito } from "../utilities/renders.js";
import { popUp, popUpErrors } from "../notifications/notifications.js";

//agrego desde button de card la burger
export async function agregarPedido(event) {
  const BD= await getBD();
  let serial = event.target.getAttribute("serial");
  let burger = BD.find((burger) => burger.serial == serial);
  let burgerAgregada = listaPedidos.find((burger) => burger.serial == serial);

  burgerAgregada
    ? burgerAgregada.cantidad++
    : ((burger.cantidad = 1), listaPedidos.push(burger));

  popUp(event, burger);
  statusCarrito();
  mostrarCarrito(listaPedidos);
  sumaTotal(listaPedidos);
}

//elimino del carrito burgers atraves de button
export function eliminarPedido(event) {
  let serial = event.target.getAttribute("serialDelete");
  let burgerAgregada = listaPedidos.find((burger) => burger.serial == serial);
  let indice = listaPedidos.findIndex((pedido) => pedido.serial == serial);

  burgerAgregada ?? popUpErrors();
  burgerAgregada.cantidad--;
  burgerAgregada.cantidad === 0 && listaPedidos.splice(indice, 1);

  popUp(event, burgerAgregada);
  statusCarrito();
  mostrarCarrito(listaPedidos);
  sumaTotal(listaPedidos);
}



//actualizar carrito al clickear img de este
const btnCarrito = document.querySelector("#carritoImg");
btnCarrito.addEventListener("click", () => {
  mostrarCarrito(listaPedidos);
  sumaTotal(listaPedidos);
});

const btnModal = document.querySelector("#modal-btn");
btnModal.addEventListener("click", () => {
  Swal.fire({
    title: "Datos de envio",
    html: `
    <input type="text" id="name" class="swal2-input" placeholder="Nombre ...">
    <input type="text" id="tel" class="swal2-input" placeholder="Telefono...">
    <input type="text" id="adress" class="swal2-input" placeholder="Direccion...">
    <div class="menu-fpago">
      <p>TOTAL $${sumaTotal(listaPedidos)}</p>
      <p>¿Como pagás?</p>
          <select id="fpago" >
            <option value="efectivo" selected>Efectivo</option>
            <option value="MercadoPago" >MercadoPago</option>
          </select>
    </div>
    `,
    showConfirmButton: true,
    confirmButtonText: "Finalizar pedido",
    focusConfirm: false,
    preConfirm: () => {
      const nombre = Swal.getPopup().querySelector("#name").value;
      const telefono = Swal.getPopup().querySelector("#tel").value;
      const direccion = Swal.getPopup().querySelector("#adress").value;
      const fpago = Swal.getPopup().querySelector("#fpago").value;
      if (!nombre || !telefono || !direccion || !fpago) {
        Swal.showValidationMessage(
          `¡Completa todos los campos del formulario para el envio!`
        );
      }
      return { nombre, telefono, direccion, fpago };
    },
  }).then((result) => {
    const cliente = result.value;
    guardarDatos(listaPedidos, cliente);
    Swal.fire({
      icon: "success",
      text: `Excelente ${result.value.nombre}! ${calculoDemora(
        listaPedidos
      )} a ${result.value.direccion}. ¡Gracias por comprar en BurgerHouse!`,
      timer: 4000,
      showConfirmButton: false,
    });
    setTimeout(resetInterface, 4500);
  });
});

const btnStatusOrder = document.querySelector("#deliveryImg");
btnStatusOrder.addEventListener("click", () => {
  pedidosCompletados.forEach((p) => {
    Swal.fire({
      text: `Hola ${p.nombre} ya recibimos tu pedido, estaria llegando a tu direccion (${p.adress}) a las ${p.horaLlegada}hs. 
      ¡Gracias por comprar en BURGERHOUSE!`,
      toast: true,
      position: "bottom-right",
      showConfirmButton: false,
      timer: 5000,
    });
  });
});