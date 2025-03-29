import { Account, AccountType } from "../../../../Utils/Types";
import { getEnumValueFromNumber } from "../../../../Utils/Functions";

const AccountCardHeader = ({account}: {account: Account}) => {
  return (
    <>
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{account.name}</h3>
          <span className="text-sm text-gray-500">{getEnumValueFromNumber(parseInt(account.accountType), AccountType)}</span>
        </div>
        <div className="h-10 w-10 rounded-full flex items-center justify-center" style={{ backgroundColor: account.color, boxShadow: `0 4px 6px ${account.color}40` }}>
          <span className="text-white font-semibold">{account.name.charAt(0).toUpperCase()}</span>
        </div>
      </div>
    </>
  );
};

export default AccountCardHeader;