import { useEffect, useState } from "react";
import { TransactionDTO } from "../../Utils/Types";
import { TextBox, DropDownList, TextBoxChangeEvent, DropDownListChangeEvent, Button } from "@progress/kendo-react-all";
import useGetNames from "../../Hooks/useGetNames";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosResponse, AxiosError } from "axios";
import { createTransactionEndPoint } from "../../endpoints";

const CreateTransaction = () => {
  const queryClient = useQueryClient();
  const { data, isLoading, isError, error } = useGetNames();

  const [transaction, setTransaction] = useState<TransactionDTO>({
    name: "",
    amount: 0,
    accountName: "",
    categoryName: ""
  });

  useEffect(() => {
    setTransaction({
      ...transaction,
      accountName: data?.accountNames[0]!,
      categoryName: data?.categoryNames[0]!,
    })
  }, [data]);

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
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      queryClient.invalidateQueries({ queryKey: ["accounts"] });
      queryClient.invalidateQueries({ queryKey: ["user"] });
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
    },
  });

  const handlerClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    mutateAsync();
  }

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error?.message}</p>;

  return (
    <>
      <div className="transaction-container" style={{ width: "300px" }}>
        <form method='post' autoComplete='off'>
          <TextBox id='name' name='name' type='text' placeholder='Transaction name' onChange={handleTextBoxChange} />
          <TextBox id='amount' name='amount' type='number' min={0} placeholder='Transaction amount' onChange={handleTextBoxChange} />
          <DropDownList id="account-name" name='accountName' data={data?.accountNames} defaultValue={data?.accountNames[0] ?? "Create at least 1 account"} onChange={handleDropDownChange} />
          <DropDownList id="category-name" name='categoryName' data={data?.categoryNames} defaultValue={data?.categoryNames[0] ?? "Create at least 1 category"} onChange={handleDropDownChange} />

          <Button id='add-transaction-button' themeColor='primary' onClick={handlerClick}>Add transaction</Button>
        </form>
      </div>
    </>
  )
}

export default CreateTransaction;