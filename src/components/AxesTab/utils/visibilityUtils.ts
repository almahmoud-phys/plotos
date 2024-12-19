import { ChartConfig } from "../../../types/chartConfig";
import { VisibilityState } from "./types";

export const initialVisibilityState: VisibilityState = {
  title: true,
  xAxis: true,
  xTicks: true,
  yAxis: true,
  yTicks: true,
  grid: true,
  legend: true
};

export const toggleVisibility = (
  key: keyof VisibilityState,
  visibility: VisibilityState,
  chartConfig: ChartConfig,
  updateChartConfig: (config: ChartConfig) => void
): VisibilityState => {
  const newVisibility = {
    ...visibility,
    [key]: !visibility[key]
  };

  updateChartConfig({
    ...chartConfig,
    [`show${key.charAt(0).toUpperCase() + key.slice(1)}`]: !visibility[key]
  });

  return newVisibility;
};
