using FinEdgeData.Data;
using FinEdgeData.DTOs;
using FinEdgeData.Enums;
using FinEdgeData.Models;
using FinEdgeServices.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace FinEdgeServices.Services
{
    public class AccountService(DataContext dataContext) : IAccountService
    {
        private readonly DataContext _dataContext = dataContext;

        public async Task CreateAccountAsync(Account account)
        {
            _dataContext.Accounts.Add(account);
            await _dataContext.SaveChangesAsync();
        }

        public async Task UpdateAccountAsync(AccountDTO accountDto, Account account)
        {
            User currentUser = account.User!;

            currentUser.TotalBalance += accountDto.Balance - account.Balance;

            account.Name = accountDto.Name;
            account.Currency = accountDto.Currency;
            account.AccountType = (AccountType)Enum.Parse(typeof(AccountType), accountDto.AccountType!);
            account.Balance = accountDto.Balance;
            account.Color = accountDto.Color;

            _dataContext.Accounts.Update(account);
            await _dataContext.SaveChangesAsync();
        }

        public async Task TransferBalanceBetweenAccountsAsync(Account sourceAccount, Account targetAccount, decimal amount)
        {
            sourceAccount.Balance -= amount;
            targetAccount.Balance += amount;

            _dataContext.Accounts.Update(sourceAccount);
            _dataContext.Accounts.Update(targetAccount);

            await _dataContext.SaveChangesAsync();
        }

        public async Task<Account> GetAccountByIdAsync(int accountID)
        {
            Account? account = await _dataContext.Accounts!
                .Include(a => a.User)
                .FirstOrDefaultAsync(a => a.ID == accountID);

            return account!;
        }

        public async Task<Account> GetAccountForCurrentUserByNameAsync(string accountName, User currentUser)
        {
            Account? account = await _dataContext.Accounts
                .Include(c => c.User)
                .FirstOrDefaultAsync(a => a.Name == accountName && a.User!.Equals(currentUser));

            return account!;
        }

        public async Task<ICollection<AccountChartDTO>> GetAccountChartDataAsync(User currentUser)
        {
            ICollection<Account> accounts = currentUser.Accounts;

            return accounts
                .GroupBy(a => a.AccountType)
                .Select(group => new AccountChartDTO
                {
                    Category = group.Key.ToString(),
                    Value = group.Sum(a => a.Balance ?? 0),
                    Color = GetAccountTypeColor(group.Key)
                })
                .ToList();
        }

        private static string GetAccountTypeColor(AccountType type) => type switch
        {
            AccountType.Regular => "#3b82f6",
            AccountType.Savings => "#10b981",
            AccountType.Debt => "#6366f1",
            AccountType.Retirement => "#85db14",
            _ => "#64748b"
        };

        public async Task<AccountStatsDTO> GetAccountStatisticsAsync(User currentUser)
        {
            ICollection<Account> accounts = currentUser.Accounts;
            Account? highestBalanceAccount = accounts.OrderByDescending(a => a.Balance).FirstOrDefault();

            ICollection<AccountTypeStatsDTO> accountTypeStats = accounts
                .GroupBy(a => a.AccountType)
                .Select(group => new AccountTypeStatsDTO
                {
                    Type = group.Key.ToString(),
                    TotalBalance = group.Sum(a => a.Balance ?? 0),
                    AverageBalance = group.Average(a => a.Balance ?? 0),
                    AccountCount = group.Count()
                })
                .ToList();

            return new AccountStatsDTO
            {
                TotalBalance = accounts.Sum(a => a.Balance ?? 0),
                TotalAccounts = accounts.Count,
                AverageBalance = accounts.Any() ? accounts.Average(a => a.Balance ?? 0) : 0,
                PrimaryCurrency = accounts.GroupBy(a => a.Currency)
                    .OrderByDescending(g => g.Count())
                    .Select(g => g.Key)
                    .FirstOrDefault() ?? "BGN",
                AccountTypeStats = accountTypeStats,
                HighestBalanceAccount = highestBalanceAccount != null ? new AccountHighestBalanceDTO
                {
                    Name = highestBalanceAccount.Name!,
                    Type = highestBalanceAccount.AccountType.ToString(),
                    Balance = highestBalanceAccount.Balance ?? 0,
                    Currency = highestBalanceAccount.Currency!
                } : null!
            };
        }

        public async Task DeleteAccountAsync(Account account)
        {
            _dataContext.Accounts.Remove(account);
            await _dataContext.SaveChangesAsync();
        }

        public bool Validate(AccountDTO accountDto)
        {
            if (string.IsNullOrEmpty(accountDto.Name) || string.IsNullOrEmpty(accountDto.AccountType) ||
                decimal.IsNegative((decimal)accountDto.Balance!) || !accountDto.Balance.HasValue)
            {
                return false;
            }

            return true;
        }
    }
}
