import { Accordion, AccordionItem, Button, Select, Text, Rows } from "@canva/app-ui-kit";
import React, { useState, useRef } from "react";
import { useAppContext } from "../../context/AppContext";
import { v4 as uuidv4 } from 'uuid';
import ChartTraceAccordion from "./ChartTraceAccordion";
import { Trace, DEFAULT_TRACE_STYLE } from "../../types/chart";

const CHART_TYPES = [
  { label: 'Line Chart', value: 'line', description: 'Display data points connected by lines' },
  { label: 'Bar Chart', value: 'bar', description: 'Compare data across categories' },
  { label: 'Scatter Plot', value: 'scatter', description: 'Show relationships between variables' }
];

export const ChartTab: React.FC = () => {
  const { data, traces, setTraces } = useAppContext();
  
  const columnOptions = data.columnDefs.map(col => ({
    label: col.field || '',
    value: col.field || '',
    description: `Data from column "${col.field}"`,
  }));

  const addTrace = () => {
    const newTrace: Trace = {
      id: uuidv4(),
      type: 'line',
      xColumn: columnOptions[0]?.value || '',
      yColumn: columnOptions[0]?.value || '',
      style: { ...DEFAULT_TRACE_STYLE },
    };
    setTraces([...traces, newTrace]);
  };

  const updateTrace = (id: string, field: keyof Trace, value: string) => {
    setTraces(traces.map(trace => 
      trace.id === id ? { ...trace, [field]: value } : trace
    ));
  };

  const removeTrace = (id: string) => {
    setTraces(traces.filter(trace => trace.id !== id));
  };

  return (
    <Rows spacing="2u">
      <Button 
        variant="primary" 
        onClick={addTrace} 
        stretch
      >
        Add Trace
      </Button>
      {traces.map((trace, index) => (
        <ChartTraceAccordion
          key={trace.id}
          trace={trace}
          index={index}
          columnOptions={columnOptions}
          updateTrace={updateTrace}
          removeTrace={removeTrace}
          chartTypes={CHART_TYPES}
        />
      ))}
    </Rows>
  );
};
