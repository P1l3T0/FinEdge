import useGetReports from "../../../../Hooks/Transactions/useGetReports";
import OverviewCard from "./OverviewCard";

const TransactionReports = () => {
  const { data, isLoading, isError, error  } = useGetReports();

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error?.message}</p>;

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <OverviewCard isIncome={true} data={data!} />
        <OverviewCard isIncome={false} data={data!} />
      </div>
    </>
  );
}

export default TransactionReports;