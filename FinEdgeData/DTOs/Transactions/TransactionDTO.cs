namespace FinEdgeData.DTOs
{
    public class TransactionDTO
    {
        public string? Name { get; set; }
        public string? AccountName { get; set; }
        public string? CategoryName { get; set; }
        public string? SubcategoryName { get; set; }
        public decimal? Amount { get; set; }
        public bool IsRepeating { get; set; }
        public string? DateUpdated { get; set; }
    }
}
