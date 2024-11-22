import { Card, CardHeader, CardBody, CardFooter } from '@progress/kendo-react-all';
import { Category } from '../../Utils/Types'
import DeleteCategory from './DeleteCategory';
import UpdateCategory from './UpdateCategory';

const CategoryCards = ({ categories, totalBalance, totalBudget, isIncome }: { categories: Category[], totalBalance: number, totalBudget: number, isIncome: boolean }) => {
  return (
    <>
      <div className="category-cards">
        {isIncome ? <h3>Income</h3> : <h3>Expenditure</h3>}
        Total balance: {totalBalance} <br />
        Total budget: {totalBudget} <br />

        {categories?.map((category, index) => (
          <Card key={index}>
            <CardHeader style={{ backgroundColor: category.color }}>Category name: {category.name}</CardHeader>
            <CardBody style={{ backgroundColor: category.color }}>
              <fieldset>
                <legend> Details</legend>
                Balance: {category.balance} {category.currency} <br />
                Budget: {category.budget} {category.currency} <br />
                Income: {category.isIncome.toString()} <br />
                Created at: {
                  new Date(category.dateCreated).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })
                }
              </fieldset>
            </CardBody>
            <CardFooter style={{ backgroundColor: category.color }}>
              <UpdateCategory category={category} />
              <DeleteCategory category={category} />
            </CardFooter>
          </Card>
        ))}
      </div>
    </>
  )
}

export default CategoryCards;