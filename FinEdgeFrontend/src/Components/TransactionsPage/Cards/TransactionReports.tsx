import useGetReports from "../../../Hooks/useGetReports";

const TransactionReports = () => {
  const { data, isLoading, isError, error } = useGetReports();

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error?.message}</p>;

  return (
    <>
      Daily Income : {data?.dailyIncome} <br />
      Weekly Income : {data?.weeklyIncome} <br />
      Averate Weekly Income : {data?.weeklyAverage} <br />
      Monthly Income : {data?.monthlyIncome} <br />
      Average Monthly Income : {data?.monthlyAverage} <br />
      Daily Spendings : {data?.dailySpendings} <br />
      Weekly Spendings : {data?.weeklySpendings} <br />
      Average Weekly Spendings: {data?.weeklySpendingsAverage} <br />
      Monthly Spendings : {data?.monthlySpendings} <br />
      Average Monthly Spendings: {data?.monthlySpendingsAverage} <br />
    </>
  )
}

export default TransactionReports;