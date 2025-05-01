import { Button } from "@progress/kendo-react-buttons";
import { DropDownList } from "@progress/kendo-react-dropdowns";
import { TextBox, Checkbox } from "@progress/kendo-react-inputs";
import { Window } from "@progress/kendo-react-dialogs";
import useUpdateTransaction from "../../../Hooks/Transactions/useUpdateTransaction";
import useGetNames from "../../../Hooks/Accounts/useGetNames";
import { Transaction } from "../../../Utils/Types";

const UpdateTransaction = ({ transaction }: { transaction: Transaction }) => {
  const { data } = useGetNames();
  const { visible, toggleDialog, handleTextBoxChange, handleDropDownChange, handleCheckBoxChange, handleUpdate } = useUpdateTransaction(transaction);

  return (
    <>
      <Button type="button" fillMode="solid" themeColor={"info"} onClick={toggleDialog}>Update</Button>

      {visible && (
        <Window title="Update Transaction" onClose={toggleDialog} initialHeight={355}>
          <form className="space-y-3">
            <div className="space-y-2">
              <div>
                <label className="text-sm text-gray-600 mb-1 block">Transaction Name</label>
                <TextBox id="name" name="name" type="text" placeholder="Transaction name" defaultValue={transaction.name} onChange={handleTextBoxChange} />
              </div>

              <div>
                <label className="text-sm text-gray-600 mb-1 block">Amount</label>
                <TextBox id="amount" name="amount" type="number" min={0} placeholder="Transaction amount" defaultValue={transaction.amount} onChange={handleTextBoxChange} />
              </div>

              <div>
                <label className="text-sm text-gray-600 mb-1 block">Account</label>
                <DropDownList id="account-name" name="accountName" data={data?.accountNames} defaultValue={transaction.accountName} onChange={handleDropDownChange} />
              </div>

              <div className="pt-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="isRepeating" name="isRepeating" type="checkbox" defaultValue={transaction.isRepeating} onChange={handleCheckBoxChange} />
                  <label htmlFor="isRepeating" className="text-sm text-gray-600">Is Repeating Transaction</label>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-5 border-t border-gray-200">
              <Button type="button" themeColor="primary" onClick={handleUpdate}>Save</Button>
              <Button type="button" themeColor="error" onClick={toggleDialog}>Cancel</Button>
            </div>
          </form>
        </Window>
      )}
    </>
  );
}

export default UpdateTransaction;