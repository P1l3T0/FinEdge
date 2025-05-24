import { DatePicker, DatePickerChangeEvent } from "@progress/kendo-react-dateinputs";
import AIPromptComponent from "../SharedComponents/AIPromptComponent";
import useGetPromptSuggestions from "../../Hooks/FinancialRecommendations/useGetPromptSuggestions";
import useGenerateRecommendationPagetRecommendations from "../../Hooks/FinancialRecommendations/useGenerateRecommendationPagetRecommendations";
import DeleteFinancialRecommendations from "./DeleteFinancialRecommendations";

const CreateFinancialRecommendations = () => {
  const { data } = useGetPromptSuggestions();
  const { handleDateChange, generateFinancialRecommendation } = useGenerateRecommendationPagetRecommendations();

  const handleDatePickerChange = (e: DatePickerChangeEvent) => {
    if (e.value) {
      handleDateChange(e.value);
    }
  };

  return (
    <>
      <div className="mb-3 gap-2 flex">
        <DatePicker width={200} max={new Date()} onChange={handleDatePickerChange} className="m-6" />
        <DeleteFinancialRecommendations />
      </div>
      <div>
        <AIPromptComponent promptSuggestions={data!} generateFinancialRecommendation={generateFinancialRecommendation} />
      </div>
    </>
  );
};

export default CreateFinancialRecommendations;