import React from 'react';
import { Brain, Shield, Target } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-indigo-900 via-purple-900 to-pink-900 text-white shadow-2xl">
      <div className="container mx-auto px-6 py-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Brain className="w-12 h-12 text-cyan-400" />
              <Shield className="w-6 h-6 text-green-400 absolute -top-1 -right-1" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-green-400 bg-clip-text text-transparent">
                FairRec AI
              </h1>
              <p className="text-indigo-200 text-sm">Fairness-Aware Movie Recommendation System</p>
            </div>
          </div>
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm">
              <Target className="w-5 h-5 text-green-400" />
              <span className="text-sm font-medium">Bias-Free Recommendations</span>
            </div>
            <div className="text-right">
              <p className="text-sm text-indigo-200">Advanced ML Project</p>
              <p className="text-xs text-indigo-300">Jan 2025 - May 2025</p>
            </div>
          </div>
        </div>
        
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
            <h3 className="font-semibold text-cyan-400 mb-2">Adversarial Learning</h3>
            <p className="text-sm text-indigo-200">Separates bias-aware and bias-free user embeddings</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
            <h3 className="font-semibold text-green-400 mb-2">Orthogonality Regularization</h3>
            <p className="text-sm text-indigo-200">Ensures independence between bias components</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
            <h3 className="font-semibold text-pink-400 mb-2">Fairness Metrics</h3>
            <p className="text-sm text-indigo-200">Real-time bias detection and mitigation</p>
          </div>
        </div>
      </div>
    </header>
  );
};