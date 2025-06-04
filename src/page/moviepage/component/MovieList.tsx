import type { MovieRes } from "@/types/response.type";
import MovieItem from "./MovieItem";

type MovieListProps = {
  movies: MovieRes[];
};

export default function MovieList({ movies }: MovieListProps) {
  return (
    <>
      <div className="flex flex-wrap gap-7 mx-3 justify-center mะ-8">
        {movies?.map((item) => (
          <MovieItem key={item.id} popularMovie={item} />
        ))}
      </div>
    </>
  );
}
