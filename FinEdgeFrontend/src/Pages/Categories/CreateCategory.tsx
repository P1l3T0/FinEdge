import { useState } from 'react'
import { CategoryDTO } from '../../Utils/Types';
import { TextBoxChangeEvent, DropDownListChangeEvent, TextBox, DropDownList, Button, Checkbox, CheckboxChangeEvent, ColorPicker, ColorPickerChangeEvent, ColorPickerView } from '@progress/kendo-react-all';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import axios, { AxiosResponse, AxiosError } from 'axios';
import { createCategoryEndPoint } from '../../endpoints';
import { currency } from '../../Utils/Functions';

const CreateCategory = () => {
  const queryClient = useQueryClient();

  const [color, setColor] = useState<ColorPickerView>();
  const [category, setCategory] = useState<CategoryDTO>({
    name: "",
    budget: 0,
    currency: currency[0],
    isIncome: false,
    color: "rgba(255, 255, 255, 1)"
  });

  const handleTextBoxChange = async (e: TextBoxChangeEvent) => {
    const trimmedValue = (e.value as string).trim();

    setCategory({
      ...category,
      [e.target.name as string]: trimmedValue
    })
  }

  const handleDropDownChange = async (e: DropDownListChangeEvent) => {
    setCategory({
      ...category,
      [e.target.props.name as string]: e.value
    })
  }

  const handleCheckBoxChange = async (e: CheckboxChangeEvent) => {
    setCategory({
      ...category,
      [e.target.name as string]: e.value
    })
  }

  const handleColorPickerChange = async (e: ColorPickerChangeEvent) => {
    setColor(e.value as ColorPickerView);
    setCategory({
      ...category,
      color: e.value
    })
  }

  const createCategory = async () => {
    await axios
      .post<CategoryDTO>(`${createCategoryEndPoint}`, category, { withCredentials: true })
      .then((res: AxiosResponse<CategoryDTO>) => res.data)
      .catch((error: AxiosError) => {});
  }

  const { mutateAsync } = useMutation({
    mutationFn: createCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });

  const handlerClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    mutateAsync();
  }

  return (
    <>
      <div className="category-container" style={{ width: "300px" }}>
        <form method='post' autoComplete='off'>
          <TextBox id='name' name='name' type='text' placeholder='Category name' onChange={handleTextBoxChange} />
          <TextBox id='budget' name='budget' type='number' min={0} placeholder='Category budget' onChange={handleTextBoxChange} />
          <DropDownList id="currency" name='currency' data={currency} defaultValue={currency[0]} onChange={handleDropDownChange} />
          <Checkbox id='isIncome' name='isIncome' type='checkbox' label="Is income" onChange={handleCheckBoxChange} />
          <ColorPicker id='color-picker' view={'combo'} onChange={handleColorPickerChange} value={color} defaultValue={category.color} />

          <Button id='add-category-button' themeColor='primary' onClick={handlerClick}>Add category</Button>
        </form>
      </div >
    </>
  )
}

export default CreateCategory;