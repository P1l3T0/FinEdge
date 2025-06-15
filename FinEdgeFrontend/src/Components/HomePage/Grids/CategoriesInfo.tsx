import { CategoryInfo } from "../../../Utils/Types";
import CategoriesPie from "./CategoriesPie";
import { PanelBar, PanelBarItem } from "@progress/kendo-react-layout";

const CategoriesInfo = ({categoryInfoData}: {categoryInfoData: CategoryInfo}) => {
  return (
    <>
      <PanelBar>
        <PanelBarItem title="Expenses" expanded={true}>
          <CategoriesPie data={categoryInfoData?.expenditureInfo!} title="Expenditure info" />
        </PanelBarItem>
        <PanelBarItem title="Income">
          <CategoriesPie data={categoryInfoData?.incomeInfo!} title="Income info" />
        </PanelBarItem>
      </PanelBar>
    </>
  );
};


export default CategoriesInfo;