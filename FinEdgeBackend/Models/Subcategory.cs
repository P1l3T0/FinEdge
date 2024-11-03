using System.Text.Json.Serialization;

namespace FinEdgeBackend.Models
{
    public class Subcategory
    {
        public int ID { get; set; }
        public string? Name { get; set; }
        public int? CategoryID { get; set; }

        [JsonIgnore]
        public Category? Category { get; set; }
    }
}
