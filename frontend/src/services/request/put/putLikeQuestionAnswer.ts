import { showToast } from "@/components/toast";
import { BearerToken } from "@/utils/bearerToken";
import { basicUrl } from "@/utils/urls";
import axios from "axios";

export const putLikeQuestionAnswer = async (
  selected: string,
  userID: string,
  itemId: string,
  token: string,
  isQuestion: boolean,
  toast: any
) => {
  try {
    const res = await axios.put(
      `${basicUrl}/${selected}/${userID}/like?itemId=${itemId}&isQuestion=${isQuestion}`,
      {},
      BearerToken(token)
    );

    showToast(toast, {
      type: "success",
      title: "Successo",
      description: "Atualizado com sucesso",
    });

    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      showToast(toast, {
        type: "error",
        title: "Erro",
        description:
          error.response?.data ||
          "Ocorreu um erro, tente novamente mais tarde!.",
      });
    } else {
      console.error("Unexpected error: ", error);
    }
  }
};
