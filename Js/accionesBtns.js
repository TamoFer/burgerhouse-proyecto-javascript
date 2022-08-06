//importacion de funciones de otros modulos
import { BD, listaPedidos, contador, sumaTotal } from "./hamburgueseria.js";
import { mostrarCarrito } from "./renders.js";

//agrego desde button de card la burger
export function agregarPedido(event) {
  let serial = event.target.getAttribute("serial");
  let burger = BD.find((burger) => burger.serial == serial);
  let burgerAgregada = listaPedidos.find((burger) => burger.serial == serial);

  burgerAgregada
    ? burgerAgregada.cantidad++
    : ((burger.cantidad = 1), listaPedidos.push(burger));

  popUp(event, burger);
  contador();
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
  contador();
  mostrarCarrito(listaPedidos);
  sumaTotal(listaPedidos);
}

function popUp(event, burga) {
  if (event.target.getAttribute("serial")) {
    Swal.fire({
      toast: true,
      position: "top",
      iconColor: "white",
      customClass: {
        popup: "colored-toast",
      },
      showConfirmButton: false,
      timer: 1000,
      timerProgressBar: false,
      icon: "success",
      title: `Agregastes una ${burga.nombre}`,
    });
  } else {
    Swal.fire({
      toast: true,
      position: "top",
      iconColor: "white",
      customClass: {
        popup: "colored-toast",
      },
      showConfirmButton: false,
      timer: 1000,
      timerProgressBar: false,
      icon: "error",
      title: `Sacaste una ${burga.nombre}`,
    });
  }
}

function popUpErrors() {
  Swal.fire({
    toast: true,
    position: "top",
    iconColor: "white",
    customClass: {
      popup: "colored-toast",
    },
    showConfirmButton: false,
    timer: 1000,
    timerProgressBar: false,
    icon: "warning",
    title: `No agregastes esta burga al carrito`,
  });
}
