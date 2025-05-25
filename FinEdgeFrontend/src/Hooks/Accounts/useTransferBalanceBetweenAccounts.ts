import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError, AxiosResponse } from "axios";
import { transferBalanceToAccountEndPoint } from "../../Utils/endpoints";
import { Account, AccountTransferDTO } from "../../Utils/Types";
import { TextBoxChangeEvent } from "@progress/kendo-react-inputs";
import { DropDownListChangeEvent } from "@progress/kendo-react-dropdowns";

const useTransferBalanceBetweenAccounts = (account: Account) => {
  const queryClient = useQueryClient();

  const [visible, setVisible] = useState<boolean>(false);
  const [accountToTransferTo, setAccountToTransferTo] = useState<AccountTransferDTO>({
    targetAccountName: "",
    amount: 0,
  });

  const toggleDialog = () => {
    setVisible((visible) => !visible);
  };

  const handleTextBoxChange = async (e: TextBoxChangeEvent) => {
    const trimmedValue = (e.value as string).trim();

    setAccountToTransferTo({
      ...accountToTransferTo,
      [e.target.name as string]: trimmedValue,
    });
  }

  const handleDropDownChange = async (e: DropDownListChangeEvent) => {
    setAccountToTransferTo({
      ...accountToTransferTo,
      [e.target.props.name as string]: e.value,
    });
  }

  const trasferBalance = async () => {
    await axios
      .put<AccountTransferDTO>(`${transferBalanceToAccountEndPoint}/${account.id}`, accountToTransferTo, { withCredentials: true })
      .then((res: AxiosResponse<AccountTransferDTO>) => res.data)
      .catch((error: AxiosError) => {});
  }

  const { mutateAsync } = useMutation({
    mutationFn: trasferBalance,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["accounts"] });
      queryClient.invalidateQueries({ queryKey: ["accountChartData"] });
      queryClient.invalidateQueries({ queryKey: ["accountStats"] });
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });

  const handleTransferBalance = async () => {
    await mutateAsync();
  }

  return { visible, toggleDialog, handleTextBoxChange, handleDropDownChange, handleTransferBalance };
};

export default useTransferBalanceBetweenAccounts;