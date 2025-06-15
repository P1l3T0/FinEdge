import StatCard from './StatCard'
import { Reports, User } from '../../../Utils/Types';

const StatisticCards = ({user, reports}: {user: User, reports: Reports}) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6">
        <StatCard title="Total Balance" value={user?.totalBalance} />
        <StatCard title="Daily Overview" 
          value={
            <>
              <p className="text-lg font-bold text-green-600">
                +{reports?.dailyIncome} BGN
              </p>
              <p className="text-lg font-bold text-red-600">
                -{reports?.dailySpendings} BGN
              </p>
              
            </>
          }
        />
        <StatCard title="Weekly Income" value={reports?.weeklyIncome} subtitle={`Avg: ${reports?.weeklyIncomeAverage} BGN per day`} valueColor="text-green-600" />
        <StatCard title="Weekly Spendings" value={reports?.weeklySpendings} subtitle={`Avg: ${reports?.weeklySpendingsAverage} BGN per day`} valueColor="text-red-600" />
        <StatCard title="Monthly Income" value={reports?.monthlyIncome} subtitle={`Avg: ${reports?.monthlyIncomeAverage} BGN per day`} valueColor="text-green-600" />
        <StatCard title="Monthly Expenses" value={reports?.monthlySpendings} subtitle={`Avg: ${reports?.monthlySpendingsAverage} BGN per day`} valueColor="text-red-600" />
      </div>
    </>
  )
}

export default StatisticCards;