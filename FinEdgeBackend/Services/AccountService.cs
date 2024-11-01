using FinEdgeBackend.Data;
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

        public async Task<Account> UpdateAccountAsync(int accountID, Account account)
        {
            _dataContext.Accounts.Update(account);
            await _dataContext.SaveChangesAsync();
            return account;
        }

        public async Task<Account> GetAccountById(int accountID)
        {
            Account? account = await _dataContext.Accounts!.FirstOrDefaultAsync(a => a.ID == accountID);
            return account!;
        }

        public async Task<ICollection<Account>> GetAllAccountsForUserAsync(User currentUser)
        {
            ICollection<Account> accounts = await _dataContext.Accounts.Where(a => a.UserID == currentUser.ID).ToListAsync();
            return accounts;
        }

        public void DeleteAccount(Account account)
        {
            throw new NotImplementedException();
        }
    }
}
