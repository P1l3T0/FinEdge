import CategoriesSankeyChart from '../../Components/CategoriesPage/CategoriesSankeyChart';
import CreateTransaction from './CreateTransaction';
import GetTransactions from './GetTransactions';
import TransactionReports from './TransactionReports';

const Transactions = () => {
  return (
    <>
      <CreateTransaction />
      <CategoriesSankeyChart />
      <GetTransactions />
      <TransactionReports />
    </>
  )
}

export default Transactions;