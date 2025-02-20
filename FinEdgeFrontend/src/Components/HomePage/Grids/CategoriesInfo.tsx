import useGetCategoryInfo from "../../../Hooks/Categories/useGetCategoryInfo";
import CategoriesPie from "./CategoriesPie";

const CategoriesInfo = () => {
  const { data, isLoading, isError, error } = useGetCategoryInfo();

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error?.message}</p>;

  return (
    <>
      <CategoriesPie data={data?.expenditureInfo!} title="Expenditure info" />
      <CategoriesPie data={data?.incomeInfo!} title="Income info" />
    </>
  )
}

export default CategoriesInfo;