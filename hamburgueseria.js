import { agregarPedido,eliminarPedido } from "./accionesBtns.js";
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

  }
];

export const listaPedidos=[];
export const menus=document.querySelector('#menus');
export const facturacion=document.querySelector('#facturacion');
export const montoTotal=document.querySelector('#montoTotal');

renderizarCards();

export function sumaTotal(){
  let total=0;

  listaPedidos.forEach(pedido=>{
    total += pedido.precio*pedido.cantidad;
  });

  montoTotal.innerHTML = `<h3>TOTAL $ ${total}</h3>`;
};

