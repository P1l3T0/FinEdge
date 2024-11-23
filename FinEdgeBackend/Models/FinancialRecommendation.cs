using System.Text.Json.Serialization;

namespace FinEdgeBackend.Models
{
    public class FinancialRecommendation
    {
        public int ID { get; set; }
        public string? Recommendation { get; set; }
        public DateTime DateCreated { get; set; } = DateTime.Now;
        public int UserID { get; set; }

        [JsonIgnore]
        public User? User { get; set; }
    }
}
