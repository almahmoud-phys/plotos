import React from "react";
import { Rows, Columns, Column, FormField, Select } from "@canva/app-ui-kit";
import { useAppContext } from "../../../context/AppContext";

export const AxesLegends: React.FC = () => {
  const { updateChartConfig, chartConfig } = useAppContext();

  const handleChange = (field: string, value: any) => {
    updateChartConfig({
      ...chartConfig,
      [field]: value,
    });
  };

  return (
    <Rows spacing="1u">
      <Columns spacing="1u" align="spaceBetween">
        <Column width="fluid">
          <FormField
            label="Show Legend"
            control={() => (
              <Select
                value={chartConfig?.showLegend === false ? "false" : "true"}
                onChange={(value) => handleChange("showLegend", value === "true")}
                options={[
                  { value: "true", label: "Show" },
                  { value: "false", label: "Hide" },
                ]}
              />
            )}
          />
        </Column>
      </Columns>
    </Rows>
  );
};