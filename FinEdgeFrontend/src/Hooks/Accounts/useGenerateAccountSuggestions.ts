import { useState } from "react";
import axios, { AxiosError } from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AccountRecommendation, PromptRequestData } from "../../Utils/Types";
import { createAccountRecommendationEndPoint } from "../../Utils/endpoints";

const useGenerateAccountSuggestions = () => {
  const queryClient = useQueryClient();

  const [promptRequestData, setPromptRequestData] = useState<PromptRequestData>({
    prompt: "",
    dateString: `${new Date().getDate()}-${new Date().getMonth() + 1}-${new Date().getFullYear()}`,
  });

  const createRecommendations = async () => {
    const response = await axios
      .post(createAccountRecommendationEndPoint, promptRequestData, { withCredentials: true })
      .catch((error: AxiosError) => {
        console.error(error);
      });

    return response?.data as AccountRecommendation;
  };

  const { mutateAsync } = useMutation({
    mutationFn: createRecommendations,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["account-recommendations"] });
    },
  });

  const generateFinancialRecommendation = async (prompt: string): Promise<AccountRecommendation> => {
    setPromptRequestData({
      ...promptRequestData,
      prompt: prompt,
    });

    return await mutateAsync();
  };

  return { generateFinancialRecommendation };
};

export default useGenerateAccountSuggestions;