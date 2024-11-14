import { useState } from 'react'
import { Button } from "@progress/kendo-react-buttons";
import { TextBox, TextBoxChangeEvent, } from "@progress/kendo-react-inputs";
import { DropDownList, DropDownListChangeEvent } from '@progress/kendo-react-dropdowns';
import { Account, AccountDto } from '../../Utils/Types'
import axios, { AxiosError, AxiosResponse } from 'axios';
import { createAccountEndPoint } from '../../endpoints';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const CreateAccounts = () => {
  const queryClient = useQueryClient();

  const accountType: string[] = ["Regular", "Savings", "Debt"];
  const currency: string[] = ["BGN", "USD", "EUR"];
  const [account, setAccount] = useState<AccountDto>({
    name: "",
    balance: 0,
    accountType: "",
    currency: ""
  });

  const handleTextBoxChange = async (e: TextBoxChangeEvent) => {
    const trimmedValue = (e.value as string).trim();

    setAccount({
      ...account,
      [e.target.name as string]: trimmedValue
    })
  }

  const handleDropDownChange = async (e: DropDownListChangeEvent) => {
    setAccount({
      ...account,
      [e.target.props.name as string]: e.value
    })
  }

  const createAccount = async () => {
    await axios
      .post<Account>(`${createAccountEndPoint}`, account, { withCredentials: true })
      .then((res: AxiosResponse<Account>) => res.data)
      .catch((error: AxiosError) => {
        alert(error.response?.data);
      });
  }

  const { mutateAsync } = useMutation({
    mutationFn: createAccount,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["accounts"] });
    },
  });

  const handlerClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    mutateAsync();
  }

  return (
    <>
      <div className="account-container" style={{ width: "300px" }}>
        <TextBox id='name' name='name' type='text' placeholder='Account name' onChange={handleTextBoxChange} />
        <TextBox id='balance' name='balance' type='number' min={0} placeholder='Account balance' onChange={handleTextBoxChange} />
        <DropDownList id="account-type" name="accountType" data={accountType} defaultValue="Select account type" onChange={handleDropDownChange} />
        <DropDownList id="currency" name='currency' data={currency} defaultValue="Select currency" onChange={handleDropDownChange} />
        <Button id='add-account-button' themeColor='primary' onClick={handlerClick}>Add Account</Button>
      </div >
    </>
  )
}

export default CreateAccounts;