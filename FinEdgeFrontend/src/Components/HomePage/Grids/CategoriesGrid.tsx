import { Category } from "../../../Utils/Types";
import { CSVLink } from "react-csv";
import { useRef } from "react";
import { Grid, GridCellProps, GridColumn, GridToolbar } from "@progress/kendo-react-grid";
import { ExcelExport } from "@progress/kendo-react-excel-export";
import { Button } from "@progress/kendo-react-buttons";
import { Checkbox } from "@progress/kendo-react-inputs";

const CategoriesGrid = ({ categories }: { categories: Category[] }) => {
  const _export = useRef<ExcelExport | null>(null);

  const hanleExcelExport = () => {
    if (_export.current !== null) {
      _export.current.save();
    }
  };

  const isIncomeCell = (props: GridCellProps) => {
    const isIncomeValue: boolean = props.dataItem[props.field || ''];

    return (
      <td className="text-center align-middle">
        <Checkbox checked={isIncomeValue} />
      </td>
    );
  }

  const dateCell = (props: GridCellProps) => {
    const dateValue: Date = new Date(props.dataItem[props.field || '']);
    const formattedDate: string = dateValue.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    })

    return <td>{formattedDate}</td>;
  };

  return (
    <>
      <ExcelExport fileName="Categories" data={categories} ref={_export}>
        <Grid data={categories} navigatable={true} sortable={true} filterable={true} groupable={true} autoProcessData={true} pageable={true} dataItemKey="id">
          <GridToolbar>
            <Button themeColor={"primary"} type="button" onClick={hanleExcelExport} disabled={categories.length === 0}>Export to Excel</Button>
            <Button themeColor={"primary"} type="button" disabled={categories.length === 0} >
              <CSVLink filename="Categories" data={categories}>
                Export to CSV
              </CSVLink>
            </Button>
          </GridToolbar>
          <GridColumn field="id" title="ID" filter="numeric" />
          <GridColumn field="name" title="Name" />
          <GridColumn field="balance" title="Balance" filter="numeric" />
          <GridColumn field="budget" title="Budget" filter="numeric" />
          <GridColumn field="currency" title="Currency" />
          <GridColumn field="isIncome" title="Is Income" filter="boolean" cells={{ data: isIncomeCell }} />
          <GridColumn field="dateCreated" title="Date Created" filter="date" cells= {{ data: dateCell}} />
        </Grid>
      </ExcelExport>
    </>
  );
}

export default CategoriesGrid;