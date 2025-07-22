import React from 'react';
import { Database, Code, TreePine, Hash } from 'lucide-react';

export const DatabaseHeader: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 text-white shadow-2xl">
      <div className="container mx-auto px-6 py-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Database className="w-12 h-12 text-blue-400" />
              <Code className="w-6 h-6 text-green-400 absolute -top-1 -right-1" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
                Database Structures & Query Engine
              </h1>
              <p className="text-blue-200 text-sm">Advanced Data Structures Implementation</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-blue-200">Systems Programming Project</p>
            <p className="text-xs text-blue-300">Jul 2024 - Dec 2024</p>
          </div>
        </div>
        
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
            <div className="flex items-center mb-2">
              <TreePine className="w-5 h-5 text-green-400 mr-2" />
              <h3 className="font-semibold text-green-400">B+ Trees</h3>
            </div>
            <p className="text-sm text-blue-200">Efficient insertion, deletion, and balancing with splits/merges</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
            <div className="flex items-center mb-2">
              <Hash className="w-5 h-5 text-purple-400 mr-2" />
              <h3 className="font-semibold text-purple-400">Extendible Hashing</h3>
            </div>
            <p className="text-sm text-blue-200">Dynamic hashing with expandable buckets and directory doubling</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
            <div className="flex items-center mb-2">
              <Code className="w-5 h-5 text-yellow-400 mr-2" />
              <h3 className="font-semibold text-yellow-400">Relational Algebra</h3>
            </div>
            <p className="text-sm text-blue-200">Complex logical and arithmetic query operations on CSV data</p>
          </div>
        </div>
      </div>
    </header>
  );
};