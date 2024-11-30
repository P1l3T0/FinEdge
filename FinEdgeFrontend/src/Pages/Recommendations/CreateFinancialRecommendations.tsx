import { Button } from '@progress/kendo-react-all';
import { DatePicker, DatePickerChangeEvent } from '@progress/kendo-react-dateinputs';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { useState } from 'react';
import { DateRequest } from '../../Utils/Types';
import { createFinancialRecommendationEndPoint } from '../../endpoints';

const CreateFinancialRecommendations = () => {
  const queryClient = useQueryClient();
  const [fromDate, setFromDate] = useState<DateRequest>({
    dateString: `${new Date().getDate()}-${new Date().getMonth() + 1}-${new Date().getFullYear()}`
  });

  const handleDateChange = (e: DatePickerChangeEvent) => {
    const dateString: string = `${e.value!.getDate()}-${e.value!.getMonth() + 1}-${e.value!.getFullYear()}`;

    setFromDate({
      dateString: dateString
    });
  }

  const createRecommendations = async () => {
    await axios
      .post(createFinancialRecommendationEndPoint, fromDate, { withCredentials: true })
      .catch((error: AxiosError) => {
        alert(error.response?.data);
      });
  }

  const { mutateAsync } = useMutation({
    mutationFn: createRecommendations,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["recommendations"] });
    },
  });

  const handleButtonClick = () => {
    mutateAsync();
  }

  return (
    <>
      <DatePicker width={200} onChange={handleDateChange} /> <br />
      <Button themeColor={"primary"} onClick={handleButtonClick}>Create recommendations</Button>
    </>
  )
}

export default CreateFinancialRecommendations;