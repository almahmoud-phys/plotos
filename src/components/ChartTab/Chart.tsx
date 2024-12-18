import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
} from 'chart.js';
import { Line, Bar, Scatter } from 'react-chartjs-2';
import { Trace } from '../../types/chart';
import { useAppContext } from '../../context/AppContext';
import { LineChart } from './charts/LineChart';
import { BarChart } from './charts/BarChart';
import { ScatterChart } from './charts/ScatterChart';
import { BaseChart } from './charts/BaseChart';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface ChartProps {
  traces: Trace[];
}

export const Chart: React.FC<ChartProps> = ({ traces }) => {
  const { data, chartConfig } = useAppContext();

  const chartInstance = React.useMemo((): BaseChart => {
    if (!traces.length) {
      return new LineChart([], chartConfig); // default to LineChart for empty state
    }

    switch (traces[0].type) {
      case 'line':
        return new LineChart(traces, chartConfig);
      case 'bar':
        return new BarChart(traces, chartConfig);
      case 'scatter':
        return new ScatterChart(traces, chartConfig);
      default:
        return new LineChart(traces, chartConfig);
    }
  }, [traces, chartConfig]);

  const dimensions = chartInstance.calculateDimensions();
  const chartData = chartInstance.getChartData(data.rowData);
  const options = chartInstance.getChartOptions(dimensions);

  const containerStyle = {
    width: dimensions.width,
    height: dimensions.height,
    maxWidth: '100%',
    maxHeight: '100%'
  };

  return (
    <div style={containerStyle}>
      {traces[0]?.type === 'scatter' ? (
        <Scatter data={chartData as ChartData<'scatter'>} options={options} />
      ) : traces[0]?.type === 'bar' ? (
        <Bar data={chartData as ChartData<'bar'>} options={options} />
      ) : (
        <Line data={chartData as ChartData<'line'>} options={options} />
      )}
    </div>
  );
};
