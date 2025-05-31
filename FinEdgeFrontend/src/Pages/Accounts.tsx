import AccountFAB from "../Components/AccountsPage/AIPrompt/AccountFAB";
import AccountPieChart from "../Components/AccountsPage/Charts/AccountPieChart";
import QuickStats from "../Components/AccountsPage/Charts/AccountQuickStats";
import CreateAccounts from "../Components/AccountsPage/CRUD/CreateAccount";
import GetAccounts from "../Components/AccountsPage/CRUD/GetAccounts";
import { useAccountDataQueries } from "../Hooks/Accounts/useIsAccountDataLoading";
import { Loader } from "@progress/kendo-react-indicators";

const Accounts = () => {
  const { isLoading, isError, error } = useAccountDataQueries();

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
            <div>
              <CreateAccounts />
            </div>
            <div className="lg:col-span-2">
              <AccountPieChart />
            </div>
            <div>
              <QuickStats />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow">
            <div className="p-2">
              <GetAccounts />
            </div>
          </div>
        </div>
        <AccountFAB />
      </div>
    </>
  );
};

export default Accounts;