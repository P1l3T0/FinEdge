import { Card } from "@progress/kendo-react-layout";
import { Reports } from "../../../../Utils/Types"

const OverviewCard = ({ isIncome, data }: { isIncome: boolean, data: Reports }) => {
  return (
    <>
      <Card className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">{isIncome ? "Income Overview" : "Spendings Overview"}</h2>
        <div className="space-y-4">
          <div className={`flex justify-between items-center p-3 ${isIncome ? "bg-blue-50" : "bg-red-50"} rounded-lg`}>
            <span className="text-gray-600"> {isIncome ? "Daily Income" : "Daily Spendings"}</span>
            <span className={`text-lg font-semibold ${isIncome ? "text-blue-600" : "text-red-600"}`}>{isIncome ? data?.dailyIncome : data?.dailySpendings} BGN</span>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">{isIncome ? "Weekly Income" : "Weekly Spendings"}</span>
              <span className={`text-lg font-semibold ${isIncome ? "text-blue-600" : "text-red-600"}`}>{isIncome ? data?.weeklyIncome : data?.weeklySpendings} BGN</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-500">{isIncome ? "Avarage Weekly Income" : "Average Weekly Spendings"}</span>
              <span className="text-gray-700">{isIncome ? data?.weeklyIncomeAverage : data?.weeklySpendingsAverage} BGN</span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">{isIncome ? "Monthly Income" : "Monthly Spendings"}</span>
              <span className={`text-lg font-semibold ${isIncome ? "text-blue-600" : "text-red-600"}`}>{isIncome ? data?.monthlyIncome : data?.monthlySpendings} BGN</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-500">{isIncome ? "Average Monthly Income" : "Average Monthly Spendings"}</span>
              <span className="text-gray-700">{isIncome ? data?.monthlyIncomeAverage : data?.monthlySpendingsAverage} BGN</span>
            </div>
          </div>
        </div>
      </Card>
    </>
  );
}

export default OverviewCard;