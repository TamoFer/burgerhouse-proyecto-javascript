const hamburguesas = [ //defino array de objetos a utilizar en el codigo
  {
    serial:0,
    nombre: "Americana",
    carne: "Carne",
    medallones: "Doble",
    guarnicion: "Papas fritas",
    ingredientes: "Chedar, Bacon crujiente y salsa Barbacoa",
    precio: 1200,
    cantidad: 1,
  },
  {
    serial:1,
    nombre: "Clásica",
    carne: "Carne",
    medallones: "Doble",
    guarnicion: "Papas fritas",
    ingredientes: "Tomate, Lechuga y Mayonesa",
    precio: 950,
    cantidad: 1,

  },
  {
    serial:2,
    nombre: "Crispy",
    carne: "Pollo",
    medallones: "Simple",
    guarnicion: "Aros de cebolla",
    ingredientes: "Cebolla crispy, Lechuga y Mayo Alioli",
    precio: 1000,
    cantidad: 1,

  },
  {
    serial:3,
    nombre: "Power Onion",
    carne: "Pollo",
    medallones: "Doble",
    guarnicion: "Bastones de Muzarella",
    ingredientes: "Aros de cebolla, Cebolla, Lechuga y Ketchup",
    precio: 1050,
    cantidad: 1,

  },
  {
    serial:4,
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

crearCards();

function crearCards(){
  let menus=document.getElementById("menus");
    hamburguesas.forEach(pedido=>{
      let menu=`<div class="pedido">
                  <h2> ${pedido.nombre}</h2>
                  <img src="" alt="">
                  <p> Deliciosa Hamburguesa de ${pedido.carne}
                  ${pedido.medallones} que trae ${pedido.ingredientes}
                  acompañado de ${pedido.guarnicion}</p>
                  <h3> Precio $${pedido.precio}</h3>
                  <button class="btn-style--card" onclick="agregarPedido(${pedido.serial})">Agregar</button>
      `
    menus.innerHTML+=menu;})
};

function agregarPedido(serial){
  let burger= hamburguesas.find(pedido=>pedido.serial===serial);
  let burgerAgregada= listaPedidos.find(pedido=>pedido.serial===serial);
  if(burgerAgregada){
    burgerAgregada.cantidad++;
  }else{
    burger.cantidad=1;
    listaPedidos.push(burger);
  }
  sumaTotal();
  mostrarCarrito();
};

function mostrarCarrito(){
  let factura= document.getElementById("facturacion");
  let ticket=``;
  listaPedidos.forEach((pedido, serial)=>{
    ticket+= `<div id="descripcionTkt"><p>${pedido.cantidad} x Hamburguesa ${pedido.nombre} $${(pedido.precio)}</p><button class="btn-style--tkt" onclick="eliminarCarrito(${serial})">Eliminar</button></div> `
    factura.innerHTML=ticket;
  });
};

function eliminarCarrito(serial){
  listaPedidos[serial].cantidad--;

  if(listaPedidos[serial].cantidad===0){  
    listaPedidos.splice(serial,1);
  }
  sumaTotal();
  mostrarCarrito();
};


function sumaTotal(){
  let total=0;

  listaPedidos.forEach(pedido=>{
    total+=pedido.precio*pedido.cantidad;
  });

  const precioTotal= document.getElementById("montoTotal");
  precioTotal.innerHTML=`<h3>TOTAL $ ${total}</3>`;

};
