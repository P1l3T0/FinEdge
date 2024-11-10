import { RadioGroup, RadioGroupChangeEvent } from "@progress/kendo-react-inputs";
import { data1, data2, data3, data4, data5 } from './QuestionsData';
import { useState } from "react";

const Questions = ({ onMethodologyChange }: { onMethodologyChange: (value: string) => void }) => {
  const [values, setValues] = useState<string[]>([]);

  const handleChange = (e: RadioGroupChangeEvent) => {
    setValues([
      ...values,
      e.value
    ])

    if (values.length >= 4) {
      const mostFrequentValue = findMostFrequentString(values);
      onMethodologyChange(mostFrequentValue);
      setValues([]);
    }
  }

  const findMostFrequentString = (strings: string[]): string => {
    const frequencyMap: { [key: string]: number } = {};

    strings.forEach(string => {
      frequencyMap[string] = (frequencyMap[string] || 0) + 1;
    });

    let mostFrequentString = strings[0];
    let maxFrequency = frequencyMap[mostFrequentString];

    for (const string in frequencyMap) {
      if (frequencyMap[string] > maxFrequency) {
        mostFrequentString = string;
        maxFrequency = frequencyMap[string];
      }
    }

    return mostFrequentString;
  }

  return (
    <>
      <h3>What’s the first thing you want to do with your paycheck?</h3>
      <RadioGroup data={data1} onChange={handleChange} />

      <h3>How much time will you spend managing your budget monthly?</h3>
      <RadioGroup data={data2} onChange={handleChange} />

      <h3>What are your top financial priorities?</h3>
      <RadioGroup data={data3} onChange={handleChange} />

      <h3>How would you cover unexpected expenses this month?</h3>
      <RadioGroup data={data4} onChange={handleChange} />

      <h3>What financial outcome would satisfy you most monthly?</h3>
      <RadioGroup data={data5} onChange={handleChange} />
    </>
  )
}

export default Questions;