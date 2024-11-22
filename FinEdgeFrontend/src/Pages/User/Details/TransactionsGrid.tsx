import { Button, ExcelExport, Grid, GridColumn, GridToolbar } from "@progress/kendo-react-all";
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

  return (
    <>
      <h2>Transactions</h2>
      <ExcelExport fileName="Transactions" data={transactions} ref={_export}>
        <Grid data={transactions} style={{ width: "750px", height: "auto" }}>
          <GridToolbar>
            <Button themeColor={'primary'} type="button" onClick={hanleExcelExport}>Export to Excel</Button>
            <Button themeColor={'primary'} type="button">
              <CSVLink filename="Transactions" data={transactions}>Export to CSV</CSVLink>
            </Button>
          </GridToolbar>
          <GridColumn field="id" title="ID" width="50px" />
          <GridColumn field="name" title="Name" width="100px" />
          <GridColumn field="amount" title="Amount" width="100px" />
          <GridColumn field="accountName" title="Account Name" width="130px" />
          <GridColumn field="categoryName" title="Category Name" width="130px" />
          <GridColumn field="dateCreated" title="Date Created" width="250px" format="{0:dd/mm/yyyy}" />
        </Grid>
      </ExcelExport>
    </>
  )
}

export default TransactionsGrid;