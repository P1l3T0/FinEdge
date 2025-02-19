import TransactionCards from './TransactionCards';
import useGetTransactions from '../../Hooks/useGetTransactions';

const GetTransactions = () => {
  const { data, isLoading, isError, error } = useGetTransactions();

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error?.message}</p>;

  return (
    <>
      <div className="transaction-cards">
        <TransactionCards transactions={data?.incomeTransactions!} />
        <TransactionCards transactions={data?.expenditureTransactions!} />
      </div>
    </>
  )
}

export default GetTransactions