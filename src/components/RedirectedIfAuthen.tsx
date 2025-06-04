import useUserStore from "@/stores/userStore";
import { Navigate } from "react-router";

type RedirectedIfAuthenProps = {
  children: React.ReactNode;
};

export default function RedirectedIfAuthen({ children }: RedirectedIfAuthenProps) {
  const { accessToken } = useUserStore();

  if (accessToken) {
    return <Navigate to={"/movie"} />;
  } else return children;
}
