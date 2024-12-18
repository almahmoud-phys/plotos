import { ChartOptions, ChartDataset } from 'chart.js';
import { BaseChart } from './BaseChart';
import { Trace } from '../../../types/chart';

export class LineChart extends BaseChart {
  rowData!: any[];
  protected getDatasetFromTrace(trace: Trace, rowData: any[]): ChartDataset<'line'> {
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
      pointStyle: trace.style.markerStyle,
      pointRadius: trace.style.markerSize,
      showLine: true,
    };
  }

  public override getChartData(rowData: any[]) {
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

  protected override calculateAxisLimits(datasets: ChartDataset<'line'>[]): {
    xMin: number;
    xMax: number;
    yMin: number;
    yMax: number;
  } {
    if (!datasets.length || !datasets[0].data.length) {
      return { xMin: -10, xMax: 10, yMin: -10, yMax: 10 };
    }

    let yMin = Number.POSITIVE_INFINITY;
    let yMax = Number.NEGATIVE_INFINITY;

    // Process y-values from all datasets
    datasets.forEach(dataset => {
      const yValues = dataset.data as number[];
      yValues.forEach(y => {
        if (y !== null && !isNaN(y)) {
          yMin = Math.min(yMin, y);
          yMax = Math.max(yMax, y);
        }
      });
    });

    // Get x-values from labels
    const xValues = (this.getChartData(this.rowData).labels as number[]) || [];
    const xMin = Math.min(...xValues);
    const xMax = Math.max(...xValues);

    // Add 10% padding to the limits
    const xPadding = (xMax - xMin) * 0.1;
    const yPadding = (yMax - yMin) * 0.1;

    return {
      xMin: xMin - xPadding,
      xMax: xMax + xPadding,
      yMin: yMin - yPadding,
      yMax: yMax + yPadding
    };
  }

  public override getChartOptions(dimensions: { width: number; height: number }): ChartOptions<'line'> {
    return {
      ...super.getChartOptions({ width: dimensions.width, height: dimensions.height }),
      scales: {
        x: {
          type: 'linear',
          display: true,
          position: this.config.xAxisPosition || 'bottom',
          title: {
            display: true,
            text: this.config.xAxisLabel || 'X Axis'
          }
        },
        y: {
          type: 'linear',
          display: true,
          position: this.config.yAxisPosition || 'left',
          title: {
            display: true,
            text: this.config.yAxisLabel || 'Y Axis'
          }
        }
      },
      elements: {
        line: {
          tension: 0.4
        }
      }
    };
  }
}
