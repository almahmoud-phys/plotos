import React from "react";
import { Accordion, AccordionItem, Button, Select, Rows, Tab, TabList, TabPanel, TabPanels, Tabs } from "@canva/app-ui-kit";
import { TraceStyleTab } from "../Traces/TraceStyleTab";
import { Trace, TraceStyle } from "../../types/chart";

interface ChartTraceAccordionProps {
  trace: Trace;
  index: number;
  columnOptions: { label: string; value: string; description: string }[];
  updateTrace: (id: string, field: keyof Trace, value: any) => void;
  removeTrace: (id: string) => void;
  chartTypes: { label: string; value: string; description: string }[];
}

const ChartTraceAccordion: React.FC<ChartTraceAccordionProps> = ({
  trace,
  index,
  columnOptions,
  updateTrace,
  removeTrace,
  chartTypes,
}) => {
  const handleStyleChange = (field: keyof TraceStyle, value: string | number) => {
    const newStyle = { ...trace.style, [field]: value };
    updateTrace(trace.id, 'style', newStyle);
  };

  return (
    <Accordion key={trace.id}>
      <AccordionItem title={`Trace ${index + 1}`}>
        <Tabs>
          <Rows spacing="1u">
            <TabList>
              <Tab id="data">Data</Tab>
              <Tab id="style">Style</Tab>
            </TabList>
            <TabPanels>
              <TabPanel id="data">
                <Rows spacing="1u">
                  <Select
                    id={`chart-type-${trace.id}`}
                    value={trace.type}
                    onChange={(value) => updateTrace(trace.id, 'type', value)}
                    options={chartTypes}
                    placeholder="Select chart type"
                    searchable={{}}
                  />
                  <Select
                    id={`x-column-${trace.id}`}
                    value={trace.xColumn}
                    onChange={(value) => updateTrace(trace.id, 'xColumn', value)}
                    options={columnOptions}
                    placeholder="Select X axis data"
                    searchable={{}}
                  />
                  <Select
                    id={`y-column-${trace.id}`}
                    value={trace.yColumn}
                    onChange={(value) => updateTrace(trace.id, 'yColumn', value)}
                    options={columnOptions}
                    placeholder="Select Y axis data"
                    searchable={{}}
                  />
                  <Button
                    variant="secondary"
                    onClick={() => removeTrace(trace.id)}
                    stretch
                  >
                    Remove trace
                  </Button>
                </Rows>
              </TabPanel>
              <TabPanel id="style">
                <TraceStyleTab 
                  style={trace.style} 
                  onStyleChange={handleStyleChange}
                />
              </TabPanel>
            </TabPanels>
          </Rows>
        </Tabs>
      </AccordionItem>
    </Accordion>
  );
};

export default ChartTraceAccordion;
