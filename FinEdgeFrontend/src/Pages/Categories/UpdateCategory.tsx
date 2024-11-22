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
      .catch((error: AxiosError) => {
        alert(error.response?.data);
      });
  }

  const { mutateAsync } = useMutation({
    mutationFn: updateAccount,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"], });
    },
  });

  const handleUpdate = async () => {
    await mutateAsync();
  }

  return (
    <>
      <Button type="button" fillMode="solid" themeColor={'info'} onClick={toggleDialog}>Update</Button>

      {visible && (
        <Window title={`Update Category`} style={{ height: "auto" }} onClose={toggleDialog}>
          <form className="k-form">
            <fieldset>
              <legend>Category Details</legend>
              <TextBox id='name' name='name' type='text' placeholder='Category name' defaultValue={category.name} onChange={handleTextBoxChange} />
              <TextBox id='budget' name='budget' type='number' min={0} placeholder='Category budget' defaultValue={category.budget} onChange={handleTextBoxChange} />
              <DropDownList id="currency" name='currency' data={currency} defaultValue={category.currency} onChange={handleDropDownChange} />
              <Checkbox id='isIncome' name='isIncome' type='checkbox' label="Is income" defaultValue={category.isIncome} onChange={handleCheckBoxChange} />
              <ColorPicker id='color-picker' view={'combo'} onChange={handleColorPickerChange} value={color} defaultValue={updateCategory.color} />
            </fieldset>

            <div className="buttonDiv">
              <Button type="button" onClick={handleUpdate} themeColor={'primary'}>Submit</Button>
              <Button type="button" onClick={toggleDialog} themeColor={'error'}>Cancel</Button>
            </div>
          </form>
        </Window>
      )}
    </>
  )
}

export default UpdateCategory;