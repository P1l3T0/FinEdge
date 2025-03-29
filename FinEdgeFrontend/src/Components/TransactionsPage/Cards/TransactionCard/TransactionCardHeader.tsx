import { Transaction } from '../../../../Utils/Types'

const TransactionCardHeader = ({transaction}: {transaction: Transaction}) => {
  return (
    <>
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{transaction.name}</h3>
          <span className="text-sm text-gray-500">
            {transaction.categoryName}
          </span>
        </div>
        <div className="h-10 w-10 rounded-full flex items-center justify-center"  style={{ backgroundColor: transaction.color, boxShadow: `0 4px 6px ${transaction.color}40` }}>
          <span className="text-white font-semibold">{transaction.name.charAt(0).toUpperCase()}</span>
        </div>
      </div>
    </>
  );
}

export default TransactionCardHeader