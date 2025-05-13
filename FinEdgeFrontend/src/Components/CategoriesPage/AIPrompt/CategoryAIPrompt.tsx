import useGenerateCategoryRecommendations from "../../../Hooks/Categories/useGenerateCategoryRecommendations";
import useGetCategoryPromptSuggestions from "../../../Hooks/FinancialRecommendations/useGetCategoryPromptSuggestions";
import AIPromptComponent from "../../SharedComponents/AIPromptComponent";

const CategoryAIPrompt = () => {
  const { data } = useGetCategoryPromptSuggestions();
  const { generateCategoryRecommendation } = useGenerateCategoryRecommendations();

  return (
    <AIPromptComponent promptSuggestions={data!} generateFinancialRecommendation={generateCategoryRecommendation} />
  );
};

export default CategoryAIPrompt;