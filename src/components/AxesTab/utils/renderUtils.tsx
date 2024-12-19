import React from "react";
import { TextInput, Select, Rows, ColorSelector, FormField, NumberInput, Columns, Column } from "@canva/app-ui-kit";
import { ChartConfig } from "../../../types/chartConfig";
import { handleConfigChange } from "./configUtils";
import { VisibilityState } from "./types";

// Default values
const DEFAULT_VALUES = {
  TITLE: "My Chart",
  COLOR: "#000000",
  FONT_SIZE: 16,
  FONT_STYLE: "normal",
  MIN_TICKS: 0,
  MAX_TICKS: 50,
  TICK_STEP: 0.1,
} as const;

// Type for axis-specific properties
type AxisType = "x" | "y";

interface AxisConfig {
  label: string;
  positions: Array<{ value: string; label: string }>;
  defaultPosition: string;
}

const AXIS_CONFIGS: Record<AxisType, AxisConfig> = {
  x: {
    label: "X",
    positions: [
      { value: "top", label: "Top" },
      { value: "bottom", label: "Bottom" },
    ],
    defaultPosition: "bottom",
  },
  y: {
    label: "Y",
    positions: [
      { value: "left", label: "Left" },
      { value: "right", label: "Right" },
    ],
    defaultPosition: "left",
  },
};

const FONT_SIZES = [
  { value: 12, label: "12" },
  { value: 14, label: "14" },
  { value: 16, label: "16" },
  { value: 18, label: "18" },
  { value: 20, label: "20" },
  { value: 24, label: "24" },
];

const FONT_STYLES = [
  { value: "normal", label: "Normal" },
  { value: "bold", label: "Bold" },
  { value: "italic", label: "Italic" },
];

const VISIBILITY_OPTIONS = [
  { value: "true", label: "Show" },
  { value: "false", label: "Hide" },
];

export const renderTitleSettings = (
  chartConfig: ChartConfig,
  updateChartConfig: (config: ChartConfig) => void
) => {
  const handleChange = <K extends keyof ChartConfig>(key: K, value: ChartConfig[K]) => {
    handleConfigChange(key, value, chartConfig, updateChartConfig);
  };

  return (
    <Rows spacing="1u">
      <Columns spacing="1u" align="spaceBetween">
        <Column width="containedContent">
          <FormField
            label="Text"
            control={() => (
              <TextInput
                value={chartConfig.title || DEFAULT_VALUES.TITLE}
                onChange={(value) => handleChange("title", value)}
                placeholder="Enter title"
              />
            )}
          />
        </Column>
      </Columns>
      <Columns spacing="1u" align="spaceBetween">
        <Column width="fluid">
          <FormField
            label="Color"
            control={() => (
              <ColorSelector
                color={chartConfig.titleColor || DEFAULT_VALUES.COLOR}
                onChange={(color) => handleChange("titleColor", color)}
              />
            )}
          />
        </Column>
        <Column width="fluid">
          <FormField
            label="Position"
            control={() => (
              <Select
                value={chartConfig.titlePosition || "top"}
                onChange={(value) => handleChange("titlePosition", value as "top" | "bottom")}
                options={[
                  { value: "top", label: "Top" },
                  { value: "bottom", label: "Bottom" },
                ]}
              />
            )}
          />
        </Column>
      </Columns>
      <Columns spacing="1u" align="spaceBetween">
        <Column width="fluid">
          <FormField
            label="Font Size"
            control={() => (
              <Select
                value={chartConfig.titleFontSize || DEFAULT_VALUES.FONT_SIZE}
                onChange={(value) => handleChange("titleFontSize", Number(value))}
                options={FONT_SIZES}
              />
            )}
          />
        </Column>
        <Column width="fluid">
          <FormField
            label="Font Style"
            control={() => (
              <Select
                value={chartConfig.titleFontStyle || DEFAULT_VALUES.FONT_STYLE}
                onChange={(value) => handleChange("titleFontStyle", value as "normal" | "bold" | "italic")}
                options={FONT_STYLES}
              />
            )}
          />
        </Column>
      </Columns>
    </Rows>
  );
};

export const renderAxisSettings = (
  type: AxisType,
  chartConfig: ChartConfig,
  updateChartConfig: (config: ChartConfig) => void
) => {
  const axisConfig = AXIS_CONFIGS[type];
  const handleChange = <K extends keyof ChartConfig>(key: K, value: ChartConfig[K]) => {
    handleConfigChange(key, value, chartConfig, updateChartConfig);
  };

  return (
    <Rows spacing="1u">
      <Columns spacing="1u" align="spaceBetween">
        <Column width="fluid">
          <FormField
            label="Label"
            control={() => (
              <TextInput
                value={chartConfig[`${type}AxisLabel`] || `${axisConfig.label} Axis`}
                onChange={(value) => handleChange(`${type}AxisLabel` as keyof ChartConfig, value)}
                placeholder={`Enter ${axisConfig.label}-axis label`}
              />
            )}
          />
        </Column>
      </Columns>
      <Columns spacing="1u" align="spaceBetween">
        <Column width="fluid">
          <FormField
            label="Position"
            control={() => (
              <Select
                value={chartConfig[`${type}AxisPosition`] || axisConfig.defaultPosition}
                onChange={(value) => handleChange(`${type}AxisPosition` as keyof ChartConfig, value)}
                options={axisConfig.positions}
              />
            )}
          />
        </Column>
      </Columns>
      <Columns spacing="1u" align="spaceBetween">
        <Column width="fluid">
          <FormField
            label="Color"
            control={() => (
              <ColorSelector
                color={chartConfig[`${type}AxisColor`] || DEFAULT_VALUES.COLOR}
                onChange={(color) => handleChange(`${type}AxisColor` as keyof ChartConfig, color)}
              />
            )}
          />
        </Column>
        <Column width="fluid">
          <FormField
            label="Font Size"
            control={() => (
              <Select
                value={chartConfig[`${type}AxisFontSize`] || DEFAULT_VALUES.FONT_SIZE}
                onChange={(value) => handleChange(`${type}AxisFontSize` as keyof ChartConfig, Number(value))}
                options={FONT_SIZES}
              />
            )}
          />
        </Column>
      </Columns>
    </Rows>
  );
};

export const renderTicksSettings = (
  type: AxisType,
  chartConfig: ChartConfig,
  updateChartConfig: (config: ChartConfig) => void
) => {
  const handleChange = <K extends keyof ChartConfig>(key: K, value: ChartConfig[K]) => {
    handleConfigChange(key, value, chartConfig, updateChartConfig);
  };

  const showTicks = chartConfig[`show${type.toUpperCase()}Ticks`];

  return (
    <Rows spacing="1u">
      <Columns spacing="1u" align="spaceBetween">
        <Column width="fluid">
          <FormField
            label="Show Ticks"
            control={() => (
              <Select
                value={showTicks === false ? "false" : "true"}
                onChange={(value) =>
                  handleChange(`show${type.toUpperCase()}Ticks` as keyof ChartConfig, value === "true")
                }
                options={VISIBILITY_OPTIONS}
              />
            )}
          />
        </Column>
      </Columns>
      {showTicks !== false && (
        <>
          <Columns spacing="1u" align="spaceBetween">
            <Column width="fluid">
              <FormField
                label="Ticks Count"
                control={() => (
                  <NumberInput
                    value={chartConfig[`${type}TicksCount`]}
                    onChange={(value) => handleChange(`${type}TicksCount` as keyof ChartConfig, value)}
                    min={DEFAULT_VALUES.MIN_TICKS}
                    max={DEFAULT_VALUES.MAX_TICKS}
                    placeholder="Auto"
                  />
                )}
              />
            </Column>
          </Columns>
          <Columns spacing="1u" align="spaceBetween">
            <Column width="fluid">
              <FormField
                label="Ticks Step"
                control={() => (
                  <NumberInput
                    value={chartConfig[`${type}TicksStep`]}
                    onChange={(value) => handleChange(`${type}TicksStep` as keyof ChartConfig, value)}
                    min={DEFAULT_VALUES.MIN_TICKS}
                    step={DEFAULT_VALUES.TICK_STEP}
                    placeholder="Auto"
                  />
                )}
              />
            </Column>
          </Columns>
        </>
      )}
    </Rows>
  );
};

export const renderGridSettings = (
  chartConfig: ChartConfig,
  updateChartConfig: (config: ChartConfig) => void
) => {
  const handleChange = <K extends keyof ChartConfig>(key: K, value: ChartConfig[K]) => {
    handleConfigChange(key, value, chartConfig, updateChartConfig);
  };

  return (
    <Rows spacing="1u">
      <Columns spacing="1u" align="spaceBetween">
        <Column width="fluid">
          <FormField
            label="Show Grid"
            control={() => (
              <Select
                value={chartConfig.showGrid === false ? "false" : "true"}
                onChange={(value) => handleChange("showGrid", value === "true")}
                options={VISIBILITY_OPTIONS}
              />
            )}
          />
        </Column>
      </Columns>
    </Rows>
  );
};

export const renderLegendSettings = (
  chartConfig: ChartConfig,
  updateChartConfig: (config: ChartConfig) => void
) => {
  const handleChange = <K extends keyof ChartConfig>(key: K, value: ChartConfig[K]) => {
    handleConfigChange(key, value, chartConfig, updateChartConfig);
  };

  return (
    <Rows spacing="1u">
      <Columns spacing="1u" align="spaceBetween">
        <Column width="fluid">
          <FormField
            label="Show Legend"
            control={() => (
              <Select
                value={chartConfig.showLegend === false ? "false" : "true"}
                onChange={(value) => handleChange("showLegend", value === "true")}
                options={VISIBILITY_OPTIONS}
              />
            )}
          />
        </Column>
      </Columns>
    </Rows>
  );
};
