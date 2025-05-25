type StatRowProps = {
  label: string;
  value: React.ReactNode;
}

const AccountQucikStatsAccountTypeRow = ({ label, value }: StatRowProps) => {
  return (
    <>
      <div className="flex justify-between items-center">
        <span className="text-gray-600">{label}</span>
        <span className="font-semibold">{value}</span>
      </div>
    </>
  );
};

export default AccountQucikStatsAccountTypeRow;