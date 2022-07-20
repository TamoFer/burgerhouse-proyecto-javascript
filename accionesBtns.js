// importacion de funciones de otros modulos
import { hamburguesas,listaPedidos} from "./hamburgueseria.js";
import { mostrarCarrito } from "./renders.js";

//agrego desde button de card la burger
export function agregarPedido(event) {
  let serial = event.target.getAttribute("serial");
  let burger = hamburguesas.find((burger) => burger.serial == serial);
  let burgerAgregada = listaPedidos.find((burger) => burger.serial == serial);

  burgerAgregada?burgerAgregada.cantidad++:(burger.cantidad=1,listaPedidos.push(burger));

  mostrarCarrito(listaPedidos);
};


//elimino del carrito burgers atraves de button
export function eliminarPedido(event) {
  let serial = event.target.getAttribute("serialDelete");
  let burgerAgregada = listaPedidos.find((burger) => burger.serial == serial);
  let indice = listaPedidos.findIndex((pedido) => pedido.serial == serial);
  
  burgerAgregada.cantidad--;
  burgerAgregada.cantidad===0 &&listaPedidos.splice(indice,1);
  
  mostrarCarrito(listaPedidos);
};


//msj que indica que el pedido ya fue abonado, en un toast
// export function abonarTodo(){
//   const submit = document.querySelector('#form');
//   const nombre = document.querySelector('#nombre');
//   const adress = document.querySelector('#direccion');
  
//   // submit.addEventListener('submit', (event) => {
//   //   event.preventDefault();
//   //   // localStorage.clear();
//   //   // const toastTrigger = document.getElementById('liveToastBtn');
//   //   // const toastMsj = document.getElementById('liveToast');

//   //   // toastTrigger!=null && toastTrigger.addEventListener('click', () => {
//   //   //   const toast = new bootstrap.Toast(toastMsj);
//   //   //   toast.show();
//   //   // });

//   //   // const msj= document.querySelector('.toast-body');
//   //   // msj.textContent = `Hola ${nombre.value} ya estamos preparando tu pedido!
//   //   //                   Lo enviaremos cuando este hecho, a ${adress.value}                        
//   //   //                   ¡Gracias por comprar en BURGERHOUSE!`;
//   // });
// };


export function datosCliente(){
  const btn = document.getElementById('form');
  btn.addEventListener('submit', (e) => {
      e.preventDefault();
      const yaPago= document.getElementById('pedidosPagos');
      const pedidos= JSON.parse(localStorage.getItem("pedido"));
      yaPago.innerHTML= `<div>
                        <h6>Pedido de ${nombre.value}</h6>
                        <p id="descripcionPedido"></p>  
                        <h6>TOTAL ${total.value}</h6>
                        <button id="btn-pp" type="button">Seguimiento</button>
                        </div>`
      pedidos.forEach(p => {
        const descripcionPedido= document.getElementById('descripcionPedido');
        descripcionPedido.innerHTML+= `<p>${p.nombre} x ${p.cantidad}</p>`
      });

      swal({
        icon: "success",
        text: `¡Genial ${nombre.value}! Ya tenemos tu orden en proceso de elaboracion`,
        button: false,
        timer: 3000
      });
      const cerrarW= setTimeout(() => {
        // localStorage.clear();
        // window.location.reload();
      },3200);

    })
};
