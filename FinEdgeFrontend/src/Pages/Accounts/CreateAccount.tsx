import { useState } from 'react'
import { Button } from "@progress/kendo-react-buttons";
import { TextBox, TextBoxChangeEvent, } from "@progress/kendo-react-inputs";
import { DropDownList, DropDownListChangeEvent } from '@progress/kendo-react-dropdowns';
import { AccountDTO } from '../../Utils/Types'
import axios, { AxiosError, AxiosResponse } from 'axios';
import { createAccountEndPoint } from '../../endpoints';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { accountType, currency } from '../../Utils/Functions';

const CreateAccounts = () => {
  const queryClient = useQueryClient();

  const [account, setAccount] = useState<AccountDTO>({
    name: "",
    balance: 0,
    accountType: accountType[0],
    currency: currency[0]
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
      .post<AccountDTO>(`${createAccountEndPoint}`, account, { withCredentials: true })
      .then((res: AxiosResponse<AccountDTO>) => res.data)
      .catch((error: AxiosError) => {});
  }

  const { mutateAsync } = useMutation({
    mutationFn: createAccount,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["accounts"] });
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });

  const handlerClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    mutateAsync();
  }

  return (
    <>
      <div className="account-container" style={{ width: "300px" }}>
        <form method='post' autoComplete='off'>
          <TextBox id='name' name='name' type='text' placeholder='Account name' onChange={handleTextBoxChange} />
          <TextBox id='balance' name='balance' type='number' min={0} placeholder='Account balance' onChange={handleTextBoxChange} />
          <DropDownList id="account-type" name="accountType" data={accountType} defaultValue={accountType[0]} onChange={handleDropDownChange} />
          <DropDownList id="currency" name='currency' data={currency} defaultValue={currency[0]} onChange={handleDropDownChange} />

          <Button id='add-account-button' themeColor='primary' onClick={handlerClick}>Add Account</Button>
        </form>
      </div >
    </>
  )
}

export default CreateAccounts;