import { ChartConfig } from "../../../types/chartConfig";

export const handleConfigChange = (
  field: string,
  value: any,
  chartConfig: ChartConfig,
  updateChartConfig: (config: ChartConfig) => void
): void => {
  updateChartConfig({
    ...chartConfig,
    [field]: value,
  });
};

export const handleClearConfig = (
  chartConfig: ChartConfig,
  updateChartConfig: (config: ChartConfig) => void
): void => {
  updateChartConfig({
    ...chartConfig,
    title: "My Chart",
    titleColor: "#000000",
    titlePosition: "top",
    titleFontSize: 16,
    titleFontStyle: "normal",
    aspectRatio: "16:9",
    customWidth: 800,
    customHeight: 600,
    xAxisLabel: "X Axis",
    xAxisPosition: "bottom",
    xAxisColor: "#000000",
    xAxisFontSize: 16,
    showXTicks: true,
    xTicksCount: 0,
    xTicksStep: 0,
    yAxisLabel: "Y Axis",
    yAxisPosition: "left",
    yAxisColor: "#000000",
    yAxisFontSize: 16,
    showYTicks: true,
    yTicksCount: 0,
    yTicksStep: 0,
  });
};
