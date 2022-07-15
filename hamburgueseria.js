// importacion de funciones de otros modulos
import { agregarPedido,eliminarPedido} from "./accionesBtns.js";
import { renderizarCards,mostrarCarrito } from "./renders.js";

export const hamburguesas = [ //defino array de objetos a utilizar en el codigo
  {
    serial:1,
    nombre: "Americana",
    carne: "Carne",
    medallones: "Doble",
    guarnicion: "Papas fritas",
    ingredientes: "Chedar, Bacon crujiente y salsa Barbacoa",
    precio: 1200,
    cantidad: 1,
    pago: false
  },
  {
    serial:2,
    nombre: "Clásica",
    carne: "Carne",
    medallones: "Doble",
    guarnicion: "Papas fritas",
    ingredientes: "Tomate, Lechuga y Mayonesa",
    precio: 950,
    cantidad: 1,
    pago: false
  },
  {
    serial:3,
    nombre: "Crispy",
    carne: "Pollo",
    medallones: "Simple",
    guarnicion: "Aros de cebolla",
    ingredientes: "Cebolla crispy, Lechuga y Mayo Alioli",
    precio: 1000,
    cantidad: 1,
    pago: false
  },
  {
    serial:4,
    nombre: "Power Onion",
    carne: "Pollo",
    medallones: "Doble",
    guarnicion: "Bastones de Muzarella",
    ingredientes: "Aros de cebolla, Cebolla, Lechuga y Ketchup",
    precio: 1050,
    cantidad: 1,
    pago: false
  },
  {
    serial:5,
    nombre: "NotBurger",
    carne: "Garbanzos con lentejas",
    medallones: "Simple",
    guarnicion: "Falafels",
    ingredientes: "Tomate, Lechuga, Cebolla y Mayo Alioli",
    precio: 1100,
    cantidad: 1,
    pago: false
  }
];

// definicion de constantes que utilizare en todo el codigo, agrego funcion export para modularizar el codigo
export const listaPedidos=[];
export const menus=document.querySelector('#menus');
export const facturacion=document.querySelector('#facturacion');
const montoTotal=document.querySelector('#montoTotal');

//instancio funcion para ver cards por pantalla
renderizarCards(hamburguesas);

//devuelve la suma total de todos los pedidos de mi lista de pedidos utilizando reduce
export function sumaTotal(){
  const total = listaPedidos.reduce((acc, pedido) => acc + (pedido.precio*pedido.cantidad), 0);
  
  montoTotal.innerHTML= `<h3>TOTAL $ ${total}</h3>`
};

// funcion de guardado en LocalStorage de mi lista de pedidos
export function guardandoLocalmente(listaPedidos){
  localStorage.setItem("pedido", JSON.stringify(listaPedidos));
};

// //renderizado de mi LocalStorage
// const obtenerPedido = () => {
//   pedidos.forEach((p) => {
//     const pedido = document.createElement("div");
//     pedido.classList.add("descripcionTkt");
//     //Descripcion
//     const miPedidoDescripcion = document.createElement("p");
//     miPedidoDescripcion.textContent = `${p.cantidad} x Hamburguesa ${p.nombre} $${p.precio}`;
//     // Boton
//     const pedidoBoton = document.createElement("button");
//     pedidoBoton.classList.add("btn-style--tkt");
//     pedidoBoton.textContent = "Eliminar";
//     pedidoBoton.setAttribute("serialDelete", p.serial);
//     pedidoBoton.addEventListener("click", eliminarPedido);

//     // Insertamos
//     pedido.appendChild(miPedidoDescripcion);
//     pedido.appendChild(pedidoBoton);
//     facturacion.appendChild(pedido);

//   const total = pedidos.reduce((acc, p) => acc + (p.precio*p.cantidad), 0);
//   montoTotal.innerHTML= `<h3>TOTAL $ ${total}</h3>`;
// })
// };

//evento DOMContentLoaded para que al recargar me muestre mi ultimo carrito creado
document.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("pedido")) {
    const pedidos = JSON.parse(localStorage.getItem("pedido"));
    mostrarCarrito(pedidos);
  }
});