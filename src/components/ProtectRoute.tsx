import LoginPage from "@/page/authpage/LoginPage";
import useUserStore from "@/stores/userStore";

type ProtectRouteProps = {
  children: React.ReactNode;
};

export default function ProtectRoute({ children }: ProtectRouteProps) {
  const { accessToken } = useUserStore();

  if (!accessToken) {
    return <LoginPage />;
  } else return children;
}
