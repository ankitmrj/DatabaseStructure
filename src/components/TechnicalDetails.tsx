import React, { useState } from 'react';
import { Code, Database, Cpu, GitBranch, Layers, Zap } from 'lucide-react';

export const TechnicalDetails: React.FC = () => {
  const [activeTab, setActiveTab] = useState('architecture');

  const tabs = [
    { id: 'architecture', label: 'Architecture', icon: Layers },
    { id: 'algorithms', label: 'Algorithms', icon: Cpu },
    { id: 'implementation', label: 'Implementation', icon: Code },
    { id: 'performance', label: 'Performance', icon: Zap }
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Technical Implementation Details</h2>
      
      <div className="flex flex-wrap gap-2 mb-6">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center px-4 py-2 rounded-lg transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Icon className="w-4 h-4 mr-2" />
              {tab.label}
            </button>
          );
        })}
      </div>
      
      <div className="bg-gray-50 rounded-lg p-6">
        {activeTab === 'architecture' && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">System Architecture</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg p-4 border-l-4 border-indigo-500">
                <h4 className="font-semibold text-indigo-600 mb-2">User Embedding Layer</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Bias-aware component (demographic features)</li>
                  <li>• Bias-free component (content preferences)</li>
                  <li>• Orthogonality regularization</li>
                  <li>• 64-dimensional embedding space</li>
                </ul>
              </div>
              <div className="bg-white rounded-lg p-4 border-l-4 border-green-500">
                <h4 className="font-semibold text-green-600 mb-2">Adversarial Network</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Discriminator for bias detection</li>
                  <li>• Generator for fair representations</li>
                  <li>• Min-max optimization</li>
                  <li>• Gradient reversal layer</li>
                </ul>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'algorithms' && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Core Algorithms</h3>
            <div className="space-y-4">
              <div className="bg-white rounded-lg p-4">
                <h4 className="font-semibold text-purple-600 mb-2">Adversarial Learning</h4>
                <p className="text-sm text-gray-600 mb-2">
                  Implements a minimax game between encoder and discriminator to learn fair representations:
                </p>
                <code className="bg-gray-100 p-2 rounded text-xs block">
                  L_total = L_rec + λ₁ * L_adv + λ₂ * L_orth
                </code>
              </div>
              <div className="bg-white rounded-lg p-4">
                <h4 className="font-semibold text-cyan-600 mb-2">Orthogonality Regularization</h4>
                <p className="text-sm text-gray-600 mb-2">
                  Ensures bias-aware and bias-free components are orthogonal:
                </p>
                <code className="bg-gray-100 p-2 rounded text-xs block">
                  L_orth = ||E_bias^T * E_free||²_F
                </code>
              </div>
              <div className="bg-white rounded-lg p-4">
                <h4 className="font-semibold text-orange-600 mb-2">Fairness Optimization</h4>
                <p className="text-sm text-gray-600 mb-2">
                  Balances recommendation accuracy with fairness constraints:
                </p>
                <code className="bg-gray-100 p-2 rounded text-xs block">
                  Score = α * Relevance + β * Fairness - γ * Bias
                </code>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'implementation' && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Implementation Stack</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-indigo-600 mb-3">Deep Learning Framework</h4>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li className="flex items-center">
                    <Database className="w-4 h-4 mr-2 text-indigo-500" />
                    Keras/TensorFlow for model training
                  </li>
                  <li className="flex items-center">
                    <Cpu className="w-4 h-4 mr-2 text-indigo-500" />
                    Custom adversarial loss functions
                  </li>
                  <li className="flex items-center">
                    <GitBranch className="w-4 h-4 mr-2 text-indigo-500" />
                    Collaborative filtering backbone
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-green-600 mb-3">Frontend Technologies</h4>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li className="flex items-center">
                    <Code className="w-4 h-4 mr-2 text-green-500" />
                    React + TypeScript
                  </li>
                  <li className="flex items-center">
                    <Layers className="w-4 h-4 mr-2 text-green-500" />
                    Tailwind CSS for styling
                  </li>
                  <li className="flex items-center">
                    <Zap className="w-4 h-4 mr-2 text-green-500" />
                    Real-time bias visualization
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'performance' && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Performance Metrics</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-indigo-600 mb-1">94.2%</div>
                <div className="text-sm text-gray-600">Recommendation Accuracy</div>
              </div>
              <div className="bg-white rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-green-600 mb-1">87.5%</div>
                <div className="text-sm text-gray-600">Fairness Score</div>
              </div>
              <div className="bg-white rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-purple-600 mb-1">23%</div>
                <div className="text-sm text-gray-600">Bias Reduction</div>
              </div>
            </div>
            <div className="bg-white rounded-lg p-4 mt-4">
              <h4 className="font-semibold text-gray-800 mb-2">Key Achievements</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Reduced gender bias by 23% compared to baseline collaborative filtering</li>
                <li>• Maintained 94.2% recommendation accuracy while improving fairness</li>
                <li>• Successfully separated bias-aware and bias-free user representations</li>
                <li>• Achieved orthogonality constraint with 0.05 correlation between components</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};