import { Loader } from "@progress/kendo-react-indicators";
import TransactionFAB from "../Components/TransactionsPage/AIPrompt/TransactionFAB";
import CreateTransaction from "../Components/TransactionsPage/CRUD/CreateTransaction";
import GetTransactions from "../Components/TransactionsPage/CRUD/GetTransactions";
import TransactionSankeyChart from "../Components/TransactionsPage/Charts/TransactionSankeyChart";
import { useTransactionDataQueries } from "../Hooks/Transactions/useTransactionDataQueries ";

const Transactions = () => {
  const { isLoading, isError, error } = useTransactionDataQueries();

  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-100">
        <Loader type="converging-spinner" size="large" />
      </div>
    );
  }

  if (isError) console.log(error?.message);

  return (
    <>
      <div className="p-3 bg-gray-50">
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
              <CreateTransaction />
            <div className="lg:col-span-3">
              <TransactionSankeyChart />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow">
            <div className="p-2">
              <GetTransactions />
            </div>
          </div>
        </div>
        <TransactionFAB />
      </div>
    </>
  );
}

export default Transactions;