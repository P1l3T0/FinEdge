using FinEdgeBackend.Enums;

namespace FinEdgeBackend.Models
{
    public class Account
    {
        public int ID { get; set; }
        public int UserID { get; set; }
        public string? Name { get; set; }
        public string? Currency { get; set; }
        public decimal? Balance { get; set; }
        public DateTime? DateCreated { get; set; }
        public AccountType? AccountType { get; set; }
    }
}