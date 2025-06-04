import { Outlet } from "react-router";
import Navbar from "./Navbar";

export default function Container() {
  return (
    <div className="bg-primary-color min-h-screen pb-5 flex flex-col gap-5">
      <Navbar />
      <Outlet />
    </div>
  );
}
