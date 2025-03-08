import CreateFinancialRecommendations from "../Components/RecommendationsPage/CreateFinancialRecommendations";
import DeleteFinancialRecommendations from "../Components/RecommendationsPage/DeleteFinancialRecommendations";

const FinancialRecommendations = () => {
  return (
    <>
      <div className="flex flex-col min-h-screen bg-gray-50">
          <main className="flex-1 p-6">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-2xl font-semibold text-gray-800 mb-6">Financial Recommendations</h1>
              <div className="bg-white rounded-lg shadow-sm mb-6 overflow-hidden">
                <div className="p-6">
                  <CreateFinancialRecommendations />
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="border-b border-gray-200 bg-gray-50 px-6 py-4">
                  <h2 className="text-lg font-medium text-gray-800">Manage Recommendations</h2>
                </div>
                <div className="p-6">
                  <DeleteFinancialRecommendations />
                </div>
              </div>
            </div>
          </main>
        </div>
    </>
  );
}

export default FinancialRecommendations;