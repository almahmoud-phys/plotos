import { Rows } from "@canva/app-ui-kit";
import { AgGridReact } from 'ag-grid-react';
import React, { useState, useCallback, useRef, useEffect } from "react";
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { ColDef, GridApi } from 'ag-grid-community';
import { TableToolBar } from './TableToolBar';
import Papa from 'papaparse';

interface HistoryState {
  rowData: any[];
  columnDefs: ColDef[];
}

interface DataTableProps {
  onDataChange?: (data: any[]) => void;
  initialData?: any[];
  initialColumns?: ColDef[];
}

const MAX_HISTORY_STEPS = 5;

export const DataTable: React.FC<DataTableProps> = ({ 
  onDataChange,
  initialData = [],
  initialColumns = []
}) => {
  const gridApiRef = useRef<GridApi | null>(null);
  const [rowData, setRowData] = useState<any[]>(initialData);
  const [columnDefs, setColumnDefs] = useState<ColDef[]>(initialColumns);

  // Update state when initial data changes
  useEffect(() => {
    if (initialData.length > 0) {
      setRowData(initialData);
    }
    if (initialColumns.length > 0) {
      setColumnDefs(initialColumns);
    }
  }, [initialData, initialColumns]);

  useEffect(() => {
    // Initialize with empty columns if no data and no initial columns
    if (rowData.length === 0 && columnDefs.length === 0) {
      setColumnDefs([
        { 
          field: 'x',
          headerName: 'X',
          editable: true,
          sortable: true,
          filter: true,
          flex: 1
        },
        { 
          field: 'y',
          headerName: 'Y',
          editable: true,
          sortable: true,
          filter: true,
          flex: 1
        }
      ]);
      setRowData([
        { id: 1, x: '', y: '' },
        { id: 2, x: '', y: '' },
        { id: 3, x: '', y: '' },
      ]);
    }
  }, []);

  // History management
  const [history, setHistory] = useState<HistoryState[]>([]);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    if (onDataChange) {
      onDataChange(rowData);
    }
    
    // Update history
    if (currentStep < history.length - 1) {
      // If we're in the middle of the history, truncate the future steps
      setHistory(prev => prev.slice(0, currentStep + 1));
    }
    
    setHistory(prev => {
      const newHistory = [...prev, { rowData, columnDefs }];
      return newHistory.slice(-MAX_HISTORY_STEPS);
    });
    setCurrentStep(prev => Math.min(prev + 1, MAX_HISTORY_STEPS - 1));
  }, [rowData, columnDefs, currentStep, onDataChange]);

  const addToHistory = useCallback((newRowData: any[], newColumnDefs: ColDef[]) => {
    setHistory(prev => {
      const newHistory = prev.slice(0, currentStep + 1);
      newHistory.push({ rowData: newRowData, columnDefs: newColumnDefs });
      if (newHistory.length > MAX_HISTORY_STEPS) {
        newHistory.shift();
      }
      return newHistory;
    });
    setCurrentStep(prev => Math.min(prev + 1, MAX_HISTORY_STEPS - 1));
  }, [currentStep]);

  const handleFileUpload = useCallback((file: File) => {
    Papa.parse(file, {
      complete: (result) => {
        if (result.data && result.data.length > 0) {
          // Create column definitions from headers
          const headers = result.data[0] as string[];
          const newColumnDefs: ColDef[] = headers.map(header => ({
            field: header,
            headerName: header,
            editable: true,
            sortable: true,
            filter: true,
            flex: 1
          }));

          // Create row data from the rest of the CSV
          const newRowData = result.data.slice(1).map((row: any, index) => {
            const rowObj: any = { id: index + 1 };
            headers.forEach((header, i) => {
              rowObj[header] = row[i] || '';
            });
            return rowObj;
          });

          setColumnDefs(newColumnDefs);
          setRowData(newRowData);
          addToHistory(newRowData, newColumnDefs);
          onDataChange?.(newRowData);
        }
      },
      header: true,
      skipEmptyLines: true,
    });
  }, [addToHistory, onDataChange]);

  const updateState = useCallback((state: HistoryState) => {
    setRowData(state.rowData);
    setColumnDefs(state.columnDefs);
    onDataChange?.(state.rowData);
  }, [onDataChange]);

  const canUndo = currentStep > 0;
  const canRedo = currentStep < history.length - 1;

  const handleUndo = useCallback(() => {
    if (canUndo) {
      const newStep = currentStep - 1;
      setCurrentStep(newStep);
      updateState(history[newStep]);
    }
  }, [canUndo, currentStep, history, updateState]);

  const handleRedo = useCallback(() => {
    if (canRedo) {
      const newStep = currentStep + 1;
      setCurrentStep(newStep);
      updateState(history[newStep]);
    }
  }, [canRedo, currentStep, history, updateState]);

  const handleCellValueChanged = useCallback((event: any) => {
    const newRowData = [...rowData];
    addToHistory(newRowData, columnDefs);
    onDataChange?.(newRowData);
  }, [rowData, columnDefs, addToHistory, onDataChange]);

  const addNewRow = useCallback(() => {
    const newId = rowData.length + 1;
    const newRowData = [...rowData, { id: newId, x: '', y: '' }];
    setRowData(newRowData);
    addToHistory(newRowData, columnDefs);
    onDataChange?.(newRowData);
  }, [rowData, columnDefs, addToHistory, onDataChange]);

  const handleRowRemove = useCallback(() => {
    if (!gridApiRef.current) return;

    const selectedRows = gridApiRef.current.getSelectedRows();
    let newRowData: any[];

    if (selectedRows.length > 0) {
      newRowData = rowData.filter(row => !selectedRows.includes(row));
    } else {
      if (rowData.length > 1) {
        newRowData = rowData.slice(0, -1);
      } else {
        return;
      }
    }

    setRowData(newRowData);
    addToHistory(newRowData, columnDefs);
    onDataChange?.(newRowData);
  }, [rowData, columnDefs, addToHistory, onDataChange]);

  const addNewColumn = useCallback(() => {
    const colId = `col_${columnDefs.length + 1}`;
    const newColDef: ColDef = {
      field: colId,
      headerName: `Column ${columnDefs.length + 1}`,
      editable: true,
      sortable: true,
      filter: true,
      flex: 1
    };
    
    const newColumnDefs = [...columnDefs, newColDef];
    setColumnDefs(newColumnDefs);
    
    const newRowData = rowData.map(row => ({
      ...row,
      [colId]: ''
    }));
    setRowData(newRowData);
    addToHistory(newRowData, newColumnDefs);
    onDataChange?.(newRowData);
  }, [columnDefs, rowData, addToHistory, onDataChange]);

  const deleteLastColumn = useCallback(() => {
    if (columnDefs.length > 1) {
      const newColumnDefs = columnDefs.slice(0, -1);
      setColumnDefs(newColumnDefs);
      
      const lastField = columnDefs[columnDefs.length - 1].field;
      const newRowData = rowData.map(row => {
        const newRow = { ...row };
        delete newRow[lastField as string];
        return newRow;
      });
      
      setRowData(newRowData);
      addToHistory(newRowData, newColumnDefs);
      onDataChange?.(newRowData);
    }
  }, [columnDefs, rowData, addToHistory, onDataChange]);

  return (
    <Rows spacing="2u">
      <TableToolBar
        onUndo={handleUndo}
        onRedo={handleRedo}
        canUndo={currentStep > 0}
        canRedo={currentStep < history.length - 1}
        onAddRow={addNewRow}
        onDeleteRow={handleRowRemove}
        onAddColumn={addNewColumn}
        onDeleteColumn={deleteLastColumn}
        onFileUpload={handleFileUpload}
      />
      <div 
        className="ag-theme-alpine" 
        style={{ 
          width: '100%',
          height: '400px',
          overflow: 'hidden'
        }}
      >
        <AgGridReact
          ref={(grid) => {
            if (grid) {
              gridApiRef.current = grid.api;
            }
          }}
          rowData={rowData}
          columnDefs={columnDefs}
          onCellValueChanged={handleCellValueChanged}
          defaultColDef={{
            resizable: true,
            sortable: true,
            filter: true,
            flex: 1,
            minWidth: 100
          }}
          suppressRowClickSelection={true}
          enableCellTextSelection={true}
          ensureDomOrder={true}
          suppressColumnVirtualisation={false}
          suppressRowVirtualisation={false}
        />
      </div>
    </Rows>
  );
};