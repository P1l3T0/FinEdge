﻿using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using FinEdgeData.Enums;

namespace FinEdgeData.Models
{
    public class Account : BaseModel
    {
        [Required]
        public string? Name { get; set; }

        [Required]
        public string? Currency { get; set; }

        [Column(TypeName = "decimal(18,2)")]
        public decimal? Balance { get; set; } = 0;

        [Required]
        public string? Color { get; set; }

        [Required]
        public AccountType AccountType { get; set; }

        [Required]
        public int UserID { get; set; }

        [JsonIgnore]
        public User? User { get; set; }

        [JsonIgnore]
        public ICollection<Transaction>? Transactions { get; set; }
    }
}