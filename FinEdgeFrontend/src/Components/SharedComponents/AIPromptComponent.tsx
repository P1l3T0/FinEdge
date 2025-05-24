import { useState } from "react";
import { PromptOutput } from "../../Utils/Types";
import { AIPrompt, AIPromptView, AIPromptOutputView, promptViewDefaults, outputViewDefaults, AIPromptOutputInterface } from "@progress/kendo-react-conversational-ui";

type AIPromptComponentProps = {
  generateFinancialRecommendation: (prompt: string) => Promise<PromptOutput>;
  promptSuggestions: string[];
};

const AIPromptComponent = ({ generateFinancialRecommendation, promptSuggestions }: AIPromptComponentProps) => {
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
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <AIPrompt className="shadow-sm px-5 w-70 sm:w-90 md:w-139 " activeView={activeView} onActiveViewChange={handleActiveViewChange} onPromptRequest={handlePromptRequest}>
      <AIPromptView promptSuggestions={promptSuggestions} />
      <AIPromptOutputView outputs={outputs} showOutputRating={true} />
    </AIPrompt>
  );
};

export default AIPromptComponent;