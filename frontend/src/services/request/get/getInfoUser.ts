import { basicUrl } from "@/utils/urls";
import axios from "axios";

export const getInfoUser = async (
  selected: string,
  id: string,
  token: string
) => {
  try {
    const res = await axios.get(`${basicUrl}/${selected}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  } catch (error) {
    console.error("Erro ao obter informações do usuário:", error);
  }
};
