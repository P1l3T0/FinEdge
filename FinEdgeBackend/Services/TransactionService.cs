using FinEdgeBackend.Data;
using FinEdgeBackend.DTOs;
using FinEdgeBackend.Interfaces;
using FinEdgeBackend.Models;
using Microsoft.EntityFrameworkCore;
using System.Diagnostics.Eventing.Reader;

namespace FinEdgeBackend.Services
{
    public class TransactionService(DataContext dataContext, IAccountService accountService, ICategoryService categoryService) : ITransactionService
    {
        private readonly DataContext _dataContext = dataContext;
        private readonly IAccountService _accountService = accountService;
        private readonly ICategoryService _categoryService = categoryService;

        public async Task CreateTransactionAsync(Transaction transaction)
        {
            _dataContext.Transactions.Add(transaction);
            await _dataContext.SaveChangesAsync();
        }

        public async Task<Transaction> GetTransactionByIdAsync(int transactionID)
        {
            Transaction? transaction = await _dataContext.Transactions
                .Include(t => t.Account)
                .Include(t => t.Category)
                .Include(t => t.User)
                .FirstOrDefaultAsync(t => t.ID == transactionID);

            return transaction!;
        }

        public async Task<ICollection<Transaction>> GetAllTransactionsAsync(User currentUser)
        {
            return await _dataContext.Transactions.Where(t => t.User!.Equals(currentUser)).ToListAsync();
        }

        public async Task<ICollection<Transaction>> GetAllExpenditureTransactionsAsync(User currentUser)
        {
            return await _dataContext.Transactions.Where(t => t.Category!.IsIncome == false && t.User!.Equals(currentUser)).ToListAsync();
        }

        public async Task<ICollection<Transaction>> GetAllIncomeTransactionsAsync(User currentUser)
        {
            return await _dataContext.Transactions.Where(t => t.Category!.IsIncome == true && t.User!.Equals(currentUser)).ToListAsync();
        }

        public async Task<ICollection<Transaction>> GetAllTransactionsForAccountAsync(Account account)
        {
            return await _dataContext.Transactions.Where(t => t.Account!.Equals(account)).ToListAsync();
        }

        public async Task<ICollection<Transaction>> GetAllTransactionsForCategoryAsync(Category category)
        {
            return await _dataContext.Transactions.Where(t => t.Category!.Equals(category)).ToListAsync();
        }

        public async Task UpdateTranssactionAsync(TransactionDTO transactionDto, Transaction transaction, Category category, Account newAccount, Account originalAccount, User currentUser)
        {
            if (category.IsIncome)
            {
                if (transactionDto.Amount > transaction.Amount) 
                {
                    decimal increase = Math.Abs((decimal)(transactionDto.Amount - transaction.Amount));

                    currentUser.TotalBalance += increase;
                    category.Balance += increase;

                    if (originalAccount.Equals(newAccount))
                    {
                        newAccount.Balance += increase; 
                    }
                    else
                    {
                        originalAccount.Balance -= transaction.Amount; 
                        newAccount.Balance += transactionDto.Amount;  
                    }
                }
                else if (transactionDto.Amount < transaction.Amount) 
                {
                    decimal decrease = Math.Abs((decimal)(transactionDto.Amount - transaction.Amount));

                    currentUser.TotalBalance -= decrease;
                    category.Balance -= decrease;

                    if (originalAccount.Equals(newAccount))
                    {
                        newAccount.Balance -= decrease; 
                    }
                    else
                    {
                        originalAccount.Balance -= transaction.Amount;
                        newAccount.Balance += transactionDto.Amount; 
                    }
                }
                else
                {
                    if (!originalAccount.Equals(newAccount)) 
                    {
                        originalAccount.Balance -= transaction.Amount;
                        newAccount.Balance += transactionDto.Amount; 
                    }
                }
            }
            else
            {
                if (transactionDto.Amount > transaction.Amount) 
                {
                    decimal increase = Math.Abs((decimal)(transactionDto.Amount - transaction.Amount));

                    currentUser.TotalBalance -= increase;
                    category.Balance += increase;

                    if (originalAccount.Equals(newAccount))
                    {
                        newAccount.Balance -= increase; 
                    }
                    else
                    {
                        originalAccount.Balance += transaction.Amount; 
                        newAccount.Balance -= transactionDto.Amount;  
                    }
                }
                else if (transactionDto.Amount < transaction.Amount) 
                {
                    decimal decrease = Math.Abs((decimal)(transactionDto.Amount - transaction.Amount));

                    currentUser.TotalBalance += decrease;
                    category.Balance -= decrease;

                    if (originalAccount.Equals(newAccount))
                    {
                        newAccount.Balance += decrease; 
                    }
                    else
                    {
                        originalAccount.Balance += transaction.Amount; 
                        newAccount.Balance -= transactionDto.Amount; 
                    }
                }
                else 
                {
                    if (!originalAccount.Equals(newAccount))
                    {
                        originalAccount.Balance += transaction.Amount; 
                        newAccount.Balance -= transactionDto.Amount; 
                    }
                }
            }

            transaction.Name = transactionDto.Name;
            transaction.Amount = transactionDto.Amount;
            transaction.AccountID = newAccount.ID;
            transaction.Account = newAccount;
            transaction.AccountName = newAccount.Name;
            transaction.CategoryID = category.ID;
            transaction.Category = category;
            transaction.CategoryName = category.Name;

            _dataContext.Transactions.Update(transaction);
            await _dataContext.SaveChangesAsync();
        }

        public async Task UpdateUserBalanceAsync(bool isNewTransaction, TransactionDTO? transactionDto, Transaction? transaction, User currentUser, Category category, Account account)
        {
            if (isNewTransaction)
            {
                category.Balance += transactionDto!.Amount;

                if (category.IsIncome)
                {
                    account.Balance += transactionDto.Amount;
                    currentUser.TotalBalance += transactionDto.Amount;
                }
                else
                {
                    account.Balance -= transactionDto.Amount;
                    currentUser.TotalBalance -= transactionDto.Amount;
                }
            }
            else
            {
                category.Balance -= transaction!.Amount;

                if (category.IsIncome)
                {
                    account.Balance -= transaction.Amount;
                    currentUser.TotalBalance -= transaction.Amount;
                }
                else
                {
                    account.Balance += transaction.Amount;
                    currentUser.TotalBalance += transaction.Amount;
                }
            }

            await _dataContext.SaveChangesAsync();
        }

        public async Task DeleteTransactionAsync(Transaction transaction)
        {
            _dataContext.Transactions.Remove(transaction);
            await _dataContext.SaveChangesAsync();
        }

        public decimal GetDailyBalanceForTransactions(ICollection<Transaction> transactions)
        {
            return transactions.Where(t => t.DateCreated.Date == DateTime.Today.Date).Sum(t => t.Amount ?? 0);
        }

        public (decimal weeklyBalance, decimal weeklyAverage) GetWeeklyBalanceForTransactions(ICollection<Transaction> transactions)
        {
            decimal weeklyBalance = transactions.Where(t => t.DateCreated >= DateTime.Now.AddDays(-7)).Sum(t => t.Amount ?? 0);
            decimal weeklyAverage = decimal.Round(weeklyBalance / 7, 2);

            return (weeklyBalance, weeklyAverage);
        }

        public (decimal monthBalance, decimal monthAverage) GetMontlyBalanceForTransactions(ICollection<Transaction> transactions)
        {
            DateTime startOfMonth = new DateTime(DateTime.Now.Year, DateTime.Now.Month, 1);
            DateTime endOfMonth = DateTime.Now;

            int daysInCurrentMonth = DateTime.DaysInMonth(DateTime.Now.Year, DateTime.Now.Month);

            decimal monthBalance = transactions.Where(t => t.DateCreated >= startOfMonth && t.DateCreated <= endOfMonth).Sum(t => t.Amount ?? 0);
            decimal monthAverage = decimal.Round(monthBalance / daysInCurrentMonth, 2);

            return (monthBalance, monthAverage);
        }

        public bool Validate(TransactionDTO transactionDto)
        {
            if (decimal.IsNegative((decimal)transactionDto.Amount!) || !transactionDto.Amount.HasValue ||
                string.IsNullOrEmpty(transactionDto.Name) || string.IsNullOrEmpty(transactionDto.AccountName) || string.IsNullOrEmpty(transactionDto.CategoryName))
            {
                return false;
            }

            return true;
        }
    }
}
