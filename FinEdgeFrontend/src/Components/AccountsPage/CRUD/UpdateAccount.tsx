import { Window } from "@progress/kendo-react-dialogs";
import { ColorPicker, TextBox } from "@progress/kendo-react-inputs";
import { DropDownList } from "@progress/kendo-react-dropdowns";
import { Button } from "@progress/kendo-react-buttons";
import { Account, AccountType } from "../../../Utils/Types";
import { accountType, currency, getEnumValueFromNumber } from "../../../Utils/Functions";
import useUpdateAccount from "../../../Hooks/Accounts/useUpdateAccount";

const UpdateAccount = ({ account }: { account: Account }) => {
  const { color, visible, updatedAccount, toggleDialog, handleTextBoxChange, handleDropDownChange, handleColorPickerChange, handleUpdate } = useUpdateAccount(account);

  return (
    <>
      <Button type="button" fillMode="solid" themeColor={'info'} onClick={toggleDialog}>Update</Button>

      {visible && (
        <Window title="Update Account" onClose={toggleDialog} initialHeight={445}>
          <form className="space-y-3">
            <div className="space-y-2">
              <div>
                <label className="text-sm text-gray-600 mb-1 block">Account Name</label>
                <TextBox id="name" name="name" type="text" defaultValue={account.name} onChange={handleTextBoxChange} />
              </div>
              <div>
                <label className="text-sm text-gray-600 mb-1 block">Balance</label>
                <TextBox id="balance" name="balance" type="number" min={0} defaultValue={account.balance.toString()} onChange={handleTextBoxChange} />
              </div>
              <div>
                <label className="text-sm text-gray-600 mb-1 block">Account Type</label>
                <DropDownList id="account-type" name="accountType" data={accountType} defaultValue={getEnumValueFromNumber(parseInt(account.accountType), AccountType)} onChange={handleDropDownChange} />
              </div>
              <div>
                <label className="text-sm text-gray-600 mb-1 block">Currency</label>
                <DropDownList id="currency" name="currency" data={currency} defaultValue={account.currency} onChange={handleDropDownChange} />
              </div>
            </div>
            <div>
              <label className="text-sm text-gray-600 mb-1 block">Account Color</label>
              <ColorPicker id="color-picker" views={['gradient', 'palette']} onChange={handleColorPickerChange} value={color} defaultValue={updatedAccount.color} />
            </div>
            <div className="flex justify-end gap-2 pt-5 border-t border-gray-200">
              <Button type="button" themeColor="primary" onClick={handleUpdate} >Save</Button>
              <Button type="button" themeColor="error" onClick={toggleDialog} >Cancel</Button>
            </div>
          </form>
        </Window>
      )}
    </>
  )
}

export default UpdateAccount;