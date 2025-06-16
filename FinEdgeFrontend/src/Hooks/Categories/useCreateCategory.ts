import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError, AxiosResponse } from "axios";
import { createCategoryEndPoint } from "../../Utils/endpoints";
import { CategoryDTO } from "../../Utils/Types";
import { ColorPickerView, TextBoxChangeEvent, CheckboxChangeEvent, ColorPickerChangeEvent } from "@progress/kendo-react-inputs";
import { DropDownListChangeEvent } from "@progress/kendo-react-dropdowns";
import { currency } from "../../Utils/Functions";
import { useUserDataQueries } from "../User/useUserDataQueries";

const useCreateCategory = () => {
  const queryClient = useQueryClient();
  const { refetchUserData, refetchCategoryInfo } = useUserDataQueries();

  const [color, setColor] = useState<ColorPickerView>();
  const [category, setCategory] = useState<CategoryDTO>({
    name: "",
    budget: 0,
    currency: currency[0],
    isIncome: false,
    color: "rgba(255, 255, 255, 1)",
    subcategories: "",
  });

  const handleTextBoxChange = (e: TextBoxChangeEvent) => {
    const trimmedValue = (e.value as string).trim();

    setCategory({
      ...category,
      [e.target.name as string]: trimmedValue,
    });
  };

  const handleDropDownChange = (e: DropDownListChangeEvent) => {
    setCategory({
      ...category,
      [e.target.props.name as string]: e.value,
    });
  };

  const handleCheckBoxChange = (e: CheckboxChangeEvent) => {
    setCategory({
      ...category,
      [e.target.name as string]: e.value,
    });
  };

  const handleColorPickerChange = (e: ColorPickerChangeEvent) => {
    setColor(e.value as ColorPickerView);
    setCategory({
      ...category,
      color: e.value,
    });
  };

  const createCategory = async () => {
    await axios
      .post<CategoryDTO>(`${createCategoryEndPoint}`, category, { withCredentials: true })
      .then((res: AxiosResponse<CategoryDTO>) => res.data)
      .catch((error: AxiosError) => {
        console.error(error);
      });
  };

  const { mutateAsync } = useMutation({
    mutationFn: createCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["income-categories"] });
      queryClient.invalidateQueries({ queryKey: ["expenditure-categories"] });
      queryClient.invalidateQueries({ queryKey: ["user"] });
      queryClient.invalidateQueries({ queryKey: ["category-chart-data"] });
      refetchUserData();
      refetchCategoryInfo();
    },
  });

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    await mutateAsync();
  };

  return { color, category, handleTextBoxChange, handleDropDownChange, handleCheckBoxChange, handleColorPickerChange, handleSubmit };
};

export default useCreateCategory;