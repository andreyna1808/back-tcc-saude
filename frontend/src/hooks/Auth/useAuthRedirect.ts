import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/router";
import { useEffect } from "react";

const useAuthRedirect = () => {
  const router = useRouter();
  const { token } = useAuth();

  useEffect(() => {
    const tokenStorage = localStorage.getItem("authToken");
    const { pathname } = router;

    if (
      tokenStorage != "null" &&
      (pathname === "/auth/login" || pathname === "/auth/register")
    ) {
      router.push("/feed");
    } else if (
      tokenStorage == "null" &&
      !(pathname === "/auth/login" || pathname === "/auth/register")
    ) {
      router.push("/");
    }
  }, [router, token]);
  return null;
};

export default useAuthRedirect;
