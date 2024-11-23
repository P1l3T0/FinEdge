using FinEdgeBackend.Models;

namespace FinEdgeBackend.Interfaces
{
    public interface IFinancialRecommendationService
    {
        Task CreateRecommendationAsync(FinancialRecommendation financialRecommendation);
        Task DeleteRecommendationsAsync(ICollection<FinancialRecommendation> financialRecommendations);
    }
}
