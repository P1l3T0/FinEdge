using Microsoft.EntityFrameworkCore;
using FinEdgeBackend.Models;

namespace FinEdgeBackend.Data
{
    public class DataContext(DbContextOptions<DataContext> options) : DbContext(options)
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Accounts> Accounts { get; set; }
        public DbSet<RefreshToken> RefreshTokens { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<RefreshToken>() .HasOne(rt => rt.User);
            modelBuilder.Entity<User>().HasMany(u => u.Accounts);

            base.OnModelCreating(modelBuilder);
        }
    }
}
