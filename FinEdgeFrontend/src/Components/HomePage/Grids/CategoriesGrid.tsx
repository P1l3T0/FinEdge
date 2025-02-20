import { Button, ExcelExport, Grid, GridCellProps, GridColumn, GridToolbar } from "@progress/kendo-react-all";
import { Category } from "../../../Utils/Types";
import { CSVLink } from "react-csv";
import { useRef } from "react";

const CategoriesGrid = ({ categories }: { categories: Category[] }) => {
  const _export = useRef<ExcelExport | null>(null);

  const hanleExcelExport = () => {
    if (_export.current !== null) {
      _export.current.save();
    }
  };

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
      <h2>Categories</h2>
      <ExcelExport fileName="Categories" data={categories} ref={_export}>
        <Grid data={categories} scrollable="none">
          <GridToolbar>
            <Button themeColor={"primary"} type="button" onClick={hanleExcelExport} disabled={categories.length === 0} >
              Export to Excel
            </Button>
            <Button themeColor={"primary"} type="button" disabled={categories.length === 0} >
              <CSVLink filename="Categories" data={categories}>
                Export to CSV
              </CSVLink>
            </Button>
          </GridToolbar>
          <GridColumn field="id" title="ID" />
          <GridColumn field="name" title="Name" />
          <GridColumn field="balance" title="Balance" />
          <GridColumn field="budget" title="Budget" />
          <GridColumn field="currency" title="Currency" />
          <GridColumn field="isIncome" title="Is Income" />
          <GridColumn field="dateCreated" title="Date Created" width="180px" cell={dateCell} />
        </Grid>
      </ExcelExport>
    </>
  );
}

export default CategoriesGrid;