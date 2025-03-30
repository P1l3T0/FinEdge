import { Card, CardBody } from "@progress/kendo-react-layout";

type DashboardCardProps = { 
  children: React.ReactNode; 
  className?: string;
}

const DashboardCard = ({ children, className }: DashboardCardProps) => {
  return (
    <>
      <div className={`bg-white rounded-lg shadow ${className}`}>
        <Card className="border-none shadow-none h-full">
          <CardBody>{children}</CardBody>
        </Card>
      </div>
    </>
  )
};

export default DashboardCard;
