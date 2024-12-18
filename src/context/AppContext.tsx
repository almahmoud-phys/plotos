import React, { createContext, useContext, ReactNode, useState } from 'react';
import { ColDef } from 'ag-grid-community';
import { ParsedData } from '../utils/dataUtils';
import { TraceStyle, ChartConfig, Trace } from '../types/chart';

interface AppContextType {
  data: ParsedData;
  setData: (data: ParsedData) => void;
  traces: Trace[];
  setTraces: (traces: Trace[]) => void;
  chartConfig: ChartConfig;
  updateChartConfig: (config: ChartConfig) => void;
}

const defaultData: ParsedData = {
  rowData: [],
  columnDefs: []
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<ParsedData>(defaultData);
  const [traces, setTraces] = useState<Trace[]>([]);
  const [chartConfig, setChartConfig] = useState<ChartConfig>({});

  const updateChartConfig = (config: ChartConfig) => {
    setChartConfig(config);
  };

  const value = {
    data,
    setData,
    traces,
    setTraces,
    chartConfig,
    updateChartConfig
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}
