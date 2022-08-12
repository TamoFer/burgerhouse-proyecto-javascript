import { DateTime } from "../lib/luxon.js";


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
      }, 2500))
    : null;
}

