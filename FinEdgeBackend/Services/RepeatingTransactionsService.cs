using FinEdgeBackend.Data;
using FinEdgeBackend.Models;
using Microsoft.EntityFrameworkCore;

namespace FinEdgeBackend.Services
{
    public class RepeatingTransactionsService(IServiceProvider serviceProvider) : BackgroundService
    {
        private readonly IServiceProvider _serviceProvider = serviceProvider;

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            while (!stoppingToken.IsCancellationRequested)
            {
                using (IServiceScope scope = _serviceProvider.CreateScope())
                {
                    DataContext _dataContext = scope.ServiceProvider.GetRequiredService<DataContext>();

                    ICollection<Transaction> repeatingTransactions = await _dataContext.Transactions.Where(t => t.IsRepeating && t.NextRepeatDate <= DateTime.UtcNow).ToListAsync();

                    foreach (Transaction transaction in repeatingTransactions)
                    {
                        User user = await _dataContext.Users.FirstOrDefaultAsync(u => u.ID == transaction.UserID) ?? throw new InvalidOperationException("User not found.");
                        Account account = await _dataContext.Accounts.FirstOrDefaultAsync(a => a.ID == transaction.AccountID) ?? throw new InvalidOperationException("Account not found.");
                        Category category = await _dataContext.Categories.FirstOrDefaultAsync(c => c.ID == transaction.CategoryID) ?? throw new InvalidOperationException("Category not found.");
                        Subcategory? subcategory = transaction.SubcategoryID.HasValue
                            ? await _dataContext.Subcategories.FirstOrDefaultAsync(s => s.ID == transaction.SubcategoryID.Value)
                            : null;

                        Transaction newTransaction = new Transaction
                        {
                            User = user,
                            UserID = transaction.UserID,
                            Color = transaction.Color,
                            Account = account,
                            AccountID = account.ID,
                            AccountName = account.Name,
                            Category = category,
                            CategoryID = category.ID,
                            CategoryName = category.Name,
                            Subcategory = subcategory,
                            SubcategoryID = subcategory?.ID,
                            SubcategoryName = subcategory?.Name,
                            Name = transaction.Name,
                            Amount = transaction.Amount,
                            DateCreated = transaction.NextRepeatDate!.Value,
                            IsRepeating = transaction.IsRepeating,
                            NextRepeatDate = transaction.NextRepeatDate.Value.AddMonths(1)
                        };

                        if (category.IsIncome)
                        {
                            account.Balance += transaction.Amount;
                            user.TotalBalance += transaction.Amount;
                        }
                        else
                        {
                            account.Balance -= transaction.Amount;
                            user.TotalBalance -= transaction.Amount;
                        }

                        category.Balance += transaction.Amount;

                        _dataContext.Transactions.Add(newTransaction);

                        transaction.NextRepeatDate = transaction.NextRepeatDate.Value.AddMonths(1);
                    }

                    await _dataContext.SaveChangesAsync();
                }

                await Task.Delay(TimeSpan.FromDays(1), stoppingToken);
            }
        }
    }
}
