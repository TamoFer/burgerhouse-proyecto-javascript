// importacion de funciones de otros modulos
import { hamburguesas,listaPedidos,sumaTotal } from "./hamburgueseria.js";
import { mostrarCarrito } from "./renders.js";

//agrego desde button de card la burger
export function agregarPedido(event) {
  let serial = event.target.getAttribute("serial");
  let burger = hamburguesas.find((burger) => burger.serial == serial);
  let burgerAgregada = listaPedidos.find((burger) => burger.serial == serial);

  burgerAgregada?burgerAgregada.cantidad++:(burger.cantidad=1,listaPedidos.push(burger));

  sumaTotal();
  mostrarCarrito(listaPedidos);
};


//elimino del carrito burgers atraves de button
export function eliminarPedido(event) {
  let serial = event.target.getAttribute("serialDelete");
  let burgerAgregada = listaPedidos.find((burger) => burger.serial == serial);
  let indice = listaPedidos.findIndex((pedido) => pedido.serial == serial);
  
  burgerAgregada.cantidad--;
  burgerAgregada.cantidad===0 &&listaPedidos.splice(indice,1);
  
  sumaTotal();
  mostrarCarrito(listaPedidos);
};

