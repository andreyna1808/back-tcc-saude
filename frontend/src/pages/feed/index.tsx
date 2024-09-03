import { mockAnswers } from "@/assets/mocks/mockAnswers ";
import { mockQuestions } from "@/assets/mocks/mockQuestions";
import { CardComponent } from "@/components/CardComponent";
import Header from "@/components/header";
import { useAppContext } from "@/context/AppContext";
import { useAuth } from "@/context/AuthContext";
import { decodeToken } from "@/utils/decodeToken";
import { basicUrl } from "@/utils/urls";
import { Box, Card, CardBody, HStack, Text, VStack } from "@chakra-ui/react";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { AiOutlineLike, AiOutlineComment } from "react-icons/ai";

const Feed = () => {
  const [ssr, setSsr] = useState(true);
  const { token, typeUser } = useAuth();
  const { selected } = useAppContext();
  const [userData, setUserData] = useState();
  const router = useRouter();

  const getInfoUser = async (id: string, token: string) => {
    try {
      const res = await axios.get(`${basicUrl}/${selected}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUserData(res.data);
    } catch (error) {
      console.error("Erro ao obter informações do usuário:", error);
    }
  };

  const onLikeOrDeslike = (data: any) => {
    console.log("data: ", data);
  };

  console.log("userData", userData);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const tokenData = token && decodeToken(token);

      if (!!tokenData) {
        getInfoUser(tokenData.id, token);
      }
      setSsr(false);
    }
  }, [token]);

  if (ssr || !token) {
    return null;
  } else if (!token) {
    return router.push("/");
  }

  return (
    <main>
      <Header user={userData} type={selected} />

      <HStack w="100%" justify="space-around">
        <CardComponent
          title="Perguntas dos usuários"
          data={mockQuestions}
          type="questions"
          onLike={(item: any) => onLikeOrDeslike(item)}
        />

        <CardComponent
          title="Perguntas que você respondeu"
          data={mockAnswers}
          type="answers"
          onLike={(item: any) => onLikeOrDeslike(item)}
        />
      </HStack>
    </main>
  );
};

export default Feed;
