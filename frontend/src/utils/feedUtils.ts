export const getTitle = (typeUser: string, isAnswers: boolean) => {
  if (typeUser === "doctors") {
    return isAnswers
      ? "Perguntas que você respondeu"
      : "Perguntas dos usuários";
  }
  return isAnswers ? "Suas perguntas" : "Perguntas dos outros usuários";
};

export const getNotFound = (typeUser: string, isAnswers: boolean) => {
  return typeUser === "doctors"
    ? isAnswers
      ? "Nenhuma resposta encontrada!"
      : "Nenhuma pergunta dos usuários foi encontrada"
    : isAnswers
    ? "Você não fez nenhuma pergunta"
    : "Nenhuma pergunta dos usuários foi encontrada";
};

// perguntas que o usuário ainda não respondeu
export const getFilteredQuestions = (
  questions: any[],
  userData: any,
  typeUser: string
) => {
  if (typeUser === "doctors") {
    return questions;
  }
  return questions?.filter(
    (question: any) =>
      !userData?.questions?.some(
        (dataQuestion: any) => dataQuestion.id === question.id
      )
  );
};

// perguntas que o usuário já respondeu
export const getUserAnsweredQuestions = (
  questions: any[],
  userData: any,
  typeUser: string
) => {
  if (typeUser === "doctors") {
    return userData;
  }
  return questions?.filter((question: any) =>
    userData?.questions?.some(
      (dataQuestion: any) => dataQuestion.id === question.id
    )
  );
};

export const updateDataWithQuestionResp = (data: any, questionResp: any[]) => {
  const question = questionResp.find((q: any) => q.id === data.questionData.id);

  if (!question) {
    return data;
  }

  const answer = question.answers.find((ans: any) => ans.id === data.id);

  if (!answer) {
    return data;
  }

  return {
    ...data,
    ...answer,
    questionData: question
  };
};
