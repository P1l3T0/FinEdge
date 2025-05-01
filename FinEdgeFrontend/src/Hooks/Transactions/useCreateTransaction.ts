import { useState, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError, AxiosResponse } from "axios";
import { createTransactionEndPoint } from "../../Utils/endpoints";
import { TransactionDTO } from "../../Utils/Types";
import { TextBoxChangeEvent, CheckboxChangeEvent } from "@progress/kendo-react-inputs";
import { DropDownListChangeEvent } from "@progress/kendo-react-dropdowns";
import useGetNames from "../Accounts/useGetNames";

const useCreateTransaction = () => {
  const queryClient = useQueryClient();
  const { data } = useGetNames();

  const [transaction, setTransaction] = useState<TransactionDTO>({
    name: "",
    amount: 0,
    accountName: "",
    categoryName: "",
    subcategoryName: "",
    isRepeating: false,
  });

  const [filteredSubcategories, setFilteredSubcategories] = useState<string[]>([]);

  useEffect(() => {
    if (data) {
      setTransaction({
        ...transaction,
        accountName: data.accountNames[0] ?? "",
        categoryName: data.categoryNames[0] ?? "",
        subcategoryName: data.subcategoryNames[0]?.value[0] ?? "",
      });

      setFilteredSubcategories(data.subcategoryNames[0]?.value ?? []);
    }
  }, [data]);

  useEffect(() => {
    const selectedCategory = transaction.categoryName;
    const subcategories = data?.subcategoryNames.find((subcategory) => subcategory.key === selectedCategory)?.value;

    setFilteredSubcategories(subcategories ?? []);
    setTransaction((prev) => ({
      ...prev,
      subcategoryName: subcategories?.[0] ?? "",
    }));
  }, [transaction.categoryName, data]);

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

  const handleCheckBoxChange = (e: CheckboxChangeEvent) => {
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
      .catch((error: AxiosError) => {
        console.error(error);
      });
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

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    await mutateAsync();
  };

  return { transaction, filteredSubcategories, handleTextBoxChange, handleDropDownChange, handleCheckBoxChange, handleSubmit };
};

export default useCreateTransaction;