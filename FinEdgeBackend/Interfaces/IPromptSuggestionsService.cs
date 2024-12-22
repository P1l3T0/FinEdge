namespace FinEdgeBackend.Interfaces
{
    public interface IPromptSuggestionsService
    {
        ICollection<string> GetPromptSuggestions();
    }
}
