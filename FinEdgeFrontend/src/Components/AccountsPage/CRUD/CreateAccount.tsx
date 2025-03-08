import { useState } from "react";
import { Button } from "@progress/kendo-react-buttons";
import { ColorPicker, ColorPickerChangeEvent, ColorPickerView, TextBox, TextBoxChangeEvent } from "@progress/kendo-react-inputs";
import { DropDownList, DropDownListChangeEvent, } from "@progress/kendo-react-dropdowns";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardHeader, CardBody } from "@progress/kendo-react-all";
import { createAccountEndPoint } from "../../../Utils/endpoints";
import { accountType, currency } from "../../../Utils/Functions";
import { AccountDTO } from "../../../Utils/Types";

const CreateAccounts = () => {
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
    await axios
      .post<AccountDTO>(`${createAccountEndPoint}`, account, {
        withCredentials: true,
      })
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

  const handlerClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    mutateAsync();
  };

  return (
    <>
      <Card>
        <CardHeader className="border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Add Account</h2>
        </CardHeader>
        <CardBody>
          <div className="account-container">
            <form method="post" autoComplete="off" className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Account Name</label>
                <TextBox id="name" name="name" type="text" placeholder="Enter account name" onChange={handleTextBoxChange} size="large" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Balance</label>
                <TextBox id="balance" name="balance" type="number" min={0} placeholder="Enter initial balance" onChange={handleTextBoxChange} size="large" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Account Type</label>
                <DropDownList id="account-type" name="accountType" data={accountType} defaultValue={accountType[0]} onChange={handleDropDownChange} size="large" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Currency</label>
                <DropDownList id="currency" name="currency" data={currency} defaultValue={currency[0]} onChange={handleDropDownChange} size="large" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Account Color</label>
                <ColorPicker id="color-picker" view="combo" onChange={handleColorPickerChange} value={color} defaultValue={account.color} />
              </div>
              <div className="pt-4">
                <Button id="add-account-button" themeColor="primary" onClick={handlerClick} className="w-full" size="large">Add Account</Button>
              </div>
            </form>
          </div>
        </CardBody>
      </Card>
    </>
  );
};

export default CreateAccounts;