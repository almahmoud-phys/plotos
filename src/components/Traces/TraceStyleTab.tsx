import React from "react";
import { ColorSelector, Select, NumberInput, Rows, Columns, FormField } from "@canva/app-ui-kit";
import { TraceStyle } from "../../types/chart";

interface TraceStyleTabProps {
  style: TraceStyle;
  onStyleChange: (field: keyof TraceStyle, value: string | number) => void;
}

const lineStyleOptions = [
  { value: "solid", label: "Solid" },
  { value: "dash", label: "Dashed" },
  { value: "dot", label: "Dotted" },
  { value: "dashdot", label: "Dash-Dot" },
];

const markerStyleOptions = [
  { value: "circle", label: "Circle" },
  { value: "square", label: "Square" },
  { value: "diamond", label: "Diamond" },
  { value: "triangle", label: "Triangle" },
  { value: "star", label: "Star" },
];

const markerSizeOptions = [
  { value: "0.5", label: "0.5" },
  { value: "1", label: "1" },
  { value: "1.5", label: "1.5" },
  { value: "2", label: "2" },
  { value: "2.5", label: "2.5" },
  { value: "3", label: "3" },
];

const lineWidthOptions = [
  { value: "1", label: "1" },
  { value: "2", label: "2" },
  { value: "3", label: "3" },
  { value: "4", label: "4" },
  { value: "5", label: "5" },
  { value: "6", label: "6" },
  { value: "8", label: "8" },
  { value: "10", label: "10" },
];

export const TraceStyleTab: React.FC<TraceStyleTabProps> = ({
  style,
  onStyleChange,
}) => {
  return (
    <Rows spacing="2u">
      {/* Group 1: Line Style Controls */}
      <FormField
        label="Line Style"
        control={() => (
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: '16px', width: '100%' }}>

            <ColorSelector
              color={style.lineColor}
              onChange={(color) => onStyleChange("lineColor", color)}
            />
              <Select
                value={style.lineStyle}
                onChange={(value) => onStyleChange("lineStyle", value)}
                options={lineStyleOptions}
                placeholder="Select line style"
                stretch
              />

            <Select
              value={String(style.lineWidth)}
              onChange={(value) => onStyleChange("lineWidth", Number(value))}
              options={lineWidthOptions}
              placeholder="Select width"
              stretch
            />
          </div>
        )}
      />

      {/* Group 2: Markers */}
      <FormField
        label="Markers"
        control={() => (
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: '16px', width: '100%' }}>
            <ColorSelector
              color={style.markerColor}
              onChange={(color) => onStyleChange("markerColor", color)}
            />
            <Select
              value={style.markerStyle}
              onChange={(value) => onStyleChange("markerStyle", value)}
              options={markerStyleOptions}
              placeholder="Select marker style"
              stretch
            />
            <Select
              value={String(style.markerSize)}
              onChange={(value: string) => onStyleChange("markerSize", Number(value))}
              options={markerSizeOptions}
              placeholder="Select size"
              stretch
            />
          </div>
        )}
      />
    </Rows>
  );
};

export type { TraceStyle };
