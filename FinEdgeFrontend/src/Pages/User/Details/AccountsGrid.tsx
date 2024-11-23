import { Button, ExcelExport, Grid, GridCellProps, GridColumn, GridToolbar } from "@progress/kendo-react-all";
import { Account, AccountType } from "../../../Utils/Types";
import { CSVLink } from 'react-csv';
import { getEnumValueFromNumber } from "../../../Utils/Functions";
import { useRef } from "react";

const AccountsGrid = ({ accounts }: { accounts: Account[] }) => {
  const _export = useRef<ExcelExport | null>(null);

  const hanleExcelExport = () => {
    if (_export.current !== null) {
      _export.current.save();
    }
  };

  const accountTypeCell = (props: GridCellProps) => {
    const accountTypeValue: number = props.dataItem[props.field || ''];
    const accountTypeLabel: string = getEnumValueFromNumber(accountTypeValue, AccountType);

    return <td>{accountTypeLabel}</td>;
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
      <h2>Accounts</h2>
      <ExcelExport fileName="Accounts" data={accounts} ref={_export}>
        <Grid data={accounts} style={{ width: "750px", height: "auto" }}>
          <GridToolbar>
            <Button themeColor={'primary'} type="button" onClick={hanleExcelExport} disabled={accounts.length === 0}>Export to Excel</Button>
            <Button themeColor={'primary'} type="button" disabled={accounts.length === 0}>
              <CSVLink filename="Accounts" data={accounts}>Export to CSV</CSVLink>
            </Button>
          </GridToolbar>
          <GridColumn field="id" title="ID" width="50px" />
          <GridColumn field="name" title="Name" width="100px" />
          <GridColumn field="balance" title="Balance" width="100px" />
          <GridColumn field="currency" title="Currency" width="100px" />
          <GridColumn field="accountType" title="Account Type" width="125px" cell={accountTypeCell} />
          <GridColumn field="dateCreated" title="Date Created" width="250px" cell={dateCell} />
        </Grid>
      </ExcelExport>
    </>
  )
}

export default AccountsGrid;