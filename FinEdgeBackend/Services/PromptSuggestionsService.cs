using FinEdgeBackend.Interfaces;

namespace FinEdgeBackend.Services
{
    public class PromptSuggestionsService : IPromptSuggestionsService
    {
        private readonly List<string> _prompts = new List<string>()
        {
            "Analyze my spending habits for the past week.",
            "Identify ways to save money based on my transactions.",
            "Review my subscriptions and recommend changes.",
            "Highlight overspending in any categories.",
            "Summarize my weekly income and expenses.",
            "Suggest budgets for next month based on trends.",
            "Predict categories likely to exceed budget next month.",
            "Find unusual transactions this month.",
            "Provide tips to manage cash flow better.",
            "Suggest ways to increase savings.",
            "Compare my spending this month to last month.",
            "Identify recurring expenses I might have overlooked.",
            "Detect potential fraudulent transactions.",
            "Provide a breakdown of my expenses by category.",
            "Recommend cost-cutting strategies for my largest expenses.",
            "Analyze my spending patterns over the last three months.",
            "Suggest an ideal emergency fund based on my expenses.",
            "Calculate how much I can set aside for investments.",
            "Highlight unnecessary purchases from my transaction history.",
            "Provide a forecast of my financial health for the next quarter."
        };

        public ICollection<string> GetPromptSuggestions()
        {
            Random random = new Random();
            return _prompts.OrderBy(x => random.Next()).Take(3).ToList();
        }
    }
}
