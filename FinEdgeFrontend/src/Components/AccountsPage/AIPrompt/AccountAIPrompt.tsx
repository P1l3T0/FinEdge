import useGetAccountPromptSuggestions from "../../../Hooks/FinancialRecommendations/useGetAccountPromptSuggestions";
import useGenerateAccountRecommendations from "../../../Hooks/Accounts/useGenerateAccountRecommendations";
import AIPromptComponent from "../../SharedComponents/AIPromptComponent";

const AccountAIPrompt = () => {
  const { data, isLoading, isError, error } = useGetAccountPromptSuggestions();
  const { generateFinancialRecommendation } = useGenerateAccountRecommendations();

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error!.message}</p>;

  return (
    <AIPromptComponent promptSuggestions={data!} generateFinancialRecommendation={generateFinancialRecommendation} />
  );
};

export default AccountAIPrompt;