import { Button } from "@/components/ui/button";
import nav_logo from "../assets/nav_logo.svg";
import useUserStore from "@/stores/userStore";
import { useNavigate } from "react-router";

export default function Navbar() {
  const { logout } = useUserStore();
  const navigate = useNavigate();

  const navigateToHome = () => {
    navigate("/movie");
  };

  const hdlLogout = () => {
    logout();
    navigate("/");
  };

  const navigateToFavorite = () => {
    navigate("/movie/favorite");
  };

  return (
    <div className="flex justify-between p-4">
      <div className="flex gap-7">
        <div className="w-[80px] hover:cursor-pointer hover:opacity-80" onClick={navigateToHome}>
          <img src={nav_logo} alt="navLogo" />
        </div>
        {/* <Button
          onClick={() => navigate("/movie/search")}
          className=" w-[120px] text-xl hover:cursor-pointer hover:opacity-80 bg-secondary-color text-white"
        >
          Search
        </Button> */}
      </div>
      <div className="text-3xl flex gap-4">
        <Button
          onClick={navigateToFavorite}
          className=" w-[120px] text-xl hover:cursor-pointer hover:opacity-80 bg-secondary-color text-white"
        >
          favorites
        </Button>
        <Button
          onClick={hdlLogout}
          className="w-[120px] text-xl hover:cursor-pointer hover:opacity-80 bg-secondary-color text-white"
        >
          Log out
        </Button>
      </div>
    </div>
  );
}
