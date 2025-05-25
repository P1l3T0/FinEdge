import { Button } from "@progress/kendo-react-buttons";
import { ColorPicker, TextBox } from "@progress/kendo-react-inputs";
import { DropDownList } from "@progress/kendo-react-dropdowns";
import { Card, CardHeader, CardBody } from "@progress/kendo-react-layout";
import useCreateAccount from "../../../Hooks/Accounts/useCreateAccount";
import { accountType, currency } from "../../../Utils/Functions";

const CreateAccounts = () => {
  const { account, color, handleTextBoxChange, handleDropDownChange, handleColorPickerChange, handleSubmit } = useCreateAccount();

  return (
    <>
      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold">Add Account</h2>
        </CardHeader>
        <CardBody>
          <form method="post" autoComplete="off" className="space-y-4">
            <div>
              <label className="font-medium">Account Name</label>
              <TextBox id="name" name="name" type="text" placeholder="Enter account name" onChange={handleTextBoxChange} size="large" />
            </div>
            <div>
              <label className="font-medium">Balance</label>
              <TextBox id="balance" name="balance" type="number" min={0} placeholder="Enter initial balance" onChange={handleTextBoxChange} size="large" />
            </div>
            <div>
              <label className="font-medium">Account Type</label>
              <DropDownList id="account-type" name="accountType" data={accountType} defaultValue={accountType[0]} onChange={handleDropDownChange} size="large" />
            </div>
            <div>
              <label className="font-medium">Currency</label>
              <DropDownList id="currency" name="currency" data={currency} defaultValue={currency[0]} onChange={handleDropDownChange} size="large" />
            </div>
            <div>
              <label className="font-medium">Account Color</label>
              <ColorPicker id="color-picker" views={["gradient", "palette"]} onChange={handleColorPickerChange} value={color} defaultValue={account.color} />
            </div>
            <div className="pt-4">
              <Button id="add-account-button" themeColor="primary" onClick={handleSubmit} className="w-full" size="large">Add Account</Button>
            </div>
          </form>
        </CardBody>
      </Card>
    </>
  );
};

export default CreateAccounts;