import { useEffect, useState } from "react";
import { TextBox, DropDownList, TextBoxChangeEvent, DropDownListChangeEvent, Button, Checkbox, CheckboxChangeEvent, Card, CardBody, CardHeader } from "@progress/kendo-react-all";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosResponse, AxiosError } from "axios";
import { createTransactionEndPoint } from "../../../endpoints";
import useGetNames from "../../../Hooks/Accounts/useGetNames";
import { TransactionDTO } from "../../../Utils/Types";

const CreateTransaction = () => {
  const queryClient = useQueryClient();
  const { data, isLoading, isError, error } = useGetNames();

  const [transaction, setTransaction] = useState<TransactionDTO>({
    name: "",
    amount: 0,
    accountName: "",
    categoryName: "",
    isRepeating: false,
  });

  useEffect(() => {
    setTransaction({
      ...transaction,
      accountName: data?.accountNames[0]!,
      categoryName: data?.categoryNames[0]!,
    });
  }, [data]);

  const handleTextBoxChange = (e: TextBoxChangeEvent) => {
    const trimmedValue = (e.value as string).trim();

    setTransaction({
      ...transaction,
      [e.target.name as string]: trimmedValue,
    });
  };

  const handleDropDownChange = (e: DropDownListChangeEvent) => {
    setTransaction({
      ...transaction,
      [e.target.props.name as string]: e.value,
    });
  };

  const handleCheckBoxChange = async (e: CheckboxChangeEvent) => {
    setTransaction({
      ...transaction,
      [e.target.name as string]: e.value,
    });
  };

  const createTransaction = async () => {
    await axios
      .post<TransactionDTO>(`${createTransactionEndPoint}`, transaction, {
        withCredentials: true,
      })
      .then((res: AxiosResponse<TransactionDTO>) => res.data)
      .catch((error: AxiosError) => {});
  };

  const { mutateAsync } = useMutation({
    mutationFn: createTransaction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["income-categories"] });
      queryClient.invalidateQueries({ queryKey: ["expenditure-categories"] });
      queryClient.invalidateQueries({ queryKey: ["accounts"] });
      queryClient.invalidateQueries({ queryKey: ["user"] });
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["reports"] });
      queryClient.invalidateQueries({ queryKey: ["sankey-chart"] });
    },
  });

  const handlerClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    mutateAsync();
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error?.message}</p>;

  return (
    <>
      <Card className="bg-white">
        <CardHeader className="border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Add Transaction</h2>
        </CardHeader>
        <CardBody>
          <div className="transaction-container">
            <form method="post" autoComplete="off" className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Transaction Name</label>
                <TextBox id="name" name="name" type="text" placeholder="Enter transaction name" onChange={handleTextBoxChange} size="large" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Amount</label>
                <TextBox id="amount" name="amount" type="number" min={0} placeholder="Enter transaction amount" onChange={handleTextBoxChange} size="large" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Account</label> 
                <DropDownList id="account-name" name="accountName" data={data?.accountNames} defaultValue={data?.accountNames[0] ?? "Create at least 1 account"} onChange={handleDropDownChange} size="large" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Category</label>
                <DropDownList id="category-name" name="categoryName" data={data?.categoryNames} defaultValue={data?.categoryNames[0] ?? "Create at least 1 category"} onChange={handleDropDownChange} size="large" />
              </div>

              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="isRepeating" name="isRepeating" type="checkbox" label="Is repeating Transaction" onChange={handleCheckBoxChange} />
                </div>
              </div>

              <div className="pt-4">
                <Button id="add-transaction-button" themeColor="primary" onClick={handlerClick} className="w-full" size="large">
                  Add Transaction
                </Button>
              </div>
            </form>
          </div>
        </CardBody>
      </Card>
    </>
  );
};

export default CreateTransaction;