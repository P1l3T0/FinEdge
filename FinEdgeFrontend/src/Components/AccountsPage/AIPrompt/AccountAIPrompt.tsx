import useGetAccountPromptSuggestions from "../../../Hooks/FinancialRecommendations/useGetAccountPromptSuggestions";
import useGenerateAccountRecommendations from "../../../Hooks/Accounts/useGenerateAccountRecommendations";
import AIPromptComponent from "../../SharedComponents/AIPromptComponent";

const AccountAIPrompt = () => {
  const { data } = useGetAccountPromptSuggestions();
  const { generateFinancialRecommendation } = useGenerateAccountRecommendations();

  return (
    <AIPromptComponent promptSuggestions={data!} generateFinancialRecommendation={generateFinancialRecommendation} />
  );
};

export default AccountAIPrompt;