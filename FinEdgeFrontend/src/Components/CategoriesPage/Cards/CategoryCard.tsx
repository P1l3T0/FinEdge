import CategoryCardBody from "./CategoryCardBody";
import CategoryCardFooter from "./CategoryCardFooter";
import CategoryCardHeader from "./CategoryCardHeader";
import { Category } from "../../../Utils/Types";
import { Card, CardHeader, CardBody, CardFooter } from "@progress/kendo-react-layout";
import { ListViewItemProps } from "@progress/kendo-react-listview";

const CategoryCard = (props: ListViewItemProps) => {
  const category: Category = props.dataItem;

  return (
    <>
    <div className="mx-1.75 mb-2">
      <Card key={category.id} className="shadow-md hover:shadow-xl duration-300 ease-in-out w-70 h-90">
        <CardHeader>
          <CategoryCardHeader category={category} />
        </CardHeader>
        <CardBody>
          <CategoryCardBody category={category} />
        </CardBody>
        <CardFooter>
          <CategoryCardFooter category={category} />
        </CardFooter>
      </Card>
    </div>
    </>
  );
};

export default CategoryCard;