import { Card, CardHeader, CardTitle, CardBody } from "@progress/kendo-react-all";

type InfoCardProps = {
  title: string;
  children: React.ReactNode;
  className?: string;
}

const InfoCard: React.FC<InfoCardProps> = ({title, children, className = "" }) => (
  <div className={`bg-white rounded-lg shadow ${className}`}>
    <Card className="border-none shadow-none">
      <CardHeader className="border-b border-gray-200">
        <CardTitle className="text-lg font-semibold text-gray-900 p-4">
          {title}
        </CardTitle>
      </CardHeader>
      <CardBody className="p-4">{children}</CardBody>
    </Card>
  </div>
);

export default InfoCard;