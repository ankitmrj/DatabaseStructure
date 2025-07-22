import React, { useState, useEffect } from 'react';
import { RelationalAlgebraEngine } from '../utils/relationalAlgebra';
import { CSVData, RelationalOperation } from '../types/database';
import { Database, Play, Download, Upload, RotateCcw } from 'lucide-react';

export const RelationalAlgebraDemo: React.FC = () => {
  const [engine] = useState(() => new RelationalAlgebraEngine());
  const [tables, setTables] = useState<{ [key: string]: CSVData }>({});
  const [selectedTable, setSelectedTable] = useState<string>('employees');
  const [queryResult, setQueryResult] = useState<any>(null);
  const [operations, setOperations] = useState<RelationalOperation[]>([]);
  const [currentOperation, setCurrentOperation] = useState<Partial<RelationalOperation>>({
    type: 'SELECT'
  });

  useEffect(() => {
    // Load sample data
    const sampleData = engine.generateSampleData();
    setTables(sampleData);
  }, [engine]);

  const executeQuery = () => {
    if (!tables[selectedTable] || operations.length === 0) return;

    const result = engine.executeQuery(tables[selectedTable], operations);
    setQueryResult(result);
  };

  const addOperation = () => {
    if (currentOperation.type) {
      setOperations(prev => [...prev, currentOperation as RelationalOperation]);
      setCurrentOperation({ type: 'SELECT' });
    }
  };

  const removeOperation = (index: number) => {
    setOperations(prev => prev.filter((_, i) => i !== index));
  };

  const clearOperations = () => {
    setOperations([]);
    setQueryResult(null);
  };

  const renderTable = (data: CSVData, title: string) => (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div className="bg-gray-50 px-4 py-2 border-b">
        <h4 className="font-medium text-gray-800">{title}</h4>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              {data.headers.map((header, index) => (
                <th key={index} className="px-3 py-2 text-left font-medium text-gray-700">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.rows.slice(0, 10).map((row, rowIndex) => (
              <tr key={rowIndex} className="border-t border-gray-100">
                {row.map((cell, cellIndex) => (
                  <td key={cellIndex} className="px-3 py-2 text-gray-600">
                    {typeof cell === 'object' ? JSON.stringify(cell) : cell.toString()}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {data.rows.length > 10 && (
        <div className="bg-gray-50 px-4 py-2 text-sm text-gray-500 text-center">
          Showing 10 of {data.rows.length} rows
        </div>
      )}
    </div>
  );

  const getOperationForm = () => {
    switch (currentOperation.type) {
      case 'SELECT':
        return (
          <input
            type="text"
            placeholder="Condition (e.g., salary > 75000)"
            value={currentOperation.condition || ''}
            onChange={(e) => setCurrentOperation(prev => ({ ...prev, condition: e.target.value }))}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        );
      case 'PROJECT':
        return (
          <input
            type="text"
            placeholder="Columns (comma-separated, e.g., name,salary)"
            value={currentOperation.columns?.join(',') || ''}
            onChange={(e) => setCurrentOperation(prev => ({ 
              ...prev, 
              columns: e.target.value.split(',').map(c => c.trim()).filter(c => c) 
            }))}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        );
      case 'JOIN':
        return (
          <div className="flex space-x-2 flex-1">
            <select
              value={currentOperation.joinColumn || ''}
              onChange={(e) => setCurrentOperation(prev => ({ ...prev, joinColumn: e.target.value }))}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select join column</option>
              <option value="id">id</option>
              <option value="department_id">department_id</option>
            </select>
            <select
              onChange={(e) => {
                const tableName = e.target.value;
                setCurrentOperation(prev => ({ ...prev, table2: tables[tableName] }));
              }}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select table to join</option>
              {Object.keys(tables).filter(name => name !== selectedTable).map(name => (
                <option key={name} value={name}>{name}</option>
              ))}
            </select>
          </div>
        );
      default:
        return (
          <div className="flex-1 text-gray-500 italic">
            Select operation type to configure parameters
          </div>
        );
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center mb-6">
        <Database className="w-6 h-6 text-blue-600 mr-3" />
        <h2 className="text-2xl font-bold text-gray-800">Relational Algebra Query Engine</h2>
      </div>

      {/* Table Selection */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Select Base Table</label>
        <select
          value={selectedTable}
          onChange={(e) => setSelectedTable(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          {Object.keys(tables).map(name => (
            <option key={name} value={name}>{name}</option>
          ))}
        </select>
      </div>

      {/* Operation Builder */}
      <div className="mb-6">
        <h3 className="font-semibold text-gray-800 mb-3">Build Query Operations</h3>
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-4">
            <select
              value={currentOperation.type}
              onChange={(e) => setCurrentOperation({ type: e.target.value as any })}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="SELECT">SELECT (σ)</option>
              <option value="PROJECT">PROJECT (π)</option>
              <option value="JOIN">JOIN (⋈)</option>
              <option value="UNION">UNION (∪)</option>
              <option value="INTERSECTION">INTERSECTION (∩)</option>
              <option value="DIFFERENCE">DIFFERENCE (-)</option>
            </select>
            {getOperationForm()}
            <button
              onClick={addOperation}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Add
            </button>
          </div>

          {/* Current Operations */}
          {operations.length > 0 && (
            <div className="space-y-2">
              <h4 className="font-medium text-gray-700">Query Pipeline:</h4>
              {operations.map((op, index) => (
                <div key={index} className="flex items-center justify-between bg-white rounded-lg p-3 border">
                  <div className="flex items-center space-x-2">
                    <span className="font-mono text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      {index + 1}
                    </span>
                    <span className="font-medium">{op.type}</span>
                    <span className="text-gray-600">
                      {op.condition || op.columns?.join(', ') || op.joinColumn || 'configured'}
                    </span>
                  </div>
                  <button
                    onClick={() => removeOperation(index)}
                    className="text-red-600 hover:text-red-800"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Execute Query */}
      <div className="flex space-x-2 mb-6">
        <button
          onClick={executeQuery}
          disabled={operations.length === 0}
          className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
        >
          <Play className="w-4 h-4 mr-2" />
          Execute Query
        </button>
        <button
          onClick={clearOperations}
          className="flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
        >
          <RotateCcw className="w-4 h-4 mr-2" />
          Clear
        </button>
      </div>

      {/* Results */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Source Table */}
        <div>
          <h3 className="font-semibold text-gray-800 mb-3">Source Table: {selectedTable}</h3>
          {tables[selectedTable] && renderTable(tables[selectedTable], `${selectedTable} (${tables[selectedTable].rows.length} rows)`)}
        </div>

        {/* Query Result */}
        <div>
          <h3 className="font-semibold text-gray-800 mb-3">Query Result</h3>
          {queryResult ? (
            <div>
              {renderTable(queryResult, `Result (${queryResult.rows.length} rows)`)}
              <div className="mt-4 bg-gray-50 rounded-lg p-3">
                <div className="text-sm text-gray-600">
                  <div>Execution Time: <span className="font-mono">{queryResult.executionTime.toFixed(2)}ms</span></div>
                  <div>Operations: {queryResult.operationsUsed.join(' → ')}</div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-gray-50 rounded-lg p-8 text-center text-gray-500">
              Execute a query to see results here
            </div>
          )}
        </div>
      </div>

      {/* Sample Tables */}
      <div className="mt-8">
        <h3 className="font-semibold text-gray-800 mb-4">Available Tables</h3>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {Object.entries(tables).map(([name, data]) => (
            <div key={name}>
              {renderTable(data, `${name} (${data.rows.length} rows)`)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};