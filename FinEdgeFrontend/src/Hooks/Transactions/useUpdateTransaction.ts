import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { updateTransactionEndPoint } from "../../Utils/endpoints";
import { Transaction, TransactionDTO } from "../../Utils/Types";
import { TextBoxChangeEvent, CheckboxChangeEvent } from "@progress/kendo-react-inputs";
import { DropDownListChangeEvent } from "@progress/kendo-react-dropdowns";

const useUpdateTransaction = (transaction: Transaction) => {
  const queryClient = useQueryClient();

  const [visible, setVisible] = useState<boolean>(false);
  const [updatedTransaction, setUpdatedTransaction] = useState<TransactionDTO>({
    name: transaction.name,
    amount: transaction.amount,
    accountName: transaction.accountName,
    categoryName: transaction.categoryName,
    isRepeating: transaction.isRepeating,
    subcategoryName: "",
  });

  const toggleDialog = () => {
    setVisible(!visible);
  };

  const handleTextBoxChange = (e: TextBoxChangeEvent) => {
    const trimmedValue = (e.value as string).trim();

    setUpdatedTransaction({
      ...updatedTransaction,
      [e.target.name as string]: trimmedValue,
    });
  };

  const handleDropDownChange = (e: DropDownListChangeEvent) => {
    setUpdatedTransaction({
      ...updatedTransaction,
      [e.target.props.name as string]: e.value,
    });
  };

  const handleCheckBoxChange = (e: CheckboxChangeEvent) => {
    setUpdatedTransaction({
      ...updatedTransaction,
      [e.target.name as string]: e.value,
    });
  };

  const updateTransaction = async () => {
    await axios
      .put(`${updateTransactionEndPoint}/${transaction.id}`, updatedTransaction, {
        withCredentials: true,
      })
      .catch((error: AxiosError) => {
        console.error(error);
      });
  };

  const { mutateAsync } = useMutation({
    mutationFn: updateTransaction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["reports"] });
      queryClient.invalidateQueries({ queryKey: ["sankey-chart"] });
    },
  });

  const handleUpdate = async () => {
    await mutateAsync();
  };

  return { visible, updatedTransaction, toggleDialog, handleTextBoxChange, handleDropDownChange, handleCheckBoxChange, handleUpdate };
};

export default useUpdateTransaction;