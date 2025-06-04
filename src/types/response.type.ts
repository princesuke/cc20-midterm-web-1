export type LoginResponse = {
  accessToken: string;
  userId: number;
  message: string;
  success: boolean;
  login: boolean;
};

export type PopularMoviesResponse = {
  page: number;
  results: MovieRes[];
  total_pages: number;
  total_results: number;
};

export type MovieRes = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  genres: {
    id: number;
    name: string;
  }[];
  status: string;
};

export type AddFavMovieRes = {
  success: boolean;
  movie: FavMovie;
};

export type FavMovieRes = {
  success: boolean;
  movie: FavMovie | null;
};

export type FavMovie = {
  id: number;
  movieId: number;
  title: string;
  posterPath: string;
};

export type AllFavMovieRes = {
  success: boolean;
  movies: FavMovie[];
};

export type TmdbVideoRes = {
  id: number;
  results: TmdbVideo[];
};

export type TmdbVideo = {
  id: string;
  key: string;
  name: string;
  site: string;
  type: string;
};
