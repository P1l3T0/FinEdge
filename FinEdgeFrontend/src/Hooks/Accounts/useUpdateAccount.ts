import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError, AxiosResponse } from "axios";
import { updateAccountEndPoint } from "../../Utils/endpoints";
import { Account, AccountDTO, AccountType } from "../../Utils/Types";
import { getEnumValueFromNumber } from "../../Utils/Functions";
import { ColorPickerChangeEvent, ColorPickerView, TextBoxChangeEvent } from "@progress/kendo-react-inputs";
import { DropDownListChangeEvent } from "@progress/kendo-react-dropdowns";

const useUpdateAccount = (account: Account) => {
  const queryClient = useQueryClient();

  const [color, setColor] = useState<ColorPickerView>();
  const [visible, setVisible] = useState<boolean>(false);
  const [updatedAccount, setUpdatedAccount] = useState<AccountDTO>({
    name: account.name,
    balance: account.balance,
    accountType: getEnumValueFromNumber(parseInt(account.accountType), AccountType),
    currency: account.currency,
    color: account.color
  });

  const toggleDialog = () => {
    setVisible(!visible);
  };

  const handleTextBoxChange = async (e: TextBoxChangeEvent) => {
    const trimmedValue = (e.value as string).trim();

    setUpdatedAccount({
      ...updatedAccount,
      [e.target.name as string]: trimmedValue
    })
  }

  const handleDropDownChange = async (e: DropDownListChangeEvent) => {
    setUpdatedAccount({
      ...updatedAccount,
      [e.target.props.name as string]: e.value
    })
  }

  const handleColorPickerChange = async (e: ColorPickerChangeEvent) => {
    setColor(e.value as ColorPickerView);
    setUpdatedAccount({
      ...updatedAccount,
      color: e.value
    })
  }

  const updateAccount = async () => {
    await axios
      .put<AccountDTO>(`${updateAccountEndPoint}/${account.id}`, updatedAccount, { withCredentials: true })
      .then((res: AxiosResponse<AccountDTO>) => res.data)
      .catch((error: AxiosError) => {});
  }

  const { mutateAsync } = useMutation({
    mutationFn: updateAccount,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["accounts"] });
      queryClient.invalidateQueries({ queryKey: ["accountChartData"] });
      queryClient.invalidateQueries({ queryKey: ["accountStats"] });
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });

  const handleUpdate = async () => {
    await mutateAsync();
  }

  return { color, visible, updatedAccount, toggleDialog, handleTextBoxChange, handleDropDownChange, handleColorPickerChange, handleUpdate };
};

export default useUpdateAccount;