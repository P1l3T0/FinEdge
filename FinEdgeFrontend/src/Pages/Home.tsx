import UserProfile from "../Components/HomePage/Cards/UserProfile";
import StatisticCards from "../Components/HomePage/Cards/StatisticCards";
import InformationGrids from "../Components/HomePage/Cards/InformationGrids";
import InformationCharts from "../Components/HomePage/Cards/InformationCharts";
import { Loader } from "@progress/kendo-react-indicators";
import { useUserDataQueries } from "../Hooks/User/useIsUserDataLoading";

const Home = () => {
  const { isLoading, isError, error, user, userData, reports, categoryInfo } = useUserDataQueries();

  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-100">
        <Loader type="converging-spinner" size="large" />
      </div>
    );
  };

  if (isError) console.log(error?.message);

  return (
    <div className="bg-gray-50 p-3">
      <div className="space-y-3">
        <UserProfile user={user!} />
        <StatisticCards user={user!} reports={reports!} />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <InformationGrids userData={userData!} />
          <InformationCharts categoryInfoData={categoryInfo!} />
        </div>
      </div>
    </div>
  );
};

export default Home;