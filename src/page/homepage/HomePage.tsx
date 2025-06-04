import { useNavigate } from "react-router";
import logo from "../../assets/logo.svg";
import CustomButton from "@/components/CustomButton";

export default function HomePage() {
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-evenly bg-primary-color h-screen">
      <div className="w-[400px]">
        <img src={logo} className="App-logo" alt="logo" />
      </div>
      <div className="flex flex-col gap-5">
        <h1 className="text-3xl text-white">To see All movies please login</h1>
        <CustomButton onClick={() => navigate("/login")}>Log in</CustomButton>

        <div className="flex gap-3 text-white">
          <span>dont have an account?</span>
          <span
            onClick={() => navigate("/register")}
            className="hover:font-semibold hover:cursor-pointer"
          >
            Sign in
          </span>
        </div>
      </div>
    </div>
  );
}
