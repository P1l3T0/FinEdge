import { Button } from "@progress/kendo-react-buttons";
import { DropDownList } from "@progress/kendo-react-dropdowns";
import { TextBox, ColorPicker, Checkbox } from "@progress/kendo-react-inputs";
import { Window } from "@progress/kendo-react-dialogs";
import { currency } from "../../../Utils/Functions";
import { Category } from "../../../Utils/Types";
import useUpdateCategory from "../../../Hooks/Categories/useUpdateCategory";

const UpdateCategory = ({ category }: { category: Category }) => {
  const { color, visible, updatedCategory, toggleDialog, handleTextBoxChange, handleDropDownChange, handleCheckBoxChange, handleColorPickerChange, handleUpdate } = useUpdateCategory(category);

  return (
    <>
      <Button type="button" fillMode="solid" themeColor={"info"} onClick={toggleDialog}>Update</Button>

      {visible && (
        <Window title="Update Category" onClose={toggleDialog} initialHeight={415}>
          <form className="space-y-3">
            <div className="space-y-2">
              <div>
                <label className="text-sm text-gray-600 mb-1 block">Category Name</label>
                <TextBox id="name" name="name" type="text" defaultValue={category.name} onChange={handleTextBoxChange} />
              </div>

              <div>
                <label className="text-sm text-gray-600 mb-1 block">Budget</label>
                <TextBox id="budget" name="budget" type="number" min={0} defaultValue={category.budget} onChange={handleTextBoxChange} />
              </div>

              <div>
                <label className="text-sm text-gray-600 mb-1 block">Currency</label>
                <DropDownList id="currency" name="currency" data={currency} defaultValue={category.currency} onChange={handleDropDownChange} />
              </div>

              <div>
                <label className="text-sm text-gray-600 mb-1 block">Category Color</label>
                <ColorPicker id="color-picker" views={['gradient', 'palette']} onChange={handleColorPickerChange} value={color} defaultValue={updatedCategory.color} />
              </div>

              <div className="pt-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="isIncome" name="isIncome" type="checkbox" defaultValue={category.isIncome} onChange={handleCheckBoxChange} />
                  <label htmlFor="isIncome" className="text-sm text-gray-600">Is Income Category</label>
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

export default UpdateCategory;