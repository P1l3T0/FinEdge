import { useState } from 'react'
import { TextBoxChangeEvent, DropDownListChangeEvent, Button, TextBox, DropDownList, Window, CheckboxChangeEvent, Checkbox } from '@progress/kendo-react-all';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import axios, { AxiosResponse, AxiosError } from 'axios';
import { updateTransactionEndPoint } from '../../../endpoints';
import useGetNames from '../../../Hooks/useGetNames';
import { Transaction, TransactionDTO } from '../../../Utils/Types';

const UpdateTransaction = ({ transaction }: { transaction: Transaction }) => {
  const { data } = useGetNames();
  const queryClient = useQueryClient();

  const [visible, setVisible] = useState<boolean>(false);
  const [updatedTransaction, setUpdatedTransaction] = useState<TransactionDTO>({
    name: transaction.name,
    amount: transaction.amount,
    accountName: transaction.accountName,
    categoryName: transaction.categoryName,
    isRepeating: transaction.isRepeating
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

  const handleCheckBoxChange = async (e: CheckboxChangeEvent) => {
    setUpdatedTransaction({
      ...updatedTransaction,
      [e.target.name as string]: e.value
    })
  }

  const updateTransaction = async () => {
    await axios
      .put<TransactionDTO>(`${updateTransactionEndPoint}/${transaction.id}`, updatedTransaction, { withCredentials: true })
      .then((res: AxiosResponse<TransactionDTO>) => res.data)
      .catch((error: AxiosError) => {});
  }

  const { mutateAsync } = useMutation({
    mutationFn: updateTransaction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"], });
      queryClient.invalidateQueries({ queryKey: ["reports"] });
      queryClient.invalidateQueries({ queryKey: ["sankey-chart"] });
    },
  });

  const handleUpdate = async () => {
    await mutateAsync();
  }

  return (
    <>
      <Button type="button" fillMode="solid" themeColor={"info"} onClick={toggleDialog}>
        Update
      </Button>

      {visible && (
        <Window title="Update Transaction" onClose={toggleDialog} initialHeight={355}>
          <form className="space-y-3">
            <div className="space-y-2">
              <div>
                <label className="text-sm text-gray-600 mb-1 block">Transaction Name</label>
                <TextBox id="name" name="name" type="text" placeholder="Transaction name" defaultValue={transaction.name} onChange={handleTextBoxChange} />
              </div>

              <div>
                <label className="text-sm text-gray-600 mb-1 block">Amount</label>
                <TextBox id="amount" name="amount" type="number" min={0} placeholder="Transaction amount" defaultValue={transaction.amount} onChange={handleTextBoxChange} />
              </div>

              <div>
                <label className="text-sm text-gray-600 mb-1 block">Account</label>
                <DropDownList id="account-name" name="accountName" data={data?.accountNames} defaultValue={transaction.accountName} onChange={handleDropDownChange} />
              </div>

              <div className="pt-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="isRepeating" name="isRepeating" type="checkbox" defaultValue={transaction.isRepeating} onChange={handleCheckBoxChange} />
                  <label htmlFor="isRepeating" className="text-sm text-gray-600">Is Repeating Transaction</label>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-5 border-t border-gray-200">
              <Button type="button" themeColor="primary" onClick={handleUpdate}>
                Save
              </Button>
              <Button type="button" themeColor="error" onClick={toggleDialog}>
                Cancel
              </Button>
            </div>
          </form>
        </Window>
      )}
    </>
  );
}

export default UpdateTransaction;