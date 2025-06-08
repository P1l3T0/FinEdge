using Microsoft.EntityFrameworkCore;
using FinEdgeData.Models;

namespace FinEdgeData.Data
{
    public class DataContext(DbContextOptions<DataContext> options) : DbContext(options)
    {
        public DbSet<User> Users { get; set; }
        public DbSet<RefreshToken> RefreshTokens { get; set; }
        public DbSet<Account> Accounts { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Subcategory> Subcategories { get; set; }
        public DbSet<Transaction> Transactions { get; set; }
        public DbSet<CategorySnapshot> CategorySnapshots { get; set; }
        public DbSet<FinancialRecommendation> FinancialRecommendations { get; set; }
        public DbSet<Notification> Notifications { get; set; }

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
                .HasOne(t => t.Account)
                .WithMany(a => a.Transactions)
                .HasForeignKey(t => t.AccountID)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Transaction>()
                .HasOne(t => t.Category)
                .WithMany(c => c.Transactions)
                .HasForeignKey(t => t.CategoryID)
                .OnDelete(DeleteBehavior.ClientCascade);

            modelBuilder.Entity<Transaction>()
                .HasOne(t => t.User)
                .WithMany(u => u.Transactions)
                .HasForeignKey(t => t.UserID)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Transaction>()
                .HasOne(t => t.Subcategory)
                .WithMany(u => u.Transactions)
                .HasForeignKey(t => t.SubcategoryID)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<CategorySnapshot>()
                .HasOne(cs => cs.Category)
                .WithMany(c => c.CategorySnapshots)
                .HasForeignKey(cs => cs.CategoryID)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<FinancialRecommendation>()
                .HasOne(r => r.User)
                .WithMany(u => u.FinancialRecommendations)
                .HasForeignKey(r => r.UserID);

            modelBuilder.Entity<Notification>()
                .HasOne(n => n.User)
                .WithMany(u => u.Notifications)
                .HasForeignKey(n => n.UserID)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<RefreshToken>().HasOne(rt => rt.User);
            modelBuilder.Entity<User>().Property(u => u.MethodologyType).HasConversion<string>();
            modelBuilder.Entity<Account>().Property(a => a.AccountType).HasConversion<string>();
            modelBuilder.Entity<Notification>().Property(n => n.NotificationType).HasConversion<string>();

            base.OnModelCreating(modelBuilder);
        }
    }
}
