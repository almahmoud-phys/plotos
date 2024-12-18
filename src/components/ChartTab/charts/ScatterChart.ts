import { ChartOptions } from 'chart.js';
import { BaseChart } from './BaseChart';
import { Trace } from '../../../types/chart';

export class ScatterChart extends BaseChart {
  protected getDatasetFromTrace(trace: Trace, rowData: any[]) {
    const xData = rowData.map(row => row[trace.xColumn]);
    const yData = rowData.map(row => row[trace.yColumn]);

    // Create x,y coordinate pairs
    const data = xData.map((x, i) => ({ x, y: yData[i] }))
      .sort((a, b) => a.x - b.x);

    return {
      label: `${trace.xColumn} vs ${trace.yColumn}`,
      data,
      borderColor: trace.style.lineColor,
      backgroundColor: trace.style.markerColor,
      borderWidth: trace.style.lineWidth,
      pointStyle: trace.style.markerStyle,
      pointRadius: trace.style.markerSize,
      showLine: false,
    };
  }

  protected override calculateAxisLimits(datasets: any[]): {
    xMin: number;
    xMax: number;
    yMin: number;
    yMax: number;
  } {
    if (!datasets.length || !datasets[0].data.length) {
      return { xMin: -10, xMax: 10, yMin: -10, yMax: 10 };
    }

    let xMin = Number.POSITIVE_INFINITY;
    let xMax = Number.NEGATIVE_INFINITY;
    let yMin = Number.POSITIVE_INFINITY;
    let yMax = Number.NEGATIVE_INFINITY;

    datasets.forEach(dataset => {
      dataset.data.forEach((point: { x: number; y: number }) => {
        xMin = Math.min(xMin, point.x);
        xMax = Math.max(xMax, point.x);
        yMin = Math.min(yMin, point.y);
        yMax = Math.max(yMax, point.y);
      });
    });

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

  public override getChartOptions(dimensions: { width: number; height: number }): ChartOptions<'scatter'> {
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
      }
    };
  }
}
