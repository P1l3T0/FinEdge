using System.ComponentModel.DataAnnotations;

namespace FinEdgeBackend.Models
{
    public class BaseModel
    {
        [Key]
        public int ID { get; set; }

        [Required]
        public DateTime DateCreated { get; set; } = DateTime.Now;
    }
}
