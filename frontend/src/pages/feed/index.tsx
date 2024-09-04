import { CardComponent } from "@/components/CardComponent";
import Header from "@/components/header";
import { Loading } from "@/components/loading";
import { useAuth } from "@/context/AuthContext";
import useAuthRedirect from "@/hooks/Auth/useAuthRedirect";
import { getInfoUser } from "@/services/request/get/getInfoUser";
import { getQuestions } from "@/services/request/get/getQuestions";
import { putLikeQuestionAnswer } from "@/services/request/put/putLikeQuestionAnswer";
import { decodeToken } from "@/utils/decodeToken";
import { HStack } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Feed = () => {
  useAuthRedirect();
  const [ssr, setSsr] = useState(true);
  const { token, typeUser } = useAuth();
  const [userData, setUserData] = useState<any>();
  const [questions, setQuestions] = useState([]);
  const [updateData, setUpdateData] = useState(false);
  const router = useRouter();

  const infoUser = async (selected: string, id: string, token: string) => {
    const [userResp, questionResp] = await Promise.all([
      getInfoUser(selected, id, token),
      getQuestions(token),
    ]);
    setUserData(userResp);
    setQuestions(questionResp);
  };

  const onLikeOrDeslike = async (data: any) => {
    const isQuestion = typeof data.anonymous == "boolean"
    await putLikeQuestionAnswer(typeUser!, userData.id, data.id, token!, isQuestion)
    setUpdateData(!updateData)
  };

  console.log("userData", { userData, questions, typeUser, token});

  useEffect(() => {
    if (typeof window !== "undefined") {
      setSsr(false);
    }
  }, []);

  useEffect(() => {
    const tokenData = token && decodeToken(token);

    if (!!tokenData && typeUser) {
      infoUser(typeUser!, tokenData.id, token);
    }
  }, [token, ssr, typeUser, router, updateData]);

  if (ssr || !token || !typeUser) {
    return <Loading />;
  }

  const getTitle = (typeUser: string, isAnswers: boolean) => {
    if (typeUser === "doctors") {
      return isAnswers
        ? "Perguntas que você respondeu"
        : "Perguntas dos usuários";
    }
    return isAnswers ? "Suas perguntas" : "Perguntas dos outros usuários";
  };

  const getFilteredQuestions = (
    questions: any[],
    userId: string | undefined
  ) => {
    return typeUser === "doctors"
      ? questions
      : questions.filter((question: any) => question.userData.id !== userId);
  };

  const getData = (isAnswers: boolean) => {
    return typeUser === "doctors"
      ? isAnswers
        ? userData?.answers || []
        : getFilteredQuestions(questions, userData?.id)
      : isAnswers
      ? userData?.questions || []
      : getFilteredQuestions(questions, userData?.id);
  };

  return (
    <main>
      <Header user={userData} type={typeUser} />

      <HStack w="100%" justify="space-around" alignItems="start">
        <CardComponent
          title={getTitle(typeUser, false)}
          data={getData(false)}
          type="questions"
          onLike={onLikeOrDeslike}
        />

        <CardComponent
          title={getTitle(typeUser, true)}
          data={getData(true)}
          type="answers"
          onLike={onLikeOrDeslike}
        />
      </HStack>
    </main>
  );
};

export default Feed;
