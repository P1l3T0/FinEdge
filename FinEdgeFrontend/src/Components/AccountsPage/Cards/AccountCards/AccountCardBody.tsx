import { Account } from "../../../../Utils/Types";

const AccountCardBody = ({account}: {account: Account}) => {
  return (
    <>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Balance</span>
          <span className="text-xl font-bold">
            {account.balance} {account.currency}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Created</span>
          <span className="text-sm text-gray-500">
            {account.dateCreated.toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}
          </span>
        </div>
      </div>
    </>
  );
};

export default AccountCardBody;