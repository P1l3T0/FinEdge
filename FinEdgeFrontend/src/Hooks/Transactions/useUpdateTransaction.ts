import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { updateTransactionEndPoint } from "../../Utils/endpoints";
import { Transaction, TransactionUpdateDTO } from "../../Utils/Types";
import { TextBoxChangeEvent, CheckboxChangeEvent } from "@progress/kendo-react-inputs";
import { DropDownListChangeEvent } from "@progress/kendo-react-dropdowns";
import { DatePickerChangeEvent } from "@progress/kendo-react-dateinputs";

const useUpdateTransaction = (transaction: Transaction) => {
  const queryClient = useQueryClient();

  const [visible, setVisible] = useState<boolean>(false);
  const [updatedTransaction, setUpdatedTransaction] = useState<TransactionUpdateDTO>({
    name: transaction.name,
    amount: transaction.amount,
    accountName: transaction.accountName,
    categoryName: transaction.categoryName,
    isRepeating: transaction.isRepeating,
    subcategoryName: "",
    dateUpdated: transaction.dateCreated.toLocaleDateString("en-GB"),
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

  const handleDatePickerChange = (e: DatePickerChangeEvent) => {
    const dateString: string = `${e.value!.getDate()}-${e.value!.getMonth() + 1}-${e.value!.getFullYear()}`;

    setUpdatedTransaction({
      ...updatedTransaction,
      [e.target.name as string]: dateString
    });
  }

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

  return { visible, updatedTransaction, toggleDialog, handleTextBoxChange, handleDropDownChange, handleCheckBoxChange, handleDatePickerChange, handleUpdate };
};

export default useUpdateTransaction;