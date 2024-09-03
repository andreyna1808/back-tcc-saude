import Header from "@/components/header";
import { useAppContext } from "@/context/AppContext";
import { useAuth } from "@/context/AuthContext";
import { decodeToken } from "@/utils/decodeToken";
import { basicUrl } from "@/utils/urls";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Feed = () => {
  const [ssr, setSsr] = useState(true);
  const { token, typeUser } = useAuth();
  const { selected } = useAppContext();
  const [ userData, setUserData ] = useState()
  const router = useRouter();

  const getInfoUser = async (emailData: string, token: string) => {
    try {
      const res = await axios.get(
        `${basicUrl}/${selected}/email/${emailData}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUserData(res.data)
    } catch (error) {
      console.error("Erro ao obter informações do usuário:", error);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const userData = token && decodeToken(token);

      if (!!userData) {
        getInfoUser(userData.sub!, token);
      }
      setSsr(false);
    }
  }, [token]);

  if (ssr) {
    return null;
  } else if (!token) {
    return router.push("/");
  }

  return (
    <main>
      <Header user={userData} type={selected} />
    </main>
  );
};

export default Feed;
