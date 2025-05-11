import useGetExpenditureCategories from "../../../Hooks/Categories/useGetExpenditureCategories";
import CategoriesList from "./CategoriesList";

const ExpenditureCategories = () => {
  const { data, isLoading, isError, error } = useGetExpenditureCategories();

  return (
    <CategoriesList title="Expenditure Categories" data={data!} isLoading={isLoading} isError={isError} error={error} />
  );
};

export default ExpenditureCategories;