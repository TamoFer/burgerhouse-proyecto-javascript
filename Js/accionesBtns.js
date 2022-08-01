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

//funcion que muestra alertas y noficaciones luego del submit 
export function datosCliente(){
  const btn = document.getElementById('form');
  btn.addEventListener('submit', (e) => {
      e.preventDefault();
      const yaPago= document.getElementById('pedidosPagos');
      yaPago.innerHTML+= `<div class="cardPedido">
                        <h6>Pedido de ${nombre.value}</h6>
                        <h6>TOTAL ${total.value}</h6>
                        <button class="btn btn-dark btn-pp" type="button">Seguimiento</button>
                        </div>`

      swal({
        icon: "success",
        text: `¡Genial ${nombre.value}! Ya tenemos tu orden en proceso de elaboracion`,
        button: false,
        timer: 3000
      });
      
      const btn1= document.querySelector('.btn-pp');
      btn1.addEventListener('click', () => {
        Toastify({
          text: "¡El pedido esta en camino!",
          duration: 3000,
          gravity: "bottom",
          position: "right"
          }).showToast();
        localStorage.clear();
        const listaPedidos = [];
        // mostrarCarrito(listaPedidos);
      });
      
    })
};

