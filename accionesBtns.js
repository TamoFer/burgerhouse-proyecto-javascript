export function agregarPedido(event) {
  let serial = event.target.getAttribute("serial");
  let burger = hamburguesas.find((burger) => burger.serial == serial);
  let burgerAgregada = listaPedidos.find((burger) => burger.serial == serial);

  if (burgerAgregada) {
    burgerAgregada.cantidad++;
  } else {
    burger.cantidad = 1;
    listaPedidos.push(burger);
  }
  sumaTotal();
  mostrarCarrito();
}

export function eliminarPedido(event) {
  let serial = event.target.getAttribute("serialDelete");
  let burgerAgregada = listaPedidos.find((burger) => burger.serial == serial);
  let indice = listaPedidos.findIndex((pedido) => pedido.serial == serial);
  burgerAgregada.cantidad--;

  if (burgerAgregada.cantidad === 0) {
    listaPedidos.splice(indice, 1);
  }
  sumaTotal();
  mostrarCarrito();
}
