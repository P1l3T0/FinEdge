using System.Text.Json.Serialization;

namespace FinEdgeBackend.Models
{
    public class Category
    {
        public int ID { get; set; }
        public int UserID { get; set; }
        public string? Name { get; set; }
        public string? Currency { get; set; }
        public decimal? Balance { get; set; } = 0;
        public decimal? Budget { get; set; } = 0;
        public bool IsIncome { get; set; }
        public DateTime? DateCreated { get; set; }

        [JsonIgnore]
        public User? User { get; set; }
    }
}
