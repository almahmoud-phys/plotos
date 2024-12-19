import React from "react";
import { TextInput, Select, Rows, ColorSelector, FormField, Columns, Column } from "@canva/app-ui-kit";
import { useAppContext } from "../../../context/AppContext";

interface AxesLabelsProps {
  axis: 'x' | 'y';
}

export const AxesLabels = ({ axis }: AxesLabelsProps) => {
  const { updateChartConfig, chartConfig } = useAppContext();

  const handleChange = (field: string, value: any) => {
    updateChartConfig({
      ...chartConfig,
      [field]: value,
    });
  };

  const renderAxisSettings = () => {
    const axisLabel = axis === 'x' ? 'X Axis' : 'Y Axis';
    const axisPosition = axis === 'x' ? 'bottom' : 'left';
    const axisPositionOptions = axis === 'x' ? [
      { value: "top", label: "Top" },
      { value: "bottom", label: "Bottom" },
    ] : [
      { value: "left", label: "Left" },
      { value: "right", label: "Right" },
    ];

    return (
      <Rows spacing="1u">
        <Columns spacing="1u" align="spaceBetween">
          <Column width="fluid">
            <FormField
              label="Label"
              control={() => (
                <TextInput
                  value={chartConfig[`${axis}AxisLabel`] || axisLabel}
                  onChange={(value) => handleChange(`${axis}AxisLabel`, value)}
                  placeholder={`Enter ${axis.toUpperCase()}-axis label`}
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
                  value={chartConfig[`${axis}AxisPosition`] || axisPosition}
                  onChange={(value) => handleChange(`${axis}AxisPosition`, value)}
                  options={axisPositionOptions}
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
                  color={chartConfig[`${axis}AxisColor`] || "#000000"}
                  onChange={(color) => handleChange(`${axis}AxisColor`, color)}
                />
              )}
            />
          </Column>
          <Column width="fluid">
            <FormField
              label="Font Size"
              control={() => (
                <Select
                  value={chartConfig[`${axis}AxisFontSize`] || 16}
                  onChange={(value) => handleChange(`${axis}AxisFontSize`, value)}
                  options={[
                    { value: 12, label: "12" },
                    { value: 14, label: "14" },
                    { value: 16, label: "16" },
                    { value: 18, label: "18" },
                    { value: 20, label: "20" },
                    { value: 24, label: "24" },
                  ]}
                />
              )}
            />
          </Column>
        </Columns>
      </Rows>
    );
  };

  return (
    <div>
      {renderAxisSettings()}
    </div>
  );
};