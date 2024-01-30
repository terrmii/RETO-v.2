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
    } else {
        marker.getElement().classList.add('guardado');
        // Agregar la ubicación al arreglo de guardados
        ubicacionesGuardadas.push(nombre);
    }

    // Actualizar el localStorage
    localStorage.setItem('guardados', ubicacionesGuardadas.join(','));

    // Llamar a la función crearCard con el nombre de la ubicación
    crearCard(nombre);
}

function crearCard(nombre) {
    // Obtener el contenedor de las tarjetas
    const ubicacionesCardsWrapper = document.querySelector('.mySwiper2 .ubicacionesCards');

    // Limpiar el contenedor antes de volver a crear las tarjetas
    ubicacionesCardsWrapper.innerHTML = '';

    // Iterar sobre las ubicaciones guardadas y crear las tarjetas
    for (const nombre of ubicacionesGuardadas) {
        const newSlide = document.createElement('div');
        newSlide.className = 'swiper-slide';
        newSlide.setAttribute('data-nombre', nombre);

        newSlide.innerHTML = `
        <div class="container">
        <div class="card">
        <div class="row">
            <div class="col-9 left">
                <div class="row top">
                    <div class="col">${nombre}</div>
                    <!-- Fecha actual -->
                    <div class="col"><span id="fecha"></span></div>
                    <!-- Hora actualizada cada 15 segs -->
                    <div class="col"><span id="hora"></span></div>
                </div>
                <div class="row">
                    <div class="col-7 temp">-4&deg;</div>
                    <div class="col-5 time"><p>11:00</p><h2><b>Sábado</b></h2><p>Nublado.</p></div>
                </div>
                <div class="row prec ">
                  <div class="col-12"><i class="fa-solid fa-wind"></i> 6.1 mph</div>
                  <div class="col-12"><i class="fa-solid fa-droplet"></i> 90%</div>
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
  
                        <div class="" >
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
        </div>
      `;

        ubicacionesCardsWrapper.appendChild(newSlide);
    }

    // Actualizar el swiper
    swiper2.update();
}

// Llamar a crearBalizas al cargar la página o en el momento adecuado
crearBalizas();





























// PRUEBAS



const tokenEuskalmet = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJtZXQwMS5hcGlrZXkiLCJpc3MiOiJJRVMgUExBSUFVTkRJIEJISSBJUlVOIiwiZXhwIjoyMjM4MTMxMDAyLCJ2ZXJzaW9uIjoiMS4wLjAiLCJpYXQiOjE2Mzk3NDc5MDcsImVtYWlsIjoiaWtiY3lAcGxhaWF1bmRpLm5ldCJ9.fXOiD4Q8EOwsHOow7UarFr99JLaFBJI4-5vdOPNmMevEo6_O6Iz26IceK9Ak0OzRvZ-BuGbYuH7PGfwEynMABv6OS-jav_KBEVbpVx4c78zzEXrt0OmLqILHKiR-wiunqt4z8lhsesjo92O1jmUrmxPOLeb5n8Y4maXW3x8u00CkkA_OIF9I7LlgiMMIiuhDgv7E2fRtdBzWg4sPqe6DindIpgb4ebWB1a297k_OiOSpkDC3y5fcD4bzOGVvLI0FTTwomrQXXxgHINAxG2AjUHeIi9_XwLea5oQy2UIUOyHhl7q3nJ4WEpnp0n33jh8GVmTcujYyHHMXb55We2xfjg';

async function regionesEuskalmet() {
  try {
    const respuesta = await fetch('https://api.euskadi.eus/euskalmet/geo/regions/basque_country/zones/', {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + tokenEuskalmet
      },
    });

    const data = await respuesta.json();

    // Verificar si la respuesta tiene el formato esperado
    if (Array.isArray(data) && data.length > 0 && data[0].hasOwnProperty('regionZoneId')) {
      // Extraer los valores de regionZoneId y almacenarlos en un array
      const regionZoneIds = data.map(obj => obj.regionZoneId);

      // Imprimir el array resultante
      console.log(regionZoneIds);
    } else {
      console.log('La respuesta de la API no tiene el formato esperado.');
    }
  } catch (error) {
    console.log('Error al ver los datos:', error);
  }
}


// Llamar a la función
// regionesEuskalmet();

async function obtenerDatosPorZona() {
  
    // Lista de zonas
    const zonas = [
      'cantabrian_mountains',
      'cantabrian_valleys',
      'coast_zone',
      'donostialdea',
      'ebro_valley',
      'great_bilbao',
      'interior_basins',
      'pyrenees',
      'southern_mountain',
      'vitoria_gasteiz'
    ];
  
    // Objeto para almacenar las respuestas por zona
    const respuestasPorZona = {};
  
    // Realizar llamadas para cada zona
    for (const zona of zonas) {
      try {
        const respuesta = await fetch(`https://api.euskadi.eus/euskalmet/geo/regions/basque_country/zones/${zona}/locations`, {
          method: 'GET',
          headers: {
            'Authorization': 'Bearer ' + tokenEuskalmet
          },
        });
  
        const data = await respuesta.json();
  
        // Guardar la respuesta en el objeto con la clave como "regionZoneLocationId"
        respuestasPorZona[zona] = data;

        let i = 0;
        for(var infor of data){
            for(var nombres of nombresUbicaciones){

                if(infor["regionZoneLocationId"] == nombres){
                    console.log('si');
                }else{
                    console.log('no');
                }
            }
                
            console.log(`Datos para la zona ${zona}:`, infor["regionZoneLocationId"]);
            console.log(nombres);
        }
        
        console.log(`Datos para la zona ${zona}:`, data[0]["regionZoneLocationId"]);
      } catch (error) {
        console.log(`Error al obtener datos para la zona ${zona}:`, error);
      }
    }
  
    // Imprimir el objeto con todas las respuestas
    console.log('Respuestas por zona:', respuestasPorZona);
  }
  
  // Llamar a la función
  
    // setTimeout(() => {
    //     obtenerDatosPorZona();
    // }, 4010); 

