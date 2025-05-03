namespace FinEdgeBackend.DTOs.Accounts
{
    public class AccountTransferDTO
    {
        public string? TargetAccountName { get; set; }
        public decimal Amount { get; set; } = 0;
    }
}
