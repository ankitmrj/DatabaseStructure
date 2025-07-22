export interface Movie {
  id: number;
  title: string;
  genre: string[];
  year: number;
  rating: number;
  director: string;
  cast: string[];
  poster: string;
  description: string;
  popularity: number;
}

export interface User {
  id: number;
  name: string;
  age: number;
  gender: string;
  location: string;
  preferences: string[];
  watchHistory: number[];
  biasScore: number;
}

export interface Recommendation {
  movie: Movie;
  score: number;
  biasAwareScore: number;
  biasFreeScore: number;
  fairnessScore: number;
  explanation: string;
}

export interface BiasMetrics {
  genderBias: number;
  ageBias: number;
  locationBias: number;
  overallFairness: number;
}

export interface UserEmbedding {
  biasAware: number[];
  biasFree: number[];
  combined: number[];
}