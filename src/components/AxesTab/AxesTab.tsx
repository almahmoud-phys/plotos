import React, { useState } from "react";
import { TextInput, Select, Rows, ColorSelector, FormField, SegmentedControl, NumberInput, Columns, Column, Flyout, Box, Button, Text } from "@canva/app-ui-kit";
import {EyeIcon} from "@canva/app-ui-kit";
import { FaRegEyeSlash as EyeOffIcon } from "react-icons/fa";
import { useAppContext } from "../../context/AppContext";

export const AxesTab: React.FC = () => {
  const { updateChartConfig, chartConfig } = useAppContext();
  const [activeSettings, setActiveSettings] = useState<string | null>(null);
  const [visibility, setVisibility] = useState({
    title: true,
    xAxis: true,
    xTicks: true,
    yAxis: true,
    yTicks: true,
    grid: true,
    legend: true
  });

  const toggleVisibility = (key: keyof typeof visibility) => {
    setVisibility(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
    // Update chart config with the new visibility
    updateChartConfig({
      ...chartConfig,
      [`show${key.charAt(0).toUpperCase() + key.slice(1)}`]: !visibility[key]
    });
  };

  const handleChange = (field: string, value: any) => {
    updateChartConfig({
      ...chartConfig,
      [field]: value,
    });
  };

  const handleClearAll = () => {
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

  const renderTitleSettings = () => (
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

  const renderXAxisSettings = () => (
    <Rows spacing="1u">
      <Columns spacing="1u" align="spaceBetween">
        <Column width="fluid">
          <FormField
            label="Label"
            control={() => (
              <TextInput
                value={chartConfig?.xAxisLabel || "X Axis"}
                onChange={(value) => handleChange("xAxisLabel", value)}
                placeholder="Enter X-axis label"
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
                value={chartConfig?.xAxisPosition || "bottom"}
                onChange={(value) => handleChange("xAxisPosition", value)}
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
            label="Color"
            control={() => (
              <ColorSelector
                color={chartConfig?.xAxisColor || "#000000"}
                onChange={(color) => handleChange("xAxisColor", color)}
              />
            )}
          />
        </Column>
        <Column width="fluid">
          <FormField
            label="Font Size"
            control={() => (
              <Select
                value={chartConfig?.xAxisFontSize || 16}
                onChange={(value) => handleChange("xAxisFontSize", value)}
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

  const renderYAxisSettings = () => (
    <Rows spacing="1u">
      <Columns spacing="1u" align="spaceBetween">
        <Column width="fluid">
          <FormField
            label="Label"
            control={() => (
              <TextInput
                value={chartConfig?.yAxisLabel || "Y Axis"}
                onChange={(value) => handleChange("yAxisLabel", value)}
                placeholder="Enter Y-axis label"
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
                value={chartConfig?.yAxisPosition || "left"}
                onChange={(value) => handleChange("yAxisPosition", value)}
                options={[
                  { value: "left", label: "Left" },
                  { value: "right", label: "Right" },
                ]}
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
                color={chartConfig?.yAxisColor || "#000000"}
                onChange={(color) => handleChange("yAxisColor", color)}
              />
            )}
          />
        </Column>
        <Column width="fluid">
          <FormField
            label="Font Size"
            control={() => (
              <Select
                value={chartConfig?.yAxisFontSize || 16}
                onChange={(value) => handleChange("yAxisFontSize", value)}
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

  const renderXTicksSettings = () => (
    <Rows spacing="1u">
      <Columns spacing="1u" align="spaceBetween">
        <Column width="fluid">
          <FormField
            label="Show Ticks"
            control={() => (
              <Select
                value={chartConfig?.showXTicks === false ? "false" : "true"}
                onChange={(value) => handleChange("showXTicks", value === "true")}
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
                value={chartConfig?.xTicksCount || 0}
                onChange={(value) => handleChange("xTicksCount", value)}
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
                value={chartConfig?.xTicksStep || 0}
                onChange={(value) => handleChange("xTicksStep", value)}
                min={0}
                step={0.1}
                placeholder="Auto"
              />
            )}
          />
        </Column>
      </Columns>
    </Rows>
  );

  const renderYTicksSettings = () => (
    <Rows spacing="1u">
      <Columns spacing="1u" align="spaceBetween">
        <Column width="fluid">
          <FormField
            label="Show Ticks"
            control={() => (
              <Select
                value={chartConfig?.showYTicks === false ? "false" : "true"}
                onChange={(value) => handleChange("showYTicks", value === "true")}
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
                value={chartConfig?.yTicksCount || 0}
                onChange={(value) => handleChange("yTicksCount", value)}
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
                value={chartConfig?.yTicksStep || 0}
                onChange={(value) => handleChange("yTicksStep", value)}
                min={0}
                step={0.1}
                placeholder="Auto"
              />
            )}
          />
        </Column>
      </Columns>
    </Rows>
  );

  const renderGridSettings = () => (
    <Rows spacing="1u">
      <Columns spacing="1u" align="spaceBetween">
        <Column width="fluid">
          <FormField
            label="Show Grid"
            control={() => (
              <Select
                value={chartConfig?.showGrid === false ? "false" : "true"}
                onChange={(value) => handleChange("showGrid", value === "true")}
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

  const renderLegendSettings = () => (
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

  const renderSettingsContent = () => {
    switch (activeSettings) {
      case "title":
        return renderTitleSettings();
      case "xAxis":
        return renderXAxisSettings();
      case "yAxis":
        return renderYAxisSettings();
      case "xTicks":
        return renderXTicksSettings();
      case "yTicks":
        return renderYTicksSettings();
      case "grid":
        return renderGridSettings();
      case "legend":
        return renderLegendSettings();
      default:
        return null;
    }
  };

  return (
    <Rows spacing="2u">
      <Column>
        <Flyout
          description="Configure chart title"
          footer={
            <Box padding="2u">
              <Columns spacing="1u">
                <Column>
                  <Button onClick={() => setActiveSettings(null)} stretch variant="secondary">
                    Cancel
                  </Button>
                </Column>
                <Column>
                  <Button onClick={() => setActiveSettings(null)} stretch variant="primary">
                    Apply
                  </Button>
                </Column>
              </Columns>
            </Box>
          }
          headerEnd={
            <Button
              icon={visibility.title ? EyeIcon : () => <EyeOffIcon />}
              onClick={() => toggleVisibility('title')}
              variant="tertiary"
              tooltipLabel={visibility.title ? "Hide Title" : "Show Title"}
            />
          }
          onRequestClose={() => setActiveSettings(null)}
          open={activeSettings === "title"}
          placement="bottom-start"
          title="Title Settings"
          trigger={
            <Button onClick={() => setActiveSettings("title")} variant="secondary" stretch>
              Title
            </Button>
          }
          width="32u"
        >
          <Box padding="2u">{renderTitleSettings()}</Box>
        </Flyout>
      </Column>

      <Columns spacing="1u">
        <Column>
          <Flyout
            description="Configure X-axis label"
            footer={
              <Box padding="2u">
                <Columns spacing="1u">
                  <Column>
                    <Button onClick={() => setActiveSettings(null)} stretch variant="secondary">
                      Cancel
                    </Button>
                  </Column>
                  <Column>
                    <Button onClick={() => setActiveSettings(null)} stretch variant="primary">
                      Apply
                    </Button>
                  </Column>
                </Columns>
              </Box>
            }
            headerEnd={
              <Button
                icon={visibility.xAxis ? EyeIcon : () => <EyeOffIcon />}
                onClick={() => toggleVisibility('xAxis')}
                variant="tertiary"
                tooltipLabel={visibility.xAxis ? "Hide X Label" : "Show X Label"}
              />
            }
            onRequestClose={() => setActiveSettings(null)}
            open={activeSettings === "xAxis"}
            placement="bottom-start"
            title="X-Axis Settings"
            trigger={
              <Button onClick={() => setActiveSettings("xAxis")} variant="secondary" stretch>
                X Label
              </Button>
            }
            width="32u"
          >
            <Box padding="2u">{renderXAxisSettings()}</Box>
          </Flyout>
        </Column>
        <Column>
          <Flyout
            description="Configure X-axis ticks"
            footer={
              <Box padding="2u">
                <Columns spacing="1u">
                  <Column>
                    <Button onClick={() => setActiveSettings(null)} stretch variant="secondary">
                      Cancel
                    </Button>
                  </Column>
                  <Column>
                    <Button onClick={() => setActiveSettings(null)} stretch variant="primary">
                      Apply
                    </Button>
                  </Column>
                </Columns>
              </Box>
            }
            headerEnd={
              <Button
                icon={visibility.xTicks ? EyeIcon : () => <EyeOffIcon />}
                onClick={() => toggleVisibility('xTicks')}
                variant="tertiary"
                tooltipLabel={visibility.xTicks ? "Hide X Ticks" : "Show X Ticks"}
              />
            }
            onRequestClose={() => setActiveSettings(null)}
            open={activeSettings === "xTicks"}
            placement="bottom-start"
            title="X-Axis Ticks Settings"
            trigger={
              <Button onClick={() => setActiveSettings("xTicks")} variant="secondary" stretch>
                X Ticks
              </Button>
            }
            width="32u"
          >
            <Box padding="2u">{renderXTicksSettings()}</Box>
          </Flyout>
        </Column>
      </Columns>

      <Columns spacing="1u">
        <Column>
          <Flyout
            description="Configure Y-axis label"
            footer={
              <Box padding="2u">
                <Columns spacing="1u">
                  <Column>
                    <Button onClick={() => setActiveSettings(null)} stretch variant="secondary">
                      Cancel
                    </Button>
                  </Column>
                  <Column>
                    <Button onClick={() => setActiveSettings(null)} stretch variant="primary">
                      Apply
                    </Button>
                  </Column>
                </Columns>
              </Box>
            }
            headerEnd={
              <Button
                icon={visibility.yAxis ? EyeIcon : () => <EyeOffIcon />}
                onClick={() => toggleVisibility('yAxis')}
                variant="tertiary"
                tooltipLabel={visibility.yAxis ? "Hide Y Label" : "Show Y Label"}
              />
            }
            onRequestClose={() => setActiveSettings(null)}
            open={activeSettings === "yAxis"}
            placement="bottom-start"
            title="Y-Axis Settings"
            trigger={
              <Button onClick={() => setActiveSettings("yAxis")} variant="secondary" stretch>
                Y Label
              </Button>
            }
            width="32u"
          >
            <Box padding="2u">{renderYAxisSettings()}</Box>
          </Flyout>
        </Column>
        <Column>
          <Flyout
            description="Configure Y-axis ticks"
            footer={
              <Box padding="2u">
                <Columns spacing="1u">
                  <Column>
                    <Button onClick={() => setActiveSettings(null)} stretch variant="secondary">
                      Cancel
                    </Button>
                  </Column>
                  <Column>
                    <Button onClick={() => setActiveSettings(null)} stretch variant="primary">
                      Apply
                    </Button>
                  </Column>
                </Columns>
              </Box>
            }
            headerEnd={
              <Button
                icon={visibility.yTicks ? EyeIcon : () => <EyeOffIcon />}
                onClick={() => toggleVisibility('yTicks')}
                variant="tertiary"
                tooltipLabel={visibility.yTicks ? "Hide Y Ticks" : "Show Y Ticks"}
              />
            }
            onRequestClose={() => setActiveSettings(null)}
            open={activeSettings === "yTicks"}
            placement="bottom-start"
            title="Y-Axis Ticks Settings"
            trigger={
              <Button onClick={() => setActiveSettings("yTicks")} variant="secondary" stretch>
                Y Ticks
              </Button>
            }
            width="32u"
          >
            <Box padding="2u">{renderYTicksSettings()}</Box>
          </Flyout>
        </Column>
      </Columns>

      <Columns spacing="1u">
        <Column>
          <Flyout
            description="Configure grid settings"
            footer={
              <Box padding="2u">
                <Columns spacing="1u">
                  <Column>
                    <Button onClick={() => setActiveSettings(null)} stretch variant="secondary">
                      Cancel
                    </Button>
                  </Column>
                  <Column>
                    <Button onClick={() => setActiveSettings(null)} stretch variant="primary">
                      Apply
                    </Button>
                  </Column>
                </Columns>
              </Box>
            }
            headerEnd={
              <Button
                icon={visibility.grid ? EyeIcon : () => <EyeOffIcon />}
                onClick={() => toggleVisibility('grid')}
                variant="tertiary"
                tooltipLabel={visibility.grid ? "Hide Grid" : "Show Grid"}
              />
            }
            onRequestClose={() => setActiveSettings(null)}
            open={activeSettings === "grid"}
            placement="bottom-start"
            title="Grid Settings"
            trigger={
              <Button onClick={() => setActiveSettings("grid")} variant="secondary" stretch>
                Grid
              </Button>
            }
            width="32u"
          >
            <Box padding="2u">{renderGridSettings()}</Box>
          </Flyout>
        </Column>
        <Column>
          <Flyout
            description="Configure legend settings"
            footer={
              <Box padding="2u">
                <Columns spacing="1u">
                  <Column>
                    <Button onClick={() => setActiveSettings(null)} stretch variant="secondary">
                      Cancel
                    </Button>
                  </Column>
                  <Column>
                    <Button onClick={() => setActiveSettings(null)} stretch variant="primary">
                      Apply
                    </Button>
                  </Column>
                </Columns>
              </Box>
            }
            headerEnd={
              <Button
                icon={visibility.legend ? EyeIcon : () => <EyeOffIcon />}
                onClick={() => toggleVisibility('legend')}
                variant="tertiary"
                tooltipLabel={visibility.legend ? "Hide Legend" : "Show Legend"}
              />
            }
            onRequestClose={() => setActiveSettings(null)}
            open={activeSettings === "legend"}
            placement="bottom-start"
            title="Legend Settings"
            trigger={
              <Button onClick={() => setActiveSettings("legend")} variant="secondary" stretch>
                Legend
              </Button>
            }
            width="32u"
          >
            <Box padding="2u">{renderLegendSettings()}</Box>
          </Flyout>
        </Column>
      </Columns>

      {/* <Button onClick={handleClearAll} variant="secondary">
        Clear All Settings
      </Button> */}
    </Rows>
  );
};
