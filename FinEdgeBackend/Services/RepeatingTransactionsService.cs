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
                        Transaction newTransaction = new Transaction
                        {
                            UserID = transaction.UserID,
                            AccountID = transaction.AccountID,
                            AccountName = transaction.AccountName,
                            CategoryID = transaction.CategoryID,
                            CategoryName = transaction.CategoryName,
                            Name = transaction.Name,
                            Amount = transaction.Amount,
                            DateCreated = transaction.NextRepeatDate!.Value,
                            IsRepeating = transaction.IsRepeating,
                            NextRepeatDate = transaction.NextRepeatDate.Value.AddMonths(1)
                        };

                        User user = transaction.User!;
                        Account account = transaction.Account!;
                        Category category = transaction.Category!;

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
