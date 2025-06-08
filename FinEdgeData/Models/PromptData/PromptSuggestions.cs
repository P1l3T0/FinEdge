namespace FinEdgeData.Models
{
    public static class PromptSuggestions
    {
        public static readonly List<string> GeneralPrompts = new List<string>()
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

        public static readonly List<string> AccountPrompts = new List<string>()
        {
            "Evaluate the balance trends of my accounts over the past three months.",
            "Which account is used most frequently for spending?",
            "Suggest ways to rebalance funds between my accounts.",
            "Analyze my account usage and recommend consolidations if needed.",
            "Highlight the account with the most inflow this month.",
            "Detect accounts with little to no activity recently.",
            "Provide suggestions for managing multiple accounts more effectively.",
            "Compare the performance of my savings vs. spending accounts.",
            "Evaluate how my account balances affect my overall financial health.",
            "Estimate how long my current balances can sustain my monthly spending."
        };

        public static readonly List<string> CategoryPrompts = new List<string>()
        {
            "Which spending categories take up most of my budget?",
            "Recommend categories where I can reduce expenses.",
            "Identify categories with unusual spikes this month.",
            "Suggest new categories to better organize my spending.",
            "Compare spending by category between this and last month.",
            "Analyze category trends and predict next month's biggest spenders.",
            "Find overlapping or redundant categories in my expenses.",
            "Recommend custom budgeting rules per category.",
            "Highlight underutilized budget categories.",
            "Help me balance spending across different categories."
        };

        public static readonly List<string> TransactionPrompts = new List<string>()
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
            "Highlight unnecessary purchases from my transaction history.",
            "Provide a forecast of my financial health for the next quarter.",
            "Detect large or unusual transactions from the past 30 days.",
            "Highlight recurring transactions that I may want to cancel.",
            "Suggest improvements to reduce frequent small purchases.",
            "Find duplicate or suspicious transactions in my history.",
            "Summarize my daily transaction activity for the past week."
        };
    }
}
