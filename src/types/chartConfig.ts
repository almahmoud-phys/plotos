export interface ChartAreaBorder {
  display?: boolean;
  color?: string;
  width?: number;
  style?: 'solid' | 'dashed';
  dash?: number[];
  dashOffset?: number;
}

export interface ChartConfig {
  // Title settings
  title?: string;
  titleColor?: string;
  titlePosition?: 'top' | 'bottom';
  titleFontSize?: number;
  titleFontStyle?: 'normal' | 'bold' | 'italic' | 'bolditalic';

  // Chart dimensions
  aspectRatio?: string;
  customWidth?: number;
  customHeight?: number;

  // X-Axis settings
  xAxisLabel?: string;
  xAxisPosition?: 'top' | 'bottom';
  xAxisColor?: string;
  xAxisFontSize?: number;
  xAxisFontStyle?: 'normal' | 'bold' | 'italic' | 'bolditalic';
  showXTicks?: boolean;
  xTicksCount?: number;
  xTicksStep?: number;

  // Y-Axis settings
  yAxisLabel?: string;
  yAxisPosition?: 'left' | 'right';
  yAxisColor?: string;
  yAxisFontSize?: number;
  yAxisFontStyle?: 'normal' | 'bold' | 'italic' | 'bolditalic';
  showYTicks?: boolean;
  yTicksCount?: number;
  yTicksStep?: number;

  // Grid and Legend settings
  // showGrid?: boolean;
  showXGrid?: boolean;
  showYGrid?: boolean;
  showLegend?: boolean;
  
  // Chart Area Border settings
  border?: ChartAreaBorder;
}
