import CreateFinancialRecommendations from "../Components/RecommendationsPage/CreateFinancialRecommendations";

const FinancialRecommendations = () => {
  return (
    <>
      <div className="bg-gray-50 flex items-center h-[93vh]">
        <main className="p-6 w-full">
          <div className="max-w-4xl mx-auto w-full">
            <div className="bg-white rounded-lg shadow-sm">
              <div className="p-6">
                <CreateFinancialRecommendations />
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default FinancialRecommendations;