type StatRowProps = {
  label: string;
  value: React.ReactNode;
  valueClassName?: string;
};

const AccountQuickStatsOverallRow = ({ label, value, valueClassName = "" }: StatRowProps) => {
  return (
    <div className="flex justify-between items-center">
      <span className="text-gray-600">{label}</span>
      <span className={`text-xl font-bold ${valueClassName}`}>{value}</span>
    </div>
  );
};

export default AccountQuickStatsOverallRow;