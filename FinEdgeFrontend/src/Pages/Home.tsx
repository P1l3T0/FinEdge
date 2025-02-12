import InfoCard from "../Components/HomePage/InfoCard";
import StatCard from "../Components/HomePage/StatCard";
import UserProfile from "../Components/HomePage/UserProfile";
import useGetReports from "../Hooks/useGetReports";
import useGetUser from "../Hooks/useGetUser";
import AccountsGrid from "../Data/User/Details/AccountsGrid";
import CategoriesGrid from "../Data/User/Details/CategoriesGrid";
import CategoriesInfo from "../Data/User/Details/CategoriesInfo";
import TransactionsGrid from "../Data/User/Details/TransactionsGrid";

const Home = () => {
  const { data: userData, isLoading: userLoading, isError: userError, error: userErrorData } = useGetUser();
  const { data: reportsData, isLoading: reportsLoading, isError: reportsError, error: reportsErrorData } = useGetReports();

  if (userLoading || reportsLoading) return <p>Loading...</p>;
  if (userError || reportsError) return <p>Error: {userErrorData?.message || reportsErrorData?.message}</p>;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-8xl mx-auto space-y-6">
        <UserProfile user={userData!} />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard title="Total Balance" value={userData?.totalBalance} />
          <StatCard title="Monthly Income" value={reportsData?.monthlyIncome} subtitle={`Avg: $${reportsData?.monthlyAverage}`} valueColor="text-green-600" />
          <StatCard title="Monthly Expenses" value={reportsData?.monthlySpendings} subtitle={`Avg: $${reportsData?.monthlySpendingsAverage}`} valueColor="text-red-600" />
          <StatCard title="Weekly Overview" 
            value={
              <>
                <p className="text-lg font-bold text-green-600">
                  +${reportsData?.monthlyIncome}
                </p>
                <p className="text-lg font-bold text-red-600">
                  -${reportsData?.monthlySpendingsAverage}
                </p>
              </>
            }
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <InfoCard title="Information" className="lg:col-span-2">
            <div className="space-y-6">
              <div>
                <AccountsGrid accounts={userData?.accounts!} />
              </div>
              <div>
                <CategoriesGrid categories={userData?.categories!} />
              </div>
              <div>
                <TransactionsGrid transactions={userData?.transactions!} />
              </div>
            </div>
          </InfoCard>

          <InfoCard title="Expenditure Breakdown">
            <CategoriesInfo />
          </InfoCard>
        </div>
      </div>
    </div>
  );
};

export default Home;