import { tmdbConstant } from "@/constant/tmdb.constant";
import type { FavMovie } from "@/types/response.type";
import { Link } from "react-router";

type FavMovieProps = {
  movie: FavMovie;
};

export default function FavMovieItem({ movie }: FavMovieProps) {
  const { title, posterPath, movieId } = movie;
  return (
    <Link to={`/movie/${movieId}`}>
      <div className="w-[220px] flex flex-col items-center hover:cursor-pointer hover:opacity-80">
        <div className="w-[200px]">
          <img src={tmdbConstant.poster_path + "w200" + posterPath} alt="logo" />
        </div>
        <div className="mt-3">
          <h1 className="text-center text-white text-xlg font-light">{title}</h1>
        </div>
      </div>
    </Link>
  );
}
