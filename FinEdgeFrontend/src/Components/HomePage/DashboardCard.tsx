import { Card, CardBody } from "@progress/kendo-react-all";

const DashboardCard: React.FC<{children: React.ReactNode; className?: string;}> = ({ children, className = "" }) => (
  <div className={`bg-white rounded-lg shadow ${className}`}>
    <Card className="border-none shadow-none h-full">
      <CardBody>{children}</CardBody>
    </Card>
  </div>
);

export default DashboardCard;
