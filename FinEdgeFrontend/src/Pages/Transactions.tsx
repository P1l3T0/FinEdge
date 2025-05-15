import { Loader } from "@progress/kendo-react-indicators";
import TransactionFAB from "../Components/TransactionsPage/AIPrompt/TransactionFAB";
import CreateTransaction from "../Components/TransactionsPage/CRUD/CreateTransaction";
import GetTransactions from "../Components/TransactionsPage/CRUD/GetTransactions";
import TransactionReports from "../Components/TransactionsPage/Cards/TransactionReport/TransactionReports";
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
      <div className="p-6 bg-gray-50">
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
            <div className="lg:col-span-1">
              <CreateTransaction />
            </div>
            <div className="lg:col-span-3">
              <TransactionSankeyChart />
              <TransactionFAB />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow">
            <div className="p-4">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">My Transactions</h2>
              <div className="my-3">
                <GetTransactions />
              </div>
              <div className="my-3">
                <TransactionReports />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Transactions;