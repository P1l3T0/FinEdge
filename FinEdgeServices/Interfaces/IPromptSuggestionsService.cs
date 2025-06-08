namespace FinEdgeServices.Interfaces
{
    public interface IPromptSuggestionsService
    {
        ICollection<string> GetPromptSuggestions();
        ICollection<string> GetAccountSuggestions();
        ICollection<string> GetCategorySuggestions();
        ICollection<string> GetTransactionSuggestions();
    }
}
