import useGetIncomeCategories from "../../../Hooks/Categories/useGetIncomeCategories";
import CategoriesList from "./CategoriesList";

const IncomeCategories = () => {
  const { data, isLoading, isError, error } = useGetIncomeCategories();

  return (
    <CategoriesList title="Income Categories" data={data!} isLoading={isLoading} isError={isError} error={error} />
  );
};

export default IncomeCategories;