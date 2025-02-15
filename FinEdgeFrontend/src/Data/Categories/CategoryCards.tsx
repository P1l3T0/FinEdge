import { Card, CardHeader, CardBody, CardFooter } from '@progress/kendo-react-all';
import { Category } from '../../Utils/Types'
import DeleteCategory from './DeleteCategory';
import UpdateCategory from './UpdateCategory';

type CategoryCardsProps = {
  categories: Category[];
  totalBalance: number;
  totalBudget: number;
  isIncome: boolean;
};

const CategoryCards = ({ categories, totalBalance, totalBudget, isIncome }: CategoryCardsProps) => {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg p-4 shadow">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">
          {isIncome ? "Income" : "Expenditure"} Categories
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
            <span className="text-gray-600">Total Balance</span>
            <span className="text-lg font-bold text-blue-600">
              {totalBalance} BGN
            </span>
          </div>
          <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
            <span className="text-gray-600">Total Budget</span>
            <span className="text-lg font-bold text-green-600">
              {totalBudget} BGN
            </span>
          </div>
        </div>
      </div>

      <div className="grid gap-4 overflow-x-auto">
        {categories?.map((category, index) => (
          <Card
            key={index}
            className="bg-white hover:shadow-lg transition-shadow"
          >
            <CardHeader
              className="border-b border-gray-200 p-4"
              style={{ backgroundColor: `${category.color}15` }}
            >
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {category.name}
                  </h3>
                  <span
                    className={`text-sm px-2 py-1 rounded-full ${
                      isIncome
                        ? "bg-green-50 text-green-600"
                        : "bg-red-50 text-red-600"
                    }`}
                  >
                    {isIncome ? "Income" : "Expense"} Category
                  </span>
                </div>
                <div
                  className="h-10 w-10 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: `${category.color}30` }}
                >
                  <span
                    className="text-lg font-semibold"
                    style={{ color: category.color }}
                  >
                    {category.name.charAt(0).toUpperCase()}
                  </span>
                </div>
              </div>
            </CardHeader>

            <CardBody className="p-4">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Balance</span>
                  <span className="text-xl font-bold">
                    {category.balance} {category.currency}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Budget</span>
                  <span className="text-xl font-bold text-green-600">
                    {category.budget} {category.currency}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Created</span>
                  <span className="text-sm text-gray-500">
                    {new Date(category.dateCreated).toLocaleDateString(
                      "en-GB",
                      {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      }
                    )}
                  </span>
                </div>
              </div>
            </CardBody>

            <CardFooter className="border-t border-gray-200 p-4">
              <div className="flex justify-end gap-2">
                <UpdateCategory category={category} />
                <DeleteCategory category={category} />
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CategoryCards;