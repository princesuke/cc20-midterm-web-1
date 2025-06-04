import ProtectRoute from "@/components/ProtectRoute";
import RedirectedIfAuthen from "@/components/RedirectedIfAuthen";
import Container from "@/layout/Container";
import FavoritePage from "@/page/favoritepage/FavoritePage";
import HomePage from "@/page/homepage/HomePage";
import LoginPage from "@/page/authpage/LoginPage";
import MovieDetailPage from "@/page/movieDetailPage/MovieDetailPage";
import MoviePage from "@/page/moviepage/MoviePage";
import { BrowserRouter, Route, Routes } from "react-router";
import RegisterPage from "@/page/authpage/RegisterPage";
import SearchPage from "@/page/searchpage/SearchPage";

export default function AppRouter() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element=<RedirectedIfAuthen>
              <HomePage />
            </RedirectedIfAuthen>
          />
          <Route
            path="/login"
            element=<RedirectedIfAuthen>
              <LoginPage />
            </RedirectedIfAuthen>
          />
          <Route
            path="/register"
            element=<RedirectedIfAuthen>
              <RegisterPage />
            </RedirectedIfAuthen>
          />
          <Route
            path="/movie"
            element=<ProtectRoute>
              <Container />
            </ProtectRoute>
          >
            <Route index element={<MoviePage />} />
            <Route path=":movieId" element={<MovieDetailPage />} />
            <Route path="favorite" element={<FavoritePage />} />
            // <Route path="search" element={<SearchPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
