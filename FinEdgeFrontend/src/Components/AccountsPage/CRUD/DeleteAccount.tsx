import useDeleteAccount from '../../../Hooks/Accounts/useDeleteAccount';
import { Account } from '../../../Utils/Types';
import { Button } from '@progress/kendo-react-buttons';

const DeleteAccount = ({ account }: { account: Account }) => {
  const { handleDelete } = useDeleteAccount();

  const handleDeleteClick = async () => {
    await handleDelete(account.id);
  };

  return (
    <>
      <Button type="button" fillMode="solid" themeColor={'error'} onClick={handleDeleteClick}>Delete</Button>
    </>
  )
}

export default DeleteAccount;