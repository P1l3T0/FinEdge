using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace FinEdgeBackend.Models
{
    public class CategorySnapshot
    {
        public int ID { get; set; }

        [Required]
        public int CategoryID { get; set; }

        [Required]
        public string? MonthName { get; set; }

        [Required]
        [Column(TypeName = "decimal(18,2)")]
        public decimal TotalIncome { get; set; } = 0;

        [Required]
        [Column(TypeName = "decimal(18,2)")]
        public decimal TotalExpenses { get; set; } = 0;

        [Required]
        public DateTime DateCreated { get; set; }

        [JsonIgnore]
        public Category? Category { get; set; }
    }
}
