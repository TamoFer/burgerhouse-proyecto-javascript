//importacion de funciones de otros modulos
import { getBD } from "../utilities/getData.js";
import {guardarDatos, listaPedidos, pedidosCompletados, resetInterface, sumaTotal } from "../../App.js";
import { mostrarCarrito } from "../utilities/renders.js";
import { popUp, popUpErrors } from "../notifications/notifications.js";

//agrega las burgers al carrito
export async function agregarPedido(event) {
  const BD= await getBD();
  let serial = event.target.getAttribute("serial");
  let burger = BD.find((burger) => burger.serial == serial);
  let burgerAgregada = listaPedidos.find((burger) => burger.serial == serial);

  burgerAgregada
    ? burgerAgregada.cantidad++
    : ((burger.cantidad = 1), listaPedidos.push(burger));

  popUp(event, burger);
  mostrarCarrito(listaPedidos);
}

//elimina burgers del carrito de compra
export function eliminarPedido(event) {
  let serial = event.target.getAttribute("serialDelete");
  let burgerAgregada = listaPedidos.find((burger) => burger.serial == serial);
  let indice = listaPedidos.findIndex((pedido) => pedido.serial == serial);

  burgerAgregada ?? popUpErrors();
  burgerAgregada.cantidad--;
  burgerAgregada.cantidad === 0 && listaPedidos.splice(indice, 1);

  popUp(event, burgerAgregada);
  mostrarCarrito(listaPedidos);
}



//actualizar carrito al clickear sobre este
const btnCarrito = document.querySelector("#carritoImg");
btnCarrito.addEventListener("click", () => {
  mostrarCarrito(listaPedidos);
});

// alerta donde el usuario ingresa datos personales, de envio y formas de pago
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
    customClass: {
      popupe: 'probandoStyle'
    },
    preConfirm: () => {
      const nombre = Swal.getPopup().querySelector("#name").value;
      const telefono = Swal.getPopup().querySelector("#tel").value;
      const direccion = Swal.getPopup().querySelector("#adress").value;
      const fpago = Swal.getPopup().querySelector("#fpago").value;
      if (!nombre || !telefono || !direccion || !fpago) {
        Swal.showValidationMessage(
          `¡Completa todos los campos del formulario para el envió!`
        );
      }
      return { nombre, telefono, direccion, fpago };
    },
  }).then((result) => {
    const cliente = result.value;
    guardarDatos(listaPedidos, cliente);
    const Toast = Swal.mixin({
      toast: true,
      position: 'top',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })
    Toast.fire({
      icon: 'success',
      title: `Recibimos tu pago ${cliente.nombre}`
    })
    setTimeout(resetInterface, 3100);
    
  });
});

// ver estado del pedido abonado 
const btnStatusOrder = document.querySelector("#deliveryImg");
btnStatusOrder.addEventListener("click", () => {
  pedidosCompletados.forEach((p) => {
    Swal.fire({
      text: ` Hola! ${p.nombre} ya recibimos tu pedido, estaría llegando a tu dirección (${p.adress}) a las ${p.horaLlegada} hs. 
      ¡Gracias por comprar en BURGERHOUSE!`,
      toast: true,
      position: "bottom-right",
      showConfirmButton: false,
      timer: 5000,
    });
  });
});