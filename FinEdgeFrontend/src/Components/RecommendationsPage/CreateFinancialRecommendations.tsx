import { DatePicker, DatePickerChangeEvent } from "@progress/kendo-react-dateinputs";
import AIPromptComponent from "../SharedComponents/AIPromptComponent";
import useGetPromptSuggestions from "../../Hooks/FinancialRecommendations/useGetPromptSuggestions";
import useGenerateRecommendationPagetRecommendations from "../../Hooks/FinancialRecommendations/useGenerateRecommendationPagetRecommendations";

const CreateFinancialRecommendations = () => {
  const { data, isLoading, isError, error } = useGetPromptSuggestions();
  const { handleDateChange, generateFinancialRecommendation } = useGenerateRecommendationPagetRecommendations();

  const handleDatePickerChange = (e: DatePickerChangeEvent) => {
    if (e.value) {
      handleDateChange(e.value);
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error?.message}</p>;

  return (
    <>
      <div className="mb-3">
        <DatePicker width={200} max={new Date()} onChange={handleDatePickerChange} className="m-6" />
      </div>
      <div>
        <AIPromptComponent promptSuggestions={data!} generateFinancialRecommendation={generateFinancialRecommendation} />
      </div>
    </>
  );
};

export default CreateFinancialRecommendations;