import { Card, CardContent } from '@/components/ui/card';
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

// Register chart components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChartComponent = ({data}:any) => {
  // Fixed the label for 2nd week and ensured data matches the labels
  const labels = [data?.all_feedback?.label, data?.all_feedback?.label, data?.all_feedback?.label];
  const dataChart = {
    labels: labels,
    datasets: [
      {
        data: [data?.all_feedback?.total, data?.all_feedback?.total, data?.all_feedback?.total], // Removed the label
        backgroundColor: [
          '#E9E9EA',
          '#D2D2D5',
          '#0068EF',
        ],
        borderWidth: 0,
        borderRadius: 4, // Adding rounded corners to the bars
      },
    ],
  };

  // Configuration for the chart
  const options = {
    responsive: true,
    plugins: {
      title: {
        display: false, // Hide title in the chart header
      },
      legend: {
        display: false, // Hide the legend
      },
    },
    maintainAspectRatio: false, // This allows setting a fixed height
    scales: {
      x: {
        display: false, // Hide x-axis labels
      },
      y: {
        display: false, // Hide y-axis labels
      },
    },
  };

  // Percentage data and progress bar calculation
  const percentage = data?.all_feedback?.change_percentage;
  const progress = percentage > 0 ? percentage : 0; // Ensure positive value

  return (
    <Card className="py-4 px-6  bg-bgColor border-0 rounded-lg shadow-none">
      <CardContent className='px-0'>
        <div className="flex justify-between items-center shadow-none">
          <div className="">
            <h4 className="lg:text-3xl text-xl font-medium">{data?.all_feedback?.total}</h4>
             <p className=' mt-3 text-sm text-descriptionColor'>All Feedback</p>
          </div>
          <div>
            <div style={{ height: '80px', width: '100px' }}>
              <Bar data={dataChart} options={options} />
            </div>
            <div>
              <div className="flex items-center text-xs mt-2"> <p className='text-green-500 '>{progress}%</p> <span>vs last week</span> </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BarChartComponent;
