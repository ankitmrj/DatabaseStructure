import React from 'react';
import { BiasMetrics } from '../types';
import { Shield, TrendingDown, AlertTriangle, CheckCircle } from 'lucide-react';

interface BiasMetricsProps {
  metrics: BiasMetrics;
  adversarialLoss: number;
  orthogonalityLoss: number;
}

export const BiasMetricsComponent: React.FC<BiasMetricsProps> = ({
  metrics,
  adversarialLoss,
  orthogonalityLoss
}) => {
  const getMetricColor = (value: number, inverse: boolean = false) => {
    const threshold = inverse ? 0.7 : 0.3;
    if (inverse) {
      if (value > threshold) return 'text-green-600 bg-green-100';
      if (value > 0.4) return 'text-yellow-600 bg-yellow-100';
      return 'text-red-600 bg-red-100';
    } else {
      if (value < threshold) return 'text-green-600 bg-green-100';
      if (value < 0.6) return 'text-yellow-600 bg-yellow-100';
      return 'text-red-600 bg-red-100';
    }
  };

  const getMetricIcon = (value: number, inverse: boolean = false) => {
    const isGood = inverse ? value > 0.7 : value < 0.3;
    return isGood ? (
      <CheckCircle className="w-5 h-5 text-green-600" />
    ) : (
      <AlertTriangle className="w-5 h-5 text-yellow-600" />
    );
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
      <div className="flex items-center mb-6">
        <Shield className="w-6 h-6 text-indigo-600 mr-3" />
        <h2 className="text-2xl font-bold text-gray-800">Fairness & Bias Analysis</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div className="text-center">
          <div className="flex items-center justify-center mb-2">
            {getMetricIcon(metrics.genderBias)}
          </div>
          <h3 className="font-semibold text-gray-700 mb-1">Gender Bias</h3>
          <div className={`px-3 py-2 rounded-full text-sm font-bold ${getMetricColor(metrics.genderBias)}`}>
            {Math.round(metrics.genderBias * 100)}%
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
            <div
              className="bg-gradient-to-r from-green-400 to-red-400 h-2 rounded-full transition-all duration-500"
              style={{ width: `${metrics.genderBias * 100}%` }}
            />
          </div>
        </div>
        
        <div className="text-center">
          <div className="flex items-center justify-center mb-2">
            {getMetricIcon(metrics.ageBias)}
          </div>
          <h3 className="font-semibold text-gray-700 mb-1">Age Bias</h3>
          <div className={`px-3 py-2 rounded-full text-sm font-bold ${getMetricColor(metrics.ageBias)}`}>
            {Math.round(metrics.ageBias * 100)}%
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
            <div
              className="bg-gradient-to-r from-green-400 to-red-400 h-2 rounded-full transition-all duration-500"
              style={{ width: `${metrics.ageBias * 100}%` }}
            />
          </div>
        </div>
        
        <div className="text-center">
          <div className="flex items-center justify-center mb-2">
            {getMetricIcon(metrics.occupationBias)}
          </div>
          <h3 className="font-semibold text-gray-700 mb-1">Occupation Bias</h3>
          <div className={`px-3 py-2 rounded-full text-sm font-bold ${getMetricColor(metrics.occupationBias)}`}>
            {Math.round(metrics.occupationBias * 100)}%
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
            <div
              className="bg-gradient-to-r from-green-400 to-red-400 h-2 rounded-full transition-all duration-500"
              style={{ width: `${metrics.occupationBias * 100}%` }}
            />
          </div>
        </div>
        
        <div className="text-center">
          <div className="flex items-center justify-center mb-2">
            {getMetricIcon(metrics.overallFairness, true)}
          </div>
          <h3 className="font-semibold text-gray-700 mb-1">Overall Fairness</h3>
          <div className={`px-3 py-2 rounded-full text-sm font-bold ${getMetricColor(metrics.overallFairness, true)}`}>
            {Math.round(metrics.overallFairness * 100)}%
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
            <div
              className="bg-gradient-to-r from-red-400 to-green-400 h-2 rounded-full transition-all duration-500"
              style={{ width: `${metrics.overallFairness * 100}%` }}
            />
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg p-4">
          <div className="flex items-center mb-3">
            <TrendingDown className="w-5 h-5 text-purple-600 mr-2" />
            <h4 className="font-semibold text-purple-800">Adversarial Loss</h4>
          </div>
          <div className="text-2xl font-bold text-purple-600 mb-1">
            {adversarialLoss.toFixed(4)}
          </div>
          <p className="text-sm text-purple-700">
            Measures separation between bias-aware and bias-free components
          </p>
        </div>
        
        <div className="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-lg p-4">
          <div className="flex items-center mb-3">
            <TrendingDown className="w-5 h-5 text-cyan-600 mr-2" />
            <h4 className="font-semibold text-cyan-800">Orthogonality Loss</h4>
          </div>
          <div className="text-2xl font-bold text-cyan-600 mb-1">
            {orthogonalityLoss.toFixed(4)}
          </div>
          <p className="text-sm text-cyan-700">
            Ensures independence between embedding components
          </p>
        </div>
      </div>
      
      <div className="mt-6 bg-gray-50 rounded-lg p-4">
        <h4 className="font-semibold text-gray-800 mb-2">Technical Implementation</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div>
            <span className="font-medium text-indigo-600">Adversarial Training:</span>
            <p className="text-gray-600">Separates user embeddings into bias-aware and bias-free components</p>
          </div>
          <div>
            <span className="font-medium text-green-600">Orthogonality Constraint:</span>
            <p className="text-gray-600">Ensures embedding components capture independent information</p>
          </div>
          <div>
            <span className="font-medium text-purple-600">Fairness Optimization:</span>
            <p className="text-gray-600">Balances content relevance with demographic fairness</p>
          </div>
        </div>
      </div>
    </div>
  );
};