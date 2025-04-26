using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace FinEdgeBackend.Models
{
    public class Subcategory : BaseModel
    {
        [Required]
        public string? Name { get; set; }

        [Required]
        public int CategoryID { get; set; }

        [JsonIgnore]
        public Category? Category { get; set; }

        [JsonIgnore]
        public ICollection<Transaction>? Transactions { get; set; }
    }
}
