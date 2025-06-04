export type Movie = {
  movieId: number;
  title: string;
  overview: string;
  originalLanguage: string;
  posterPath: string;
  releaseDate: string;
  voteAverage: number;
  voteCount: number;
};

export type CreateFavMovie = {
  title: string;
  movieId: number;
  posterPath: string;
};
