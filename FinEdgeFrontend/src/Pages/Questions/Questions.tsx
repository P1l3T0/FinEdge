import { RadioGroup, RadioGroupChangeEvent } from "@progress/kendo-react-inputs";
import { data1, data2, data3, data4, data5 } from './QuestionsData';
import { useEffect, useState } from "react";

const Questions = ({ onMethodologyChange }: { onMethodologyChange: (value: string) => void }) => {
  const [values, setValues] = useState<string[]>([]);

  useEffect(() => {
    if (values.length === 5) {
      const mostFrequentValue = findMostFrequentString(values);
      onMethodologyChange(mostFrequentValue);
    }
  }, [values]);

  const handleChange = (index: number, e: RadioGroupChangeEvent) => {
    const newValues = [...values];
    newValues[index] = e.value;
    setValues(newValues);
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
      <h4>What’s the first thing you want to do with your paycheck?</h4>
      <RadioGroup data={data1} onChange={(e) => handleChange(0, e)} />

      <h4>How much time will you spend managing your budget monthly?</h4>
      <RadioGroup data={data2} onChange={(e) => handleChange(1, e)} />

      <h4>What are your top financial priorities?</h4>
      <RadioGroup data={data3} onChange={(e) => handleChange(2, e)} />

      <h4>How would you cover unexpected expenses this month?</h4>
      <RadioGroup data={data4} onChange={(e) => handleChange(3, e)} />

      <h4>What financial outcome would satisfy you most monthly?</h4>
      <RadioGroup data={data5} onChange={(e) => handleChange(4, e)} />
    </>
  )
}

export default Questions;