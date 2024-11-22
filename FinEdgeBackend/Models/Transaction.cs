using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace FinEdgeBackend.Models
{
    public class Transaction
    {
        [Key]
        public int ID { get; set; }

        [Required]
        public int UserID { get; set; }

        [Required]
        public int AccountID { get; set; }

        [Required]
        public string? AccountName { get; set; }

        [Required]
        public int CategoryID { get; set; }

        [Required]
        public string? CategoryName { get; set; }

        [Required]
        public string? Name { get; set; } 

        [Required]
        [Column(TypeName = "decimal(18,2)")]
        public decimal? Amount { get; set; }

        [Required]
        public DateTime DateCreated { get; set; } = DateTime.Now;

        [Required]
        public bool IsRepeating { get; set; }

        public DateTime? NextRepeatDate { get; set; }

        [JsonIgnore]
        public Account? Account { get; set; }

        [JsonIgnore]
        public Category? Category { get; set; }

        [JsonIgnore]
        public User? User { get; set; }
    }
}
