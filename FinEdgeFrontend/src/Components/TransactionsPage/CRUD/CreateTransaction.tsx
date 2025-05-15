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
      <Card className="bg-white">
        <CardHeader className="border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Add Transaction</h2>
        </CardHeader>
        <CardBody>
          <div className="transaction-container">
            <form method="post" autoComplete="off" className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Transaction Name</label>
                <TextBox id="name" name="name" type="text" placeholder="Enter transaction name" onChange={handleTextBoxChange} size="large" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Amount</label>
                <TextBox id="amount" name="amount" type="number" min={0} placeholder="Enter transaction amount" onChange={handleTextBoxChange} size="large" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Account</label>
                <DropDownList id="account-name" name="accountName" data={data?.accountNames} defaultValue={data?.accountNames[0] ?? "Create at least 1 account"} onChange={handleDropDownChange} size="large" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Category</label>
                <DropDownList id="category-name" name="categoryName" data={data?.categoryNames} defaultValue={data?.categoryNames[0] ?? "Create at least 1 category"} onChange={handleDropDownChange} size="large" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Subcategory</label>
                <DropDownList id="subcategory-name" name="subcategoryName" data={filteredSubcategories} defaultValue={filteredSubcategories[0] ?? "No subcategories available"} onChange={handleDropDownChange} size="large" />
              </div>

              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="isRepeating" name="isRepeating" type="checkbox" label="Is repeating Transaction" onChange={handleCheckBoxChange} />
                </div>
              </div>

              <div className="pt-4">
                <Button id="add-transaction-button" themeColor="primary" onClick={handleSubmit} className="w-full" size="large">Add Transaction</Button>
              </div>
            </form>
          </div>
        </CardBody>
      </Card>
    </>
  );
};

export default CreateTransaction;