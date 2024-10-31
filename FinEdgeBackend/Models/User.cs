using FinEdgeBackend.Enums;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace FinEdgeBackend.Models
{
    public class User
    {
        [Key]
        public int ID { get; set; }
 
        [Required]
        public string? Name { get; set; }

        [Required]
        public string? Surname { get; set; }

        [Required]
        [EmailAddress]
        public string? Email { get; set; }

        [Required]
        [MinLength(10)]
        [MaxLength(100)]
        [JsonIgnore]
        public string? Password { get; set; }
        public DateTime? DateCreated { get; } = DateTime.UtcNow;
        public decimal? TotalBudget { get; set; }
        public string? Currency { get; set; }
        public Methodology Methodology { get; set; }
    }
}
