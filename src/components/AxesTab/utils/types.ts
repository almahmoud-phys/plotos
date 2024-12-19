import { ChartConfig } from "../../../types/chartConfig";

export interface VisibilityState {
  title: boolean;
  xAxis: boolean;
  xTicks: boolean;
  yAxis: boolean;
  yTicks: boolean;
  grid: boolean;
  legend: boolean;
}

export interface AxesTabProps {
  chartConfig: ChartConfig;
  updateChartConfig: (config: ChartConfig) => void;
}
