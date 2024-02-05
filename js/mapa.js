// Mapa
var map = L.map('map').setView([43.1924,-2.0850], 10);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);


var nombresUbicaciones = []; // Variable para almacenar los nombres de ubicaciones

// Zonas
let cantabrianMountains = [];
let coastZone = [];
let donostialdea = [];
let ebroValley = [];
let greatBilbao = [];
let interiorBasins = [];
let pyrenees = [];
let southernMountain = [];
let vitoriaGasteiz = [];

var ubicacionesGuardadas;

var ubicacionesGuardadas;

async function crearBalizas() {
    try {
        const response = await fetch(`${laravelApi}/api/obtener-ubicaciones`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                'X-Requested-With': 'XMLHttpRequest'
            },
        });

        const data = await response.json();
        var guardados;

        // Eliminar eventos de clic existentes antes de agregar nuevos
        map.off('click', 'markerClick');

        // Recoger ubicaciones guardadas del Local Storage
        guardados = localStorage.getItem('guardados');
        ubicacionesGuardadas = guardados ? guardados.split(',') : [];

        data.ubicaciones.forEach(ubicacion => {
            // Crear marcador en el mapa
            var marker = L.marker([ubicacion.latitud, ubicacion.longitud]).addTo(map);
            marker.bindTooltip("<b>" + ubicacion.nombre + "</b><br>", {
                direction: 'top',
                offset: L.point(-15, -20)
            });

            // Agregar el nombre a la variable nombresUbicaciones
            nombresUbicaciones.push(ubicacion.nombre);

            // Verificar si la ubicación está guardada y agregar la clase
            if (ubicacionesGuardadas.includes(ubicacion.nombre)) {
                marker.getElement().classList.add('guardado');
            }

            // Agregar el evento de clic
            marker.on('click', function () {
                toggleGuardado(ubicacion.nombre, marker);
            });
        });

        // Generar tarjetas directamente para las ubicaciones guardadas
        ubicacionesGuardadas.forEach(nombre => {
            crearCard(nombre);
        });

    } catch (error) {
        // Manejar el error adecuadamente
    }
}

function toggleGuardado(nombre, marker) {
    // Cambiar color
    if (marker.getElement().classList.contains('guardado')) {
        marker.getElement().classList.remove('guardado');
        // Eliminar la ubicación del arreglo de guardados
        ubicacionesGuardadas = ubicacionesGuardadas.filter(n => n !== nombre);
         // Eliminar la tarjeta correspondiente
         eliminarCard(nombre);
    } else {
        marker.getElement().classList.add('guardado');
        // Agregar la ubicación al arreglo de guardados
        ubicacionesGuardadas.push(nombre);
        // Llamar a la función crearCard con el nombre de la ubicación
        crearCard(nombre);
      }

      // Actualizar el localStorage
      localStorage.setItem('guardados', ubicacionesGuardadas.join(','));
}

var ina = 0;

function crearCard(nombre) {
  // Obtener el contenedor de las tarjetas
  const ubicacionesCardsWrapper = document.querySelector('.mySwiper2 .ubicacionesCards');

  // Hacer que se borra la primera vez que entra
  if(ina == 0){
    ubicacionesCardsWrapper.innerHTML = '';

  }

  ina = 1;


  fetch(laravelApi + "/api/obtener-datos-nombre/" + nombre, {
      method: "GET",
      headers: {
          "Content-type": "application/json; charset=UTF-8"
      }
  })
  .then(response => response.json())
  .then(data => {
      // Verificar si hay ubicaciones guardadas
      if (ubicacionesGuardadas.length > 0) {
          // Iterar sobre las ubicaciones guardadas y crear las tarjetas
              const newSlide = document.createElement('div');
              newSlide.className = 'swiper-slide';
              newSlide.setAttribute('data-nombre', nombre);

              newSlide.innerHTML = `
              <div class="container">
              <div class="card">
              <div class="row">
                  <div class="col-9 left">
                      <div class="row top">
                          <div class="col fw-bold">${nombre}</div>
                          <div class="col"><span id="fecha">${fechaHoy}</span></div>
                      </div>
                      <div class="row">
                          <div class="col-7 temp">${(data[0]['temperatura_real'])}&deg;</div>
                          <div class="col-5 time"><p>${obtenerHoraActual()}:00</p><h2><b>${diaDeLaSemana}</b></h2><p class="descripcion">${data[0]['descripcion']}.</p></div>
                      </div>
                      <div class="row prec">
                        <div class="col-12"><i class="fa-solid fa-wind"></i> ${data[0]['viento']} KM/h</div>
                        <div class="col-12"><i class="fa-solid fa-droplet"></i> ${data[0]['humedad']}%</div>
                      </div>
                      <div class="row bottom">
                          <div class="col"><hr></div>
                          <div class="col border">
                              <div class="row">Sab</div>
                              <div class="row"><b>-4&deg;</b></div>
                          </div>
                          <div class="col">
                              <div class="row">Dom</div>
                              <div class="row"><b>-4&deg;</b></div>
                          </div>
                          <div class="col">
                              <div class="row">Lun</div>
                              <div class="row"><b>-5&deg;</b></div>
                          </div>
                          <div class="col">
                              <div class="row">Mar</div>
                              <div class="row"><b>-10&deg;</b></div>
                          </div>
                          <div class="col">
                              <div class="row">Mie</div>
                              <div class="row"><b>-4&deg;</b></div>
                          </div>
                          <div class="col">
                              <div class="row">Jue</div>
                              <div class="row"><b>-2&deg;</b></div>
                          </div>
                          <div class="col">
                              <div class="row">Vie</div>
                              <div class="row"><b>0&deg;</b></div>
                          </div>
                          <div class="col"><hr></div>
                      </div>
                  </div>
                  <div class="col-3 right">
                      <div class="row top" style="margin-right: 10.5em;">Gráficas</div>
                        <div class="row">
        
                          <div>
                            <div class="top text-center">
        
                              <div>
                                <label for="desde">Desde</label>
                                <input type="date" name="" id="desde">
                              </div>
        
                              
                              <label for="hasta">Hasta</label>
                              <input type="date" name="" id="hasta">
                            </div>
                            <canvas id="myChart"></canvas>
                          </div>
        
                          <div class="bottom da text-center">
                            <span class="top">Dias anteriores</span>
                              <div class="col border">
                                <div class="row">Sab</div>
                                <div class="row"><b>-4&deg;</b></div>
                              </div>
                              <div class="col border">
                                <div class="row">Dom</div>
                                <div class="row"><b>3&deg;</b></div>
                              </div>
                              <div class="col border">
                                <div class="row">Lun</div>
                                <div class="row"><b>-3&deg;</b></div>
                              </div>
                              <div class="col border">
                                <div class="row">Mar</div>
                                <div class="row"><b>1&deg;</b></div>
                              </div>
                              <div class="col border">
                                <div class="row">Mie</div>
                                <div class="row"><b>2&deg;</b></div>
                              </div>
                          </div>
                          
                          <script src="js/grafica.js"></script>
                        </div>
                  </div>
              </div>
          </div>
          <div class="dnd">
            <i class="fa-solid fa-wind" id="viento" draggable="true"></i>
            <i class="fa-solid fa-droplet" id="gota" draggable="true"></i>
          </div>
              </div>
            `;

              ubicacionesCardsWrapper.appendChild(newSlide);

              setInterval(async () => {
                try {
                  const temperaturaFake = await actualizarTemperatura(nombre);
            
                  // Actualizar la tarjeta con la nueva temperatura
                  const cardToUpdate = ubicacionesCardsWrapper.querySelector(`[data-nombre="${nombre}"]`);
                  if (cardToUpdate) {
                    const tempElement = cardToUpdate.querySelector('.temp');
                    if (tempElement) {
                      tempElement.textContent = `${temperaturaFake}°`;
                    }
                  }
                } catch (error) {
                  console.error('Error al actualizar la temperatura:', error);
                }
              }, 10000);

      } else {
          console.log('No hay ubicaciones guardadas.');
      }

      // Actualizar el swiper
      swiper2.update();
  })
  .catch(error => {
      console.error(error);
  });


}

function eliminarCard(nombre) {
    const ubicacionesCardsWrapper = document.querySelector('.mySwiper2 .ubicacionesCards');
    const cardToRemove = ubicacionesCardsWrapper.querySelector(`[data-nombre="${nombre}"]`);
    if (cardToRemove) {
        ubicacionesCardsWrapper.removeChild(cardToRemove);

        swiper2.update();
    }
}

function obtenerHoraActual() {

    const ahora = new Date();
    const horas = ahora.getHours();
    const horasFormateadas = horas < 10 ? '0' + horas : horas;

    return `${horasFormateadas}`;
}

function obtenerFechaActual() {
    const ahora = new Date();
    const dia = ahora.getDate();
    const mes = ahora.getMonth() + 1;
    const anio = ahora.getFullYear();

    const diaFormateado = dia < 10 ? '0' + dia : dia;
    const mesFormateado = mes < 10 ? '0' + mes : mes;


    return `${anio}-${mesFormateado}-${diaFormateado}`;
}

var fechaHoy = obtenerFechaActual();

function obtenerDiaSemanaEnEspanol() {
    const diasSemana = [
      'Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'
    ];
  
    const fechaActual = new Date();
    const diaSemana = fechaActual.getDay();
  
    return diasSemana[diaSemana];
}
  
const diaDeLaSemana = obtenerDiaSemanaEnEspanol();

async function actualizarTemperatura(nombre){
    try {
        let respuesta = await fetch(laravelApi + "/api/obtener-temperatura/" + nombre, {
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        });
        
        let data = await respuesta.json();

        a = data;

        return a[0]["temperatura_fake"]

    } catch (error) {
        console.log(error);
    }

}




