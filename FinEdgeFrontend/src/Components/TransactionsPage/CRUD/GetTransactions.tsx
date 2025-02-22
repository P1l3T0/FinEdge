import useGetTransactions from '../../../Hooks/Transactions/useGetTransactions';
import TransactionCards from '../Cards/TransactionCard/TransactionCards';

const GetTransactions = () => {
  const { data, isLoading, isError, error } = useGetTransactions();

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error?.message}</p>;

  return (
    <>
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-grow">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <TransactionCards transactions={data?.incomeTransactions!} />
            <TransactionCards transactions={data?.expenditureTransactions!} />
          </div>
        </div>
      </div>
    </>
  );
}

export default GetTransactions;