import useGenerateCategoryRecommendations from "../../../Hooks/Categories/useGenerateCategoryRecommendations";
import useGetCategoryPromptSuggestions from "../../../Hooks/FinancialRecommendations/useGetCategoryPromptSuggestions";
import AIPromptComponent from "../../SharedComponents/AIPromptComponent";

const CategoryAIPrompt = () => {
  const { data, isLoading, isError, error } = useGetCategoryPromptSuggestions();
  const { generateCategoryRecommendation } = useGenerateCategoryRecommendations();

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error!.message}</p>;

  return (
    <AIPromptComponent promptSuggestions={data!} generateFinancialRecommendation={generateCategoryRecommendation} />
  );
};

export default CategoryAIPrompt;