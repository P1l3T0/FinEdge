namespace FinEdgeBackend.Models
{
    public class Category
    {
        public int ID { get; set; }
        public int UserID { get; set; }
        public string? Name { get; set; }
        public string? Currency { get; set; }
        public decimal? Balance { get; set; }
        public decimal? Budget { get; set; }
        public bool IsIncome { get; set; }
        public DateTime? DateCreated { get; set; }
    }
}
