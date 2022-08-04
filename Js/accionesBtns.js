//importacion de funciones de otros modulos
import { BD,listaPedidos,contador, sumaTotal} from "./hamburgueseria.js";
import { mostrarCarrito } from "./renders.js";

//agrego desde button de card la burger
export function agregarPedido(event) {
  let serial = event.target.getAttribute("serial");
  let burger = BD.find((burger) => burger.serial == serial);
  let burgerAgregada = listaPedidos.find((burger) => burger.serial == serial);

  burgerAgregada?burgerAgregada.cantidad++:(burger.cantidad=1,listaPedidos.push(burger));

  contador();
  mostrarCarrito(listaPedidos);
  sumaTotal(listaPedidos);

};


//elimino del carrito burgers atraves de button
export function eliminarPedido(event) {
  let serial = event.target.getAttribute("serialDelete");
  let burgerAgregada = listaPedidos.find((burger) => burger.serial == serial);
  let indice = listaPedidos.findIndex((pedido) => pedido.serial == serial);
  
  burgerAgregada.cantidad--;
  burgerAgregada.cantidad===0 &&listaPedidos.splice(indice,1);

  contador();
  mostrarCarrito(listaPedidos);
  sumaTotal(listaPedidos);
};



