using FinEdgeBackend.Enums;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace FinEdgeBackend.Models
{
    public class Account
    {
        public int ID { get; set; }

        [Required]
        public int UserID { get; set; }

        [Required]
        public string? Name { get; set; }

        [Required]
        public string? Currency { get; set; }

        [Column(TypeName = "decimal(18,2)")]
        public decimal? Balance { get; set; } = 0;

        [Required]
        public DateTime DateCreated { get; set; } = DateTime.Now;

        [Required]
        public AccountType AccountType { get; set; }

        [JsonIgnore]
        public User? User { get; set; }

        [JsonIgnore]
        public ICollection<Transaction>? Transactions { get; set; }
    }
}