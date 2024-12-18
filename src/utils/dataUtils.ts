import Papa from 'papaparse';
import { ColDef } from 'ag-grid-community';

export interface ParsedData {
  rowData: any[];
  columnDefs: ColDef[];
}

export const parseCSVFile = (file: File): Promise<ParsedData> => {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true,
      complete: (results) => {
        if (results.errors.length > 0) {
          reject(new Error('Error parsing CSV file: ' + results.errors[0].message));
          return;
        }

        // Create column definitions from headers
        const columnDefs: ColDef[] = Object.keys(results.data[0] || {}).map(field => ({
          field,
          headerName: field.charAt(0).toUpperCase() + field.slice(1),
          editable: true,
          sortable: true,
          filter: true,
          flex: 1
        }));

        // Add row IDs if they don't exist
        const rowData = results.data.map((row: any, index: number) => ({
          id: row.id || index + 1,
          ...row
        }));

        resolve({
          rowData,
          columnDefs
        });
      },
      error: (error: Error) => {
        reject(error);
      }
    });
  });
};
