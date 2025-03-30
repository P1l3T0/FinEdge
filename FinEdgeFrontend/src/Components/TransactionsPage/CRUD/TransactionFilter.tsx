import { useState } from "react";
import { TransactionFilterProps } from "../../../Utils/Types";
import { CompositeFilterDescriptor } from "@progress/kendo-data-query";
import { Filter, Operators, TextFilter, NumericFilter, DateFilter, BooleanFilter, FieldSettings, FilterChangeEvent } from "@progress/kendo-react-data-tools";

const fields: FieldSettings[] = [{
    name: "name",
    label: "Transaction Name",
    filter: TextFilter,
    operators: Operators.text,
  }, {
    name: "accountName",
    label: "Account Name",
    filter: TextFilter,
    operators: Operators.text,
  }, {
    name: "categoryName",
    label: "Category Name",
    filter: TextFilter,
    operators: Operators.text,
  }, {
    name: "amount",
    label: "Amount",
    filter: NumericFilter,
    operators: Operators.numeric,
  }, {
    name: "dateCreated",
    label: "Date Created",
    filter: DateFilter,
    operators: Operators.date,
  }, {
    name: "isRepeating",
    label: "Is Repeating",
    filter: BooleanFilter,
    operators: Operators.boolean,
  }
];

const TransactionFilter = ({ onFilterChange }: TransactionFilterProps) => {
  const [filter, setFilter] = useState<CompositeFilterDescriptor>({
    logic: "and",
    filters: [],
  });

  const handleFilterChange = (e: FilterChangeEvent) => {
    setFilter(e.filter);
    onFilterChange(e.filter);
  };

  return (
    <Filter value={filter} onChange={handleFilterChange} fields={fields} />
  );
};

export default TransactionFilter;