//importacion de funciones de otros modulos
import { mostrarCarrito, renderizarCards } from "./renders.js";
import { DateTime } from "./luxon.js";

//traigo mi BD local y retorno una lista de objetos
const objeto = () => {
  const datos = [];
  fetch("bd_local/bd.json")
    .then((res) => res.json())
    .then((data) => {
      data.forEach((burgers) => {
        datos.push(burgers);
      });
    });
  return datos;
};

//traigo mi BD local y renderizo las cards
const objetoRender = () => {
  fetch("bd_local/bd.json")
    .then((res) => res.json())
    .then((data) => {
      renderizarCards(data);
    });
};

//llamo a la funcion
objetoRender();

//instancio una constante con la lista de burgers de mi BD
export const BD = objeto();

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
  const totalMonto = document.querySelector("#monto-carrito-total");
  totalMonto.textContent = `$${total}`;
  tiempoLlegadaPedido(array);
  // console.log(calculoDemora(listaPedidos));
  console.log(tiempoLlegadaPedido(listaPedidos));
  return total;
}

// funcion de guardado en LocalStorage de mi lista de pedidos
export function pedidoTemporal(listaPedidos) {
  localStorage.setItem("pedidoTemporal", JSON.stringify(listaPedidos));
}

//evento DOMContentLoaded para que al recargar me muestre mi ultimo carrito creado
document.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("pedidoTemporal")) {
    const pedidos = JSON.parse(localStorage.getItem("pedidoTemporal"));
    pedidos.forEach((pedido) => {
      listaPedidos.push(pedido);
    });
    mostrarCarrito(listaPedidos);
    contador();
  }
});

const btnCarrito = document.querySelector("#carritoImg");
btnCarrito.addEventListener("click", () => {
  mostrarCarrito(listaPedidos);
  sumaTotal(listaPedidos);
});

export function contador() {
  const notificacion = document.querySelector(".contador");
  const total = listaPedidos.reduce((acc, pedido) => acc + pedido.cantidad, 0);
  notificacion.textContent = total.toString();
}

class Cliente {
  constructor(nombre, telefono, direccion, fpago) {
    this.nombre = nombre;
    this.telefono = telefono;
    this.direccion = direccion;
    this.fpago = fpago;
  }
}

function resetInterface() {
  localStorage.removeItem("pedidoTemporal");
  const listaPedidos = [];
  mostrarCarrito(listaPedidos);
  contador();
  window.location.reload();
}

const listaClientes = [];

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
      const cliente = new Cliente(nombre, telefono, direccion, fpago);
      if (!nombre || !telefono || !direccion || !fpago) {
        Swal.showValidationMessage(
          `¡Completa todos los campos del formulario para el envio!`
        );
      }
      return cliente;
    },
  }).then((result) => {
    const cliente = result.value;
    listaClientes.push(cliente);
    Swal.fire({
      icon: "success",
      text: `Excelente ${result.value.nombre} ${calculoDemora(listaPedidos)} a ${result.value.direccion}. ¡Gracias por comprar en BurgerHouse!`,
      timer: 3000,
    });
    setTimeout(resetInterface, 4000);
  });
});

const verPedido = document.querySelector("#ultimo-pedido");
verPedido.addEventListener("click", () => {
  console.log(listaClientes);
});

function tiempoLlegadaPedido(array) {
  const numBurgers = array.reduce((acc, p) => acc + p.cantidad, 0);
  const hora = DateTime.now();
  const horaLlegada = hora
    .plus({ hour: numBurgers * 0.25 })
    .toLocaleString(DateTime.TIME_24_SIMPLE);
  return horaLlegada;
}

function calculoDemora(array) {
  const numBurgers = array.reduce((acc, p) => acc + p.cantidad, 0);
  const segundos = numBurgers * 900;
  let hora = Math.floor(segundos / 3600);
  hora = hora < 10 ? "0" + hora : hora;
  let minutos = Math.floor((segundos / 60) % 60);
  minutos = minutos < 10 ? "0" + minutos : minutos;
  let demora = "";

  hora < 1
    ? (demora = `Tu pedido tardara aprox. ${minutos} min`)
    : (demora = `Tu pedido tardara aprox. ${hora}:${minutos} hs`);

  return demora;
}
