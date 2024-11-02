using FinEdgeBackend.Data;
using FinEdgeBackend.DTOs;
using FinEdgeBackend.Enums;
using FinEdgeBackend.Interfaces;
using FinEdgeBackend.Models;
using Microsoft.EntityFrameworkCore;

namespace FinEdgeBackend.Services
{
    public class AccountService(DataContext dataContext) : IAccountService
    {
        private readonly DataContext _dataContext = dataContext;

        public async Task<Account> CreateAccountAsync(Account account)
        {
            _dataContext.Accounts.Add(account);
            await _dataContext.SaveChangesAsync();
            return account;
        }

        public async Task<Account> UpdateAccountAsync(AccountDTO accountDto, Account account)
        {
            account.Name = accountDto.Name;
            account.Currency = accountDto.Currency;
            account.AccountType = (AccountType)Enum.Parse(typeof(AccountType), accountDto.AccountType!);
            account.Balance = accountDto.Balance;

            _dataContext.Accounts.Update(account);
            await _dataContext.SaveChangesAsync();
            return account;
        }

        public async Task<Account> GetAccountById(int accountID)
        {
            Account? account = await _dataContext.Accounts!.FirstOrDefaultAsync(a => a.ID == accountID);
            return account!;
        }

        public async Task<ICollection<Account>> GetAllAccountsForCurrentUserAsync(User currentUser)
        {
            ICollection<Account> accounts = await _dataContext.Accounts.Where(a => a.UserID == currentUser.ID).ToListAsync();
            return accounts;
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

        public void DeleteAccount(Account account)
        {
            _dataContext.Accounts.Remove(account);
            _dataContext.SaveChanges();
        }
    }
}
