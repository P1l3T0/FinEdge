import CategoriesInfo from '../Grids/CategoriesInfo';
import InfoCard from './InfoCard';

const InformationCharts = () => {
  return (
    <>
      <InfoCard title="Expenditure Breakdown">
        <CategoriesInfo />
      </InfoCard>
    </>
  );
}

export default InformationCharts;