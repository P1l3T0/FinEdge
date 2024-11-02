using FinEdgeBackend.Models;

namespace FinEdgeBackend.Interfaces
{
    public interface IAccountService
    {
        Task<Account> CreateAccountAsync(Account account);
        Task<Account> UpdateAccountAsync(int accountID, Account account);
        Task<Account> GetAccountById(int accountID);
        Task<ICollection<Account>> GetAllAccountsForCurrentUserAsync(User currentUser);
        void DeleteAccount(Account account);
    }
}
