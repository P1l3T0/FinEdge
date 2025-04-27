import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError, AxiosResponse } from "axios";
import { createAccountEndPoint } from "../../Utils/endpoints";
import { AccountDTO } from "../../Utils/Types";
import { accountType, currency } from "../../Utils/Functions";
import { ColorPickerChangeEvent, ColorPickerView, TextBoxChangeEvent } from "@progress/kendo-react-inputs";
import { DropDownListChangeEvent } from "@progress/kendo-react-dropdowns";

const useCreateAccount = () => {
  const queryClient = useQueryClient();

  const [color, setColor] = useState<ColorPickerView>();
  const [account, setAccount] = useState<AccountDTO>({
    name: "",
    balance: 0,
    color: "rgba(255, 255, 255, 1)",
    accountType: accountType[0],
    currency: currency[0],
  });

  const handleTextBoxChange = async (e: TextBoxChangeEvent) => {
    const trimmedValue = (e.value as string).trim();

    setAccount({
      ...account,
      [e.target.name as string]: trimmedValue,
    });
  };

  const handleDropDownChange = async (e: DropDownListChangeEvent) => {
    setAccount({
      ...account,
      [e.target.props.name as string]: e.value,
    });
  };

  const handleColorPickerChange = async (e: ColorPickerChangeEvent) => {
    setColor(e.value as ColorPickerView);
    setAccount({
      ...account,
      color: e.value
    })
  }

  const createAccount = async () => {
    await axios.post<AccountDTO>(`${createAccountEndPoint}`, account, {withCredentials: true })
      .then((res: AxiosResponse<AccountDTO>) => res.data)
      .catch((error: AxiosError) => {});
  };

  const { mutateAsync } = useMutation({
    mutationFn: createAccount,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["accounts"] });
      queryClient.invalidateQueries({ queryKey: ["accountChartData"] });
      queryClient.invalidateQueries({ queryKey: ["accountStats"] });
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    mutateAsync();
  };

  return { account, color, handleTextBoxChange, handleDropDownChange, handleColorPickerChange, handleSubmit };
};

export default useCreateAccount;