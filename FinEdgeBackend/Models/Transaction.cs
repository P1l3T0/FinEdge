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
        public int AccountID { get; set; }

        [Required]
        public int CategoryID { get; set; }

        [Required]
        public string Name { get; set; } = null!;

        [Required]
        [Column(TypeName = "decimal(18,2)")]
        public decimal Amount { get; set; }

        [Required]
        public DateTime CreatedDate { get; set; } = DateTime.Now;

        [JsonIgnore]
        public Account? Account { get; set; }

        [JsonIgnore]
        public Category? Category { get; set; }
    }
}
