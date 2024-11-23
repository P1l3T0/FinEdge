using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace FinEdgeBackend.Models
{
    public class FinancialRecommendation : BaseModel
    {
        [Required]
        public string? Recommendation { get; set; }

        [Required]
        public int UserID { get; set; }

        [JsonIgnore]
        public User? User { get; set; }
    }
}
