import { Transaction } from '../../../../Utils/Types'

const TransactionCardBody = ({transaction}: {transaction: Transaction}) => {
  return (
    <>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Amount</span>
          <span className="text-xl font-bold">{transaction.amount}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Account</span>
          <span className="text-base font-medium">
            {transaction.accountName}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Subcategory</span>
          <span className="text-base font-medium text-green-500">
            {transaction.subcategoryName ? transaction.subcategoryName : ""}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Repeating</span>
          <span className={`text-sm px-2 py-1 rounded-full ${transaction.isRepeating ? "bg-green-50 text-green-600" : "bg-gray-50 text-gray-600" }`}>
            {transaction.isRepeating ? "Yes" : "No"}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Created</span>
          <span className="text-sm text-gray-500">
            {transaction.dateCreated.toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}
          </span>
        </div>
      </div>
    </>
  );
}

export default TransactionCardBody;