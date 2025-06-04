import type { MovieRes } from "@/types/response.type";
import { tmdbConstant } from "@/constant/tmdb.constant";
import { Link } from "react-router";

type MovieItemProps = {
  popularMovie: MovieRes;
};

export default function MovieItem({ popularMovie }: MovieItemProps) {
  const { title, poster_path, id } = popularMovie;
  return (
    <Link to={`/movie/${id}`}>
      <div className="w-[220px] flex flex-col items-center hover:cursor-pointer hover:opacity-80">
        <div className="w-[200px]">
          <img src={tmdbConstant.poster_path + "w200" + poster_path} alt="logo" />
        </div>
        <div className="mt-3">
          <h1 className="text-center text-white text-xlg font-light">{title}</h1>
        </div>
      </div>
    </Link>
  );
}
