import React, { useState } from "react";
import { TextInput, Select, Rows, ColorSelector, FormField, SegmentedControl, NumberInput, Columns, Column, Flyout, Box, Button, Text } from "@canva/app-ui-kit";
import {EyeIcon} from "@canva/app-ui-kit";
import { FaRegEyeSlash as EyeOffIcon } from "react-icons/fa";
import { useAppContext } from "../../context/AppContext";
import { renderGridSettings } from "./components/AxesGrids";
import { AxesLabels } from "./components/AxesLabels";
import { AxesTicks } from "./components/AxesTicks";
import { AxesTitle } from "./components/AxesTitle";
import { AxesLegends } from "./components/AxesLegends";
import { ChartBorder } from "./components/ChartBorder";
import { AxesCenter } from "./components/AxesCenter";

export const AxesTab: React.FC = () => {
  const { updateChartConfig, chartConfig } = useAppContext();
  const [activeSettings, setActiveSettings] = useState<string | null>(null);
  const [visibility, setVisibility] = useState({
    title: true,
    xAxis: true,
    xTicks: true,
    yAxis: true,
    yTicks: true,
    xGrid: true,
    yGrid: true,
    legend: true,
    border: true
  });

  const toggleVisibility = (key: keyof typeof visibility) => {
    setVisibility(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
    // Update chart config with the new visibility
    
    switch(key) {
      case 'xGrid':
      case 'yGrid':
        updateChartConfig({
          ...chartConfig,
          [`show${key.charAt(0).toUpperCase() + key.slice(1)}`]: !chartConfig?.[`show${key.charAt(0).toUpperCase() + key.slice(1)}`]
        });
        break;
      default:
        updateChartConfig({
          ...chartConfig,
          [`show${key.charAt(0).toUpperCase() + key.slice(1)}`]: !chartConfig?.[`show${key.charAt(0).toUpperCase() + key.slice(1)}`]
        });
    }
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
    <AxesTitle />
  );

  const renderXTicksSettings = () => (
    <AxesTicks axis="x" />
  );

  const renderYTicksSettings = () => (
    <AxesTicks axis="y" />
  );

  const renderLegendSettings = () => (
    <AxesLegends />
  );

  const renderBorderSettings = () => (
    <ChartBorder />
  );

  const renderSettingsContent = () => {
    switch (activeSettings) {
      case "title":
        return renderTitleSettings();
      case "xAxis":
        return <AxesLabels axis="x" />;
      case "yAxis":
        return <AxesLabels axis="y" />;
      case "xTicks":
        return renderXTicksSettings();
      case "yTicks":
        return renderYTicksSettings();
      case "grid":
        return renderGridSettings();
      case "legend":
        return renderLegendSettings();
      case "border":
        return renderBorderSettings();
      default:
        return null;
    }
  };

  return (
    <Rows spacing="2u">
      <Columns spacing="1u">
        <Column>
          <Flyout
            description="Configure title settings"
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
      </Columns>
      <Columns spacing="1u">
        <Column>
          <Columns spacing="1u">
            <Column>
              <Flyout
                description="Configure X-axis label settings"
                headerEnd={
                  <Button
                    icon={visibility.xAxis ? EyeIcon : () => <EyeOffIcon />}
                    onClick={() => toggleVisibility('xAxis')}
                    variant="tertiary"
                    tooltipLabel={visibility.xAxis ? "Hide X-Axis Label" : "Show X-Axis Label"}
                  />
                }
                onRequestClose={() => setActiveSettings(null)}
                open={activeSettings === "xAxis"}
                placement="bottom-start"
                title="X-Axis Label Settings"
                trigger={
                  <Button onClick={() => setActiveSettings("xAxis")} variant="secondary" stretch>
                    X Label
                  </Button>
                }
                width="32u"
              >
                <Box padding="2u"><AxesLabels axis="x" /></Box>
              </Flyout>
            </Column>
            <Column>
              <Flyout
                description="Configure Y-axis label settings"
                headerEnd={
                  <Button
                    icon={visibility.yAxis ? EyeIcon : () => <EyeOffIcon />}
                    onClick={() => toggleVisibility('yAxis')}
                    variant="tertiary"
                    tooltipLabel={visibility.yAxis ? "Hide Y-Axis Label" : "Show Y-Axis Label"}
                  />
                }
                onRequestClose={() => setActiveSettings(null)}
                open={activeSettings === "yAxis"}
                placement="bottom-start"
                title="Y-Axis Label Settings"
                trigger={
                  <Button onClick={() => setActiveSettings("yAxis")} variant="secondary" stretch>
                    Y Label
                  </Button>
                }
                width="32u"
              >
                <Box padding="2u"><AxesLabels axis="y" /></Box>
              </Flyout>
            </Column>
          </Columns>
        </Column>
      </Columns>
      <Columns spacing="1u">
        <Column>
          <Columns spacing="1u">
            <Column>
              <Flyout
                description="Configure X-axis ticks settings"
                headerEnd={
                  <Button
                    icon={visibility.xTicks ? EyeIcon : () => <EyeOffIcon />}
                    onClick={() => toggleVisibility('xTicks')}
                    variant="tertiary"
                    tooltipLabel={visibility.xTicks ? "Hide X-Axis Ticks" : "Show X-Axis Ticks"}
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
            <Column>
              <Flyout
                description="Configure Y-axis ticks settings"
                headerEnd={
                  <Button
                    icon={visibility.yTicks ? EyeIcon : () => <EyeOffIcon />}
                    onClick={() => toggleVisibility('yTicks')}
                    variant="tertiary"
                    tooltipLabel={visibility.yTicks ? "Hide Y-Axis Ticks" : "Show Y-Axis Ticks"}
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
        </Column>
      </Columns>

      <Columns spacing="1u">
        <Column>
          <Columns spacing="1u">
            <Column>
              <Flyout
                description="Configure X Grid settings"
                headerEnd={
                  <Button
                    icon={visibility.xGrid ? EyeIcon : () => <EyeOffIcon />}
                    onClick={() => toggleVisibility('xGrid')}
                    variant="tertiary"
                    tooltipLabel={visibility.xGrid ? "Hide X Grid" : "Show X Grid"}
                  />
                }
                onRequestClose={() => setActiveSettings(null)}
                open={activeSettings === "xGrid"}
                placement="bottom-start"
                title="X Grid Settings"
                trigger={
                  <Button onClick={() => setActiveSettings("xGrid")} variant="secondary" stretch>
                    X Grid
                  </Button>
                }
                width="32u"
              >
                <Box padding="2u">{renderGridSettings()}</Box>
              </Flyout>
            </Column>
            <Column>
              <Flyout
                description="Configure Y Grid settings"
                headerEnd={
                  <Button
                    icon={visibility.yGrid ? EyeIcon : () => <EyeOffIcon />}
                    onClick={() => toggleVisibility('yGrid')}
                    variant="tertiary"
                    tooltipLabel={visibility.yGrid ? "Hide Y Grid" : "Show Y Grid"}
                  />
                }
                onRequestClose={() => setActiveSettings(null)}
                open={activeSettings === "yGrid"}
                placement="bottom-start"
                title="Y Grid Settings"
                trigger={
                  <Button onClick={() => setActiveSettings("yGrid")} variant="secondary" stretch>
                    Y Grid
                  </Button>
                }
                width="32u"
              >
                <Box padding="2u">{renderGridSettings()}</Box>
              </Flyout>
            </Column>
          </Columns>
        </Column>
      </Columns>

      <Columns spacing="1u">
        <Column>
          <Flyout
            description="Configure chart border settings"
            headerEnd={
              <Button
                icon={visibility.border ? EyeIcon : () => <EyeOffIcon />}
                onClick={() => toggleVisibility('border')}
                variant="tertiary"
                tooltipLabel={visibility.border ? "Hide Chart Border" : "Show Chart Border"}
              />
            }
            onRequestClose={() => setActiveSettings(null)}
            open={activeSettings === "border"}
            placement="bottom-start"
            title="Chart Border Settings"
            trigger={
              <Button onClick={() => setActiveSettings("border")} variant="secondary" stretch>
                Border
              </Button>
            }
            width="32u"
          >
            <Box padding="2u">{renderBorderSettings()}</Box>
          </Flyout>
        </Column>
        <Column>
          <AxesCenter />
        </Column>
      </Columns>

      <Columns spacing="1u">
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

    </Rows>
  );
};
