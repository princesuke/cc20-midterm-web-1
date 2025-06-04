import type { FavMovie } from "@/types/response.type";
import FavMovieItem from "./FavMovieItem";

type MovieListProps = {
  movies: FavMovie[];
};
export default function FavMovieList({ movies }: MovieListProps) {
  return (
    <>
      <div className="flex flex-wrap gap-7 mx-3 justify-center mะ-8">
        {movies?.map((item) => (
          <FavMovieItem key={item.id} movie={item} />
        ))}
      </div>
    </>
  );
}
