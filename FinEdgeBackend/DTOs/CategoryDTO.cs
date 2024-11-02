namespace FinEdgeBackend.DTOs
{
    public class CategoryDTO
    {
        public string? Name { get; set; }
        public string? Currency { get; set; }
        public decimal? Balance { get; set; }
        public decimal? Budget { get; set; }
        public bool IsIncome { get; set; }
    }
}
