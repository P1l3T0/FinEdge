import { useState } from 'react';
import { Account, AccountDTO, AccountType } from '../../Utils/Types';
import { Window } from '@progress/kendo-react-dialogs';
import { Button, DropDownList, DropDownListChangeEvent, TextBox, TextBoxChangeEvent } from '@progress/kendo-react-all';
import { accountType, currency, getEnumValueFromNumber } from '../../Utils/Functions';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios, { AxiosResponse, AxiosError } from 'axios';
import { updateAccountEndPoint } from '../../endpoints';

const UpdateAccount = ({ account }: { account: Account }) => {
  const queryClient = useQueryClient();

  const [visible, setVisible] = useState<boolean>(false);
  const [updatedAccount, setUpdatedAccount] = useState<AccountDTO>({
    name: account.name,
    balance: account.balance,
    accountType: getEnumValueFromNumber(parseInt(account.accountType), AccountType),
    currency: account.currency
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

  const updateAccount = async () => {
    await axios
      .put<AccountDTO>(`${updateAccountEndPoint}/${account.id}`, updatedAccount, { withCredentials: true })
      .then((res: AxiosResponse<AccountDTO>) => res.data)
      .catch((error: AxiosError) => {
        alert(error.response?.data);
      });
  }

  const { mutateAsync } = useMutation({
    mutationFn: updateAccount,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["accounts"] });
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });

  const handleUpdate = async () => {

    await mutateAsync();
  }

  return (
    <>
      <Button type="button" fillMode="solid" themeColor={'info'} onClick={toggleDialog}>Update</Button>

      {visible && (
        <Window title={`Update account`} style={{ height: "auto" }} onClose={toggleDialog}>
          <form className="k-form">
            <fieldset>
              <legend>Account Details</legend>
              <TextBox id='name' name='name' type='text' defaultValue={account.name} onChange={handleTextBoxChange} />
              <TextBox id='balance' name='balance' type='number' min={0} defaultValue={account.balance.toString()} onChange={handleTextBoxChange} />
              <DropDownList id="account-type" name="accountType" data={accountType} defaultValue={getEnumValueFromNumber(parseInt(account.accountType), AccountType)} onChange={handleDropDownChange} />
              <DropDownList id="currency" name='currency' data={currency} defaultValue={account.currency} onChange={handleDropDownChange} />
            </fieldset>

            <div className="buttonDiv">
              <Button type="button" onClick={handleUpdate} themeColor={'primary'}>Submit</Button>
              <Button type="button" onClick={toggleDialog} themeColor={'error'}>Cancel</Button>
            </div>
          </form>
        </Window>
      )}
    </>
  )
}

export default UpdateAccount;