import useGetReports from '../../../Hooks/Transactions/useGetReports';
import useGetUser from '../../../Hooks/Auth/useGetUser';
import StatCard from './StatCard'

const StatisticCards = () => {
  const { data: userData, isLoading: userLoading, isError: userError, error: userErrorData } = useGetUser();
  const { data: reportsData, isLoading: reportsLoading, isError: reportsError, error: reportsErrorData } = useGetReports();

  if (userLoading || reportsLoading) return <p>Loading...</p>;
  if (userError || reportsError) return <p>Error: {userErrorData?.message || reportsErrorData?.message}</p>;

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6">
        <StatCard title="Total Balance" value={userData?.totalBalance} />
        <StatCard title="Daily Overview" 
          value={
            <>
              <p className="text-lg font-bold text-green-600">
                +{reportsData?.dailyIncome} BGN
              </p>
              <p className="text-lg font-bold text-red-600">
                -{reportsData?.dailySpendings} BGN
              </p>
              
            </>
          }
        />
        <StatCard title="Weekly Income" value={reportsData?.weeklyIncome} subtitle={`Avg: ${reportsData?.weeklyIncomeAverage} BGN per day`} valueColor="text-green-600" />
        <StatCard title="Weekly Spendings" value={reportsData?.weeklySpendings} subtitle={`Avg: ${reportsData?.weeklySpendingsAverage} BGN per day`} valueColor="text-red-600" />
        <StatCard title="Monthly Income" value={reportsData?.monthlyIncome} subtitle={`Avg: ${reportsData?.monthlyIncomeAverage} BGN per day`} valueColor="text-green-600" />
        <StatCard title="Monthly Expenses" value={reportsData?.monthlySpendings} subtitle={`Avg: ${reportsData?.monthlySpendingsAverage} BGN per day`} valueColor="text-red-600" />
      </div>
    </>
  )
}

export default StatisticCards;