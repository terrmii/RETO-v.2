// const tokenEuskalmet = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJtZXQwMS5hcGlrZXkiLCJpc3MiOiJJRVMgUExBSUFVTkRJIEJISSBJUlVOIiwiZXhwIjoyMjM4MTMxMDAyLCJ2ZXJzaW9uIjoiMS4wLjAiLCJpYXQiOjE2Mzk3NDc5MDcsImVtYWlsIjoiaWtiY3lAcGxhaWF1bmRpLm5ldCJ9.fXOiD4Q8EOwsHOow7UarFr99JLaFBJI4-5vdOPNmMevEo6_O6Iz26IceK9Ak0OzRvZ-BuGbYuH7PGfwEynMABv6OS-jav_KBEVbpVx4c78zzEXrt0OmLqILHKiR-wiunqt4z8lhsesjo92O1jmUrmxPOLeb5n8Y4maXW3x8u00CkkA_OIF9I7LlgiMMIiuhDgv7E2fRtdBzWg4sPqe6DindIpgb4ebWB1a297k_OiOSpkDC3y5fcD4bzOGVvLI0FTTwomrQXXxgHINAxG2AjUHeIi9_XwLea5oQy2UIUOyHhl7q3nJ4WEpnp0n33jh8GVmTcujYyHHMXb55We2xfjg';

// async function regionesEuskalmet() {
//   try {
//     const respuesta = await fetch('https://api.euskadi.eus/euskalmet/geo/regions/basque_country/zones/', {
//       method: 'GET',
//       headers: {
//         'Authorization': 'Bearer ' + tokenEuskalmet
//       },
//     });

//     const data = await respuesta.json();

//     // Verificar si la respuesta tiene el formato esperado
//     if (Array.isArray(data) && data.length > 0 && data[0].hasOwnProperty('regionZoneId')) {
//       // Extraer los valores de regionZoneId y almacenarlos en un array
//       const regionZoneIds = data.map(obj => obj.regionZoneId);

//       // Imprimir el array resultante
//       console.log(regionZoneIds);
//     } else {
//       console.log('La respuesta de la API no tiene el formato esperado.');
//     }
//   } catch (error) {
//     console.log('Error al ver los datos:', error);
//   }
// }


// // Llamar a la función
// // regionesEuskalmet();

// async function obtenerDatosPorZona() {
  
//     // Lista de zonas
//     const zonas = [
//       'cantabrian_mountains',
//       'cantabrian_valleys',
//       'coast_zone',
//       'donostialdea',
//       'ebro_valley',
//       'great_bilbao',
//       'interior_basins',
//       'pyrenees',
//       'southern_mountain',
//       'vitoria_gasteiz'
//     ];
  
//     // Objeto para almacenar las respuestas por zona
//     const respuestasPorZona = {};
  
//     // Realizar llamadas para cada zona
//     for (const zona of zonas) {
//       try {
//         const respuesta = await fetch(`https://api.euskadi.eus/euskalmet/geo/regions/basque_country/zones/${zona}/locations`, {
//           method: 'GET',
//           headers: {
//             'Authorization': 'Bearer ' + tokenEuskalmet
//           },
//         });
  
//         const data = await respuesta.json();
  
//         // Guardar la respuesta en el objeto con la clave como "regionZoneLocationId"
//         respuestasPorZona[zona] = data;

//         let i = 0;
//         for(var infor of data){
//             for(var nombres of nombresUbicaciones){

//                 if(infor["regionZoneLocationId"] == nombres){
//                     console.log('si');
//                 }else{
//                     console.log('no');
//                 }
//             }
                
//             console.log(`Datos para la zona ${zona}:`, infor["regionZoneLocationId"]);
//             console.log(nombres);
//         }
        
//         console.log(`Datos para la zona ${zona}:`, data[0]["regionZoneLocationId"]);
//       } catch (error) {
//         console.log(`Error al obtener datos para la zona ${zona}:`, error);
//       }
//     }
  
//     // Imprimir el objeto con todas las respuestas
//     console.log('Respuestas por zona:', respuestasPorZona);
//   }
  

  
//     setTimeout(() => {
//         obtenerDatosPorZona();
//     }, 4010); 

