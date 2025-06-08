namespace FinEdgeData.DTOs
{
    public class AccountSummaryDTO
    {
        public int Count { get; set; }
        public decimal Balance { get; set; }
        public List<string> Titles { get; set; } = new List<string>();
        public string Type { get; set; } = string.Empty;
        public string Currency { get; set; } = string.Empty;
    }
}

