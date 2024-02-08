const tokenEuskalmet = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJtZXQwMS5hcGlrZXkiLCJpc3MiOiJJRVMgUExBSUFVTkRJIEJISSBJUlVOIiwiZXhwIjoyMjM4MTMxMDAyLCJ2ZXJzaW9uIjoiMS4wLjAiLCJpYXQiOjE2Mzk3NDc5MDcsImVtYWlsIjoiaWtiY3lAcGxhaWF1bmRpLm5ldCJ9.fXOiD4Q8EOwsHOow7UarFr99JLaFBJI4-5vdOPNmMevEo6_O6Iz26IceK9Ak0OzRvZ-BuGbYuH7PGfwEynMABv6OS-jav_KBEVbpVx4c78zzEXrt0OmLqILHKiR-wiunqt4z8lhsesjo92O1jmUrmxPOLeb5n8Y4maXW3x8u00CkkA_OIF9I7LlgiMMIiuhDgv7E2fRtdBzWg4sPqe6DindIpgb4ebWB1a297k_OiOSpkDC3y5fcD4bzOGVvLI0FTTwomrQXXxgHINAxG2AjUHeIi9_XwLea5oQy2UIUOyHhl7q3nJ4WEpnp0n33jh8GVmTcujYyHHMXb55We2xfjg';

function fechaHoyEusk() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}/${month}/${day}`;
}

function fechaManana() {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const year = tomorrow.getFullYear();
    const month = String(tomorrow.getMonth() + 1).padStart(2, '0');
    const day = String(tomorrow.getDate()).padStart(2, '0');
    return `${year}${month}${day}`;
}

var fechaHoyEusk = fechaHoyEusk();

var fechaMananaEusk = fechaManana();

async function regionesEuskalmet() {
  try {
    const respuesta = await fetch('https://api.euskadi.eus/euskalmet/weather/regions/basque_country/zones/coast_zone/locations/irun/forecast/at/'+fechaHoyEusk+'/for/'+fechaMananaEusk, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + tokenEuskalmet
      },
    });

    const data = await respuesta.json();

    console.log(data);

    console.log('Temperatura:', data["temperature"].value, 'ºC');
    console.log('Comentario:', data["forecastText"].SPANISH);

   
  } catch (error) {
    console.log('Error al ver los datos:', error);
  }
}

regionesEuskalmet();



