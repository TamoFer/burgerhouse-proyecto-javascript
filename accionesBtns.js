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

export function abonarTodo(){
  const submit = document.querySelector('#form');
  const nombre = document.querySelector('#nombre');
  const adress = document.querySelector('#direccion');
  
  submit.addEventListener('submit', (event) => {
    event.preventDefault();
    const msj= document.querySelector('.toast-body');
    msj.textContent = `Hola ${nombre.value} ya estamos preparando tu pedido!
                      Lo enviaremos cuando este hecho, a ${adress.value}                        
                      ¡Gracias por comprar en BURGERHOUSE!`;
                
    const toastTrigger = document.getElementById('liveToastBtn')
    const toastLiveExample = document.getElementById('liveToast')
    if (toastTrigger) {
        toastTrigger.addEventListener('click', () => {
          const toast = new bootstrap.Toast(toastLiveExample);
          toast.show();
        });
      };
  });
};
