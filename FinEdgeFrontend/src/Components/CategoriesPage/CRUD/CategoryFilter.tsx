import { TransactionFilterProps } from "../../../Utils/Types";
import { CompositeFilterDescriptor } from "@progress/kendo-data-query";
import { Filter, Operators, TextFilter, NumericFilter, DateFilter, FieldSettings, FilterChangeEvent } from "@progress/kendo-react-data-tools";
import { useState } from "react";

const fields: FieldSettings[] = [{
    name: "name",
    label: "Category Name",
    filter: TextFilter,
    operators: Operators.text,
  }, {
    name: "balance",
    label: "Balance",
    filter: NumericFilter,
    operators: Operators.numeric,
  }, {
    name: "budget",
    label: "Budget",
    filter: NumericFilter,
    operators: Operators.numeric,
  }, {
    name: "currency",
    label: "Currency",
    filter: TextFilter,
    operators: Operators.text 
  }, {
    name: "dateCreated",
    label: "Date Created",
    filter: DateFilter,
    operators: Operators.date,
  }
];

const CategoryFilter = ({ onFilterChange }: TransactionFilterProps) => {
  const [filter, setFilter] = useState<CompositeFilterDescriptor>({
    logic: "and",
    filters: [],
  });

  const handleFilterChange = (e: FilterChangeEvent) => {
    setFilter(e.filter);
    onFilterChange(e.filter);
  };

  return (
    <Filter value={filter} fields={fields} onChange={handleFilterChange} />
  );
};

export default CategoryFilter;