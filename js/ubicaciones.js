// var horaVer = document.getElementById("hora");

// function obtenerHora() {
//   var ahora = new Date();

//   var horas = ahora.getHours();
//   var minutos = ahora.getMinutes();

//   // Formato de 24 horas
//   horas = horas < 10 ? "0" + horas : horas;
//   minutos = minutos < 10 ? "0" + minutos : minutos;

//   var horaFormato24 = horas + ":" + minutos;

//   horaVer.innerHTML = horaFormato24;
// }

// // Actualizar la hora cada 15 segundos
// setInterval(obtenerHora, 15000);

// obtenerHora();

// function obtenerFecha() {
//   var ahora = new Date();

//   var dia = ahora.getDate();
//   var mes = ahora.getMonth() + 1; // ¡Recuerda que los meses comienzan desde 0!
//   var anio = ahora.getFullYear();

//   // Formato de fecha dd.mm.yyyy
//   var fechaFormato = `${dia < 10 ? "0" + dia : dia}.${
//     mes < 10 ? "0" + mes : mes
//   }.${anio}`;

//   // Insertar la fecha en el elemento con la clase "col"
//   document.getElementById("fecha").innerHTML = fechaFormato;
// }

// // Llamar a la función para obtener y mostrar la fecha actual
// obtenerFecha();

// function crearCard() {
//   // Get the swiper wrapper element with the class "ubicacionesCards" in the second Swiper instance
//   const ubicacionesCardsWrapper = document.querySelector('.mySwiper2 .ubicacionesCards');

//   // Iterate over each nombre in ubicacionesGuardadas
//   for (var nombre of ubicacionesGuardadas) {
//       console.log(nombre);

//       // Create a new swiper slide for each nombre
//       const newSlide = document.createElement('div');
//       newSlide.className = 'swiper-slide';

//       // Add your card HTML content to the new slide
//       newSlide.innerHTML = `
//       <div class="container">
//       <div class="card">
//       <div class="row">
//           <div class="col-9 left">
//               <div class="row top">
//                   <div class="col">${nombre}</div>
//                   <!-- Fecha actual -->
//                   <div class="col"><span id="fecha"></span></div>
//                   <!-- Hora actualizada cada 15 segs -->
//                   <div class="col"><span id="hora"></span></div>
//               </div>
//               <div class="row">
//                   <div class="col-7 temp">-4&deg;</div>
//                   <div class="col-5 time"><p>11:00</p><h2><b>Sábado</b></h2><p>Nublado.</p></div>
//               </div>
//               <div class="row prec ">
//                 <div class="col-12"><i class="fa-solid fa-wind"></i> 6.1 mph</div>
//                 <div class="col-12"><i class="fa-solid fa-droplet"></i> 90%</div>
//               </div>
//               <div class="row bottom">
//                   <div class="col"><hr></div>
//                   <div class="col border">
//                       <div class="row">Sab</div>
//                       <div class="row"><b>-4&deg;</b></div>
//                   </div>
//                   <div class="col">
//                       <div class="row">Dom</div>
//                       <div class="row"><b>-4&deg;</b></div>
//                   </div>
//                   <div class="col">
//                       <div class="row">Lun</div>
//                       <div class="row"><b>-5&deg;</b></div>
//                   </div>
//                   <div class="col">
//                       <div class="row">Mar</div>
//                       <div class="row"><b>-10&deg;</b></div>
//                   </div>
//                   <div class="col">
//                       <div class="row">Mie</div>
//                       <div class="row"><b>-4&deg;</b></div>
//                   </div>
//                   <div class="col">
//                       <div class="row">Jue</div>
//                       <div class="row"><b>-2&deg;</b></div>
//                   </div>
//                   <div class="col">
//                       <div class="row">Vie</div>
//                       <div class="row"><b>0&deg;</b></div>
//                   </div>
//                   <div class="col"><hr></div>
//               </div>
//           </div>
//           <div class="col-3 right">
//               <div class="row top" style="margin-right: 10.5em;">Gráficas</div>
//                 <div class="row">

//                   <div>
//                     <div class="top text-center">

//                       <div class="" >
//                         <label for="desde">Desde</label>
//                         <input type="date" name="" id="desde">
//                       </div>

                      
//                       <label for="hasta">Hasta</label>
//                       <input type="date" name="" id="hasta">
//                     </div>
//                     <canvas id="myChart"></canvas>
//                   </div>

//                   <div class="bottom da text-center">
//                     <span class="top">Dias anteriores</span>
//                       <div class="col border">
//                         <div class="row">Sab</div>
//                         <div class="row"><b>-4&deg;</b></div>
//                       </div>
//                       <div class="col border">
//                         <div class="row">Dom</div>
//                         <div class="row"><b>3&deg;</b></div>
//                       </div>
//                       <div class="col border">
//                         <div class="row">Lun</div>
//                         <div class="row"><b>-3&deg;</b></div>
//                       </div>
//                       <div class="col border">
//                         <div class="row">Mar</div>
//                         <div class="row"><b>1&deg;</b></div>
//                       </div>
//                       <div class="col border">
//                         <div class="row">Mie</div>
//                         <div class="row"><b>2&deg;</b></div>
//                       </div>
//                   </div>
                  
//                   <script src="js/grafica.js"></script>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>`;

//       ubicacionesCardsWrapper.appendChild(newSlide);
//   }

//   swiper2.update();
// }

  
//   function pruebaDatosNombre(){

//     const laravelApiTiempo = 'http://localhost:81'

//     const nombreUbicacionABuscar = 'Irun';

//     fetch(`${laravelApiTiempo}/api/obtener-datos-nombre/${nombreUbicacionABuscar}`, {
//         method: 'GET',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//     })
//         .then(response => response.json())
//         .then(data => {
//             console.log(data);
//             // Puedes manejar los datos en la respuesta
//         })
//         .catch(error => console.error(error));

//   }

//   pruebaDatosNombre();

