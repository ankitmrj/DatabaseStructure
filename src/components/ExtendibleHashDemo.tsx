import React, { useState, useEffect } from 'react';
import { ExtendibleHashingImplementation } from '../utils/extendibleHashing';
import { Hash, Plus, Search, Trash2, RotateCcw } from 'lucide-react';

export const ExtendibleHashDemo: React.FC = () => {
  const [hashTable] = useState(() => new ExtendibleHashingImplementation(3));
  const [operations, setOperations] = useState<string[]>([]);
  const [inputKey, setInputKey] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [searchKey, setSearchKey] = useState('');
  const [deleteKey, setDeleteKey] = useState('');
  const [visualData, setVisualData] = useState<any>({ directory: [], buckets: [], globalDepth: 0 });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    updateVisualization();
  }, []);

  const updateVisualization = () => {
    const data = hashTable.getVisualizationData();
    setVisualData(data);
  };

  const handleInsert = async () => {
    if (!inputKey || !inputValue) return;
    
    setIsLoading(true);
    const result = hashTable.insert(inputKey, inputValue);
    
    setOperations(prev => [...prev, ...result.operations, '---']);
    updateVisualization();
    setInputKey('');
    setInputValue('');
    setIsLoading(false);
  };

  const handleSearch = async () => {
    if (!searchKey) return;
    
    setIsLoading(true);
    const result = hashTable.search(searchKey);
    
    setOperations(prev => [...prev, ...result.operations, 
      result.found ? `✅ Found: ${JSON.stringify(result.value)}` : '❌ Not found', '---']);
    setSearchKey('');
    setIsLoading(false);
  };

  const handleDelete = async () => {
    if (!deleteKey) return;
    
    setIsLoading(true);
    const result = hashTable.delete(deleteKey);
    
    setOperations(prev => [...prev, ...result.operations, 
      result.success ? '✅ Deletion successful' : '❌ Key not found', '---']);
    updateVisualization();
    setDeleteKey('');
    setIsLoading(false);
  };

  const clearOperations = () => {
    setOperations([]);
  };

  const insertSampleData = () => {
    const sampleData = [
      { key: 'Alice', value: { id: 1, dept: 'Engineering' } },
      { key: 'Bob', value: { id: 2, dept: 'Marketing' } },
      { key: 'Carol', value: { id: 3, dept: 'Sales' } },
      { key: 'David', value: { id: 4, dept: 'Engineering' } },
      { key: 'Eve', value: { id: 5, dept: 'HR' } },
      { key: 'Frank', value: { id: 6, dept: 'Finance' } },
      { key: 'Grace', value: { id: 7, dept: 'Marketing' } }
    ];

    sampleData.forEach(({ key, value }) => {
      const result = hashTable.insert(key, value);
      setOperations(prev => [...prev, ...result.operations, '---']);
    });
    
    updateVisualization();
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center mb-6">
        <Hash className="w-6 h-6 text-purple-600 mr-3" />
        <h2 className="text-2xl font-bold text-gray-800">Extendible Hashing Implementation</h2>
      </div>

      {/* Controls */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-purple-50 rounded-lg p-4">
          <h3 className="font-semibold text-purple-800 mb-3">Insert Operation</h3>
          <div className="space-y-2">
            <input
              type="text"
              placeholder="Key"
              value={inputKey}
              onChange={(e) => setInputKey(e.target.value)}
              className="w-full px-3 py-2 border border-purple-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
            <input
              type="text"
              placeholder="Value"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="w-full px-3 py-2 border border-purple-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
            <button
              onClick={handleInsert}
              disabled={isLoading || !inputKey || !inputValue}
              className="w-full flex items-center justify-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50"
            >
              <Plus className="w-4 h-4 mr-2" />
              Insert
            </button>
          </div>
        </div>

        <div className="bg-blue-50 rounded-lg p-4">
          <h3 className="font-semibold text-blue-800 mb-3">Search Operation</h3>
          <div className="space-y-2">
            <input
              type="text"
              placeholder="Search Key"
              value={searchKey}
              onChange={(e) => setSearchKey(e.target.value)}
              className="w-full px-3 py-2 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button
              onClick={handleSearch}
              disabled={isLoading || !searchKey}
              className="w-full flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              <Search className="w-4 h-4 mr-2" />
              Search
            </button>
          </div>
        </div>

        <div className="bg-red-50 rounded-lg p-4">
          <h3 className="font-semibold text-red-800 mb-3">Delete Operation</h3>
          <div className="space-y-2">
            <input
              type="text"
              placeholder="Delete Key"
              value={deleteKey}
              onChange={(e) => setDeleteKey(e.target.value)}
              className="w-full px-3 py-2 border border-red-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
            <button
              onClick={handleDelete}
              disabled={isLoading || !deleteKey}
              className="w-full flex items-center justify-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Delete
            </button>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={insertSampleData}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          Insert Sample Data
        </button>
        <button
          onClick={clearOperations}
          className="flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
        >
          <RotateCcw className="w-4 h-4 mr-2" />
          Clear Log
        </button>
      </div>

      {/* Hash Table Visualization */}
      <div className="mb-6">
        <h3 className="font-semibold text-gray-800 mb-3">Hash Table Structure</h3>
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="mb-4">
            <span className="text-sm font-medium text-gray-600">
              Global Depth: <span className="font-mono text-purple-600">{visualData.globalDepth}</span>
            </span>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Directory */}
            <div>
              <h4 className="font-medium text-gray-700 mb-2">Directory</h4>
              <div className="space-y-1">
                {visualData.directory.map((entry: any) => (
                  <div key={entry.index} className="flex items-center space-x-2 text-sm">
                    <span className="w-8 text-center font-mono bg-gray-200 rounded px-1">
                      {entry.index}
                    </span>
                    <span className="font-mono text-purple-600">
                      {entry.binaryIndex}
                    </span>
                    <span className="text-gray-400">→</span>
                    <span className="font-mono text-blue-600">
                      {entry.bucketId}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Buckets */}
            <div>
              <h4 className="font-medium text-gray-700 mb-2">Buckets</h4>
              <div className="space-y-2">
                {visualData.buckets.map((bucket: any) => (
                  <div key={bucket.id} className="border border-gray-300 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-mono text-sm text-blue-600">{bucket.id}</span>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-gray-500">
                          Local Depth: {bucket.localDepth}
                        </span>
                        <div className="w-16 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-purple-500 h-2 rounded-full"
                            style={{ width: `${bucket.utilization}%` }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="space-y-1">
                      {bucket.records.map((record: any, index: number) => (
                        <div key={index} className="text-xs font-mono bg-gray-100 rounded px-2 py-1">
                          {record.key}: {JSON.stringify(record.value)}
                        </div>
                      ))}
                      {bucket.records.length === 0 && (
                        <div className="text-xs text-gray-400 italic">Empty bucket</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Operations Log */}
      <div>
        <h3 className="font-semibold text-gray-800 mb-3">Operations Log</h3>
        <div className="bg-gray-900 text-green-400 rounded-lg p-4 h-64 overflow-y-auto font-mono text-sm">
          {operations.length > 0 ? (
            operations.map((op, index) => (
              <div key={index} className={op === '---' ? 'border-b border-gray-700 my-2' : ''}>
                {op !== '---' && `> ${op}`}
              </div>
            ))
          ) : (
            <div className="text-gray-500">No operations yet. Try inserting, searching, or deleting values.</div>
          )}
        </div>
      </div>
    </div>
  );
};