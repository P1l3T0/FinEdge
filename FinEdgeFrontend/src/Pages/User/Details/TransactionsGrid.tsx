import { Grid, GridColumn } from "@progress/kendo-react-all";
import { Transaction } from "../../../Utils/Types";

const TransactionsGrid = ({ transactions }: { transactions: Transaction[] }) => {
  return (
    <>
      <h2>Transactions</h2>
      <Grid data={transactions} style={{ width: "750px", height: "auto" }}>
        <GridColumn field="id" title="ID" width="50px" />
        <GridColumn field="name" title="Name" width="100px" />
        <GridColumn field="amount" title="Amount" width="100px" />
        <GridColumn field="accountName" title="Account Name" width="130px" />
        <GridColumn field="categoryName" title="Category Name" width="130px" />
        <GridColumn field="dateCreated" title="Date Created" width="250px" format="{0:dd/mm/yyyy}" />
      </Grid>
    </>
  )
}

export default TransactionsGrid;