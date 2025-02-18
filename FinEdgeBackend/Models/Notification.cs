using FinEdgeBackend.Enums;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace FinEdgeBackend.Models
{
    public class Notification : BaseModel
    {
        public int? UserID { get; set; }

        [Required]
        public string? Title { get; set; } = string.Empty;

        [Required]
        public string? Description { get; set; } = string.Empty;

        [Required]
        public bool IsRead { get; set; } = false;

        [Required]
        public NotificationType NotificationType { get; set; }

        [JsonIgnore]
        public User? User { get; set; }
    }
}
