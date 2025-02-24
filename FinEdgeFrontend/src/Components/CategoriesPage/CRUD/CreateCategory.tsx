import { useState } from 'react'
import { CategoryDTO } from '../../../Utils/Types';
import { TextBoxChangeEvent, DropDownListChangeEvent, TextBox, DropDownList, Button, Checkbox, CheckboxChangeEvent, ColorPicker, ColorPickerChangeEvent, ColorPickerView, Card, CardBody, CardHeader } from '@progress/kendo-react-all';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import axios, { AxiosResponse, AxiosError } from 'axios';
import { createCategoryEndPoint } from '../../../endpoints';
import { currency } from '../../../Utils/Functions';

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
      queryClient.invalidateQueries({ queryKey: ["income-categories"] });
      queryClient.invalidateQueries({ queryKey: ["expenditure-categories"] });
      queryClient.invalidateQueries({ queryKey: ["user"] });
      queryClient.invalidateQueries({ queryKey: ["category-chart-data"] });
    },
  });

  const handlerClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    mutateAsync();
  }

  return (
    <>
      <Card className="bg-white">
        <CardHeader className="border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Add Category</h2>
        </CardHeader>
        <CardBody>
          <div className="category-container">
            <form method="post" autoComplete="off" className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Category Name
                </label>
                <TextBox id="name" name="name" type="text" placeholder="Enter category name" onChange={handleTextBoxChange} size="large" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Budget
                </label>
                <TextBox id="budget" name="budget" type="number" min={0} placeholder="Enter category budget" onChange={handleTextBoxChange} size="large" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Currency
                </label>
                <DropDownList id="currency" name="currency" data={currency} defaultValue={currency[0]} onChange={handleDropDownChange} size="large" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Category Color
                </label>
                <ColorPicker id="color-picker" view="combo" onChange={handleColorPickerChange} value={color} defaultValue={category.color} />
              </div>

              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="isIncome" name="isIncome" type="checkbox" onChange={handleCheckBoxChange} />
                  <label htmlFor="isIncome" className="text-sm font-medium text-gray-700" >
                    Is Income Category
                  </label>
                </div>
              </div>

              <div className="pt-4">
                <Button id="add-category-button" themeColor="primary" onClick={handlerClick} className="w-full" size="large" >
                  Add Category
                </Button>
              </div>
            </form>
          </div>
        </CardBody>
      </Card>
    </>
  );
}

export default CreateCategory;