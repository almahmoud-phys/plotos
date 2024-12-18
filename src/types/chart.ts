export interface TraceStyle {
  lineColor: string;
  markerColor: string;
  lineWidth: number;
  lineStyle: string;
  markerStyle: string;
  markerSize: number;
}

export interface Trace {
  id: string;
  type: string;
  xColumn: string;
  yColumn: string;
  style: TraceStyle;
}

export const DEFAULT_TRACE_STYLE: TraceStyle = {
  lineColor: '#1a73e8',
  markerColor: '#1a73e8',
  lineWidth: 2,
  lineStyle: 'solid',
  markerStyle: 'circle',
  markerSize: 6,
};

export interface ChartConfig {
  aspectRatio?: '1:1' | '16:9' | '4:3' | '3:2' | 'custom';
  customWidth?: number;
  customHeight?: number;
  title?: string;
  titleFontSize?: number;
  titleFontStyle?: 'normal' | 'bold' | 'italic' | 'bolditalic';
  titleColor?: string;
  titlePosition?: 'top' | 'bottom';
  legendPosition?: 'top' | 'bottom' | 'left' | 'right';
  xAxisLabel?: string;
  yAxisLabel?: string;
  xAxisColor?: string;
  yAxisColor?: string;
  xAxisPosition?: 'top' | 'bottom';
  yAxisPosition?: 'left' | 'right';
  xAxisFontSize?: number;
  yAxisFontSize?: number;
  xAxisFontStyle?: 'normal' | 'bold' | 'italic' | 'bolditalic';
  yAxisFontStyle?: 'normal' | 'bold' | 'italic' | 'bolditalic';
  xTicksStep?: number;
  yTicksStep?: number;
  xTicksCount?: number;
  yTicksCount?: number;
  showXTicks?: boolean;
  showYTicks?: boolean;
  showGrid?: boolean;
  showLegend?: boolean;
}
