import { Button, ExcelExport, Grid, GridCellProps, GridColumn, GridToolbar } from "@progress/kendo-react-all";
import { Transaction } from "../../../Utils/Types";
import { useRef } from "react";
import { CSVLink } from "react-csv";

const TransactionsGrid = ({ transactions }: { transactions: Transaction[] }) => {
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
      <h2>Transactions</h2>
      <ExcelExport fileName="Transactions" data={transactions} ref={_export}>
        <Grid data={transactions} scrollable="none">
          <GridToolbar>
            <Button themeColor={'primary'} type="button" onClick={hanleExcelExport} disabled={transactions.length === 0}>Export to Excel</Button>
            <Button themeColor={'primary'} type="button" disabled={transactions.length === 0}>
              <CSVLink filename="Transactions" data={transactions}>Export to CSV</CSVLink>
            </Button>
          </GridToolbar>
          <GridColumn field="id" title="ID" />
          <GridColumn field="name" title="Name" />
          <GridColumn field="amount" title="Amount" />
          <GridColumn field="accountName" title="Account Name" />
          <GridColumn field="categoryName" title="Category Name"/>
          <GridColumn field="isRepeating" title="Is Repeating"  />
          <GridColumn field="dateCreated" title="Date Created" cell={dateCell} />
        </Grid>
      </ExcelExport>
    </>
  )
}

export default TransactionsGrid;