import useMovieStore from "@/stores/movieStore";
import { useEffect } from "react";
import FavMovieList from "./component/FavMovieList";
import Loading from "@/utils/Loading";

export default function FavoritePage() {
  const { getAllFavMovies, movieLoading, allFavMovies } = useMovieStore();

  useEffect(() => {
    getAllFavMovies();
  }, []);

  if (movieLoading) {
    return <Loading />;
  }
  return (
    <>
      <div>
        <h1 className="text-4xl text-white font-semibold ml-18 mb-5">Favorite Movies</h1>
        <FavMovieList movies={allFavMovies} />
      </div>
    </>
  );
}
