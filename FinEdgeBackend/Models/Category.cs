using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace FinEdgeBackend.Models
{
    public class Category
    {
        public int ID { get; set; }

        [Required]
        public int UserID { get; set; }

        [Required]
        public int TransactionID { get; set; }

        [Required]
        public string? Name { get; set; } 

        [Required]
        public string? Currency { get; set; }

        [Column(TypeName = "decimal(18,2)")]
        public decimal? Balance { get; set; } 

        [Column(TypeName = "decimal(18,2)")]
        public decimal? Budget { get; set; } 

        public bool IsIncome { get; set; }

        [Required]
        public DateTime DateCreated { get; set; } = DateTime.Now;

        public ICollection<Subcategory> Subcategories { get; set; } = new List<Subcategory>();

        [JsonIgnore]
        public User? User { get; set; }

        [JsonIgnore]
        public ICollection<Transaction>? Transactions { get; set; }
    }
}
