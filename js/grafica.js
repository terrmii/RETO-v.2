new Chart(document.getElementById("bar-chart"), {
  type: 'bar',
  data: {
    labels: ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo"],
    datasets: [
      {
        label: "Temperatura",
        backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"],
        data: [12,10,11,15,8,10,14]
      }
    ]
  },
  options: {
    legend: { display: true },
    title: {
      display: true,
      text: 'Temperaturas de la ultima semana'
    }
  }
});