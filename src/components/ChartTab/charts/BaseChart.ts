import { ChartOptions, ChartData } from 'chart.js';
import { Trace } from '../../../types/chart';
import { ChartConfig } from '../../../types/chartConfig';

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
    const limits = this.calculateAxisLimits(this.getChartData([]).datasets);
    
    return {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: this.config.legendPosition || 'top',
          display: this.config.showLegend ?? true
        },
        title: {
          display: true,
          text: this.config.title || 'My Chart',
          position: this.config.titlePosition || 'top',
          font: this.config.titleFontSize ? {
            size: this.config.titleFontSize,
            style: (this.config.titleFontStyle === 'italic' || this.config.titleFontStyle === 'bolditalic') ? 'italic' : 'normal',
            weight: (this.config.titleFontStyle === 'bold' || this.config.titleFontStyle === 'bolditalic') ? 700 : 400
          } : undefined,
          color: this.config.titleColor || undefined
        }
      },
      scales: {
        x: {
          display: true,
          position: this.config.xAxisPosition || 'bottom',
          title: {
            display: true,
            text: this.config.xAxisLabel || 'X Axis',
            font: {
              size: this.config.xAxisFontSize,
              style: (this.config.xAxisFontStyle === 'italic' || this.config.xAxisFontStyle === 'bolditalic') ? 'italic' : 'normal',
              weight: (this.config.xAxisFontStyle === 'bold' || this.config.xAxisFontStyle === 'bolditalic') ? 700 : 400
            },
            color: this.config.xAxisColor
          },
          min: limits.xMin,
          max: limits.xMax,
          ticks: {
            display: this.config.showXTicks ?? true,
            count: this.config.xTicksCount,
            stepSize: this.config.xTicksStep,
            color: this.config.xAxisColor
          },
          grid: {
            display: this.config.showGrid ?? true,
            color: 'rgba(0, 0, 0, 0.1)'
          }
        },
        y: {
          display: true,
          position: this.config.yAxisPosition || 'left',
          title: {
            display: true,
            text: this.config.yAxisLabel || 'Y Axis',
            font: {
              size: this.config.yAxisFontSize,
              style: (this.config.yAxisFontStyle === 'italic' || this.config.yAxisFontStyle === 'bolditalic') ? 'italic' : 'normal',
              weight: (this.config.yAxisFontStyle === 'bold' || this.config.yAxisFontStyle === 'bolditalic') ? 700 : 400
            },
            color: this.config.yAxisColor
          },
          min: limits.yMin,
          max: limits.yMax,
          ticks: {
            display: this.config.showYTicks ?? true,
            count: this.config.yTicksCount,
            stepSize: this.config.yTicksStep,
            color: this.config.yAxisColor
          },
          grid: {
            display: this.config.showGrid ?? true,
            color: 'rgba(0, 0, 0, 0.1)'
          }
        }
      }
    };
  }
}
