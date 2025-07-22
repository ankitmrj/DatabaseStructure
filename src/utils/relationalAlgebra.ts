import { CSVData, QueryResult, RelationalOperation } from '../types/database';

export class RelationalAlgebraEngine {
  
  public executeQuery(data: CSVData, operations: RelationalOperation[]): QueryResult {
    const startTime = performance.now();
    let result = { ...data };
    const operationsUsed: string[] = [];

    for (const operation of operations) {
      switch (operation.type) {
        case 'SELECT':
          result = this.select(result, operation.condition!, operationsUsed);
          break;
        case 'PROJECT':
          result = this.project(result, operation.columns!, operationsUsed);
          break;
        case 'JOIN':
          if (operation.table2) {
            result = this.join(result, operation.table2, operation.joinColumn!, operationsUsed);
          }
          break;
        case 'UNION':
          if (operation.table2) {
            result = this.union(result, operation.table2, operationsUsed);
          }
          break;
        case 'INTERSECTION':
          if (operation.table2) {
            result = this.intersection(result, operation.table2, operationsUsed);
          }
          break;
        case 'DIFFERENCE':
          if (operation.table2) {
            result = this.difference(result, operation.table2, operationsUsed);
          }
          break;
      }
    }

    const endTime = performance.now();
    
    return {
      headers: result.headers,
      rows: result.rows,
      executionTime: endTime - startTime,
      operationsUsed
    };
  }

  private select(data: CSVData, condition: string, operations: string[]): CSVData {
    operations.push(`SELECT: Applying condition "${condition}"`);
    
    const filteredRows = data.rows.filter(row => {
      return this.evaluateCondition(row, data.headers, condition);
    });

    operations.push(`SELECT: Filtered ${data.rows.length} rows to ${filteredRows.rows}`);
    
    return {
      headers: data.headers,
      rows: filteredRows
    };
  }

  private project(data: CSVData, columns: string[], operations: string[]): CSVData {
    operations.push(`PROJECT: Selecting columns [${columns.join(', ')}]`);
    
    const columnIndices = columns.map(col => {
      const index = data.headers.indexOf(col);
      if (index === -1) {
        throw new Error(`Column "${col}" not found`);
      }
      return index;
    });

    const projectedRows = data.rows.map(row => 
      columnIndices.map(index => row[index])
    );

    operations.push(`PROJECT: Reduced from ${data.headers.length} to ${columns.length} columns`);
    
    return {
      headers: columns,
      rows: projectedRows
    };
  }

  private join(table1: CSVData, table2: CSVData, joinColumn: string, operations: string[]): CSVData {
    operations.push(`JOIN: Natural join on column "${joinColumn}"`);
    
    const table1Index = table1.headers.indexOf(joinColumn);
    const table2Index = table2.headers.indexOf(joinColumn);
    
    if (table1Index === -1 || table2Index === -1) {
      throw new Error(`Join column "${joinColumn}" not found in one or both tables`);
    }

    // Create combined headers (avoiding duplicate join column)
    const combinedHeaders = [
      ...table1.headers,
      ...table2.headers.filter(h => h !== joinColumn)
    ];

    const joinedRows: any[][] = [];
    
    for (const row1 of table1.rows) {
      for (const row2 of table2.rows) {
        if (row1[table1Index] === row2[table2Index]) {
          const combinedRow = [
            ...row1,
            ...row2.filter((_, index) => index !== table2Index)
          ];
          joinedRows.push(combinedRow);
        }
      }
    }

    operations.push(`JOIN: Produced ${joinedRows.length} rows from ${table1.rows.length} × ${table2.rows.length} combinations`);
    
    return {
      headers: combinedHeaders,
      rows: joinedRows
    };
  }

  private union(table1: CSVData, table2: CSVData, operations: string[]): CSVData {
    operations.push(`UNION: Combining tables with duplicate removal`);
    
    if (!this.areHeadersCompatible(table1.headers, table2.headers)) {
      throw new Error('Tables must have compatible schemas for UNION');
    }

    const combinedRows = [...table1.rows];
    let addedCount = 0;
    
    for (const row2 of table2.rows) {
      if (!this.rowExists(row2, combinedRows)) {
        combinedRows.push(row2);
        addedCount++;
      }
    }

    operations.push(`UNION: Added ${addedCount} unique rows from second table`);
    
    return {
      headers: table1.headers,
      rows: combinedRows
    };
  }

  private intersection(table1: CSVData, table2: CSVData, operations: string[]): CSVData {
    operations.push(`INTERSECTION: Finding common rows`);
    
    if (!this.areHeadersCompatible(table1.headers, table2.headers)) {
      throw new Error('Tables must have compatible schemas for INTERSECTION');
    }

    const intersectionRows = table1.rows.filter(row1 => 
      this.rowExists(row1, table2.rows)
    );

    operations.push(`INTERSECTION: Found ${intersectionRows.length} common rows`);
    
    return {
      headers: table1.headers,
      rows: intersectionRows
    };
  }

  private difference(table1: CSVData, table2: CSVData, operations: string[]): CSVData {
    operations.push(`DIFFERENCE: Finding rows in first table but not in second`);
    
    if (!this.areHeadersCompatible(table1.headers, table2.headers)) {
      throw new Error('Tables must have compatible schemas for DIFFERENCE');
    }

    const differenceRows = table1.rows.filter(row1 => 
      !this.rowExists(row1, table2.rows)
    );

    operations.push(`DIFFERENCE: Found ${differenceRows.length} unique rows`);
    
    return {
      headers: table1.headers,
      rows: differenceRows
    };
  }

  private evaluateCondition(row: any[], headers: string[], condition: string): boolean {
    // Simple condition parser - in production, you'd use a proper parser
    // Supports: column = value, column > value, column < value, etc.
    
    const operators = ['>=', '<=', '!=', '=', '>', '<'];
    let operator = '';
    let parts: string[] = [];
    
    for (const op of operators) {
      if (condition.includes(op)) {
        operator = op;
        parts = condition.split(op).map(p => p.trim());
        break;
      }
    }
    
    if (parts.length !== 2) {
      return true; // Invalid condition, return all rows
    }
    
    const columnName = parts[0];
    const value = parts[1].replace(/['"]/g, ''); // Remove quotes
    const columnIndex = headers.indexOf(columnName);
    
    if (columnIndex === -1) {
      return true; // Column not found
    }
    
    const cellValue = row[columnIndex];
    const numericValue = parseFloat(value);
    const numericCellValue = parseFloat(cellValue);
    
    switch (operator) {
      case '=':
        return cellValue.toString() === value;
      case '!=':
        return cellValue.toString() !== value;
      case '>':
        return !isNaN(numericCellValue) && !isNaN(numericValue) && numericCellValue > numericValue;
      case '<':
        return !isNaN(numericCellValue) && !isNaN(numericValue) && numericCellValue < numericValue;
      case '>=':
        return !isNaN(numericCellValue) && !isNaN(numericValue) && numericCellValue >= numericValue;
      case '<=':
        return !isNaN(numericCellValue) && !isNaN(numericValue) && numericCellValue <= numericValue;
      default:
        return true;
    }
  }

  private areHeadersCompatible(headers1: string[], headers2: string[]): boolean {
    return headers1.length === headers2.length && 
           headers1.every((header, index) => header === headers2[index]);
  }

  private rowExists(row: any[], rows: any[][]): boolean {
    return rows.some(existingRow => 
      existingRow.length === row.length && 
      existingRow.every((cell, index) => cell === row[index])
    );
  }

  public parseCSV(csvText: string): CSVData {
    const lines = csvText.trim().split('\n');
    const headers = lines[0].split(',').map(h => h.trim());
    const rows = lines.slice(1).map(line => 
      line.split(',').map(cell => {
        const trimmed = cell.trim();
        // Try to parse as number, otherwise keep as string
        const num = parseFloat(trimmed);
        return isNaN(num) ? trimmed : num;
      })
    );
    
    return { headers, rows };
  }

  public generateSampleData(): { employees: CSVData; departments: CSVData; projects: CSVData } {
    const employees: CSVData = {
      headers: ['id', 'name', 'department_id', 'salary', 'age'],
      rows: [
        [1, 'Alice Johnson', 1, 75000, 28],
        [2, 'Bob Smith', 2, 82000, 34],
        [3, 'Carol Davis', 1, 68000, 26],
        [4, 'David Wilson', 3, 95000, 42],
        [5, 'Eve Brown', 2, 71000, 29],
        [6, 'Frank Miller', 1, 79000, 35],
        [7, 'Grace Lee', 3, 88000, 31],
        [8, 'Henry Taylor', 2, 73000, 27]
      ]
    };

    const departments: CSVData = {
      headers: ['id', 'name', 'budget'],
      rows: [
        [1, 'Engineering', 500000],
        [2, 'Marketing', 300000],
        [3, 'Sales', 400000]
      ]
    };

    const projects: CSVData = {
      headers: ['id', 'name', 'department_id', 'budget'],
      rows: [
        [1, 'Web Platform', 1, 150000],
        [2, 'Mobile App', 1, 120000],
        [3, 'Ad Campaign', 2, 80000],
        [4, 'Sales Portal', 3, 100000]
      ]
    };

    return { employees, departments, projects };
  }
}