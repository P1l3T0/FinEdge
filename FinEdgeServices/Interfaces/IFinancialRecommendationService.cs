using FinEdgeData.Models;

namespace FinEdgeServices.Interfaces
{
    public interface IFinancialRecommendationService
    {
        FinancialRecommendation GetLatestFinancialRecommendation(ICollection<FinancialRecommendation> financialRecommendations);
        Task CreateRecommendationAsync(FinancialRecommendation financialRecommendation);
        Task DeleteRecommendationsAsync(ICollection<FinancialRecommendation> financialRecommendations);
    }
}
