namespace FinEdgeBackend.DTOs.Accounts
{
    public class AccountSummaryDTO
    {
        public int Count { get; set; }
        public decimal Balance { get; set; }
        public string Type { get; set; } = string.Empty;
        public string Currency { get; set; } = string.Empty;
    }
}

