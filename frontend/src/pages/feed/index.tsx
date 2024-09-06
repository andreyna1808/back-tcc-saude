import { CardComponent } from "@/components/CardComponent";
import Header from "@/components/header";
import { Loading } from "@/components/loading";
import { ModalComponent } from "@/components/ModalComponent";
import { useAuth } from "@/context/AuthContext";
import useAuthRedirect from "@/hooks/Auth/useAuthRedirect";
import { deleteQuestionAnswer } from "@/services/request/delete/deleteQuestionAnswer";
import { getAnswersQuestionById } from "@/services/request/get/getAnswersQuestionById";
import { getInfoUser } from "@/services/request/get/getInfoUser";
import { getQuestions } from "@/services/request/get/getQuestions";
import { postQuestionAnswer } from "@/services/request/post/postQuestionAnswer";
import { putLikeQuestionAnswer } from "@/services/request/put/putLikeQuestionAnswer";
import { putQuestionAnswerComment } from "@/services/request/put/putQuestionAnswerComment";
import { decodeToken } from "@/utils/decodeToken";
import {
  getFilteredQuestions,
  getNotFound,
  getTitle,
  getUserAnsweredQuestions,
  updateDataWithQuestionResp,
} from "@/utils/feedUtils";
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
      const updateModal =
        questionResp?.find(
          (question: any) => question.id == viewDataModal?.data?.id
        ) || updateDataWithQuestionResp(viewDataModal.data, questionResp);

      setViewDataModal({ ...viewDataModal, data: updateModal });
    }
  };

  const onLikeOrDeslike = async (data: any, type?: string) => {
    const isQuestion =
      typeof data.anonymous == "boolean" || type == "questions";
    await putLikeQuestionAnswer(
      typeUser!,
      userData.id,
      data.id,
      token!,
      isQuestion,
      toast
    );
    setUpdateData((prev) => {
      return !prev;
    });
  };

  const onViewData = async (data: any, type: string) => {
    const res = await getAnswersQuestionById(type, data.id, token!);
    setViewDataModal({ data: res, type });
    setIsOpen(true);
  };

  const onPublishComment = async (dataQuestion: any, content: string) => {
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

  const onEditComment = async (
    dataQuestion: any,
    content: string,
    type: string
  ) => {
    if (type == "questions") {
      const updateData = { content, type };
      await putQuestionAnswerComment(
        "questions",
        dataQuestion.id,
        updateData,
        toast,
        token!
      );
    } else {
      const updateData = {
        content,
      };
      await putQuestionAnswerComment(
        "answers",
        dataQuestion.id,
        updateData,
        toast,
        token!
      );
    }

    setUpdateData((prev) => {
      return !prev;
    });
  };

  const onRemove = async (data: any, type: string) => {
    await deleteQuestionAnswer(type, data.id, token!, toast);
    setUpdateData((prev) => {
      return !prev;
    });
  };

  const onCreateQuestion = async (content: string, anonymous: boolean) => {
    const updateData = {
      userId: userData.id,
      anonymous: anonymous,
      content: content,
    };
    await postQuestionAnswer(updateData, "questions", toast, token!);
    setUpdateData((prev) => {
      return !prev;
    });
  };

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

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, ssr, typeUser, router, updateData]);

  if (ssr || !token || !typeUser) {
    return <Loading />;
  }

  return (
    <main>
      <Header user={userData} type={typeUser} />
      <ModalComponent
        isOpen={isOpen}
        typeUser={typeUser}
        userData={userData}
        setIsOpen={setIsOpen}
        viewDataModal={viewDataModal}
        onEditComment={onEditComment}
        onPublishComment={onPublishComment}
        onLikeOrDeslike={onLikeOrDeslike}
        setViewDataModal={setViewDataModal}
      />

      <HStack w="100%" justify="space-around" alignItems="start">
        <CardComponent
          title={getTitle(typeUser, false)}
          data={getFilteredQuestions(questions, userData, typeUser)}
          type="questions"
          notfound={getNotFound(typeUser, false)}
          onLike={onLikeOrDeslike}
          onViewData={onViewData}
          onRemove={onRemove}
          userData={userData}
        />

        <CardComponent
          title={getTitle(typeUser, true)}
          data={getUserAnsweredQuestions(questions, userData, typeUser)}
          type={typeUser === "doctors" ? "answersByDoctor" : "questionByUser"}
          notfound={getNotFound(typeUser, true)}
          onLike={onLikeOrDeslike}
          onViewData={onViewData}
          onRemove={onRemove}
          typeUser={typeUser}
          userData={userData}
          onCreateQuestion={onCreateQuestion}
        />
      </HStack>
    </main>
  );
};

export default Feed;
