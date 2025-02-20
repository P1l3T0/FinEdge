const CategoryData = ({ name, value }: { name: string; value: number }) => {
  return (
    <>
      <div className="flex justify-between items-center rounded-lg p-2 my-3" style={{ backgroundColor: name.includes("Balance") ? "#eff6ff " : "#f0fdf4" }}>
        <span className="text-gray-600">{name}</span>
        <span className="text-lg font-bold text-blue-600" style={{ color: name.includes("Balance") ? "oklch(0.546 0.245 262.881)" : "oklch(0.627 0.194 149.214)" }} >{value.toFixed(2)} BGN</span>
      </div>
    </>
  );
};

export default CategoryData;