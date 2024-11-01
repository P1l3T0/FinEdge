using FinEdgeBackend.Data;
using FinEdgeBackend.Interfaces;
using FinEdgeBackend.Models;

namespace FinEdgeBackend.Services
{
    public class AccountService(DataContext dataContext) : IAccountService
    {
        private readonly DataContext _dataContext = dataContext;

        public async Task<Account> CreateAsync(Account account)
        {
            _dataContext.Add(account);
            await _dataContext.SaveChangesAsync();
            return account;
        }
    }
}
