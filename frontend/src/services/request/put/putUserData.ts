import { showToast } from "@/components/toast";
import { BearerToken } from "@/utils/bearerToken";
import { basicUrl } from "@/utils/urls";
import axios from "axios";

export const putUserData = async (
  selected: string,
  id: string,
  data: any,
  toast: any,
  token: string
) => {
  try {
    const res = await axios.put(
      `${basicUrl}/${selected}/${id}`,
      data,
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
