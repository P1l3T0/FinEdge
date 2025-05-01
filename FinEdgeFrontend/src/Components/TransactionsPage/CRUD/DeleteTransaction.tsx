import { Button } from '@progress/kendo-react-buttons';
import useDeleteTransaction from '../../../Hooks/Transactions/useDeleteTransaction';
import { Transaction } from '../../../Utils/Types';

const DeleteTransaction = ({ transaction }: { transaction: Transaction }) => {
  const { handleDelete } = useDeleteTransaction();

  const onDeleteClick = async () => {
    await handleDelete(transaction.id);
  };

  return (
    <>
      <Button type="button" fillMode="solid" themeColor={'error'} onClick={onDeleteClick}>Delete</Button>
    </>
  )
}

export default DeleteTransaction