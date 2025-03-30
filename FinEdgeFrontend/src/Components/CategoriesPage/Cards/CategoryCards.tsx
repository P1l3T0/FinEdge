import CategoryCardBody from './CategoryCardBody';
import CategoryCardFooter from './CategoryCardFooter';
import CategoryCardHeader from './CategoryCardHeader';
import { Category } from '../../../Utils/Types';
import { Card, CardHeader, CardBody, CardFooter } from '@progress/kendo-react-layout';

const CategoryCards = ({ categories }: {categories: Category[]}) => {
  return (
    <>
      {categories.map((category, index) => (
        <Card key={index} className="shadow-md hover:shadow-xl duration-300 ease-in-out">
          <CardHeader style={{ backgroundColor: `${category.color}15` }}>
            <CategoryCardHeader category={category} />
          </CardHeader>
          <CardBody>
            <CategoryCardBody category={category} />
          </CardBody>
          <CardFooter>
            <CategoryCardFooter category={category} />
          </CardFooter>
        </Card>
      ))}
    </>
  );
}

export default CategoryCards;