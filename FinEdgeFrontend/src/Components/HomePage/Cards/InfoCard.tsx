import { Card, CardHeader, CardBody } from "@progress/kendo-react-layout";

type InfoCardProps = {
  title: string;
  children: React.ReactNode;
  className?: string;
}

const InfoCard = ({title, children, className}: InfoCardProps) => {
  return (
    <>
      <div className={`bg-white rounded-lg shadow ${className}`}>
        <Card className="border-none shadow-none">
          <CardHeader className="border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
          </CardHeader>
          <CardBody className="p-4">{children}</CardBody>
        </Card>
      </div>
    </>
  );
};

export default InfoCard;