import React, { useState, useEffect } from 'react';
import { BPlusTreeImplementation } from '../utils/bPlusTree';
import { TreePine, Plus, Search, Trash2, RotateCcw } from 'lucide-react';

export const BPlusTreeDemo: React.FC = () => {
  const [tree] = useState(() => new BPlusTreeImplementation(4));
  const [operations, setOperations] = useState<string[]>([]);
  const [inputKey, setInputKey] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [searchKey, setSearchKey] = useState('');
  const [deleteKey, setDeleteKey] = useState('');
  const [visualData, setVisualData] = useState<any>({ nodes: [], edges: [] });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    updateVisualization();
  }, []);

  const updateVisualization = () => {
    const data = tree.getVisualizationData();
    setVisualData(data);
  };

  const handleInsert = async () => {
    if (!inputKey || !inputValue) return;
    
    setIsLoading(true);
    const key = parseInt(inputKey);
    const result = tree.insert(key, inputValue);
    
    setOperations(prev => [...prev, ...result.operations, '---']);
    updateVisualization();
    setInputKey('');
    setInputValue('');
    setIsLoading(false);
  };

  const handleSearch = async () => {
    if (!searchKey) return;
    
    setIsLoading(true);
    const key = parseInt(searchKey);
    const result = tree.search(key);
    
    setOperations(prev => [...prev, ...result.operations, 
      result.found ? `✅ Found: ${JSON.stringify(result.value)}` : '❌ Not found', '---']);
    setSearchKey('');
    setIsLoading(false);
  };

  const handleDelete = async () => {
    if (!deleteKey) return;
    
    setIsLoading(true);
    const key = parseInt(deleteKey);
    const result = tree.delete(key);
    
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
      { key: 10, value: 'Ten' },
      { key: 20, value: 'Twenty' },
      { key: 5, value: 'Five' },
      { key: 6, value: 'Six' },
      { key: 12, value: 'Twelve' },
      { key: 30, value: 'Thirty' },
      { key: 7, value: 'Seven' },
      { key: 17, value: 'Seventeen' }
    ];

    sampleData.forEach(({ key, value }) => {
      const result = tree.insert(key, value);
      setOperations(prev => [...prev, ...result.operations, '---']);
    });
    
    updateVisualization();
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center mb-6">
        <TreePine className="w-6 h-6 text-green-600 mr-3" />
        <h2 className="text-2xl font-bold text-gray-800">B+ Tree Implementation</h2>
      </div>

      {/* Controls */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-green-50 rounded-lg p-4">
          <h3 className="font-semibold text-green-800 mb-3">Insert Operation</h3>
          <div className="space-y-2">
            <input
              type="number"
              placeholder="Key"
              value={inputKey}
              onChange={(e) => setInputKey(e.target.value)}
              className="w-full px-3 py-2 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
            <input
              type="text"
              placeholder="Value"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="w-full px-3 py-2 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
            <button
              onClick={handleInsert}
              disabled={isLoading || !inputKey || !inputValue}
              className="w-full flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
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
              type="number"
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
              type="number"
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

      {/* Tree Visualization */}
      <div className="mb-6">
        <h3 className="font-semibold text-gray-800 mb-3">Tree Structure</h3>
        <div className="bg-gray-50 rounded-lg p-4 min-h-[200px]">
          {visualData.nodes.length > 0 ? (
            <div className="space-y-4">
              {/* Simple text-based visualization */}
              {visualData.nodes.map((node: any) => (
                <div
                  key={node.id}
                  className={`inline-block mx-2 p-3 rounded-lg border-2 ${
                    node.isLeaf 
                      ? 'bg-green-100 border-green-300 text-green-800' 
                      : 'bg-blue-100 border-blue-300 text-blue-800'
                  }`}
                >
                  <div className="text-xs font-medium mb-1">
                    {node.isLeaf ? 'Leaf' : 'Internal'}
                  </div>
                  <div className="font-mono text-sm">
                    [{node.keys.join(', ')}]
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-500 py-8">
              Tree is empty. Insert some values to see the structure.
            </div>
          )}
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