using FinEdgeBackend.Models;

namespace FinEdgeBackend.Interfaces
{
    public interface IGPTService
    {
        public Task<FinancialRecommendation> Ask(string prompt, User currentUser);
    }
}
