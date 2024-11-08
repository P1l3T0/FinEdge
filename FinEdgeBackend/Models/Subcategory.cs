using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace FinEdgeBackend.Models
{
    public class Subcategory
    {
        public int ID { get; set; }

        [Required]
        public int CategoryID { get; set; }

        [Required]
        public string? Name { get; set; }
        [JsonIgnore]
        public Category? Category { get; set; }
    }
}
