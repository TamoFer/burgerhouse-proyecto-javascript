// importacion de funcion
import { DateTime } from "../lib/luxon.js";

// creacion popup segun evento que reciba 
export function popUp(event, burga) {
    event.target.getAttribute("serial")
      ? Swal.fire({
          toast: true,
          position: "top",
          iconColor: "white",
          customClass: {
            popup: "colored-toast",
          },
          showConfirmButton: false,
          timer: 1000,
          timerProgressBar: false,
          icon: "success",
          title: `Agregastes una ${burga.nombre}`,
        })
      : Swal.fire({
          toast: true,
          position: "top",
          iconColor: "white",
          customClass: {
            popup: "colored-toast",
          },
          showConfirmButton: false,
          timer: 1000,
          timerProgressBar: false,
          icon: "error",
          title: `Sacaste una ${burga.nombre}`,
        });
}
  
// popup de alerta sobre mal uso 
export function popUpErrors() {
  Swal.fire({
    toast: true,
    position: "top",
    iconColor: "white",
    customClass: {
      popup: "colored-toast",
    },
    showConfirmButton: false,
    timer: 1000,
    timerProgressBar: false,
    icon: "warning",
    title: `No agregastes esta burga al carrito`,
  });
}

// eliminacion del pedido luego de que se cumple su horario de llegada
export function borrarPedidosEntregados(obj) {
  const horaActual = DateTime.now().toLocaleString(DateTime.TIME_24_SIMPLE);
  horaActual >= obj.horaLlegada
    ? (Swal.fire({
        title: "Estado del pedido",
        text: `El delivery ya hizo entrega de tu pedido ${obj.nombre} que lo disfrutes! `,
        timer: 2000,
        icon: "success",
      }),
      setTimeout(() => {
        localStorage.clear(), window.location.reload();
      }, 2100))
    : null;
}

//tooltips iconos tecnologias usadas en proyecto
tippy('#html5', {
  content: 'HTML5',
});

tippy('#css3', {
  content: 'CSS3',
});

tippy('#javascript', {
  content: 'JavaScript',
});

tippy('#bootstrap', {
  content: 'BootStrap',
});

tippy('#sweetalert2', {
  content: 'SweetAlert2',
});

tippy('#tippy', {
  content: 'Tippy . Js',
});

//tooltips iconos ecommmerce
tippy('#deliveryImg', {
  content: 'Estado del pedido',
});

tippy('#carritoImg', {
  content: 'Carrito de compra',
});

tippy('#modal-btnPagar', {
  content: 'Abonar pedido',
});

tippy('#modal-btnVaciar', {
  content: 'Vaciar carrito de compra',
});