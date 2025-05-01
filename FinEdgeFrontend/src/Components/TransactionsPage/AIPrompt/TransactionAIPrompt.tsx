import useGetTransactionPromptSuggestions from "../../../Hooks/FinancialRecommendations/useGetTransactiontPromptSuggestions";
import useGenerateTransactionRecommendation from "../../../Hooks/Transactions/useGenerateTransactionRecommendations";
import AIPromptComponent from "../../SharedComponents/AIPromptComponent";

const TransactionAIPrompt = () => {
  const { data, isLoading, isError, error } = useGetTransactionPromptSuggestions();
  const { generateTransactionRecommendation } = useGenerateTransactionRecommendation();

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error!.message}</p>;

  return (
    <AIPromptComponent promptSuggestions={data!} generateFinancialRecommendation={generateTransactionRecommendation} />
  );
};

export default TransactionAIPrompt;
