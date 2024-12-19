import React from "react";
import { Rows, Columns, Column, FormField, Select, NumberInput } from "@canva/app-ui-kit";
import { useAppContext } from "../../../context/AppContext";

export const AxesTicks: React.FC<{ axis: 'x' | 'y' }> = ({ axis }) => {
  const { updateChartConfig, chartConfig } = useAppContext();

  const handleChange = (field: string, value: any) => {
    updateChartConfig({
      ...chartConfig,
      [field]: value,
    });
  };

  const renderTicksSettings = () => (
    <Rows spacing="1u">
      <Columns spacing="1u" align="spaceBetween">
        <Column width="fluid">
          <FormField
            label="Show Ticks"
            control={() => (
              <Select
                value={chartConfig?.[`show${axis.toUpperCase()}Ticks`] === false ? "false" : "true"}
                onChange={(value) => handleChange(`show${axis.toUpperCase()}Ticks`, value === "true")}
                options={[
                  { value: "true", label: "Show" },
                  { value: "false", label: "Hide" },
                ]}
              />
            )}
          />
        </Column>
      </Columns>
      <Columns spacing="1u" align="spaceBetween">
        <Column width="fluid">
          <FormField
            label="Ticks Count"
            control={() => (
              <NumberInput
                value={chartConfig?.[`${axis}TicksCount`] || 0}
                onChange={(value) => handleChange(`${axis}TicksCount`, value)}
                min={0}
                max={50}
                placeholder="Auto"
              />
            )}
          />
        </Column>
        <Column width="fluid">
          <FormField
            label="Ticks Step"
            control={() => (
              <NumberInput
                value={chartConfig?.[`${axis}TicksStep`] || 0}
                onChange={(value) => handleChange(`${axis}TicksStep`, value)}
                min={0}
                max={50}
                placeholder="Auto"
              />
            )}
          />
        </Column>
      </Columns>
    </Rows>
  );

  return renderTicksSettings();
};