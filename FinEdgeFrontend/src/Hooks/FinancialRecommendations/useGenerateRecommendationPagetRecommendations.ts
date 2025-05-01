import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { FinancialRecommendation, PromptRequestData } from "../../Utils/Types";
import { createFinancialRecommendationEndPoint } from "../../Utils/endpoints";

const useGenerateRecommendationPagetRecommendations = () => {
  const queryClient = useQueryClient();

  const [promptRequestData, setPromptRequestData] = useState<PromptRequestData>({
    prompt: "",
    dateString: `${new Date().getDate()}-${new Date().getMonth() + 1}-${new Date().getFullYear()}`,
  });

  const handleDateChange = (date: Date) => {
    const dateString: string = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;

    setPromptRequestData({
      ...promptRequestData,
      dateString: dateString,
    });
  };

  const createRecommendations = async () => {
    const response = await axios
      .post(createFinancialRecommendationEndPoint, promptRequestData, { withCredentials: true })
      .catch((error: AxiosError) => {
        console.error(error);
      });

    return response?.data as FinancialRecommendation;
  };

  const { mutateAsync } = useMutation({
    mutationFn: createRecommendations,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["recommendations"] });
    },
  });

  const generateFinancialRecommendation = async (prompt: string): Promise<FinancialRecommendation> => {
    setPromptRequestData({
      ...promptRequestData,
      prompt: prompt,
    });

    const newRecommendation = await mutateAsync();
    return newRecommendation;
  };

  return { promptRequestData, handleDateChange, generateFinancialRecommendation };
};

export default useGenerateRecommendationPagetRecommendations;