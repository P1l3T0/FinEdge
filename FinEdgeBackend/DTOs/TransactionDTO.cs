namespace FinEdgeBackend.DTOs
{
    public class TransactionDTO
    {
        public string? Name { get; set; }
        public string? AccountName { get; set; }
        public string? CategoryName { get; set; }
        public decimal? Amount { get; set; }
        public bool IsRepeating { get; set; }
    }
}
