import React, { useState } from 'react';
import { DatabaseHeader } from './components/DatabaseHeader';
import { BPlusTreeDemo } from './components/BPlusTreeDemo';
import { ExtendibleHashDemo } from './components/ExtendibleHashDemo';
import { RelationalAlgebraDemo } from './components/RelationalAlgebraDemo';
import { DatabaseFooter } from './components/DatabaseFooter';
import { TreePine, Hash, Database } from 'lucide-react';

function App() {
  const [activeTab, setActiveTab] = useState('btree');

  const tabs = [
    { id: 'btree', label: 'B+ Trees', icon: TreePine, color: 'green' },
    { id: 'hash', label: 'Extendible Hashing', icon: Hash, color: 'purple' },
    { id: 'algebra', label: 'Relational Algebra', icon: Database, color: 'blue' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <DatabaseHeader />
      
      <main className="container mx-auto px-6 py-8">
        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                  isActive
                    ? `bg-${tab.color}-600 text-white shadow-lg`
                    : 'bg-white text-gray-700 hover:bg-gray-50 shadow-md'
                }`}
              >
                <Icon className="w-5 h-5 mr-2" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Content */}
        <div className="mb-8">
          {activeTab === 'btree' && <BPlusTreeDemo />}
          {activeTab === 'hash' && <ExtendibleHashDemo />}
          {activeTab === 'algebra' && <RelationalAlgebraDemo />}
        </div>

        {/* Technical Overview */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Project Overview</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-green-50 rounded-lg p-4 border-l-4 border-green-500">
              <h3 className="font-semibold text-green-800 mb-2">B+ Tree Implementation</h3>
              <ul className="text-sm text-green-700 space-y-1">
                <li>• Order-4 B+ tree with efficient splits and merges</li>
                <li>• Leaf node linking for range queries</li>
                <li>• Balanced tree maintenance with O(log n) operations</li>
                <li>• Visual representation of tree structure</li>
              </ul>
            </div>
            
            <div className="bg-purple-50 rounded-lg p-4 border-l-4 border-purple-500">
              <h3 className="font-semibold text-purple-800 mb-2">Extendible Hashing</h3>
              <ul className="text-sm text-purple-700 space-y-1">
                <li>• Dynamic hash table with directory doubling</li>
                <li>• Bucket splitting with local depth management</li>
                <li>• Efficient insertion, deletion, and search</li>
                <li>• Visual directory and bucket representation</li>
              </ul>
            </div>
            
            <div className="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-500">
              <h3 className="font-semibold text-blue-800 mb-2">Relational Algebra</h3>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Complete set of relational operations</li>
                <li>• SELECT, PROJECT, JOIN, UNION operations</li>
                <li>• Query pipeline with operation chaining</li>
                <li>• CSV data processing and visualization</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-6 bg-gray-50 rounded-lg p-4">
            <h4 className="font-semibold text-gray-800 mb-2">Performance Characteristics</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <span className="font-medium text-green-600">B+ Tree:</span>
                <p className="text-gray-600">O(log n) search, insert, delete with guaranteed balance</p>
              </div>
              <div>
                <span className="font-medium text-purple-600">Extendible Hash:</span>
                <p className="text-gray-600">O(1) average case with dynamic expansion</p>
              </div>
              <div>
                <span className="font-medium text-blue-600">Query Engine:</span>
                <p className="text-gray-600">Optimized relational operations with pipeline processing</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <DatabaseFooter />
    </div>
  );
}

export default App;