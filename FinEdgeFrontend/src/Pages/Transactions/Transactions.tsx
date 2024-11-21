import CreateTransaction from './CreateTransaction';
import GetTransactions from './GetTransactions';
import TransactionReports from './TransactionReports';

const Transactions = () => {
  return (
    <>
      <CreateTransaction />
      <GetTransactions />
      <TransactionReports />
    </>
  )
}

export default Transactions;