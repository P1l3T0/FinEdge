import { useState } from "react";
import axios, { AxiosError } from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CategoryRecommendation, PromptRequestData } from "../../Utils/Types";
import { createCategorylRecommendationEndPoint } from "../../Utils/endpoints";

const useGenerateCategoryRecommendations = () => {
  const queryClient = useQueryClient();

  const [promptRequestData, setPromptRequestData] = useState<PromptRequestData>({
    prompt: "",
    dateString: `${new Date().getDate()}-${new Date().getMonth() + 1}-${new Date().getFullYear()}`,
  });

  const createRecommendations = async () => {
    const response = await axios
      .post(createCategorylRecommendationEndPoint, promptRequestData, { withCredentials: true })
      .catch((error: AxiosError) => {
        console.error(error);
      });

    return response?.data as CategoryRecommendation;
  };

  const { mutateAsync } = useMutation({
    mutationFn: createRecommendations,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["category-recommendations"] });
    },
  });

  const generateCategoryRecommendation = async (prompt: string): Promise<CategoryRecommendation> => {
    setPromptRequestData({
      ...promptRequestData,
      prompt: prompt,
    });

    return await mutateAsync();
  };

  return { generateCategoryRecommendation };
};

export default useGenerateCategoryRecommendations;