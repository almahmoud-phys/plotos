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

interface GridConfig {
  display?: boolean;
  drawOnChartArea?: boolean;
  drawTicks?: boolean;
  color?: string;
}

interface AxisConfig {
  display?: boolean;
  position?: 'top' | 'bottom' | 'left' | 'right';
  grid?: GridConfig;
  title?: {
    display?: boolean;
    text?: string;
    font?: {
      size?: number;
      style?: 'normal' | 'italic';
      weight?: number;
    };
    color?: string;
  };
  ticks?: {
    display?: boolean;
    count?: number;
    stepSize?: number;
    color?: string;
  };
}

interface ScalesConfig {
  x?: AxisConfig;
  y?: AxisConfig;
}

interface BorderConfig {
  display?: boolean;
  color?: string;
  width?: number;
  style?: 'solid' | 'dashed';
  dash?: number[];
  dashOffset?: number;
}

export interface ChartConfig {
  aspectRatio?: '1:1' | '16:9' | '4:3' | '3:2' | 'custom';
  customWidth?: number;
  customHeight?: number;
  title?: string;
  titleFontSize?: number;
  titleFontStyle?: 'normal' | 'bold' | 'italic';
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
  showXGrid?: boolean;
  showYGrid?: boolean;
  showLegend?: boolean;
  scales?: ScalesConfig;
  border?: BorderConfig;
}
