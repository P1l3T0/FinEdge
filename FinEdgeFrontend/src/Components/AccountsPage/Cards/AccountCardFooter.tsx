import { Account } from "../../../Utils/Types";
import DeleteAccount from "../CRUD/DeleteAccount";
import UpdateAccount from "../CRUD/UpdateAccount";

const AccountCardFooter = ({ account }: { account: Account }) => {
  return (
    <>
      <div className="flex justify-end gap-2">
        <UpdateAccount account={account} />
        <DeleteAccount account={account} />
      </div>
    </>
  );
};

export default AccountCardFooter;