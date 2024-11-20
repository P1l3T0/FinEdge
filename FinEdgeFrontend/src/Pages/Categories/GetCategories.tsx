import usesGetCategories from "../../Hooks/useGetCategories";
import CategoryCards from "./CategoryCards";

const GetCategories = () => {
  const { data, isLoading, isError, error } = usesGetCategories();

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error!.message}</p>;

  return (
    <>
      <CategoryCards categories={data?.incomeCategories!} totalBalance={data?.totalIncomeBalance!} totalBudget={data?.totalIncomeBudget!} />
      <CategoryCards categories={data?.expenditureCategories!} totalBalance={data?.totalExpenditureBalance!} totalBudget={data?.totalExpenditureBudget!} />
    </>
  )
}

export default GetCategories;