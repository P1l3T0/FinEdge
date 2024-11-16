import { useState } from 'react'
import { Category, CategoryDTO } from '../../Utils/Types';
import { TextBoxChangeEvent, DropDownListChangeEvent, TextBox, DropDownList, Button, Checkbox, CheckboxChangeEvent } from '@progress/kendo-react-all';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import axios, { AxiosResponse, AxiosError } from 'axios';
import { createCategoryEndPoint } from '../../endpoints';
import { currency } from '../../Utils/Functions';

const CreateCategory = () => {
  const queryClient = useQueryClient();

  const [category, setCategory] = useState<CategoryDTO>({
    name: "",
    budget: 0,
    currency: "",
    isIncome: false
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

  const createCategory = async () => {
    await axios
      .post<Category>(`${createCategoryEndPoint}`, category, { withCredentials: true })
      .then((res: AxiosResponse<Category>) => res.data)
      .catch((error: AxiosError) => {
        alert(error.response?.data);
      });
  }

  const { mutateAsync } = useMutation({
    mutationFn: createCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["expenditure-category"] });
      queryClient.invalidateQueries({ queryKey: ["income-category"] });
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
          <DropDownList id="currency" name='currency' data={currency} defaultValue="Select currency" onChange={handleDropDownChange} />
          <Checkbox id='isIncome' name='isIncome' type='checkbox' label="Is income" onChange={handleCheckBoxChange} />

          <Button id='add-category-button' themeColor='primary' onClick={handlerClick}>Add category</Button>
        </form>
      </div >
    </>
  )
}

export default CreateCategory;