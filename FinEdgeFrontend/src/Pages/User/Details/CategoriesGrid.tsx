import { Grid, GridColumn } from "@progress/kendo-react-all";
import { Category } from "../../../Utils/Types";

const CategoriesGrid = ({ categories }: { categories: Category[] }) => {
  return (
    <>
      <Grid data={categories} style={{ width: "750px", height: "auto" }}>
        <GridColumn field="id" title="ID" width="50px" />
        <GridColumn field="name" title="Name" width="100px" />
        <GridColumn field="balance" title="Balance" width="100px" />
        <GridColumn field="budget" title="Budget" width="100px" />
        <GridColumn field="isIncome" title="Is Income" width="100px" />
        <GridColumn field="currency" title="Currency" width="100px" />
        <GridColumn field="dateCreated" title="Date Created" width="250px" format="{0:dd/mm/yyyy}" />
      </Grid>
    </>
  )
}

export default CategoriesGrid;