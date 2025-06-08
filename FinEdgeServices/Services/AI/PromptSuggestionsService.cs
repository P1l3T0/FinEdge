using FinEdgeData.Models;
using FinEdgeServices.Interfaces;

namespace FinEdgeServices.Services
{
    public class PromptSuggestionsService : IPromptSuggestionsService
    {
        private ICollection<string> GetRandomPrompts(List<string> prompts, int count = 3)
        {
            Random random = new Random();
            return prompts.OrderBy(x => random.Next()).Take(count).ToList();
        }

        public ICollection<string> GetAccountSuggestions()
        {
            return GetRandomPrompts(PromptSuggestions.AccountPrompts);
        }

        public ICollection<string> GetCategorySuggestions()
        {
            return GetRandomPrompts(PromptSuggestions.CategoryPrompts);
        }

        public ICollection<string> GetTransactionSuggestions()
        {
            return GetRandomPrompts(PromptSuggestions.TransactionPrompts);
        }

        public ICollection<string> GetPromptSuggestions()
        {
            return GetRandomPrompts(PromptSuggestions.GeneralPrompts);
        }
    }
}
