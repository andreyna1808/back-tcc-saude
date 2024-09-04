import { basicUrl } from "@/utils/urls";
import axios from "axios";

export const getQuestions = async (token: string) => {
  try {
    const res = await axios.get(`${basicUrl}/questions`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  } catch (error) {
    console.error("Erro ao obter informações do usuário:", error);
  }
};
