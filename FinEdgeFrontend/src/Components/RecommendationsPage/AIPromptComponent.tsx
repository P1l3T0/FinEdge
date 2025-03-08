import { AIPrompt, AIPromptView, AIPromptOutputView, promptViewDefaults, outputViewDefaults, AIPromptOutputInterface } from '@progress/kendo-react-conversational-ui';
import { useState } from 'react'
import useGetPromptSuggestions from '../../Hooks/FinancialRecommendations/useGetPromptSuggestions';
import { FinancialRecommendation } from '../../Utils/Types';

const AIPromptComponent = ({ generateFinancialRecommendation }: { generateFinancialRecommendation: (prompt: string) => Promise<FinancialRecommendation> }) => {
  const { data, isLoading, isError, error } = useGetPromptSuggestions();

  const [activeView, setActiveView] = useState<string>(promptViewDefaults.name);
  const [outputs, setOutputs] = useState<AIPromptOutputInterface[]>([]);

  const handleActiveViewChange = (viewName: string) => {
    setActiveView(viewName);
  }

  const handlePromptRequest = (prompt?: string) => {
    if (!prompt) {
      return;
    }

    const recommendation = generateFinancialRecommendation(prompt);

    recommendation.then((data) => {
      setOutputs([{
          id: data.id,
          title: prompt,
          responseContent: data?.responseContent!,
          prompt,
        },
        ...outputs,
      ]);

      setActiveView(outputViewDefaults.name);
    }).catch((error) => {
      console.log(error);
    });
  }

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
}

export default AIPromptComponent;