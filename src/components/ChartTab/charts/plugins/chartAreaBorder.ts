import { Plugin, ChartType } from 'chart.js';

declare module 'chart.js' {
  interface PluginOptionsByType<TType extends ChartType> {
    chartAreaBorder?: {
      display?: boolean;
      color?: string;
      width?: number;
      style?: string;
      dash?: number[];
      dashOffset?: number;
    };
  }
}

export const chartAreaBorder: Plugin = {
  id: 'chartAreaBorder',
  beforeDraw(chart, args, options) {
    const { ctx, chartArea: { left, top, width, height } } = chart;

    if (!options.display) {
      return;
    }

    ctx.save();
    ctx.strokeStyle = options.color;
    ctx.lineWidth = options.width;
    
    if (options.style === 'dashed' && options.dash) {
      ctx.setLineDash(options.dash);
      ctx.lineDashOffset = options.dashOffset || 0;
    }
    
    ctx.strokeRect(left, top, width, height);
    ctx.restore();
  }
};
