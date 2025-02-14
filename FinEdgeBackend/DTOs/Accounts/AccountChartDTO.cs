namespace FinEdgeBackend.DTOs.Accounts
{
    public class AccountChartDTO
    {
        public decimal Value { get; set; }
        public string Category { get; set; } = string.Empty;
        public string Color { get; set; } = string.Empty;
    }
}
