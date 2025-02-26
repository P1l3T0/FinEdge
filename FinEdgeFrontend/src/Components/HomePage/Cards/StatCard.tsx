import DashboardCard from "./DashboardCard";

type StatCardProps = {
  title: string;
  value: React.ReactNode;
  subtitle?: string;
  valueColor?: string;
}

const StatCard = ({ title, value, subtitle, valueColor }: StatCardProps) => {
  return (
    <>
      <DashboardCard className="hover:shadow-lg transition-shadow">
        <div className="space-y-2">
          <p className="text-sm text-gray-500">{title}</p>
          <span className={`text-2xl font-bold ${valueColor}`}>
            {typeof value === "number" ? `$${value}` : value}
          </span>
          {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
        </div>
      </DashboardCard>
    </>
  );
};

export default StatCard;