import { useState } from "react";
import axios, { AxiosError } from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PromptRequestData, TransactionRecommendation } from "../../Utils/Types";
import { createTransactionRecommendationEndPoint } from "../../Utils/endpoints";

const useGenerateTransactionRecommendation = () => {
  const queryClient = useQueryClient();

  const [promptRequestData, setPromptRequestData] = useState<PromptRequestData>({
    prompt: "",
    dateString: `${new Date().getDate()}-${new Date().getMonth() + 1}-${new Date().getFullYear()}`,
  });

  const createRecommendations = async () => {
    const response = await axios
      .post(createTransactionRecommendationEndPoint, promptRequestData, { withCredentials: true })
      .catch((error: AxiosError) => {
        console.error(error);
      });

    return response?.data as TransactionRecommendation;
  };

  const { mutateAsync } = useMutation({
    mutationFn: createRecommendations,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transaction-recommendations"] });
    },
  });

  const generateTransactionRecommendation = async (prompt: string): Promise<TransactionRecommendation> => {
    setPromptRequestData({
      ...promptRequestData,
      prompt: prompt,
    });

    return await mutateAsync();
  };

  return { generateTransactionRecommendation };
};

export default useGenerateTransactionRecommendation;