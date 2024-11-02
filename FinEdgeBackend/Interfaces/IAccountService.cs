using FinEdgeBackend.DTOs;
using FinEdgeBackend.Models;

namespace FinEdgeBackend.Interfaces
{
    public interface IAccountService
    {
        Task<Account> CreateAccountAsync(Account account);
        Task<Account> UpdateAccountAsync(AccountDTO accountDto, Account account);
        Task<Account> GetAccountByIdAsync(int accountID);
        Task<ICollection<Account>> GetAllAccountsForCurrentUserAsync(User currentUser);
        bool Validate(AccountDTO accountDto);
        void DeleteAccount(Account account);
    }
}
