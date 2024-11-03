namespace FinEdgeBackend.Models
{
    public class Subcategory
    {
        public int ID { get; set; }
        public string? Name { get; set; }
        public int? CategoryID { get; set; }
        public Category? Category { get; set; }
    }
}
