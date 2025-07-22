import { Movie } from '../types';

export const movies: Movie[] = [
  {
    id: 1,
    title: "The Matrix",
    genre: ["Action", "Sci-Fi"],
    year: 1999,
    rating: 8.7,
    director: "The Wachowskis",
    cast: ["Keanu Reeves", "Laurence Fishburne", "Carrie-Anne Moss"],
    poster: "https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=300&h=450&fit=crop",
    description: "A computer programmer discovers reality is a simulation.",
    popularity: 95
  },
  {
    id: 2,
    title: "Inception",
    genre: ["Action", "Thriller", "Sci-Fi"],
    year: 2010,
    rating: 8.8,
    director: "Christopher Nolan",
    cast: ["Leonardo DiCaprio", "Marion Cotillard", "Tom Hardy"],
    poster: "https://images.pexels.com/photos/7991580/pexels-photo-7991580.jpeg?auto=compress&cs=tinysrgb&w=300&h=450&fit=crop",
    description: "A thief enters people's dreams to steal secrets.",
    popularity: 92
  },
  {
    id: 3,
    title: "Parasite",
    genre: ["Drama", "Thriller"],
    year: 2019,
    rating: 8.6,
    director: "Bong Joon-ho",
    cast: ["Song Kang-ho", "Lee Sun-kyun", "Cho Yeo-jeong"],
    poster: "https://images.pexels.com/photos/7991581/pexels-photo-7991581.jpeg?auto=compress&cs=tinysrgb&w=300&h=450&fit=crop",
    description: "A poor family infiltrates a wealthy household.",
    popularity: 88
  },
  {
    id: 4,
    title: "La La Land",
    genre: ["Romance", "Musical", "Drama"],
    year: 2016,
    rating: 8.0,
    director: "Damien Chazelle",
    cast: ["Ryan Gosling", "Emma Stone"],
    poster: "https://images.pexels.com/photos/7991582/pexels-photo-7991582.jpeg?auto=compress&cs=tinysrgb&w=300&h=450&fit=crop",
    description: "A jazz musician and actress fall in love in Los Angeles.",
    popularity: 85
  },
  {
    id: 5,
    title: "Black Panther",
    genre: ["Action", "Adventure", "Sci-Fi"],
    year: 2018,
    rating: 7.3,
    director: "Ryan Coogler",
    cast: ["Chadwick Boseman", "Michael B. Jordan", "Lupita Nyong'o"],
    poster: "https://images.pexels.com/photos/7991583/pexels-photo-7991583.jpeg?auto=compress&cs=tinysrgb&w=300&h=450&fit=crop",
    description: "T'Challa returns home to Wakanda to become king.",
    popularity: 90
  },
  {
    id: 6,
    title: "Moonlight",
    genre: ["Drama"],
    year: 2016,
    rating: 7.4,
    director: "Barry Jenkins",
    cast: ["Mahershala Ali", "Naomie Harris", "Trevante Rhodes"],
    poster: "https://images.pexels.com/photos/7991584/pexels-photo-7991584.jpeg?auto=compress&cs=tinysrgb&w=300&h=450&fit=crop",
    description: "A young man's journey of self-discovery and identity.",
    popularity: 78
  },
  {
    id: 7,
    title: "Wonder Woman",
    genre: ["Action", "Adventure", "Fantasy"],
    year: 2017,
    rating: 7.4,
    director: "Patty Jenkins",
    cast: ["Gal Gadot", "Chris Pine", "Robin Wright"],
    poster: "https://images.pexels.com/photos/7991585/pexels-photo-7991585.jpeg?auto=compress&cs=tinysrgb&w=300&h=450&fit=crop",
    description: "An Amazon warrior princess leaves her island home.",
    popularity: 87
  },
  {
    id: 8,
    title: "The Grand Budapest Hotel",
    genre: ["Comedy", "Drama"],
    year: 2014,
    rating: 8.1,
    director: "Wes Anderson",
    cast: ["Ralph Fiennes", "F. Murray Abraham", "Mathieu Amalric"],
    poster: "https://images.pexels.com/photos/7991586/pexels-photo-7991586.jpeg?auto=compress&cs=tinysrgb&w=300&h=450&fit=crop",
    description: "The adventures of a legendary concierge and his protégé.",
    popularity: 82
  }
];