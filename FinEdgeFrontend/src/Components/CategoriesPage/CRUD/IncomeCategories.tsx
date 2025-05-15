import useGetIncomeCategories from "../../../Hooks/Categories/useGetIncomeCategories";
import CategoriesList from "./CategoriesList";

const IncomeCategories = () => {
  const { data } = useGetIncomeCategories();

  return (
    <CategoriesList title="Income Categories" data={data!} />
  );
};

export default IncomeCategories;