namespace FinEdgeBackend.DTOs.Categories
{
    public class CategoryChartDataDTO
    {
        public string Name { get; set; } = string.Empty;
        public decimal Balance { get; set; }
        public decimal Budget { get; set; }
        public bool IsIncome { get; set; }
        public string Color { get; set; } = string.Empty;
        public string Currency { get; set; } = string.Empty;
        public DateTime DateCreated { get; set; }
    }
}
