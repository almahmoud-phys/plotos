import { ChartOptions, ChartData } from 'chart.js';
import { Trace } from '../../../types/chart';
import { ChartConfig, ChartAreaBorder } from '../../../types/chartConfig';
import { chartAreaBorder } from './plugins/chartAreaBorder';

export type ChartDimensions = {
  width: number;
  height: number;
};

export type DataPoint = {
  x: number;
  y: number;
};

export abstract class BaseChart {
  protected traces: Trace[];
  protected config: ChartConfig;

  constructor(traces: Trace[], config: ChartConfig) {
    this.traces = traces;
    this.config = config;
  }

  protected abstract getDatasetFromTrace(trace: Trace, rowData: any[]): any;

  public getChartData(rowData: any[]): ChartData {
    if (!this.traces.length) {
      return {
        datasets: [{
          label: 'No data',
          data: [],
          borderColor: '#cccccc',
          backgroundColor: '#cccccc',
        }]
      };
    }

    return {
      datasets: this.traces.map(trace => this.getDatasetFromTrace(trace, rowData)),
    };
  }

  public calculateDimensions(): ChartDimensions {
    const maxWidth = 800;
    const maxHeight = 600;
    let width = maxWidth;
    let height = maxHeight;

    switch (this.config?.aspectRatio) {
      case '1:1':
        width = height = Math.min(maxWidth, maxHeight);
        break;
      case '16:9': {
        const heightFrom16_9 = Math.round(width * (9/16));
        if (heightFrom16_9 > maxHeight) {
          height = maxHeight;
          width = Math.round(height * (16/9));
        } else {
          height = heightFrom16_9;
        }
        break;
      }
      case '4:3': {
        const heightFrom4_3 = Math.round(width * (3/4));
        if (heightFrom4_3 > maxHeight) {
          height = maxHeight;
          width = Math.round(height * (4/3));
        } else {
          height = heightFrom4_3;
        }
        break;
      }
      case '3:2': {
        const heightFrom3_2 = Math.round(width * (2/3));
        if (heightFrom3_2 > maxHeight) {
          height = maxHeight;
          width = Math.round(height * (3/2));
        } else {
          height = heightFrom3_2;
        }
        break;
      }
      case 'custom':
        width = this.config.customWidth || maxWidth;
        height = this.config.customHeight || maxHeight;
        // Ensure custom dimensions don't exceed max bounds
        if (width > maxWidth || height > maxHeight) {
          const scale = Math.min(maxWidth / width, maxHeight / height);
          width = Math.round(width * scale);
          height = Math.round(height * scale);
        }
        break;
      default:
        // Default to 16:9
        height = Math.round(width * (9/16));
    }

    return { width, height };
  }

  protected abstract calculateAxisLimits(datasets: any[]): {
    xMin: number;
    xMax: number;
    yMin: number;
    yMax: number;
  };

  public getChartOptions(dimensions: { width: number; height: number }): ChartOptions<'line' | 'bar' | 'scatter'> {
    const options: ChartOptions<'line' | 'bar' | 'scatter'> = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top',
          display: this.config.showLegend ?? true
        },
        title: {
          display: true,
          text: this.config.title || 'My Chart',
          position: this.config.titlePosition || 'top',
          font: this.config.titleFontSize ? {
            size: this.config.titleFontSize,
            style: this.config.titleFontStyle === 'italic' ? 'italic' : 'normal',
            weight: this.config.titleFontStyle === 'bold' ? 700 : 400
          } : undefined,
          color: this.config.titleColor || undefined
        },
        chartAreaBorder: this.config.border as ChartAreaBorder ?? {
          display: false,
          color: '#000000',
          width: 1,
          style: 'solid'
        },
      },
      scales: {
        x: {
          type: 'linear' as const,
          display: true,
          position: this.config.xAxisPosition || 'bottom',
          title: {
            display: true,
            text: this.config.xAxisLabel || 'X Axis',
            font: {
              size: this.config.xAxisFontSize,
              style: (this.config.xAxisFontStyle === 'italic') ? 'italic' : 'normal',
              weight: (this.config.xAxisFontStyle === 'bold') ? 700 : 400
            },
            color: this.config.xAxisColor
          },
          min: this.calculateAxisLimits(this.getChartData([]).datasets).xMin,
          max: this.calculateAxisLimits(this.getChartData([]).datasets).xMax,
          ticks: {
            display: this.config.showXTicks ?? true,
            count: this.config.xTicksCount,
            stepSize: this.config.xTicksStep,
            color: this.config.xAxisColor
          },
          grid: {
            display: this.config.showXGrid ?? false,
            drawTicks: false,
            color: 'rgba(0, 0, 0, 0.1)'
          }
        },
        y: {
          type: 'linear' as const,
          display: true,
          position: this.config.yAxisPosition || 'left',
          title: {
            display: true,
            text: this.config.yAxisLabel || 'Y Axis',
            font: {
              size: this.config.yAxisFontSize,
              style: (this.config.yAxisFontStyle === 'italic') ? 'italic' : 'normal',
              weight: (this.config.yAxisFontStyle === 'bold') ? 700 : 400
            },
            color: this.config.yAxisColor
          },
          min: this.calculateAxisLimits(this.getChartData([]).datasets).yMin,
          max: this.calculateAxisLimits(this.getChartData([]).datasets).yMax,
          ticks: {
            display: this.config.showYTicks ?? true,
            count: this.config.yTicksCount,
            stepSize: this.config.yTicksStep,
            color: this.config.yAxisColor
          },
          grid: {
            display: this.config.showYGrid ?? false,
            drawTicks: false,
            color: 'rgba(0, 0, 0, 0.1)'
          }
        }
      }
    };

    return options;
  }

  public getPlugins() {
    return [chartAreaBorder];
  }
}
