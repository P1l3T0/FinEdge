import { Grid, GridCellProps, GridColumn } from "@progress/kendo-react-all";
import { Account, AccountType } from "../../../Utils/Types";
import { getEnumValueFromNumber } from "../../../Utils/Functions";

const AccountsGrid = ({ accounts }: { accounts: Account[] }) => {
  const AccountTypeCell = (props: GridCellProps) => {
    const accountTypeValue: number = props.dataItem[props.field || ''];
    const accountTypeLabel: string = getEnumValueFromNumber(accountTypeValue, AccountType);
    return <td>{accountTypeLabel}</td>;
  };

  return (
    <>
      <Grid data={accounts} style={{ width: "750px", height: "auto" }}>
        <GridColumn field="id" title="ID" width="50px" />
        <GridColumn field="name" title="Name" width="100px" />
        <GridColumn field="balance" title="Balance" width="100px" />
        <GridColumn field="currency" title="Currency" width="100px" />
        <GridColumn field="accountType" title="Account Type" width="125px" cell={AccountTypeCell} />
        <GridColumn field="dateCreated" title="Date Created" width="250px" format="{0:dd/mm/yyyy}" />
      </Grid>
    </>
  )
}

export default AccountsGrid;