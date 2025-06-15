import { CategoryInfo } from '../../../Utils/Types';
import CategoriesInfo from '../Grids/CategoriesInfo';
import InfoCard from './InfoCard';

const InformationCharts = ({categoryInfoData}: {categoryInfoData: CategoryInfo}) => {
  return (
    <>
      <InfoCard title="Expenditure Breakdown">
        <CategoriesInfo categoryInfoData={categoryInfoData} />
      </InfoCard>
    </>
  );
}

export default InformationCharts;