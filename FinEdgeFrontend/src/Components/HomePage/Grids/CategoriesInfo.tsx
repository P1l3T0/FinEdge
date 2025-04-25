import useGetCategoryInfo from "../../../Hooks/Categories/useGetCategoryInfo";
import CategoriesPie from "./CategoriesPie";
import { PanelBar, PanelBarItem } from "@progress/kendo-react-layout";

const CategoriesInfo = () => {
  const { data, isLoading, isError, error } = useGetCategoryInfo();

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error?.message}</p>;

  return (
    <>
      <PanelBar>
        <PanelBarItem expanded={true} title="Expenses">
          <CategoriesPie data={data?.expenditureInfo!} title="Expenditure info" />
        </PanelBarItem>
        <PanelBarItem title="Income">
          <CategoriesPie data={data?.incomeInfo!} title="Income info" />
        </PanelBarItem>
      </PanelBar>
    </>
  );
};


export default CategoriesInfo;