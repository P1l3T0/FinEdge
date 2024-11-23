using FinEdgeBackend.Enums;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
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

        [Required]
        public DateTime DateCreated { get; set; } = DateTime.Now;

        [Column(TypeName = "decimal(18,2)")]
        public decimal? TotalBalance { get; set; } = 0;

        [Required]
        public MethodologyType MethodologyType { get; set; }

        public ICollection<Account> Accounts { get; set; } = new List<Account>();
        public ICollection<Category> Categories { get; set; } = new List<Category>();
        public ICollection<Transaction> Transactions { get; set; } = new List<Transaction>();
        public ICollection<FinancialRecommendation> FinancialRecommendations { get; set; } = new List<FinancialRecommendation>();
    }
}
