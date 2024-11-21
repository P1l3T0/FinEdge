import { useState } from 'react'
import { Transaction, TransactionDTO } from '../../Utils/Types';
import { TextBoxChangeEvent, DropDownListChangeEvent, Button, TextBox, DropDownList, Window } from '@progress/kendo-react-all';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import axios, { AxiosResponse, AxiosError } from 'axios';
import { updateTransactionEndPoint } from '../../endpoints';
import useGetNames from '../../Hooks/useGetNames';

const UpdateTransaction = ({ transaction }: { transaction: Transaction }) => {
  const { data } = useGetNames();
  const queryClient = useQueryClient();

  const [visible, setVisible] = useState<boolean>(false);
  const [updatedTransaction, setUpdatedTransaction] = useState<TransactionDTO>({
    name: transaction.name,
    amount: transaction.amount,
    accountName: transaction.accountName,
    categoryName: transaction.categoryName
  });

  const toggleDialog = () => {
    setVisible(!visible);
  };

  const handleTextBoxChange = async (e: TextBoxChangeEvent) => {
    const trimmedValue = (e.value as string).trim();

    setUpdatedTransaction({
      ...updatedTransaction,
      [e.target.name as string]: trimmedValue
    })
  }

  const handleDropDownChange = async (e: DropDownListChangeEvent) => {
    setUpdatedTransaction({
      ...updatedTransaction,
      [e.target.props.name as string]: e.value
    })
  }

  const updateTransaction = async () => {
    await axios
      .put<TransactionDTO>(`${updateTransactionEndPoint}/${transaction.id}`, updatedTransaction, { withCredentials: true })
      .then((res: AxiosResponse<TransactionDTO>) => res.data)
      .catch((error: AxiosError) => {
        alert(error.response?.data);
      });
  }

  const { mutateAsync } = useMutation({
    mutationFn: updateTransaction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"], });
      queryClient.invalidateQueries({ queryKey: ["reports"] });
    },
  });

  const handleUpdate = async () => {
    await mutateAsync();
  }

  return (
    <>
      <Button type="button" fillMode="solid" themeColor={'info'} onClick={toggleDialog}>Update</Button>

      {visible && (
        <Window title={`Update Transaction`} style={{ height: "auto" }} onClose={toggleDialog}>
          <form className="k-form">
            <fieldset>
              <legend>Transaction Details</legend>
              <TextBox id='name' name='name' type='text' placeholder='Transaction name' defaultValue={transaction.name} onChange={handleTextBoxChange} />
              <TextBox id='amount' name='amount' type='number' min={0} placeholder='Transaction amount' defaultValue={transaction.amount} onChange={handleTextBoxChange} />
              <DropDownList id="account-name" name='accountName' data={data?.accountNames} defaultValue={transaction.accountName} onChange={handleDropDownChange} />
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

export default UpdateTransaction;