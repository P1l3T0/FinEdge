import useGetUser from "../../../Hooks/useGetUser";
import AccountsGrid from "../Grids/AccountsGrid";
import CategoriesGrid from "../Grids/CategoriesGrid";
import TransactionsGrid from "../Grids/TransactionsGrid";
import InfoCard from "./InfoCard";

const InformationGrids = () => {
  const { data, isLoading, isError, error } = useGetUser();

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error!.message}</p>;

  return (
    <>
      <InfoCard title="Information" className="lg:col-span-2">
        <div className="space-y-6">
          <div>
            <AccountsGrid accounts={data?.accounts!} />
          </div>
          <div>
            <CategoriesGrid categories={data?.categories!} />
          </div>
          <div>
            <TransactionsGrid transactions={data?.transactions!} />
          </div>
        </div>
      </InfoCard>
    </>
  );
}

export default InformationGrids;