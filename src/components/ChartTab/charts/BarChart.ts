import { ChartOptions } from 'chart.js';
import { BaseChart } from './BaseChart';
import { Trace } from '../../../types/chart';

export class BarChart extends BaseChart {
  protected getDatasetFromTrace(trace: Trace, rowData: any[]) {
    const xData = rowData.map(row => row[trace.xColumn]);
    const yData = rowData.map(row => row[trace.yColumn]);

    // Create sorted pairs of x and y values
    const sortedPairs = xData.map((x, i) => ({ x, y: yData[i] }))
      .sort((a, b) => a.x - b.x);

    return {
      label: `${trace.xColumn} vs ${trace.yColumn}`,
      data: sortedPairs.map(pair => pair.y),
      borderColor: trace.style.lineColor,
      backgroundColor: trace.style.markerColor,
      borderWidth: trace.style.lineWidth,
      barThickness: trace.style.markerSize,
    };
  }

  public getChartData(rowData: any[]) {
    if (!this.traces.length) {
      return super.getChartData(rowData);
    }

    // Get x values from the first trace and sort them
    const xData = rowData.map(row => row[this.traces[0].xColumn]);
    const xLabels = [...new Set(xData)].sort((a, b) => a - b);

    return {
      labels: xLabels,
      datasets: this.traces.map(trace => this.getDatasetFromTrace(trace, rowData)),
    };
  }

  public getChartOptions(dimensions: { width: number; height: number }): ChartOptions<'bar'> {
    return {
      ...super.getChartOptions({ width: dimensions.width, height: dimensions.height }),
      scales: {
        ...super.getChartOptions({ width: dimensions.width, height: dimensions.height }).scales,
        x: {
          ...super.getChartOptions({ width: dimensions.width, height: dimensions.height }).scales?.x,
          type: 'category',
        },
        y: {
          ...super.getChartOptions({ width: dimensions.width, height: dimensions.height }).scales?.y,
          beginAtZero: true,
        }
      }
    };
  }
}
