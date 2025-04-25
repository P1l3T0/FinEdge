namespace FinEdgeBackend.DTOs.Categories
{
    public class CategoryDTO
    {
        public string? Name { get; set; }
        public string? Currency { get; set; }
        public string? Subcategories { get; set; }
        public decimal? Budget { get; set; } = 0;
        public bool IsIncome { get; set; }
        public string? Color { get; set; }
    }
}
