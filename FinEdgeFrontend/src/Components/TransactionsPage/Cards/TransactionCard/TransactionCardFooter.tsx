import { Transaction } from '../../../../Utils/Types'
import DeleteTransaction from '../../CRUD/DeleteTransaction';
import UpdateTransaction from '../../CRUD/UpdateTransactions';

const TransactionCardFooter = ({transaction}: {transaction: Transaction}) => {
  return (
    <>
      <div className="flex justify-end gap-2">
        <UpdateTransaction transaction={transaction} />
        <DeleteTransaction transaction={transaction} />
      </div>
    </>
  );
}

export default TransactionCardFooter;