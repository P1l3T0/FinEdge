namespace FinEdgeBackend.DTOs
{
    public class AccountDTO
    {
        public string? Name { get; set; }
        public string? Currency { get; set; }
        public string? AccountType { get; set; }
        public decimal? Balance { get; set; }
    }
}