import { basicUrl } from "@/utils/urls";
import axios from "axios";

export const putLikeQuestionAnswer = async (
  selected: string,
  userID: string,
  itemId: string,
  token: string,
  isQuestion: boolean
) => {
  try {
    const res = await axios.put(
      `${basicUrl}/${selected}/${userID}/like?itemId=${itemId}&isQuestion=${isQuestion}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return res.data;
  } catch (error) {
    console.error("Erro:", error);
  }
};
