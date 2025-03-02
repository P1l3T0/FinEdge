import { AIPrompt, AIPromptView, AIPromptOutputView, promptViewDefaults, outputViewDefaults, AIPromptOutputInterface } from '@progress/kendo-react-conversational-ui';
import { useState } from 'react'
import useGetPromptSuggestions from '../../../Hooks/FinancialRecommendations/useGetPromptSuggestions';
import { FinancialRecommendation } from '../../../Utils/Types';

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
    });
  }

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error!.message}</p>;

  return (
    <>
      <AIPrompt
        style={{ width: '500px', height: 'auto', boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.1)' }}
        activeView={activeView}
        onActiveViewChange={handleActiveViewChange}
        onPromptRequest={handlePromptRequest}>
        <AIPromptView promptSuggestions={data} />
        <AIPromptOutputView outputs={outputs} showOutputRating={true} />
      </AIPrompt>
    </>
  )
}

export default AIPromptComponent;