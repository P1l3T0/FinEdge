import useGetTransactionPromptSuggestions from "../../../Hooks/FinancialRecommendations/useGetTransactiontPromptSuggestions";
import useGenerateTransactionRecommendation from "../../../Hooks/Transactions/useGenerateTransactionRecommendations";
import AIPromptComponent from "../../SharedComponents/AIPromptComponent";

const TransactionAIPrompt = () => {
  const { data } = useGetTransactionPromptSuggestions();
  const { generateTransactionRecommendation } = useGenerateTransactionRecommendation();

  return (
    <AIPromptComponent promptSuggestions={data!} generateFinancialRecommendation={generateTransactionRecommendation} />
  );
};

export default TransactionAIPrompt;
