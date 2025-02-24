import { AIPrompt, AIPromptView, AIPromptOutputView, promptViewDefaults, outputViewDefaults, AIPromptOutputInterface } from '@progress/kendo-react-conversational-ui';
import { useState } from 'react'
import useGetPromptSuggestions from '../../../Hooks/FinancialRecommendations/useGetPromptSuggestions';
import useGetFinancialRecommendations from '../../../Hooks/FinancialRecommendations/useGetFinancialRecommendations';

const AIPromptComponent = ({ handleGenerateButtonClick }: { handleGenerateButtonClick: (prompt: string) => void }) => {
  const promptSuggestions = useGetPromptSuggestions();
  const financialRecommendations = useGetFinancialRecommendations();

  const [activeView, setActiveView] = useState<string>(promptViewDefaults.name);
  const [outputs, setOutputs] = useState<AIPromptOutputInterface[]>([]);

  const handleActiveViewChange = (viewName: string) => {
    setActiveView(viewName);
  }

  const handlePromptRequest = (prompt?: string) => {
    if (!prompt) {
      return;
    }

    handleGenerateButtonClick(prompt);

    setOutputs([{
      id: outputs?.length + 1,
      title: prompt,
      responseContent: financialRecommendations.data?.responseContent!,
      prompt
    },
    ...outputs,
    ]);

    setActiveView(outputViewDefaults.name);
  }

  if (promptSuggestions.isLoading || financialRecommendations?.isLoading) return <p>Loading...</p>;
  if (promptSuggestions.isError || financialRecommendations?.isError) return <p>Error: {promptSuggestions.error!.message || financialRecommendations?.error!.message}</p>;

  return (
    <>
      <AIPrompt
        style={{ width: '500px', height: 'auto', boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.1)' }}
        activeView={activeView}
        onActiveViewChange={handleActiveViewChange}
        onPromptRequest={handlePromptRequest}>
        <AIPromptView promptSuggestions={promptSuggestions.data} />
        <AIPromptOutputView outputs={outputs} showOutputRating={true} />
      </AIPrompt>
    </>
  )
}

export default AIPromptComponent;