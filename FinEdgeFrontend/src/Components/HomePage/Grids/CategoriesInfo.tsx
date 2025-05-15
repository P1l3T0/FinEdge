import useGetCategoryInfo from "../../../Hooks/Categories/useGetCategoryInfo";
import CategoriesPie from "./CategoriesPie";
import { PanelBar, PanelBarItem } from "@progress/kendo-react-layout";

const CategoriesInfo = () => {
  const { data } = useGetCategoryInfo();

  return (
    <>
      <PanelBar>
        <PanelBarItem title="Expenses">
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