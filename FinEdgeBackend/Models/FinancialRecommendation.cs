using System.Text.Json.Serialization;

namespace FinEdgeBackend.Models
{
    public class FinancialRecommendation : BaseModel
    {
        public string? Recommendation { get; set; }
        public int UserID { get; set; }

        [JsonIgnore]
        public User? User { get; set; }
    }
}
