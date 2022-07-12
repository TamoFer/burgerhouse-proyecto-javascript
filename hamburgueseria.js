import {agregarPedido,eliminarPedido} from "./accionesBtns"; 

const hamburguesas = [ //defino array de objetos a utilizar en el codigo
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

const listaPedidos=[];
const menus=document.querySelector('#menus');
const facturacion=document.querySelector('#facturacion');
const montoTotal=document.querySelector('#montoTotal');

renderizarCards();

function renderizarCards(){
  hamburguesas.forEach(burger=>{
    // Estructura
    const miCard = document.createElement('div');
    miCard.classList.add("pedido");
    // Titulo
    const miCardTitle = document.createElement('h2');
    miCardTitle.textContent = burger.nombre;
    //Descripcion
    const miCardDescripcion=document.createElement('p');
    miCardDescripcion.textContent = `Deliciosa Hamburguesa de ${burger.carne} ${burger.medallones} que trae ${burger.ingredientes} acompañado de ${burger.guarnicion}`;
    // Precio
    const miCardPrecio = document.createElement('h3');
    miCardPrecio.textContent=`Precio $ ${burger.precio}`;
    // Boton 
    const tktBoton = document.createElement('button');
    tktBoton.classList.add('btn-style--card');
    tktBoton.textContent='Agregar';
    tktBoton.setAttribute('serial', burger.serial);
    tktBoton.addEventListener('click', agregarPedido);
    // Insertamos
    miCard.appendChild(miCardTitle);
    miCard.appendChild(miCardDescripcion);
    miCard.appendChild(miCardPrecio);
    miCard.appendChild(tktBoton);
    menus.appendChild(miCard);
});
};

function mostrarCarrito(){
  facturacion.textContent= '';
  listaPedidos.forEach(pedido=>{
    const miTkt = document.createElement('div');
    miTkt.classList.add("descripcionTkt");
    //Descripcion
    const miTktDescripcion=document.createElement('p');
    miTktDescripcion.textContent = `${pedido.cantidad} x Hamburguesa ${pedido.nombre} $${pedido.precio}`;
    // Boton 
    const tktBoton = document.createElement('button');
    tktBoton.classList.add('btn-style--tkt');
    tktBoton.textContent='Eliminar';
    tktBoton.setAttribute('serialDelete', pedido.serial);
    tktBoton.addEventListener('click', eliminarPedido);
    
    // Insertamos
    miTkt.appendChild(miTktDescripcion);
    miTkt.appendChild(tktBoton);
    facturacion.appendChild(miTkt);
  });
};

function sumaTotal(){
  let total=0;

  listaPedidos.forEach(pedido=>{
    total += pedido.precio*pedido.cantidad;
  });

  montoTotal.innerHTML = `<h3>TOTAL $ ${total}</h3>`;
}
