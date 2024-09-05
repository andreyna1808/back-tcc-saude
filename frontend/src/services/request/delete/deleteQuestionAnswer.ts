import { showToast } from "@/components/toast";
import { BearerToken } from "@/utils/bearerToken";
import { basicUrl } from "@/utils/urls";
import axios from "axios";

export const deleteQuestionAnswer = async (
  type: string,
  id: string,
  token: string,
  toast: any
) => {
  try {
    const res = await axios.delete(
      `${basicUrl}/${type}/${id}`,
      BearerToken(token)
    );

    showToast(toast, {
      type: "success",
      title: "Successo",
      description: "Deletado com sucesso!",
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
