import { TextBoxChangeEvent, DropDownListChangeEvent, Button, TextBox, DropDownList, Window, Checkbox, CheckboxChangeEvent, ColorPickerChangeEvent, ColorPicker, ColorPickerView } from '@progress/kendo-react-all';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import axios, { AxiosResponse, AxiosError } from 'axios';
import { useState } from 'react';
import { updateCategoryEndPoint } from '../../endpoints';
import { currency } from '../../Utils/Functions';
import { Category, CategoryDTO } from '../../Utils/Types';

const UpdateCategory = ({ category }: { category: Category }) => {
  const queryClient = useQueryClient();

  const [color, setColor] = useState<ColorPickerView>();
  const [visible, setVisible] = useState<boolean>(false);
  const [updateCategory, setUpdateCategory] = useState<CategoryDTO>({
    name: category.name,
    currency: category.currency,
    budget: category.budget,
    isIncome: category.isIncome,
    color: category.color
  });

  const toggleDialog = () => {
    setVisible(!visible);
  };

  const handleTextBoxChange = async (e: TextBoxChangeEvent) => {
    const trimmedValue = (e.value as string).trim();

    setUpdateCategory({
      ...updateCategory,
      [e.target.name as string]: trimmedValue
    })
  }

  const handleDropDownChange = async (e: DropDownListChangeEvent) => {
    setUpdateCategory({
      ...updateCategory,
      [e.target.props.name as string]: e.value
    })
  }

  const handleCheckBoxChange = async (e: CheckboxChangeEvent) => {
    setUpdateCategory({
      ...updateCategory,
      [e.target.name as string]: e.value
    })
  }

  const handleColorPickerChange = async (e: ColorPickerChangeEvent) => {
    setColor(e.value as ColorPickerView);
    setUpdateCategory({
      ...updateCategory,
      color: e.value
    })
  }

  const updateAccount = async () => {
    await axios
      .put<CategoryDTO>(`${updateCategoryEndPoint}/${category.id}`, updateCategory, { withCredentials: true })
      .then((res: AxiosResponse<CategoryDTO>) => res.data)
      .catch((error: AxiosError) => {});
  }

  const { mutateAsync } = useMutation({
    mutationFn: updateAccount,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["income-categories"], });
      queryClient.invalidateQueries({ queryKey: ["expenditure-categories"] });
    },
  });

  const handleUpdate = async () => {
    await mutateAsync();
  }

  return (
    <>
      <Button
        type="button"
        fillMode="solid"
        themeColor={"info"}
        onClick={toggleDialog}
      >
        Update
      </Button>

      {visible && (
        <Window title="Update Category" onClose={toggleDialog} initialHeight={415}>
          <form className="space-y-3">
            <div className="space-y-2">
              <div>
                <label className="text-sm text-gray-600 mb-1 block">Category Name</label>
                <TextBox id="name" name="name" type="text" defaultValue={category.name} onChange={handleTextBoxChange} className="w-full" />
              </div>

              <div>
                <label className="text-sm text-gray-600 mb-1 block">Budget</label>
                <TextBox id="budget" name="budget" type="number" min={0} defaultValue={category.budget} onChange={handleTextBoxChange} className="w-full" />
              </div>

              <div>
                <label className="text-sm text-gray-600 mb-1 block">Currency</label>
                <DropDownList id="currency" name="currency" data={currency} defaultValue={category.currency} onChange={handleDropDownChange} className="w-full" />
              </div>

              <div>
                <label className="text-sm text-gray-600 mb-1 block">Category Color</label>
                <ColorPicker id="color-picker" view="combo" onChange={handleColorPickerChange} value={color} defaultValue={updateCategory.color} className="w-full" />
              </div>

              <div className="pt-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="isIncome" name="isIncome" type="checkbox" defaultValue={category.isIncome} onChange={handleCheckBoxChange} />
                  <label htmlFor="isIncome" className="text-sm text-gray-600">Is Income Category</label>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-5 border-t border-gray-200">
              <Button type="button" themeColor="primary" onClick={handleUpdate}>
                Save
              </Button>
              <Button type="button" themeColor="error" onClick={toggleDialog}>
                Cancel
              </Button>
            </div>
          </form>
        </Window>
      )}
    </>
  );
}

export default UpdateCategory;