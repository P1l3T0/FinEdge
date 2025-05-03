import { Account } from "../../../../Utils/Types";
import DeleteAccount from "../../CRUD/DeleteAccount";
import TransferBalance from "../../CRUD/TransferBalance";
import UpdateAccount from "../../CRUD/UpdateAccount";

const AccountCardFooter = ({ account }: { account: Account }) => {
  return (
    <>
      <div className="flex justify-end gap-2">
        <TransferBalance account={account} />
        <UpdateAccount account={account} />
        <DeleteAccount account={account} />
      </div>
    </>
  );
};

export default AccountCardFooter;