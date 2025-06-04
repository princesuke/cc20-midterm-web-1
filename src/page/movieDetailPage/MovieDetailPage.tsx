import { tmdbConstant } from "@/constant/tmdb.constant";
import useMovieStore from "@/stores/movieStore";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import StarReview from "./component/StarReview";
import { FaHeart } from "react-icons/fa";
import type { CreateFavMovie } from "@/types/movie";
import Loading from "@/utils/Loading";
import { Button } from "@/components/ui/button";

export default function MovieDetailPage() {
  const {
    getMovieDetail,
    movieDetail,
    movieLoading,
    addFavoriteMovie,
    deleteFavoriteMovie,
    allFavMovies,
    videoUrl,
    getFavMovie,
  } = useMovieStore();
  const { movieId } = useParams();
  const navigate = useNavigate();

  const [isFav, setIsFav] = useState(false);

  const {
    poster_path,
    title,
    backdrop_path,
    release_date,
    genres,
    vote_average,
    vote_count,
    overview,
    status,
  } = movieDetail;

  useEffect(() => {
    getMovieDetail(parseInt(movieId!));
    getFavMovie(parseInt(movieId!));
  }, []);

  useEffect(() => {
    setIsFav(allFavMovies.some((movie) => movie.movieId === parseInt(movieId!)));
  }, [allFavMovies]);

  const hdlAddFavMovie = () => {
    const body: CreateFavMovie = {
      title,
      movieId: parseInt(movieId!),
      posterPath: poster_path,
    };
    addFavoriteMovie(body);
  };

  const hdlUnFavMovie = () => {
    deleteFavoriteMovie(parseInt(movieId!));
  };

  if (movieLoading) {
    return <Loading />;
  }
  console.log(isFav);
  return (
    <div>
      <div className="flex flex-col items-center mt-8 gap-5">
        <div>
          <img src={tmdbConstant.poster_path + "w400" + poster_path} alt="" />
        </div>

        {videoUrl && (
          <iframe
            width="560"
            height="315"
            src={videoUrl}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        )}

        <div className="relative w-3/5 mt-5 p-5 rounded-sm text-white flex flex-col gap-5 overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-50"
            style={{
              backgroundImage: `url(https://image.tmdb.org/t/p/original${backdrop_path})`,
              zIndex: 0,
            }}
          ></div>

          {/* เนื้อหาอยู่ข้างหน้า */}
          <div className="relative z-10">
            <div className="flex flex-col gap-2">
              <h1 className="text-4xl font-semibold">
                {title} ({release_date.split("-")[0]}){" "}
                <small className="text-sm text-gray-400">{status}</small>
              </h1>
              <h1>
                {release_date} .{" "}
                {genres.reduce((prev, curr) => {
                  if (prev) {
                    return prev + ", " + curr.name;
                  }
                  return curr.name;
                }, "")}
              </h1>
            </div>
            <div className="flex flex-col gap-2 mt-4">
              <h1 className="text-2xl font-semibold">
                Reviews:{" "}
                <span className="text-lg font-semibold">
                  {vote_average.toFixed(2)} / 10 of {vote_count} users
                </span>
              </h1>
              <StarReview rating={vote_average / 2} />
            </div>
            <div className="flex flex-col gap-2 mt-4">
              <h1 className="text-2xl font-semibold">Overview</h1>
              <h2>{overview}</h2>
            </div>

            {isFav ? (
              <div
                onClick={hdlUnFavMovie}
                className="group mt-4 flex justify-center gap-2 text-center items-center hover:cursor-pointer hover:opacity-80 border-2 border-white w-[150px] p-2 rounded-md"
              >
                <FaHeart className="text-xl  text-pink-500 group-hover:text-white transition-colors duration-200" />
                <h1 className="text-xl my-auto text-pink-500 group-hover:text-white">unFavorite</h1>
              </div>
            ) : (
              <div
                onClick={hdlAddFavMovie}
                className="group mt-4 flex justify-center gap-2 text-center items-center hover:cursor-pointer hover:opacity-80 border-2 border-white w-[150px] p-2 rounded-md"
              >
                <FaHeart className="text-xl  text-white group-hover:text-pink-500 transition-colors duration-200" />
                <h1 className="text-xl my-auto text-white group-hover:text-pink-500">favorite</h1>
              </div>
            )}
          </div>
        </div>
      </div>
      <Button
        className="border-2 border-white w-[150px] text-xl p-2 rounded-md text-white mx-8 mt-8 mb-4 hover:cursor-pointer hover:opacity-80 bg-secondary-color"
        onClick={() => navigate(-1)}
        type="button"
      >
        Back
      </Button>
    </div>
  );
}
