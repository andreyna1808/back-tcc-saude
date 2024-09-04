import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/context/AuthContext";

const publicRoutes = ["/", "/auth/login", "/auth/register"];

const useAuthRedirect = () => {
  const { token } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const isPublicRoute = publicRoutes.includes(router.pathname);
    const isProtectedRoute = router.pathname.startsWith("/feed");

    if (!token && isProtectedRoute) {
      router.push("/");
    } else if (token && isPublicRoute) {
      router.push("/feed");
    }
  }, [token, router]);
};

export default useAuthRedirect;
