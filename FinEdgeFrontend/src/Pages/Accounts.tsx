import AccountFAB from "../Components/AccountsPage/AIPrompt/AccountFAB";
import AccountPieChart from "../Components/AccountsPage/Charts/AccountPieChart";
import QuickStats from "../Components/AccountsPage/Charts/AccountQuickStats";
import CreateAccounts from "../Components/AccountsPage/CRUD/CreateAccount";
import GetAccounts from "../Components/AccountsPage/CRUD/GetAccounts";

const Accounts = () => {
  return (
    <>
      <div className="p-6 bg-gray-50">
        <div className="space-y-6">
          <div className="gap-4 grid lg:grid-cols-4 md:grid-cols-1">
            <div className="lg:col-span-1" >
              <CreateAccounts />
            </div>
            <div className="lg:col-span-2">
              <AccountPieChart />
            </div>
            <div className="lg:col-span-1">
              <QuickStats />
              <AccountFAB />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow">
            <div className="p-4">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">My Accounts</h2>
              <div className="my-3">
                <GetAccounts />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Accounts;
