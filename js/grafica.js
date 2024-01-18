// Graficas
const ctx = document.getElementById('myChart');

Chart.defaults.font.family = 'Work Sans';

new Chart(ctx, {
  type: 'line',
  data: {
    labels: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'],
    datasets: [{
      label: 'Precipitación',
      data: [12, 19, 3, 5, 2, 3],
      borderWidth: 1,
    }]
  },
  options: {
    scales: {
      x: {
        ticks: {
          color: 'black',
          font: {
            size: 12,
            family: 'Work Sans',
            weight: 200  
          },
          textShadow: '0 0 4px rgb(3, 3, 3)'
        }
      },
      y: {
        beginAtZero: true,
        ticks: {
          color: 'black',
          font: {
            size: 14,
            family: 'Work Sans',
            weight: 200  
          },
          textShadow: '0 0 4px rgb(3, 3, 3)'
        }
      }
    },
    plugins: {
      legend: { 
        labels: {
          color: 'black',
          fontSize: 14,
          fontFamily: 'Work Sans',
          textShadow: '0 0 4px rgb(3, 3, 3)',
          fontStyle: 'light'
        }
      } 
    }
  }
})