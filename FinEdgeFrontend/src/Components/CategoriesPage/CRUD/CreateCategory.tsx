import { currency } from '../../../Utils/Functions';
import { Button } from '@progress/kendo-react-buttons';
import { DropDownList } from '@progress/kendo-react-dropdowns';
import { TextBox, ColorPicker, Checkbox } from '@progress/kendo-react-inputs';
import { Card, CardHeader, CardBody } from '@progress/kendo-react-layout';
import useCreateCategory from '../../../Hooks/Categories/useCreateCategory';

const CreateCategory = () => {
  const { color, category, handleTextBoxChange, handleDropDownChange, handleCheckBoxChange, handleColorPickerChange, handleSubmit } = useCreateCategory();

  return (
    <>
      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold">Add Category</h2>
        </CardHeader>
        <CardBody>
          <form method="post" autoComplete="off" className="space-y-4">
            <div>
              <label className="font-medium">Category Name</label>
              <TextBox id="name" name="name" type="text" placeholder="Enter category name" onChange={handleTextBoxChange} size="large" />
            </div>
            <div>
              <label className="font-medium">Budget</label>
              <TextBox id="budget" name="budget" type="number" min={0} placeholder="Enter category budget" onChange={handleTextBoxChange} size="large" />
            </div>
            <div>
              <label className="font-medium">Subcategory</label>
              <TextBox id="subcategories" name="subcategories" type="text" placeholder="Enter subcategoeries seperated by comma or space" onChange={handleTextBoxChange} size="large" />
            </div>
            <div>
              <label className="font-medium">Currency</label>
              <DropDownList id="currency" name="currency" data={currency} defaultValue={currency[0]} onChange={handleDropDownChange} size="large" />
            </div>
            <div>
              <label className="font-medium">Category Color</label>
              <ColorPicker id="color-picker" views={['gradient', 'palette']} onChange={handleColorPickerChange} value={color} defaultValue={category.color}  />
            </div>
            <div>
              <div className="flex space-x-2">
                <Checkbox id="isIncome" name="isIncome" type="checkbox" onChange={handleCheckBoxChange} />
                <label htmlFor="isIncome" className="font-medium">Is Income Category</label>
              </div>
            </div>
            <div className="pt-4">
              <Button id="add-category-button" themeColor="primary" onClick={handleSubmit} className="w-full" size="large">Add Category</Button>
            </div>
          </form>
        </CardBody>
      </Card>
    </>
  );
}

export default CreateCategory;