import { DatePicker, DatePickerChangeEvent } from '@progress/kendo-react-dateinputs';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { useState } from 'react';
import { FinancialRecommendation, PromptRequestData } from '../../Utils/Types';
import { createFinancialRecommendationEndPoint } from '../../Utils/endpoints';
import AIPromptComponent from './AIPromptComponent';

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
    const response = await axios
      .post(createFinancialRecommendationEndPoint, promptRequestData, { withCredentials: true })
      .catch((error: AxiosError) => {});

      return response?.data as FinancialRecommendation;
  }

  const { mutateAsync } = useMutation({
    mutationFn: createRecommendations,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["recommendations"] });
    },
  });

  const generateFinancialRecommendation = async (prompt: string): Promise<FinancialRecommendation> => {
    setPromptRequestData({
      ...promptRequestData,
      prompt: prompt,
    });

    const newRecommendation = await mutateAsync();
    return newRecommendation;
  }

  return (
    <>
      <div className="mb-3">
        <DatePicker width={200} max={new Date()} onChange={handleDateChange} className='m-6' />
      </div>
      <div>
        <AIPromptComponent generateFinancialRecommendation={generateFinancialRecommendation} />
      </div>
    </>
  )
}

export default CreateFinancialRecommendations;