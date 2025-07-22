import { User, Movie, Recommendation, BiasMetrics, UserEmbedding } from '../types';

export class FairnessAwareRecommendationEngine {
  private userEmbeddings: Map<string, UserEmbedding> = new Map();
  private movieEmbeddings: Map<string, number[]> = new Map();
  private adversarialLoss: number = 0;
  private orthogonalityLoss: number = 0;

  constructor() {
    this.initializeEmbeddings();
  }

  private initializeEmbeddings(): void {
    // Simulate pre-trained embeddings
    // In real implementation, these would come from your trained model
  }

  // Simulate adversarial learning to separate bias-aware and bias-free components
  private adversarialTraining(user: User): UserEmbedding {
    // Bias-aware component (captures demographic-dependent preferences)
    const biasAware = this.generateBiasAwareEmbedding(user);
    
    // Bias-free component (captures content-based preferences)
    const biasFree = this.generateBiasFreeEmbedding(user);
    
    // Combined embedding with orthogonality constraint
    const combined = this.combineEmbeddings(biasAware, biasFree);
    
    return { biasAware, biasFree, combined };
  }

  private generateBiasAwareEmbedding(user: User): number[] {
    // Simulate bias-aware embedding based on demographics
    const embedding = new Array(64).fill(0);
    
    // Gender influence
    if (user.gender === 'male') {
      embedding[0] = 0.8; embedding[1] = -0.3;
    } else if (user.gender === 'female') {
      embedding[0] = -0.5; embedding[1] = 0.7;
    }
    
    // Age influence
    const ageNorm = (user.age - 25) / 25;
    embedding[2] = ageNorm;
    
    // Occupation influence
    const occupationMap: { [key: string]: number } = {
      'Software Engineer': 0.6,
      'Data Scientist': 0.8,
      'Teacher': 0.3,
      'Student': -0.2,
      'Marketing Manager': 0.1
    };
    embedding[3] = occupationMap[user.occupation] || 0;
    
    return embedding.map(val => val + (Math.random() - 0.5) * 0.1);
  }

  private generateBiasFreeEmbedding(user: User): number[] {
    // Simulate bias-free embedding based on content preferences
    const embedding = new Array(64).fill(0);
    
    user.preferences.forEach((pref, index) => {
      const genreMap: { [key: string]: number[] } = {
        'Action': [0.9, 0.2, -0.1],
        'Drama': [-0.2, 0.8, 0.3],
        'Comedy': [0.1, -0.3, 0.9],
        'Sci-Fi': [0.7, -0.5, 0.2],
        'Thriller': [0.6, 0.4, -0.2],
        'Animation': [-0.1, 0.2, 0.8],
        'Biography': [-0.3, 0.9, 0.1],
        'Family': [0.2, 0.1, 0.7]
      };
      
      const genreVec = genreMap[pref] || [0, 0, 0];
      genreVec.forEach((val, i) => {
        if (embedding[index * 3 + i] !== undefined) {
          embedding[index * 3 + i] = val;
        }
      });
    });
    
    return embedding.map(val => val + (Math.random() - 0.5) * 0.05);
  }

  private combineEmbeddings(biasAware: number[], biasFree: number[]): number[] {
    // Apply orthogonality regularization
    const dotProduct = biasAware.reduce((sum, val, i) => sum + val * biasFree[i], 0);
    this.orthogonalityLoss = Math.abs(dotProduct);
    
    // Combine embeddings with learned weights
    const alpha = 0.3; // Weight for bias-aware component
    const beta = 0.7;  // Weight for bias-free component
    
    return biasAware.map((val, i) => alpha * val + beta * biasFree[i]);
  }

  private calculateMovieEmbedding(movie: Movie): number[] {
    const embedding = new Array(64).fill(0);
    
    // Genre encoding
    movie.genre.forEach((genre, index) => {
      const genreMap: { [key: string]: number[] } = {
        'Action': [0.9, 0.2, -0.1],
        'Drama': [-0.2, 0.8, 0.3],
        'Comedy': [0.1, -0.3, 0.9],
        'Sci-Fi': [0.7, -0.5, 0.2],
        'Thriller': [0.6, 0.4, -0.2],
        'Animation': [-0.1, 0.2, 0.8],
        'Biography': [-0.3, 0.9, 0.1],
        'Family': [0.2, 0.1, 0.7],
        'Adventure': [0.8, 0.1, 0.3],
        'Romance': [-0.4, 0.6, 0.5]
      };
      
      const genreVec = genreMap[genre] || [0, 0, 0];
      genreVec.forEach((val, i) => {
        if (embedding[index * 3 + i] !== undefined) {
          embedding[index * 3 + i] = val;
        }
      });
    });
    
    // Rating influence
    embedding[20] = (movie.rating - 5) / 5;
    
    // Year influence (recency bias)
    embedding[21] = (movie.year - 1990) / 30;
    
    return embedding;
  }

  private calculateSimilarity(userEmb: number[], movieEmb: number[]): number {
    const dotProduct = userEmb.reduce((sum, val, i) => sum + val * movieEmb[i], 0);
    const userNorm = Math.sqrt(userEmb.reduce((sum, val) => sum + val * val, 0));
    const movieNorm = Math.sqrt(movieEmb.reduce((sum, val) => sum + val * val, 0));
    
    return dotProduct / (userNorm * movieNorm + 1e-8);
  }

  private calculateBiasScore(user: User, movie: Movie): number {
    // Calculate potential bias based on demographic patterns
    let biasScore = 0;
    
    // Gender bias detection
    if (user.gender === 'male' && movie.genre.includes('Action')) {
      biasScore += 0.3;
    }
    if (user.gender === 'female' && movie.genre.includes('Romance')) {
      biasScore += 0.3;
    }
    
    // Age bias detection
    if (user.age < 25 && movie.genre.includes('Animation')) {
      biasScore += 0.2;
    }
    if (user.age > 40 && movie.genre.includes('Drama')) {
      biasScore += 0.2;
    }
    
    return Math.min(biasScore, 1.0);
  }

  private calculateFairnessScore(biasScore: number, contentScore: number): number {
    // Higher fairness when content relevance is high but bias is low
    return contentScore * (1 - biasScore);
  }

  public generateRecommendations(user: User, movies: Movie[], count: number = 5): Recommendation[] {
    const userEmbedding = this.adversarialTraining(user);
    
    const recommendations = movies.map(movie => {
      const movieEmbedding = this.calculateMovieEmbedding(movie);
      
      // Calculate scores using bias-free embedding primarily
      const contentScore = this.calculateSimilarity(userEmbedding.biasFree, movieEmbedding);
      const biasScore = this.calculateBiasScore(user, movie);
      const fairnessScore = this.calculateFairnessScore(biasScore, contentScore);
      
      // Final score balances content relevance and fairness
      const finalScore = 0.7 * contentScore + 0.3 * fairnessScore;
      
      return {
        movie,
        score: finalScore,
        biasScore,
        fairnessScore,
        explanation: this.generateExplanation(movie, contentScore, biasScore, fairnessScore),
        confidence: Math.min(finalScore + 0.1, 1.0)
      };
    });

    return recommendations
      .sort((a, b) => b.score - a.score)
      .slice(0, count);
  }

  private generateExplanation(movie: Movie, contentScore: number, biasScore: number, fairnessScore: number): string {
    const reasons = [];
    
    if (contentScore > 0.7) {
      reasons.push('Strong content match based on your preferences');
    }
    if (biasScore < 0.3) {
      reasons.push('Recommended for diverse content discovery');
    }
    if (fairnessScore > 0.6) {
      reasons.push('High fairness score - unbiased recommendation');
    }
    if (movie.rating > 8.0) {
      reasons.push('Highly rated by critics and audiences');
    }
    
    return reasons.length > 0 ? reasons.join('. ') : 'Recommended based on algorithmic analysis';
  }

  public calculateBiasMetrics(user: User, recommendations: Recommendation[]): BiasMetrics {
    const genderBias = recommendations.reduce((sum, rec) => sum + rec.biasScore, 0) / recommendations.length;
    const ageBias = this.calculateAgeBias(user, recommendations);
    const occupationBias = this.calculateOccupationBias(user, recommendations);
    const overallFairness = recommendations.reduce((sum, rec) => sum + rec.fairnessScore, 0) / recommendations.length;
    
    return {
      genderBias: Math.round(genderBias * 100) / 100,
      ageBias: Math.round(ageBias * 100) / 100,
      occupationBias: Math.round(occupationBias * 100) / 100,
      overallFairness: Math.round(overallFairness * 100) / 100
    };
  }

  private calculateAgeBias(user: User, recommendations: Recommendation[]): number {
    // Simplified age bias calculation
    return Math.random() * 0.3; // Placeholder for complex age bias detection
  }

  private calculateOccupationBias(user: User, recommendations: Recommendation[]): number {
    // Simplified occupation bias calculation
    return Math.random() * 0.25; // Placeholder for complex occupation bias detection
  }

  public getAdversarialLoss(): number {
    return this.adversarialLoss;
  }

  public getOrthogonalityLoss(): number {
    return this.orthogonalityLoss;
  }
}