import { useState } from "react";
import axios, { AxiosError } from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AIPrompt,   AIPromptView, AIPromptOutputView,  promptViewDefaults, outputViewDefaults, AIPromptOutputInterface } from "@progress/kendo-react-conversational-ui";
import { PromptRequestData, TransactionRecommendation } from "../../../Utils/Types";
import { createTransactionRecommendationEndPoint } from "../../../Utils/endpoints";
import useGetTransactionPromptSuggestions from "../../../Hooks/FinancialRecommendations/useGetTransactiontPromptSuggestions";

const TransactionAIPrompt = () => {
  const queryClient = useQueryClient();
  const [promptRequestData, setPromptRequestData] = useState<PromptRequestData>({
      prompt: "",
      dateString: `${new Date().getDate()}-${new Date().getMonth() + 1}-${new Date().getFullYear()}`,
    }
  );

  const { data, isLoading, isError, error } = useGetTransactionPromptSuggestions();

  const [activeView, setActiveView] = useState<string>(promptViewDefaults.name);
  const [outputs, setOutputs] = useState<AIPromptOutputInterface[]>([]);

  const handleActiveViewChange = (viewName: string) => {
    setActiveView(viewName);
  };

  const handlePromptRequest = (prompt?: string) => {
    if (!prompt) {
      return;
    }

    const recommendation = generateTransactionRecommendation(prompt);

    recommendation
      .then((data) => {
        setOutputs([{
            id: data.id,
            title: prompt,
            responseContent: data?.responseContent!,
            prompt,
          },
          ...outputs,
        ]);

        setActiveView(outputViewDefaults.name);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const generateTransactionRecommendation = async (prompt: string): Promise<TransactionRecommendation> => {
    setPromptRequestData({
      ...promptRequestData,
      prompt: prompt,
    });

    return await mutateAsync();
  };

  const createRecommendations = async () => {
    const response = await axios
      .post(createTransactionRecommendationEndPoint, promptRequestData, {
        withCredentials: true,
      })
      .catch((error: AxiosError) => {});

    return response?.data as TransactionRecommendation;
  };

  const { mutateAsync } = useMutation({
    mutationFn: createRecommendations,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["transaction-recommendations"],
      });
    },
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error!.message}</p>;

  return (
    <>
      <AIPrompt className="px-5 w-70 sm:w-90 md:w-139 shadow-sm" activeView={activeView}
        onActiveViewChange={handleActiveViewChange} onPromptRequest={handlePromptRequest}>
        <AIPromptView promptSuggestions={data} />
        <AIPromptOutputView outputs={outputs} showOutputRating={true} />
      </AIPrompt>
    </>
  );
};

export default TransactionAIPrompt;
