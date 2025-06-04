import { tmdbConstant } from "@/constant/tmdb.constant";
import type { CreateFavMovie } from "@/types/movie";
import {
  type TmdbVideoRes,
  type AddFavMovieRes,
  type AllFavMovieRes,
  type FavMovie,
  type MovieRes,
  type PopularMoviesResponse,
  type FavMovieRes,
} from "@/types/response.type";
import axios, { isAxiosError } from "axios";
import backendAxios from "../config/axios";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type MovieStore = {
  popularMovies: MovieRes[];
  allFavMovies: FavMovie[];
  movieDetail: MovieRes;
  videoUrl: string;
  page: number;
  totalPage: number;
  movieLoading: boolean;
  getPopularMovies: (page?: number) => void;
  getAllFavMovies: () => void;
  getMovieDetail: (id: number) => void;
  searchMovie: (movie: string) => void;
  addFavoriteMovie: (body: CreateFavMovie) => void;
  deleteFavoriteMovie: (id: number) => void;
  getFavMovie: (id: number) => void;
};

type PersistMovieStorage = {
  allFavMovies: FavMovie[];
};

const initialDetail = {
  adult: false,
  backdrop_path: "",
  genre_ids: [],
  id: 0,
  original_language: "",
  original_title: "",
  overview: "",
  popularity: 0,
  poster_path: "",
  release_date: "",
  title: "",
  video: false,
  vote_average: 0,
  vote_count: 0,
  genres: [],
  status: "",
};

const useMovieStore = create<
  MovieStore, // ประเภทของ State
  [["zustand/persist", PersistMovieStorage]]
>(
  persist(
    (set) => ({
      popularMovies: [],
      allFavMovies: [],
      movieDetail: initialDetail,
      videoUrl: "",
      page: 1,
      totalPage: 1,
      movieLoading: false,
      getPopularMovies: async (page = 1) => {
        set({ movieLoading: true });
        try {
          const res = await axios.get<PopularMoviesResponse>(
            tmdbConstant.base_url + `/movie/popular?api_key=${tmdbConstant.api_key}&page=${page}`
          );
          set({
            popularMovies: res.data.results,
            page: res.data.page,
            totalPage: res.data.total_pages,
          });
          console.log(res.data);
        } catch (err) {
          console.log(err);
        } finally {
          set({ movieLoading: false });
        }
      },
      getAllFavMovies: async () => {
        set({ movieLoading: true });
        try {
          const res = await backendAxios.get<AllFavMovieRes>("/V3/movies");
          console.log(res.data.movies);
          set({ allFavMovies: res.data.movies });
        } catch (err) {
          if (isAxiosError(err)) {
            console.log(err.response?.data);
          }
        } finally {
          set({ movieLoading: false });
        }
      },
      getFavMovie: async (id: number) => {
        set({ movieLoading: true });
        try {
          const res = await backendAxios.get<FavMovieRes>(`/V3/movies/${id}`);
          // set({movieDetail: res.data.movie})
          console.log(res.data.movie);
        } catch (err) {
          if (isAxiosError(err)) {
            console.log(err.response?.data);
          } else console.log("something error");
        }
      },
      getMovieDetail: async (id: number) => {
        set({ movieLoading: true });
        try {
          const res = await axios.get<MovieRes>(
            tmdbConstant.base_url + `/movie/${id}?api_key=${tmdbConstant.api_key}`
          );
          const videoRes = await axios.get<TmdbVideoRes>(
            tmdbConstant.video_Path + `${id}/videos?api_key=${tmdbConstant.api_key}`
          );
          const path = videoRes.data.results.find(
            (v) => v.type === "Trailer" && v.site === "YouTube"
          );
          if (path) {
            set({ videoUrl: `https://www.youtube.com/embed/${path.key}` });
          }
          set({ movieDetail: res.data });
        } catch (err) {
          if (isAxiosError(err)) {
            console.log(err.response?.data?.message);
          }
          console.log("something error");
        } finally {
          set({ movieLoading: false });
        }
      },
      searchMovie: async (movie: string) => {
        set({ movieLoading: true });
        try {
          const res = await axios.get(
            tmdbConstant.base_url + `/search/movie?api_key=${tmdbConstant.api_key}&query=${movie}`
          );
          set({ popularMovies: res.data.results });
        } catch (err) {
          console.log(err);
        } finally {
          set({ movieLoading: false });
        }
      },
      addFavoriteMovie: async (body: CreateFavMovie) => {
        try {
          const res = await backendAxios.post<AddFavMovieRes>("/V3/movies", body);
          set((state) => ({
            allFavMovies: [...state.allFavMovies, res.data.movie],
          }));
        } catch (err) {
          if (isAxiosError(err)) {
            console.log(err.response?.data);
            console.log(err.response?.data?.message);
          } else {
            console.log("something error");
          }
        }
      },
      deleteFavoriteMovie: async (id: number) => {
        try {
          console.log(id);
          await backendAxios.delete(`/V3/movies/${id}`);
          set((state) => ({
            allFavMovies: state.allFavMovies.filter((movie) => movie.movieId !== id),
          }));
        } catch (err) {
          if (isAxiosError(err)) {
            console.log(err.response?.data);
          }
        }
      },
    }),
    {
      name: "movie-storage",
      partialize: (state) => ({
        allFavMovies: state.allFavMovies,
      }),
    }
  )
);

export default useMovieStore;
