import useMovieStore from "@/stores/movieStore";
import { useEffect } from "react";
import MovieList from "./component/MovieList";
import MoviePagination from "./component/MoviePagination";
import Loading from "@/utils/Loading";

function MoviePage() {
  const { getPopularMovies, getAllFavMovies, popularMovies, page, totalPage, movieLoading } =
    useMovieStore();

  useEffect(() => {
    getPopularMovies(page);
    getAllFavMovies();
  }, []);

  const hdlChangePage = (page: number) => {
    getPopularMovies(page);
  };

  if (movieLoading) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-4xl text-white font-semibold ml-18 mb-5">Popular Movies</h1>
      <MovieList movies={popularMovies} />
      <MoviePagination page={page} totalPage={totalPage} hdlChangePage={hdlChangePage} />
    </div>
  );
}

export default MoviePage;
