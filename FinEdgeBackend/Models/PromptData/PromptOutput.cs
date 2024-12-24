using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace FinEdgeBackend.Models.PromptData
{
    public class PromptOutput : BaseModel
    {
        [Required]
        public string? Title { get; set; }

        [Required]
        public string? ResponseContent { get; set; }

        [Required]
        public int UserID { get; set; }

        [JsonIgnore]
        public User? User { get; set; }
    }
}
