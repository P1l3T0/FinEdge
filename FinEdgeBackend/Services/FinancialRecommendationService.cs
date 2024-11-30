using FinEdgeBackend.Data;
using FinEdgeBackend.Interfaces;
using FinEdgeBackend.Models;

namespace FinEdgeBackend.Services
{
    public class FinancialRecommendationService(DataContext dataContext) : IFinancialRecommendationService
    {
        private readonly DataContext _dataContext = dataContext;

        public async Task CreateRecommendationAsync(FinancialRecommendation financialRecommendation)
        {
            _dataContext.FinancialRecommendations.Add(financialRecommendation);
            await _dataContext.SaveChangesAsync();
        }

        public async Task DeleteRecommendationsAsync(ICollection<FinancialRecommendation> financialRecommendations)
        {
            _dataContext.FinancialRecommendations.RemoveRange(financialRecommendations);
            await _dataContext.SaveChangesAsync();
        }
    }
}
