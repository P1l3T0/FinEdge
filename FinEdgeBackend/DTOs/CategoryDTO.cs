namespace FinEdgeBackend.DTOs
{
    public class CategoryDTO
    {
        public string? Name { get; set; }
        public string? Currency { get; set; }
        public decimal? Budget { get; set; } = 0;
        public bool IsIncome { get; set; }
    }
}
