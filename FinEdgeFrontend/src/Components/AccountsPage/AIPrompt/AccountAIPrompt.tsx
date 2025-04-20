import { useState } from "react";
import axios, { AxiosError } from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AIPrompt, AIPromptView, AIPromptOutputView, promptViewDefaults, outputViewDefaults, AIPromptOutputInterface } from "@progress/kendo-react-conversational-ui";
import useGetAccountPromptSuggestions from "../../../Hooks/FinancialRecommendations/useGetAccountPromptSuggestions";
import { AccountRecommendation, PromptRequestData } from "../../../Utils/Types";
import { createAccountRecommendationEndPoint } from "../../../Utils/endpoints";

const AccountAIPrompt = () => {
    const queryClient = useQueryClient();
    const [promptRequestData, setPromptRequestData] = useState<PromptRequestData>({
      prompt: "",
      dateString: `${new Date().getDate()}-${new Date().getMonth() + 1}-${new Date().getFullYear()}`
    });
    
    const { data, isLoading, isError, error } = useGetAccountPromptSuggestions();

    const [activeView, setActiveView] = useState<string>(promptViewDefaults.name);
    const [outputs, setOutputs] = useState<AIPromptOutputInterface[]>([]);

    const handleActiveViewChange = (viewName: string) => {
      setActiveView(viewName);
    };

    const handlePromptRequest = (prompt?: string) => {
      if (!prompt) {
        return;
      }

      const recommendation = generateFinancialRecommendation(prompt);

      recommendation
        .then((data) => {
          setOutputs([
            {
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

    const generateFinancialRecommendation = async (prompt: string): Promise<AccountRecommendation> => {
      setPromptRequestData({
        ...promptRequestData,
        prompt: prompt,
      });
      
      return await mutateAsync();
    }

    const createRecommendations = async () => {
      const response = await axios
        .post(createAccountRecommendationEndPoint, promptRequestData, { withCredentials: true })
        .catch((error: AxiosError) => {});

      return response?.data as AccountRecommendation;
    };

    const { mutateAsync } = useMutation({
      mutationFn: createRecommendations,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["account-recommendations"] });
      },
    });

    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Error: {error!.message}</p>;

    return (
      <>
        <AIPrompt className="px-5 w-70 sm:w-90 md:w-139 shadow-sm" activeView={activeView} onActiveViewChange={handleActiveViewChange} onPromptRequest={handlePromptRequest}>
          <AIPromptView promptSuggestions={data} />
          <AIPromptOutputView outputs={outputs} showOutputRating={true} />
        </AIPrompt>
      </>
    );
};

export default AccountAIPrompt;