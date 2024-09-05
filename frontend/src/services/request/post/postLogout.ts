import { showToast } from "@/components/toast";
import { BearerToken } from "@/utils/bearerToken";
import { basicUrl } from "@/utils/urls";
import axios from "axios";

export const postLogout = async (token: string, toast: any, login: any) => {
  try {
    const res = await axios.post(
      `${basicUrl}/auth/logout`,
      {},
      BearerToken(token)
    );
    showToast(toast, {
      type: "success",
      title: "Successo",
      description: "Até mais tarde!",
    });

    await login(null, null, null);
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
