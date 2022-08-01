//importacion de funciones de otros modulos
import {  datosCliente} from "./accionesBtns.js";
import { mostrarCarrito, renderizarCards} from "./renders.js";

//traigo mi BD local y retorno una lista de objetos
const objeto = ()=>{
  const datos=[];
  fetch("bd_local/bd.json")
  .then(res=>res.json())
  .then(data=>{
    data.forEach(burgers=>{
      datos.push(burgers);  
    })
  })
  return datos;
}

//traigo mi BD local y renderizo las cards
const objetoRender = ()=>{
  fetch("bd_local/bd.json")
  .then(res=>res.json())
  .then(data=>{
    renderizarCards(data);
  })
}

//llamo a la funcion
objetoRender();

//instancio una constante con la lista de burgers de mi BD 
export const BD=objeto();


//definicion de constantes que utilizare en todo el codigo, agrego funcion export para modularizar el codigo
export const listaPedidos = [];
export const menus = document.querySelector("#menus");
export const carritoBody = document.querySelector("#carrito-body");
const montoTotal = document.querySelector("#montoTotal");




//devuelve la suma total de todos los pedidos de mi lista de pedidos utilizando reduce
export function sumaTotal(array) {
  const total = array.reduce(
    (acc, pedido) => acc + pedido.precio * pedido.cantidad,
    0
  );
  
  const totalLetra= document.querySelector("#letras-carrito-total");
  const totalMonto = document.querySelector("#monto-carrito-total");
  totalMonto.textContent = `$${total}`;
};

// funcion de guardado en LocalStorage de mi lista de pedidos
export function guardandoLocalmente(listaPedidos) {
  localStorage.setItem("pedido", JSON.stringify(listaPedidos));
}

//evento DOMContentLoaded para que al recargar me muestre mi ultimo carrito creado
document.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("pedido")) {
    const pedidos = JSON.parse(localStorage.getItem("pedido"));
    pedidos.forEach((pedido) => {
      listaPedidos.push(pedido);
    });
    mostrarCarrito(listaPedidos);
    contador();
  }
});

const btnCarrito = document.querySelector('#carritoImg');
btnCarrito.addEventListener("click", () => {
  mostrarCarrito(listaPedidos);
  sumaTotal(listaPedidos);
});


export function contador(){
  const notificacion= document.querySelector('.contador');
  const total = listaPedidos.reduce(
    (acc, pedido) => acc + pedido.cantidad,
    0
  );
  notificacion.textContent = total.toString();
}

