import useGetReports from "../../../../Hooks/Transactions/useGetReports";
import OverviewCard from "./OverviewCard";

const TransactionReports = () => {
  const { data  } = useGetReports();

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