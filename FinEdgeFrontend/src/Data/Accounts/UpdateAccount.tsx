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

  return (
    <>
      <Button type="button" fillMode="solid" themeColor={'info'} onClick={toggleDialog}>Update</Button>

      {visible && (
        <Window title="Update Account" onClose={toggleDialog} initialHeight={380}>
          <form className="space-y-3">
            <div className="space-y-2">
              <div>
                <label className="text-sm text-gray-600 mb-1 block">Account Name</label>
                <TextBox id="name" name="name" type="text" defaultValue={account.name} onChange={handleTextBoxChange} className="w-full" />
              </div>

              <div>
                <label className="text-sm text-gray-600 mb-1 block">Balance</label>
                <TextBox id="balance" name="balance" type="number" min={0} defaultValue={account.balance.toString()} onChange={handleTextBoxChange} className="w-full" />
              </div>

              <div>
                <label className="text-sm text-gray-600 mb-1 block">Account Type</label>
                <DropDownList id="account-type" name="accountType" data={accountType} defaultValue={getEnumValueFromNumber(parseInt(account.accountType), AccountType)} onChange={handleDropDownChange} className="w-full" />
              </div>

              <div>
                <label className="text-sm text-gray-600 mb-1 block">Currency</label>
                <DropDownList id="currency" name="currency" data={currency} defaultValue={account.currency} onChange={handleDropDownChange} className="w-full" />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-5 border-t border-gray-200">
              <Button type="button" themeColor="primary" onClick={handleUpdate} >
                Save
              </Button>
              <Button type="button" themeColor="error" onClick={toggleDialog} >
                Cancel
              </Button>
            </div>
          </form>
        </Window>
      )}
    </>
  )
}

export default UpdateAccount;