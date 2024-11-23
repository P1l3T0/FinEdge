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
        <Grid data={categories} style={{ width: "750px", height: "auto" }}>
          <GridToolbar>
            <Button themeColor={'primary'} type="button" onClick={hanleExcelExport} disabled={categories.length === 0}>Export to Excel</Button>
            <Button themeColor={'primary'} type="button" disabled={categories.length === 0}>
              <CSVLink filename="Categories" data={categories}>Export to CSV</CSVLink>
            </Button>
          </GridToolbar>
          <GridColumn field="id" title="ID" width="50px" />
          <GridColumn field="name" title="Name" width="100px" />
          <GridColumn field="balance" title="Balance" width="100px" />
          <GridColumn field="budget" title="Budget" width="100px" />
          <GridColumn field="currency" title="Currency" width="100px" />
          <GridColumn field="isIncome" title="Is Income" width="100px" />
          <GridColumn field="dateCreated" title="Date Created" width="250px" cell={dateCell} />
        </Grid>
      </ExcelExport>
    </>
  )
}

export default CategoriesGrid;