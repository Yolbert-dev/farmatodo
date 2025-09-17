// 1. Importamos Chart.js y sus componentes necesarios desde la dependencia instalada.
// El '/auto' es importante porque registra todos los componentes que necesitas (escalas, tipos de gráfica, etc.)
import Chart from 'chart.js/auto';

// 2. Creamos y exportamos una función para la gráfica de líneas (Actividades)
export function renderActivityChart() {
  const activityCtx = document.getElementById('activityChart')?.getContext('2d');
  if (!activityCtx) return; // Si no encuentra el canvas, no hace nada

  const gradient = activityCtx.createLinearGradient(0, 0, 0, 300);
  gradient.addColorStop(0, 'rgba(59, 130, 246, 0.5)');
  gradient.addColorStop(1, 'rgba(59, 130, 246, 0)');

  new Chart(activityCtx, {
    type: 'line',
    data: {
      labels: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'],
      datasets: [{
        label: 'Tareas Completadas',
        data: [12, 19, 15, 25, 22, 30, 26], // Datos de ejemplo
        backgroundColor: gradient,
        borderColor: '#3B82F6',
        borderWidth: 3,
        pointBackgroundColor: '#3B82F6',
        pointRadius: 5,
        tension: 0.4,
        fill: true,
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: { y: { beginAtZero: true } },
      plugins: { legend: { display: false } }
    }
  });
}

// 3. Creamos y exportamos una función para la gráfica de torta (Tipos de Tarea)
export function renderTaskTypeChart() {
  const taskTypeCtx = document.getElementById('taskTypeChart')?.getContext('2d');
  if (!taskTypeCtx) return; // Si no encuentra el canvas, no hace nada

  new Chart(taskTypeCtx, {
    type: 'doughnut',
    data: {
      labels: ['Inventario', 'Ventas', 'Limpieza', 'Administrativo'],
      datasets: [{
        label: 'Distribución de Tareas',
        data: [300, 150, 100, 80], // Datos de ejemplo
        backgroundColor: ['#00539F', '#3B82F6', '#60A5FA', '#93C5FD'],
        borderColor: '#fff',
        borderWidth: 4,
        hoverOffset: 10
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { position: 'bottom' } }
    }
  });
}
