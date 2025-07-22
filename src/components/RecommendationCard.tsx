import React from 'react';
import { Recommendation } from '../types';
import { Star, Shield, TrendingUp, Clock, Globe, Users } from 'lucide-react';

interface RecommendationCardProps {
  recommendation: Recommendation;
  rank: number;
}

export const RecommendationCard: React.FC<RecommendationCardProps> = ({
  recommendation,
  rank
}) => {
  const { movie, score, biasScore, fairnessScore, explanation, confidence } = recommendation;

  const getBiasColor = (bias: number) => {
    if (bias < 0.3) return 'text-green-600 bg-green-100';
    if (bias < 0.6) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getFairnessColor = (fairness: number) => {
    if (fairness > 0.7) return 'text-green-600 bg-green-100';
    if (fairness > 0.4) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="relative">
        <img
          src={movie.poster}
          alt={movie.title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-4 left-4 bg-indigo-600 text-white px-3 py-1 rounded-full text-sm font-bold">
          #{rank}
        </div>
        <div className="absolute top-4 right-4 bg-black/70 text-white px-2 py-1 rounded-lg text-sm flex items-center">
          <Star className="w-4 h-4 mr-1 text-yellow-400" />
          {movie.rating}
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{movie.title}</h3>
        <p className="text-gray-600 text-sm mb-3">{movie.plot}</p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {movie.genre.map((genre, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
            >
              {genre}
            </span>
          ))}
        </div>
        
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex items-center text-sm text-gray-600">
            <Clock className="w-4 h-4 mr-2" />
            {movie.duration} min
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Globe className="w-4 h-4 mr-2" />
            {movie.language}
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Users className="w-4 h-4 mr-2" />
            {movie.director}
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <TrendingUp className="w-4 h-4 mr-2" />
            {movie.year}
          </div>
        </div>
        
        <div className="space-y-3 mb-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">Recommendation Score</span>
            <div className="flex items-center">
              <div className="w-24 bg-gray-200 rounded-full h-2 mr-2">
                <div
                  className="bg-indigo-600 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${score * 100}%` }}
                />
              </div>
              <span className="text-sm font-bold text-indigo-600">
                {Math.round(score * 100)}%
              </span>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">Bias Score</span>
            <div className="flex items-center">
              <Shield className="w-4 h-4 mr-2 text-gray-500" />
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getBiasColor(biasScore)}`}>
                {Math.round(biasScore * 100)}%
              </span>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">Fairness Score</span>
            <div className="flex items-center">
              <TrendingUp className="w-4 h-4 mr-2 text-gray-500" />
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getFairnessColor(fairnessScore)}`}>
                {Math.round(fairnessScore * 100)}%
              </span>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">Confidence</span>
            <span className="text-sm font-bold text-gray-800">
              {Math.round(confidence * 100)}%
            </span>
          </div>
        </div>
        
        <div className="bg-gray-50 rounded-lg p-3">
          <p className="text-xs text-gray-600 leading-relaxed">{explanation}</p>
        </div>
      </div>
    </div>
  );
};