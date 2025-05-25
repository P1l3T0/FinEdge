import { Window } from "@progress/kendo-react-dialogs";
import { TextBox } from "@progress/kendo-react-inputs";
import { DropDownList } from "@progress/kendo-react-dropdowns";
import { Button } from "@progress/kendo-react-buttons";
import { Account } from "../../../Utils/Types";
import useTransferBalanceBetweenAccounts from "../../../Hooks/Accounts/useTransferBalanceBetweenAccounts";
import useGetNames from "../../../Hooks/Accounts/useGetNames";

const TransferBalance = ({ account }: { account: Account }) => {
  const { data } = useGetNames();
  const { visible, toggleDialog, handleTextBoxChange, handleDropDownChange, handleTransferBalance } = useTransferBalanceBetweenAccounts(account);

  return (
    <>
      <Button type="button" fillMode="solid" themeColor={'tertiary'} onClick={toggleDialog}>Transfer</Button>

      {visible && (
        <Window title="Transfer Balance" onClose={toggleDialog} initialHeight={250}>
          <form className="space-y-3">
            <div className="space-y-2">
              <div>
                <label className="mb-1 block">Account Name</label>
                <DropDownList id="account-name" name="targetAccountName" data={data?.accountNames} defaultValue={account.name} onChange={handleDropDownChange} />
              </div>
              <div>
                <label className="mb-1 block">Ammount</label>
                <TextBox id="amount" name="amount" type="number" min={0} defaultValue={0} onChange={handleTextBoxChange} />
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-5 border-t border-gray-200">
              <Button type="button" themeColor="primary" onClick={handleTransferBalance}>Transfer</Button>
              <Button type="button" themeColor="error" onClick={toggleDialog}>Cancel</Button>
            </div>
          </form>
        </Window>
      )}
    </>
  )
}

export default TransferBalance;