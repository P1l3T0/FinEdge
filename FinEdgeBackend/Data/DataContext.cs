using Microsoft.EntityFrameworkCore;
using FinEdgeBackend.Models;

namespace FinEdgeBackend.Data
{
    public class DataContext(DbContextOptions<DataContext> options) : DbContext(options)
    {
        public DbSet<User> Users { get; set; }
        public DbSet<RefreshToken> RefreshTokens { get; set; }
        public DbSet<Account> Accounts { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Subcategory> Subcategories { get; set; }
        public DbSet<Transaction> Transactions { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>()
                .HasMany(u => u.Accounts)
                .WithOne(a => a.User)
                .HasForeignKey(a => a.UserID);

            modelBuilder.Entity<User>()
                .HasMany(u => u.Categories)
                .WithOne(c => c.User)
                .HasForeignKey(c => c.UserID);

            modelBuilder.Entity<User>()
                .HasMany(u => u.Transactions)
                .WithOne(t => t.User)
                .HasForeignKey(t => t.UserID);

            modelBuilder.Entity<Category>()
                .HasMany(c => c.Subcategories)
                .WithOne(s => s.Category)
                .HasForeignKey(s => s.CategoryID)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Transaction>()
                .HasOne(t => t.Category)
                .WithMany(c => c.Transactions)
                .HasForeignKey(c => c.CategoryID)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Transaction>()
                .HasOne(t => t.Account)
                .WithMany(a => a.Transactions)
                .HasForeignKey(t => t.AccountID)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Transaction>()
                .HasOne(t => t.User)
                .WithMany(u => u.Transactions)
                .HasForeignKey(t => t.UserID)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<RefreshToken>().HasOne(rt => rt.User);
            modelBuilder.Entity<User>().Property(u => u.MethodologyType).HasConversion<string>();
            modelBuilder.Entity<Account>().Property(a => a.AccountType).HasConversion<string>();

            base.OnModelCreating(modelBuilder);
        }
    }
}
