﻿using FinEdgeBackend.Data;
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

            _dataContext.Accounts.Update(account);
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

        public async Task<ICollection<Account>> GetAllAccountsForCurrentUserAsync(User currentUser)
        {
            ICollection<Account> accounts = await _dataContext.Accounts.Where(a => a.User!.Equals(currentUser)).ToListAsync();
            return accounts;
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
