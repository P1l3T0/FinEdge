using Microsoft.EntityFrameworkCore;
using FinEdgeBackend.Models;

namespace FinEdgeBackend.Data
{
    public class DataContext(DbContextOptions<DataContext> options) : DbContext(options)
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Account> Accounts { get; set; }
        public DbSet<RefreshToken> RefreshTokens { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<RefreshToken>() .HasOne(rt => rt.User);
            modelBuilder.Entity<User>().HasMany(u => u.Accounts);
            modelBuilder.Entity<User>().Property(u => u.MethodologyType).HasConversion<string>();
            modelBuilder.Entity<Account>().Property(a => a.AccountType).HasConversion<string>();

            base.OnModelCreating(modelBuilder);
        }
    }
}
