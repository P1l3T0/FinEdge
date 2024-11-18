import { useState } from "react";
import { TransactionDTO } from "../../Utils/Types";
import { TextBox, DropDownList, TextBoxChangeEvent, DropDownListChangeEvent, Button } from "@progress/kendo-react-all";
import useGetNames from "../../Hooks/useGetNames";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosResponse, AxiosError } from "axios";
import { createTransactionEndPoint } from "../../endpoints";
import { Names } from "../../Utils/Types";

const CreateTransaction = () => {
  const data = useGetNames();
  const queryClient = useQueryClient();

  const [transaction, setTransaction] = useState<TransactionDTO>({
    name: "",
    amount: 0,
    accountName: "",
    categoryName: ""
  });

  const handleTextBoxChange = (e: TextBoxChangeEvent) => {
    const trimmedValue = (e.value as string).trim();

    setTransaction({
      ...transaction,
      [e.target.name as string]: trimmedValue
    })
  }

  const handleDropDownChange = (e: DropDownListChangeEvent) => {
    setTransaction({
      ...transaction,
      [e.target.props.name as string]: e.value
    })
  }

  const createTransaction = async () => {
    await axios
      .post<TransactionDTO>(`${createTransactionEndPoint}`, transaction, { withCredentials: true })
      .then((res: AxiosResponse<TransactionDTO>) => res.data)
      .catch((error: AxiosError) => {
        alert(error.response?.data);
      });
  }

  const { mutateAsync } = useMutation({
    mutationFn: createTransaction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["expenditure-category"] });
      queryClient.invalidateQueries({ queryKey: ["income-category"] });
      queryClient.invalidateQueries({ queryKey: ["accounts"] });
      queryClient.invalidateQueries({ queryKey: ["user"] });
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
    },
  });

  const handlerClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    mutateAsync();
  }

  return (
    <>
      <div className="transaction-container" style={{ width: "300px" }}>
        <form method='post' autoComplete='off'>
          <TextBox id='name' name='name' type='text' placeholder='Transaction name' onChange={handleTextBoxChange} />
          <TextBox id='amount' name='amount' type='number' min={0} placeholder='Transaction amount' onChange={handleTextBoxChange} />
          <DropDownList id="account-name" name='accountName' data={(data as Names).accountNames} defaultValue="Select Account" onChange={handleDropDownChange} />
          <DropDownList id="category-name" name='categoryName' data={(data as Names).categoryNames} defaultValue="Select Category" onChange={handleDropDownChange} />

          <Button id='add-transaction-button' themeColor='primary' onClick={handlerClick}>Add transaction</Button>
        </form>
      </div>
    </>
  )
}

export default CreateTransaction;