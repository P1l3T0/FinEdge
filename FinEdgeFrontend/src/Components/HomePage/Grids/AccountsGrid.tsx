import { CSVLink } from 'react-csv';
import { useRef } from "react";
import { Account, AccountType } from "../../../Utils/Types";
import { getEnumValueFromNumber } from "../../../Utils/Functions";
import { Button } from '@progress/kendo-react-buttons';
import { Grid, GridCellProps, GridColumn, GridToolbar } from '@progress/kendo-react-grid';
import { ExcelExport } from "@progress/kendo-react-excel-export";

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

    return <td>{accountTypeLabel} ({accountTypeValue})</td>;
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
        <Grid data={accounts} navigatable={true} sortable={true} filterable={true} groupable={true} autoProcessData={true} pageable={true} dataItemKey="id">
          <GridToolbar>
            <Button themeColor={'primary'} type="button" onClick={hanleExcelExport} disabled={accounts.length === 0}>Export to Excel</Button>
            <Button themeColor={'primary'} type="button" disabled={accounts.length === 0}>
              <CSVLink filename="Accounts" data={accounts}>Export to CSV</CSVLink>
            </Button>
          </GridToolbar>
          <GridColumn field="id" title="ID" filter='numeric' />
          <GridColumn field="name" title="Name" />
          <GridColumn field="balance" title="Balance" filter='numeric' />
          <GridColumn field="currency" title="Currency" />
          <GridColumn field="accountType" title="Account Type" filter='numeric' cells={{ data: accountTypeCell }} />
          <GridColumn field="dateCreated" title="Date Created" filter='date' cells={{ data: dateCell }} />
        </Grid>
      </ExcelExport>
    </>
  )
}

export default AccountsGrid;