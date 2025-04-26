using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using System.Diagnostics.CodeAnalysis;

namespace FinEdgeBackend.Models
{
    public class Transaction : BaseModel
    {
        [Required]
        public string? Name { get; set; } 

        [Required]
        [Column(TypeName = "decimal(18,2)")]
        public decimal? Amount { get; set; }

        [Required]
        public string? AccountName { get; set; }

        [Required]
        public string? CategoryName { get; set; }

        public string? SubcategoryName { get; set; }

        [Required]
        public bool IsRepeating { get; set; }

        [Required]
        public string? Color { get; set; }

        public DateTime? NextRepeatDate { get; set; }

        [Required]
        public int AccountID { get; set; }

        [JsonIgnore]
        public Account? Account { get; set; }

        [Required]
        public int CategoryID { get; set; }

        [JsonIgnore]
        public Category? Category { get; set; }

        [AllowNull]
        public int? SubcategoryID { get; set; }

        [JsonIgnore]
        [AllowNull]
        public Subcategory? Subcategory { get; set; }

        [Required]
        public int UserID { get; set; }

        [JsonIgnore]
        public User? User { get; set; }
    }
}
