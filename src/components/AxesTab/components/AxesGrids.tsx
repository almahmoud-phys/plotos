import React from "react";
import { Button, FormField, Rows, Text } from "@canva/app-ui-kit";
import { EyeIcon } from "@canva/app-ui-kit";
import { FaRegEyeSlash as EyeOffIcon } from "react-icons/fa";
import { useAppContext } from "../../../context/AppContext";

export const renderGridSettings = () => {
  const { updateChartConfig, chartConfig } = useAppContext();

  const handleGridChange = (axis: 'x' | 'y', property: 'display', value: boolean) => {
    updateChartConfig({
      ...chartConfig,
      scales: {
        ...chartConfig.scales,
        [axis]: {
          ...chartConfig.scales?.[axis],
          grid: {
            ...chartConfig.scales?.[axis]?.grid,
            [property]: value
          }
        }
      }
    });
  };

  const getGridProperty = (axis: 'x' | 'y', property: 'display'): boolean => {
    return chartConfig?.scales?.[axis]?.grid?.[property] !== false;
  };

  return (
    <Rows spacing="1u">
      <Text>X Axis Grid</Text>
      <FormField
        label="Show Grid"
        control={() => (
          <Button
            variant={getGridProperty('x', 'display') ? 'primary' : 'secondary'}
            onClick={() => handleGridChange('x', 'display', !getGridProperty('x', 'display'))}
            iconPosition="start"
            icon={() => getGridProperty('x', 'display') ? <EyeIcon /> : <EyeOffIcon />}
          >
            {getGridProperty('x', 'display') ? 'Visible' : 'Hidden'}
          </Button>
        )}
      />

      <Text>Y Axis Grid</Text>
      <FormField
        label="Show Grid"
        control={() => (
          <Button
            variant={getGridProperty('y', 'display') ? 'primary' : 'secondary'}
            onClick={() => handleGridChange('y', 'display', !getGridProperty('y', 'display'))}
            iconPosition="start"
            icon={() => getGridProperty('y', 'display') ? <EyeIcon /> : <EyeOffIcon />}
          >
            {getGridProperty('y', 'display') ? 'Visible' : 'Hidden'}
          </Button>
        )}
      />
    </Rows>
  );
};