using FinEdgeData.Data;
using FinEdgeData.DTOs;
using FinEdgeData.Models;
using FinEdgeServices.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace FinEdgeServices.Services
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
            DateTime startOfMonth = GetStartDate();

            return await _dataContext.Transactions
                .Where(t => t.User!.Equals(currentUser) && t.DateCreated >= startOfMonth)
                .OrderByDescending(t => t.DateCreated)
                .ToListAsync();
        }

        public async Task<ICollection<Transaction>> GetAllExpenditureTransactionsAsync(User currentUser)
        {
            DateTime startOfMonth = GetStartDate();

            return await _dataContext.Transactions
                .Where(t => t.Category!.IsIncome == false && t.User!.Equals(currentUser) && t.DateCreated >= startOfMonth)
                .OrderByDescending(t => t.DateCreated)
                .ToListAsync();
        }

        public async Task<ICollection<Transaction>> GetAllIncomeTransactionsAsync(User currentUser)
        {
            DateTime startOfMonth = GetStartDate();

            return await _dataContext.Transactions
                .Where(t => t.Category!.IsIncome == true && t.User!.Equals(currentUser) && t.DateCreated >= startOfMonth)
                .OrderByDescending(t => t.DateCreated)
                .ToListAsync();
        }

        private DateTime GetStartDate()
        {
            DateTime today = DateTime.Today;
            DateTime monday = today.AddDays(-(int)today.DayOfWeek + (int)DayOfWeek.Monday);
            DateTime startOfMonth = new DateTime(today.Year, today.Month, 1);

            DateTime weekStart = monday > startOfMonth ? startOfMonth : monday;

            return weekStart;
        }

        public ICollection<Transaction> GetTransactionsFromSpecifiedDate(ICollection<Transaction> transactions, DateTime date)
        {
            return transactions.Where(t => t.DateCreated >= date).ToList();
        }

        public TransactionSankeyChartDTO GetSankeyChartDataAsync(ICollection<Category> categories)
        {
            ICollection<Category> incomeCategories = _categoryService.GetIncomeCategories(categories);
            ICollection<Category> expenditureCategories = _categoryService.GetExpenditureCategories(categories);

            decimal totalIncome = incomeCategories.Sum(c => c.Balance ?? 0);
            decimal totalExpenditure = expenditureCategories.Sum(c => c.Balance ?? 0);

            TransactionSankeyChartDTO sankeyChartDto = new TransactionSankeyChartDTO()
            {
                Nodes = new List<SankeyChartNodeDTO>
                {
                    new SankeyChartNodeDTO()
                    {
                        Id = "income",
                        Label = new SankeyChartLabelDTO
                        {
                            Text = $"Income ({totalIncome:C})"
                        }
                    },
                    new SankeyChartNodeDTO()
                    {
                        Id = "expenditure",
                        Label = new SankeyChartLabelDTO
                        {
                            Text = $"Expenditure ({totalExpenditure:C})"
                        }
                    }
                },
                Links = new List<SankeyChartLinkDTO>()
            };

            foreach (Category category in categories)
            {
                sankeyChartDto.Nodes.Add(new SankeyChartNodeDTO()
                {
                    Id = category.Name!.ToLower().Replace(" ", "_"),
                    Label = new SankeyChartLabelDTO
                    {
                        Text = $"{category.Name} ({category.Balance:C})"
                    }
                });
            }

            foreach (Category category in categories)
            {
                sankeyChartDto.Links.Add(new SankeyChartLinkDTO()
                {
                    SourceId = category.IsIncome ? "income" : "expenditure",
                    TargetId = category.Name!.ToLower().Replace(" ", "_"),
                    Value = category.Balance ?? 0
                });
            }

            return sankeyChartDto;
        }

        public async Task UpdateTranssactionAsync(TransactionDTO transactionDto, Transaction transaction, Category category, Account newAccount, Account originalAccount, User currentUser)
        {
            decimal amountDifference = Math.Abs((decimal)(transactionDto.Amount - transaction.Amount)!);
            bool isAmountIncreased = transactionDto.Amount > transaction.Amount;
            bool isSameAccount = originalAccount.Equals(newAccount);

            Action updateBalances = category.IsIncome
                ? () => UpdateBalancesForIncomeTransaction(isAmountIncreased, amountDifference, currentUser, category, newAccount, originalAccount, isSameAccount, transactionDto.Amount, transaction.Amount)
                : () => UpdateBalancesForExpenditureTransaction(isAmountIncreased, amountDifference, currentUser, category, newAccount, originalAccount, isSameAccount, transactionDto.Amount, transaction.Amount);

            updateBalances();

            UpdateTransactionDetails(transaction, transactionDto, newAccount, category);

            _dataContext.Transactions.Update(transaction);
            await _dataContext.SaveChangesAsync();
        }

        private void UpdateBalancesForIncomeTransaction(bool isAmountIncreased, decimal amountDifference, User currentUser, 
            Category category, Account newAccount, Account originalAccount, bool isSameAccount, decimal? newAmount, decimal? oldAmount)
        {
            if (isAmountIncreased)
            {
                currentUser.TotalBalance += amountDifference;
                category.Balance += amountDifference;

                if (isSameAccount)
                {
                    newAccount.Balance += amountDifference;
                }
                else
                {
                    originalAccount.Balance -= oldAmount;
                    newAccount.Balance += newAmount;
                }
            }
            else if (!isAmountIncreased)
            {
                currentUser.TotalBalance -= amountDifference;
                category.Balance -= amountDifference;

                if (isSameAccount)
                {
                    newAccount.Balance -= amountDifference;
                }
                else
                {
                    originalAccount.Balance -= oldAmount;
                    newAccount.Balance += newAmount;
                }
            }
            else if (!isSameAccount)
            {
                originalAccount.Balance -= oldAmount;
                newAccount.Balance += newAmount;
            }
        }

        private void UpdateBalancesForExpenditureTransaction(bool isAmountIncreased, decimal amountDifference, User currentUser, 
            Category category, Account newAccount, Account originalAccount, bool isSameAccount, decimal? newAmount, decimal? oldAmount)
        {
            if (isAmountIncreased)
            {
                currentUser.TotalBalance -= amountDifference;
                category.Balance += amountDifference;

                if (isSameAccount)
                {
                    newAccount.Balance -= amountDifference;
                }
                else
                {
                    originalAccount.Balance += oldAmount;
                    newAccount.Balance -= newAmount;
                }
            }
            else if (!isAmountIncreased)
            {
                currentUser.TotalBalance += amountDifference;
                category.Balance -= amountDifference;

                if (isSameAccount)
                {
                    newAccount.Balance += amountDifference;
                }
                else
                {
                    originalAccount.Balance += oldAmount;
                    newAccount.Balance -= newAmount;
                }
            }
            else if (!isSameAccount)
            {
                originalAccount.Balance += oldAmount;
                newAccount.Balance -= newAmount;
            }
        }

        private void UpdateTransactionDetails(Transaction transaction, TransactionDTO transactionDto, Account newAccount, Category category)
        {
            transaction.Name = transactionDto.Name;
            transaction.Amount = transactionDto.Amount;
            transaction.AccountID = newAccount.ID;
            transaction.Account = newAccount;
            transaction.AccountName = newAccount.Name;
            transaction.CategoryID = category.ID;
            transaction.Category = category;
            transaction.CategoryName = category.Name;
            transaction.IsRepeating = transactionDto.IsRepeating;
            transaction.DateCreated = DateTime.Parse(transactionDto.DateUpdated!);
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
            DateTime today = DateTime.Today;
            DateTime monday = today.AddDays(-(int)today.DayOfWeek + (int)DayOfWeek.Monday);
            DateTime startOfMonth = new DateTime(today.Year, today.Month, 1);

            DateTime weekStart = monday > startOfMonth ? startOfMonth : monday;
            int daysPassed = (today - weekStart).Days + 1;

            decimal weeklyBalance = transactions.Where(t => t.DateCreated >= weekStart).Sum(t => t.Amount ?? 0);
            decimal weeklyAverage = decimal.Round(weeklyBalance / daysPassed, 2);

            return (weeklyBalance, weeklyAverage);
        }

        public (decimal monthBalance, decimal monthAverage) GetMontlyBalanceForTransactions(ICollection<Transaction> transactions)
        {
            int daysInCurrentMonth = DateTime.DaysInMonth(DateTime.Now.Year, DateTime.Now.Month);
            int daysPassedSinceStart = DateTime.Today.Day;

            DateTime startOfMonth = new DateTime(DateTime.Now.Year, DateTime.Now.Month, 1);
            DateTime endOfMonth = new DateTime(DateTime.Now.Year, DateTime.Now.Month, daysInCurrentMonth);

            decimal monthBalance = transactions.Where(t => t.DateCreated >= startOfMonth && t.DateCreated <= endOfMonth).Sum(t => t.Amount ?? 0);
            decimal monthAverage = decimal.Round(monthBalance / daysPassedSinceStart, 2);

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
