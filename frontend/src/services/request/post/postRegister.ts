import { showToast } from "@/components/toast";
import { basicUrl } from "@/utils/urls";
import axios from "axios";

export const postRegister = async (
  data: Record<string, any>,
  selected: string,
  toast: any,
  router: any
) => {
  try {
    await axios.post(`${basicUrl}/${selected}/register`, data);
    showToast(toast, {
      type: "success",
      title: "Success",
      description: "Registrado com sucesso",
    });
    router.push(`/auth/login`);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      showToast(toast, {
        type: "error",
        title: "Error",
        description: error.response?.data || "An error occurred.",
      });
    } else {
      console.error("Unexpected error: ", error);
    }
  }
};
