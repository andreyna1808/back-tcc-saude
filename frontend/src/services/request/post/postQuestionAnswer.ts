import { showToast } from "@/components/toast";
import { BearerToken } from "@/utils/bearerToken";
import { basicUrl } from "@/utils/urls";
import axios from "axios";

export const postQuestionAnswer = async (
  data: Record<string, any>,
  type: string,
  toast: any,
  token: string
) => {
  try {
    const res = await axios.post(
      `${basicUrl}/${type}/create`,
      data,
      BearerToken(token)
    );
    showToast(toast, {
      type: "success",
      title: "Success",
      description: "Requisição criada com sucesso",
    });

    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      showToast(toast, {
        type: "error",
        title: "Error",
        description:
          error.response?.data ||
          "Ocorreu um erro, tente novamente mais tarde!.",
      });
    } else {
      console.error("Unexpected error: ", error);
    }
  }
};
