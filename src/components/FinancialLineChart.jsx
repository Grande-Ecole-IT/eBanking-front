import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';

// Enregistrer les composants nécessaires
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const FinancialLineChart = () => {
  // Données de démonstration
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [
      {
        label: 'Revenus',
        data: [6500, 5900, 8000, 8100, 5600, 5500, 4000],
        borderColor: '#155dfc', // Vert pour les revenus
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        tension: 0.4,
        fill: true,
        borderWidth: 2,
        pointRadius: 3,
        pointBackgroundColor: '#155dfc'
      },
      {
        label: 'Dépenses',
        data: [4000, 4200, 5000, 4500, 4800, 5200, 6000],
        borderColor: '#EF4444', // Rouge pour les dépenses
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        tension: 0.4,
        fill: true,
        borderWidth: 2,
        pointRadius: 3,
        pointBackgroundColor: '#EF4444'
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          usePointStyle: true,
          padding: 20
        }
      },
      tooltip: {
        mode: 'index',
        intersect: false
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          drawBorder: false
        },
        ticks: {
          callback: (value) => `$${value}`
        }
      },
      x: {
        grid: {
          display: false
        }
      }
    }
  };

  return (
    <div className="bg-white w-full h-72 rounded-3xl my-6 p-4 shadow-sm">
      <div className="h-full w-full">
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default FinancialLineChart;