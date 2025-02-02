import { DatePicker, DatePickerChangeEvent } from '@progress/kendo-react-dateinputs';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { useState } from 'react';
import { PromptRequestData } from '../../Utils/Types';
import { createFinancialRecommendationEndPoint } from '../../endpoints';
import AIPromptComponent from './AIPrompt/AIPromptComponent';

const CreateFinancialRecommendations = () => {
  const queryClient = useQueryClient();
  const [promptRequestData, setPromptRequestData] = useState<PromptRequestData>({
    prompt: "",
    dateString: `${new Date().getDate()}-${new Date().getMonth() + 1}-${new Date().getFullYear()}`
  });

  const handleDateChange = (e: DatePickerChangeEvent) => {
    const dateString: string = `${e.value!.getDate()}-${e.value!.getMonth() + 1}-${e.value!.getFullYear()}`;

    setPromptRequestData({
      ...promptRequestData,
      dateString: dateString
    });
  }

  const createRecommendations = async () => {
    await axios
      .post(createFinancialRecommendationEndPoint, promptRequestData, { withCredentials: true })
      .catch((error: AxiosError) => {});
  }

  const { mutateAsync } = useMutation({
    mutationFn: createRecommendations,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["recommendations"] });
    },
  });

  const handleGenerateButtonClick = async (prompt: string) => {
    setPromptRequestData({
      ...promptRequestData,
      prompt: prompt
    });

    await mutateAsync();
  }

  return (
    <>
      <DatePicker width={200} max={new Date()} onChange={handleDateChange} /> <br />
      <AIPromptComponent handleGenerateButtonClick={handleGenerateButtonClick} />
    </>
  )
}

export default CreateFinancialRecommendations;