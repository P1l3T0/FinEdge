import { Button } from "@progress/kendo-react-buttons";
import useDeleteFinancialRecommendations from "../../Hooks/FinancialRecommendations/useDeleteFinancialRecommendations";

const DeleteFinancialRecommendations = () => {
  const { handleDelete } = useDeleteFinancialRecommendations();

  return (
    <>
      <Button type="button" fillMode="solid" themeColor={"error"} onClick={handleDelete}>Delete</Button>
    </>
  );
};

export default DeleteFinancialRecommendations;