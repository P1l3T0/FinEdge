import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { updateCategoryEndPoint } from "../../Utils/endpoints";
import { Category, CategoryDTO } from "../../Utils/Types";
import { TextBoxChangeEvent, CheckboxChangeEvent, ColorPickerChangeEvent, ColorPickerView } from "@progress/kendo-react-inputs";
import { DropDownListChangeEvent } from "@progress/kendo-react-dropdowns";

const useUpdateCategory = (category: Category) => {
  const queryClient = useQueryClient();

  const [color, setColor] = useState<ColorPickerView>();
  const [visible, setVisible] = useState<boolean>(false);
  const [updatedCategory, setUpdatedCategory] = useState<CategoryDTO>({
    name: category.name,
    currency: category.currency,
    budget: category.budget,
    isIncome: category.isIncome,
    color: category.color,
    subcategories: "",
  });

  const toggleDialog = () => {
    setVisible(!visible);
  };

  const handleTextBoxChange = (e: TextBoxChangeEvent) => {
    const trimmedValue = (e.value as string).trim();

    setUpdatedCategory({
      ...updatedCategory,
      [e.target.name as string]: trimmedValue,
    });
  };

  const handleDropDownChange = (e: DropDownListChangeEvent) => {
    setUpdatedCategory({
      ...updatedCategory,
      [e.target.props.name as string]: e.value,
    });
  };

  const handleCheckBoxChange = (e: CheckboxChangeEvent) => {
    setUpdatedCategory({
      ...updatedCategory,
      [e.target.name as string]: e.value,
    });
  };

  const handleColorPickerChange = (e: ColorPickerChangeEvent) => {
    setColor(e.value as ColorPickerView);
    setUpdatedCategory({
      ...updatedCategory,
      color: e.value,
    });
  };

  const updateCategory = async () => {
    await axios
      .put(`${updateCategoryEndPoint}/${category.id}`, updatedCategory, { withCredentials: true })
      .catch((error: AxiosError) => {
        console.error(error);
      });
  };

  const { mutateAsync } = useMutation({
    mutationFn: updateCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["income-categories"] });
      queryClient.invalidateQueries({ queryKey: ["expenditure-categories"] });
      queryClient.invalidateQueries({ queryKey: ["category-chart-data"] });
      queryClient.invalidateQueries({ queryKey: ["category-info"] });
      queryClient.invalidateQueries({ queryKey: ["user-data"] });
    },
  });

  const handleUpdate = async () => {
    await mutateAsync();
  };

  return { color, visible, updatedCategory, toggleDialog, handleTextBoxChange, handleDropDownChange, handleCheckBoxChange, handleColorPickerChange, handleUpdate };
};

export default useUpdateCategory;