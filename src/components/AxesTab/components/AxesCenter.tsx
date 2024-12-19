import React from "react";
import {
  Rows,
  Columns,
  Column,
  FormField,
  SegmentedControl,
  NumberInput,
  Flyout,
  Box,
  Button,
  FlyoutMenu,
} from "@canva/app-ui-kit";
import { useAppContext } from "../../../context/AppContext";

export const AxesCenter: React.FC = () => {
  const { updateChartConfig, chartConfig } = useAppContext();

  return (
    <FlyoutMenu
      description="Configure chart border settings"
      label="Border"

      // onRequestClose={() => setActiveSettings(null)}
      // open={activeSettings === "border"}
      // placement="bottom-start"
      // title="Chart Border Settings"
      // trigger={
      //   <Button onClick={() => setAxesCenter("border")} variant="secondary" stretch>
      //     Border
      //   </Button>
      // }
      // width="32u"
    >
      <Box>
        <Rows spacing="1u">
          <Columns spacing="1u" align="spaceBetween">
            <Column width="fluid">
              <FormField
                label="Show Legend"
                control={() => (
                  <SegmentedControl
                    options={[
                      {
                        label: "Default",
                        value: "default",
                      },
                      {
                        label: "Center",
                        value: "center",
                      },
                    ]}
                  />
                )}
              />
            </Column>
          </Columns>
        </Rows>
      </Box>
    </FlyoutMenu>
  );
};
