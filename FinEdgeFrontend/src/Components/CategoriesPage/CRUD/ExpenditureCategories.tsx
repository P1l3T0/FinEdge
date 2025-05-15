import useGetExpenditureCategories from "../../../Hooks/Categories/useGetExpenditureCategories";
import CategoriesList from "./CategoriesList";

const ExpenditureCategories = () => {
  const { data } = useGetExpenditureCategories();

  return (
    <CategoriesList title="Expenditure Categories" data={data!} />
  );
};

export default ExpenditureCategories;