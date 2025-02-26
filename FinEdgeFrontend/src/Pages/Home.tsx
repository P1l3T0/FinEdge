import UserProfile from "../Components/HomePage/Cards/UserProfile";
import StatisticCards from "../Components/HomePage/Cards/StatisticCards";
import InformationGrids from "../Components/HomePage/Cards/InformationGrids";
import InformationCharts from "../Components/HomePage/Cards/InformationCharts";

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-8xl mx-auto space-y-6">
        <UserProfile />
        <StatisticCards />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <InformationGrids />
          <InformationCharts />
        </div>
      </div>
    </div>
  );
};

export default Home;