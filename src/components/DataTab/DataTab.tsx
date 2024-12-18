import { Button, DatabaseIcon, FileTextIcon, Rows, Text } from "@canva/app-ui-kit";
import React, { useCallback, useState } from "react";
import { DataTable } from "./DataTable";
import { parseCSVFile, ParsedData } from "../../utils/dataUtils";
import { ColDef } from 'ag-grid-community';
import { useAppContext } from "../../context/AppContext"; // assuming AppContext is defined in AppContext.ts

export const DataTab: React.FC = () => {
  const { setData } = useAppContext();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [tableData, setTableData] = useState<ParsedData>({
    rowData: [],
    columnDefs: []
  });

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setIsLoading(true);
      setError(null);
      try {
        const parsedData = await parseCSVFile(file);
        setTableData(parsedData);
        setData(parsedData);
        handleDataChange(parsedData.rowData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error processing file');
        console.error('Error parsing file:', err);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleDataChange = useCallback((data: any[]) => {
    console.log('Data changed:', data);
  }, []);

  const generateSampleData = () => {
    const sampleRowData = Array.from({ length: 10 }, (_, rowIndex) => ({
      col1: Math.floor(Math.random() * 100),
      col2: Math.floor(Math.random() * 100),
      col3: Math.floor(Math.random() * 100)
    }));

    const sampleColumnDefs: ColDef[] = [
      { field: 'col1', headerName: 'Column 1' },
      { field: 'col2', headerName: 'Column 2' },
      { field: 'col3', headerName: 'Column 3' }
    ];

    return {
      rowData: sampleRowData,
      columnDefs: sampleColumnDefs
    };
  };

  const handleSampleData = () => {
    setIsLoading(true);
    setError(null);
    try {
      const sampleData = generateSampleData();
      setTableData(sampleData);
      setData(sampleData);
      handleDataChange(sampleData.rowData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error generating sample data');
      console.error('Error generating sample data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Rows spacing="2u">
      <div style={{ display: 'flex', gap: '8px', alignItems: 'space-between' , width: '100%'}}>
        <Button
          variant="secondary"
          icon={FileTextIcon}
          onClick={() => document.getElementById('csvInput')?.click()}
          disabled={isLoading}
        >
          {isLoading ? 'Processing...' : 'Upload CSV'}
        </Button>
        <Button
          variant="primary"
          icon={DatabaseIcon}
          onClick={handleSampleData}
          disabled={isLoading}
        >
          {isLoading ? 'Processing...' : 'Sample Data'}
        </Button>
        <input
          type="file"
          id="csvInput"
          accept=".csv"
          style={{ display: 'none' }}
          onChange={handleFileUpload}
        />
        {error && <Text variant="bold">{error}</Text>}
      </div>
      
      <DataTable 
        onDataChange={handleDataChange}
        initialData={tableData.rowData}
        initialColumns={tableData.columnDefs}
      />
    </Rows>
  );
};
