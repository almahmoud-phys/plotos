import React from "react";
import { TextInput, Select, Rows, ColorSelector, FormField, Columns, Column } from "@canva/app-ui-kit";
import { useAppContext } from "../../../context/AppContext";

export const AxesTitle: React.FC = () => {
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
        <Column width="containedContent">
          <FormField
            label="Text"
            control={() => (
              <TextInput
                value={chartConfig?.title || "My Chart"}
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
                color={chartConfig?.titleColor || "#000000"}
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
                value={chartConfig?.titlePosition || "top"}
                onChange={(value) => handleChange("titlePosition", value)}
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
                value={chartConfig?.titleFontSize || 16}
                onChange={(value) => handleChange("titleFontSize", value)}
                options={[
                  { value: 12, label: "12" },
                  { value: 16, label: "16" },
                  { value: 20, label: "20" },
                  { value: 24, label: "24" },
                  { value: 30, label: "30" },
                ]}
              />
            )}
          />
        </Column>
        <Column width="fluid">
          <FormField
            label="Font Style"
            control={() => (
              <Select
                value={chartConfig?.titleFontStyle || "normal"}
                onChange={(value) => handleChange("titleFontStyle", value)}
                options={[
                  { value: "normal", label: "Normal" },
                  { value: "bold", label: "Bold" },
                  { value: "italic", label: "Italic" },
                ]}
              />
            )}
          />
        </Column>
      </Columns>
    </Rows>
  );
};