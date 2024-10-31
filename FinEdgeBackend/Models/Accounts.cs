using FinEdgeBackend.Enums;

namespace FinEdgeBackend.Models
{
    public class Accounts
    {
        public int ID { get; set; }
        public int UserId { get; set; }
        public string? Name { get; set; }
        public DateTime? DateCreated { get; set; }
        public AccountType AccountType { get; set; }
    }
}
