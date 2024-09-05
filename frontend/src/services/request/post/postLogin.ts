import { showToast } from "@/components/toast";
import { basicUrl } from "@/utils/urls";
import axios from "axios";

export const postLogin = async (
  data: Record<string, any>,
  selected: string,
  toast: any,
  login: any
) => {
  try {
    const res = await axios.post(`${basicUrl}/auth/${selected}/login`, data);
    showToast(toast, {
      type: "success",
      title: "Successo",
      description: "Usuário logado com sucesso",
    });

    await login(res.data?.token, res.data?.expiresAt, res.data?.typeUser);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      showToast(toast, {
        type: "error",
        title: "Erro",
        description: error.response?.data || "An error occurred.",
      });
    } else {
      console.error("Unexpected error: ", error);
    }
  }
};
