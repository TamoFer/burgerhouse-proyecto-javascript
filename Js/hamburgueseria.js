//importacion de funciones de otros modulos
import {  datosCliente} from "./accionesBtns.js";
import { renderizarCards, mostrarCarrito } from "./renders.js";

//traigo mi BD local y retorno una lista de objetos
const objeto = ()=>{
  const datos=[];
  fetch("bd_local/bd.json")
  .then(res=>res.json())
  .then(data=>{
    data.forEach(burgers=>{
      datos.push(burgers);  
    })
  })
  return datos;
}

//traigo mi BD local y renderizo las cards
const objetoRender = ()=>{
  fetch("bd_local/bd.json")
  .then(res=>res.json())
  .then(data=>{
    renderizarCards(data);
  })
}

//llamo a la funcion
objetoRender();

//instancio una constante con la lista de burgers de mi BD 
export const BD=objeto();


//definicion de constantes que utilizare en todo el codigo, agrego funcion export para modularizar el codigo
export const listaPedidos = [];
export const menus = document.querySelector("#menus");
export const facturacion = document.querySelector("#facturacion");
const montoTotal = document.querySelector("#montoTotal");


//devuelve la suma total de todos los pedidos de mi lista de pedidos utilizando reduce
export function sumaTotal(array) {
  const total = array.reduce(
    (acc, pedido) => acc + pedido.precio * pedido.cantidad,
    0
  );

  montoTotal.innerHTML = `<h3>TOTAL $ ${total}</h3>`;
  montoTotal.innerHTML += `
              <button type="button" id="modal-btn" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#exampleModal">PAGAR TODO</button>
              <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" >

              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Datos del cliente</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div class="modal-body">
                  <form id="form" class="row g-3">
                  
                    <div class="col-md-4">
                      <label  for="validationServer01" class="form-label">Nombre</label>
                      <input id="nombre" type="text" class="form-control" id="validationServer01"  required>
                    </div>

                    <div class="col-md-4">
                      <label  for="validationServer02" class="form-label">Apellido</label>
                      <input id="apellido" type="text" class="form-control" id="validationServer02" required>
                    </div>

                    <div class="col-md-4">
                      <label  for="validationServer01" class="form-label">Teléfono</label>
                      <input id="telefono" type="number" class="form-control" id="validationServer01"  required>
                    </div>
                    
                    <div class="col-md-6">
                      <label  for="validationServer03" class="form-label">Dirección</label>
                      <input id="direccion" type="text" class="form-control" id="validationServer03" aria-describedby="validationServer03Feedback" required>
                    </div>

                    <div class="col-md-3">
                      <label for="validationServer05" class="form-label">C.P</label>
                      <input type="text" class="form-control" id="validationServer05" aria-describedby="validationServer05Feedback" required>
                    </div>

                    <div class="col-md-6 mb-3">
                    <label for="validationServer03" class="form-label">Forma de Pago</label>
                      <select id="fpago" class="form-select" required aria-label="select example">
                        <option value="">Selecciona </option>
                        <option value="1">Efectivo</option>
                        <option value="2">MercadoPago</option>
                      </select>
                    </div>

                    <div class="col-md-6>
                      <label for="validationServer03" class="form-label p-2">TOTAL</label>
                      <input id="total" class="form-control-6 col-2" type="text" value="$${total}" aria-label="readonly input example" readonly>
                    </div>

                    <div class="col-12 d-md-flex p-1 justify-content-md-center">
                      <button  class="btn btn-primary"  id="liveToastBtn" type="submit" data-bs-dismiss="modal" >Abonar el pedido</button>
                    </div>
                    
                  </form>
                  
                </div>
              </div>
            </div>`;
  datosCliente();
};

// funcion de guardado en LocalStorage de mi lista de pedidos
export function guardandoLocalmente(listaPedidos) {
  localStorage.setItem("pedido", JSON.stringify(listaPedidos));
}

//evento DOMContentLoaded para que al recargar me muestre mi ultimo carrito creado
document.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("pedido")) {
    const pedidos = JSON.parse(localStorage.getItem("pedido"));
    pedidos.forEach((pedido) => {
      listaPedidos.push(pedido);
    });
    mostrarCarrito(listaPedidos);
  }
});
