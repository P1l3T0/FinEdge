import { Button } from "@progress/kendo-react-buttons";
import { DropDownList } from "@progress/kendo-react-dropdowns";
import { TextBox, Checkbox } from "@progress/kendo-react-inputs";
import { Card, CardHeader, CardBody } from "@progress/kendo-react-layout";
import useCreateTransaction from "../../../Hooks/Transactions/useCreateTransaction";
import useGetNames from "../../../Hooks/Accounts/useGetNames";

const CreateTransaction = () => {
  const { data } = useGetNames();
  const { filteredSubcategories, handleTextBoxChange, handleDropDownChange, handleCheckBoxChange, handleSubmit } = useCreateTransaction();

  return (
    <>
      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold">Add Transaction</h2>
        </CardHeader>
        <CardBody>
          <form method="post" autoComplete="off" className="space-y-4">
            <div>
              <label className="font-medium">Transaction Name</label>
              <TextBox id="name" name="name" type="text" placeholder="Enter transaction name" onChange={handleTextBoxChange} size="large" />
            </div>
            <div>
              <label className="font-medium">Amount</label>
              <TextBox id="amount" name="amount" type="number" min={0} placeholder="Enter transaction amount" onChange={handleTextBoxChange} size="large" />
            </div>
            <div>
              <label className="font-medium">Account</label>
              <DropDownList id="account-name" name="accountName" data={data?.accountNames} defaultValue={data?.accountNames[0] ?? "Create at least 1 account"} onChange={handleDropDownChange} size="large" />
            </div>
            <div>
              <label className="font-medium">Category</label>
              <DropDownList id="category-name" name="categoryName" data={data?.categoryNames} defaultValue={data?.categoryNames[0] ?? "Create at least 1 category"} onChange={handleDropDownChange} size="large" />
            </div>
            <div>
              <label className="font-medium">Subcategory</label>
              <DropDownList id="subcategory-name" name="subcategoryName" data={filteredSubcategories} defaultValue={filteredSubcategories[0] ?? "No subcategories available"} onChange={handleDropDownChange} size="large" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <Checkbox id="isRepeating" name="isRepeating" type="checkbox" label="Is repeating Transaction" onChange={handleCheckBoxChange} />
              </div>
            </div>
            <div className="pt-4">
              <Button id="add-transaction-button" themeColor="primary" onClick={handleSubmit} className="w-full" size="large">Add Transaction</Button>
            </div>
          </form>
        </CardBody>
      </Card>
    </>
  );
};

export default CreateTransaction;