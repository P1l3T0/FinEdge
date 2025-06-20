﻿using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace FinEdgeData.Models
{
    public class RefreshToken
    {
        [Key]
        public int ID { get; set; }
        public int UserID { get; set; }
        public string? Token { get; set; }
        public bool IsRevoked { get; set; }
        public DateTime ExpiryDate { get; set; }

        [JsonIgnore]
        public User? User { get; set; }
    }
}
