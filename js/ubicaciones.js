var horaVer = document.getElementById('hora')

function obtenerHora() {

    var ahora = new Date();

    var horas = ahora.getHours();
    var minutos = ahora.getMinutes();
  
    horas = horas % 12 || 12;
  
    horas = horas < 10 ? '0' + horas : horas;
    minutos = minutos < 10 ? '0' + minutos : minutos;
  
    var horaFormato12 = horas + ':' + minutos;
    
    horaVer.innerHTML = horaFormato12;
  }
  
  // Actualizar la hora cada 15 segundos
  setInterval(obtenerHora, 15000); // 15 segundos = 15000 milisegundos
  
  obtenerHora();
