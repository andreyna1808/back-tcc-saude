import { mockAnswers } from "@/assets/mocks/mockAnswers ";
import { CardComponent } from "@/components/CardComponent";
import Header from "@/components/header";
import { Loading } from "@/components/loading";
import { ModalComponent } from "@/components/ModalComponent";
import { useAuth } from "@/context/AuthContext";
import useAuthRedirect from "@/hooks/Auth/useAuthRedirect";
import { getAnswersQuestionById } from "@/services/request/get/getAnswersQuestionById";
import { getInfoUser } from "@/services/request/get/getInfoUser";
import { getQuestions } from "@/services/request/get/getQuestions";
import { postQuestionAnswer } from "@/services/request/post/postQuestionAnswer";
import { putLikeQuestionAnswer } from "@/services/request/put/putLikeQuestionAnswer";
import { decodeToken } from "@/utils/decodeToken";
import { HStack, useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Feed = () => {
  useAuthRedirect();
  const toast = useToast();
  const [ssr, setSsr] = useState(true);
  const { token, typeUser } = useAuth();
  const [userData, setUserData] = useState<any>();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [questions, setQuestions] = useState([]);
  const [updateData, setUpdateData] = useState(false);
  const [viewDataModal, setViewDataModal] = useState<any>({
    data: null,
    type: null,
  });
  const router = useRouter();

  const infoUser = async (selected: string, id: string, token: string) => {
    // se for doctor pegar answers by doctor id se for user pegar questions by userID

    const [userResp, questionResp] = await Promise.all([
      getInfoUser(selected, id, token),
      getQuestions(token),
    ]);

    setUserData(userResp);
    setQuestions(questionResp);

    if (viewDataModal?.data?.id) {
      const updateModal = questionResp?.find(
        (question: any) => question.id == viewDataModal?.data?.id
      );
      setViewDataModal({ ...viewDataModal, data: updateModal });
    }
  };

  const onLikeOrDeslike = async (data: any) => {
    const isQuestion = typeof data.anonymous == "boolean";
    await putLikeQuestionAnswer(
      typeUser!,
      userData.id,
      data.id,
      token!,
      isQuestion
    );
    setUpdateData(!updateData);
  };

  const onViewData = async (data: any, type: string) => {
    const res = await getAnswersQuestionById(type, data.id, token!);
    setViewDataModal({ data: res, type });
    setIsOpen(true);
  };

  const onPublishComent = async (dataQuestion: any, content: string) => {
    const updateData = {
      questionId: dataQuestion.id,
      doctorId: userData.id,
      content: content,
    };
    await postQuestionAnswer(updateData, "answers", toast, token!);
    setUpdateData((prev) => {
      return !prev;
    });
  };

  console.log("userData", { userData, questions, typeUser, token });

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

  const getNotFound = (isAnswers: boolean) => {
    return typeUser === "doctors"
      ? isAnswers
        ? "Nenhuma resposta encontrada!"
        : "Nenhuma pergunta dos usuários foi encontrada"
      : isAnswers
      ? "Você não fez nenhuma pergunta"
      : "Nenhuma pergunta dos usuários foi encontrada";
  };

  return (
    <main>
      <Header user={userData} type={typeUser} />
      <ModalComponent
        isOpen={isOpen}
        typeUser={typeUser}
        setIsOpen={setIsOpen}
        viewDataModal={viewDataModal}
        onPublishComent={onPublishComent}
        onLikeOrDeslike={onLikeOrDeslike}
        setViewDataModal={setViewDataModal}
      />

      <HStack w="100%" justify="space-around" alignItems="start">
        <CardComponent
          title={getTitle(typeUser, false)}
          data={
            typeUser === "doctors"
              ? questions
              : questions?.filter(
                  (question: any) =>
                    !userData?.questions?.some(
                      (dataQuestion: any) => dataQuestion.id === question.id
                    )
                )
          }
          type="questions"
          notfound={getNotFound(false)}
          onLike={onLikeOrDeslike}
          onViewData={onViewData}
        />

        <CardComponent
          title={getTitle(typeUser, true)}
          data={
            typeUser === "doctors"
              ? userData
              : questions?.filter((question: any) =>
                  userData?.questions?.some(
                    (dataQuestion: any) => dataQuestion.id === question.id
                  )
                )
          }
          type="answersByDoctor"
          notfound={getNotFound(true)}
          onLike={onLikeOrDeslike}
          onViewData={onViewData}
        />
      </HStack>
    </main>
  );
};

export default Feed;
