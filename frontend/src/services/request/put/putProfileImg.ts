import { showToast } from "@/components/toast";
import { BearerToken } from "@/utils/bearerToken";
import { basicUrl } from "@/utils/urls";
import axios from "axios";

export const putProfileImg = async (
  selected: string,
  userID: string,
  formData: any,
  token: string,
  toast: any
) => {
  try {
    const res = await axios.put(
      `${basicUrl}/${selected}/${userID}/image`,
      formData,
      BearerToken(token, true)
    );

    showToast(toast, {
      type: "success",
      title: "Successo",
      description: "Imagem carregada com sucesso!",
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
