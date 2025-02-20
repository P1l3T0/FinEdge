import AccountPieChart from "../Components/AccountsPage/AccountPieChart";
import QuickStats from "../Components/AccountsPage/AccountQuickStats";
import CreateAccounts from "../Data/Accounts/CreateAccount";
import GetAccounts from "../Data/Accounts/GetAccounts";

const Accounts = () => {
  return (
    <>
      <div className="p-6 bg-gray-50">
        <div className="space-y-6">
          <div className="gap-4 grid lg:grid-cols-3 md:grid-cols-1">
            <CreateAccounts />
            <AccountPieChart />
            <QuickStats />
          </div>
          <div className="bg-white rounded-lg shadow">
            <div className="p-4">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">My Accounts</h2>
              <div className="gap-4 grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-1">
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
