namespace FinEdgeBackend.DTOs.Accounts
{
    public class AccountStatsDTO
    {
        public decimal TotalBalance { get; set; }
        public int TotalAccounts { get; set; }
        public decimal AverageBalance { get; set; }
        public string PrimaryCurrency { get; set; } = string.Empty;
        public ICollection<AccountTypeStatsDTO> AccountTypeStats { get; set; } = new List<AccountTypeStatsDTO>();
        public AccountHighestBalanceDTO HighestBalanceAccount { get; set; } = null!;
    }

    public class AccountTypeStatsDTO
    {
        public string Type { get; set; } = string.Empty;
        public decimal TotalBalance { get; set; }
        public decimal AverageBalance { get; set; }
        public int AccountCount { get; set; }
    }

    public class AccountHighestBalanceDTO
    {
        public string Name { get; set; } = string.Empty;
        public string Type { get; set; } = string.Empty;
        public decimal Balance { get; set; }
        public string Currency { get; set; } = string.Empty;
    }
}
