import React from 'react';
import { Box, ColorSelector, NumberInput, FormField, Columns, Column, Select,  } from "@canva/app-ui-kit";
import { useAppContext } from "../../../context/AppContext";

const borderStyles = [
  { label: 'Solid', value: 'solid' },
  { label: 'Dashed', value: 'dashed' },
];

export const ChartBorder: React.FC = () => {
  const { chartConfig, updateChartConfig } = useAppContext();
  const border = chartConfig.border || {};

  const updateBorder = (updates: Record<string, any>) => {
    updateChartConfig({
      border: {
        ...border,
        ...updates,
      },
    });
  };

  return (
    <Box>
      <FormField 
        label="Show Border"
        control={(props) => (
          <button
            {...props}
            style={{ 
              backgroundColor: border.display ? 'green' : 'red', 
              color: 'white', 
              padding: '8px 16px', 
              border: 'none', 
              borderRadius: '4px' 
            }}
            onClick={() => updateBorder({ display: !border.display })}
          >
            {border.display ? 'Enabled' : 'Disabled'}
          </button>
        )}
      />

      {border.display && (
        <Columns spacing="1u">
          <Column>
            <FormField 
              label="Border Color"
              control={(props) => (
                <ColorSelector
                  {...props}
                  color={border.color || '#000000'}
                  onChange={(value) => updateBorder({ color: value })}
                />
              )}
            />
          </Column>
          <Column>
            <FormField 
              label="Border Width"
              control={(props) => (
                <NumberInput
                  {...props}
                  min={0}
                  max={10}
                  value={border.width || 1}
                  onChange={(value) => updateBorder({ width: value })}
                />
              )}
            />
          </Column>
          <Column>
            <FormField 
              label="Border Style"
              control={(props) => (
                <Select
                  {...props}
                  options={borderStyles}
                  value={border.style || 'solid'}
                  onChange={(value) => {
                    const updates: Record<string, any> = { style: value };
                    if (value === 'dashed') {
                      updates.dash = [5, 5];
                      updates.dashOffset = 0;
                    } else {
                      updates.dash = undefined;
                      updates.dashOffset = undefined;
                    }
                    updateBorder(updates);
                  }}
                />
              )}
            />
          </Column>
        </Columns>
      )}
    </Box>
  );
};