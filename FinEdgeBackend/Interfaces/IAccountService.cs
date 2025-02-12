using FinEdgeBackend.DTOs.Accounts;
using FinEdgeBackend.Models;

namespace FinEdgeBackend.Interfaces
{
    public interface IAccountService
    {
        Task CreateAccountAsync(Account account);
        Task UpdateAccountAsync(AccountDTO accountDto, Account account);
        Task<Account> GetAccountByIdAsync(int accountID);
        Task<Account> GetAccountForCurrentUserByNameAsync(string accountName, User currentUser);
        Task<ICollection<Account>> GetAllAccountsForCurrentUserAsync(User currentUser);
        Task<IEnumerable<AccountSummaryDTO>> GetAccountSummariesAsync(User currentUser);
        Task DeleteAccountAsync(Account account);
        bool Validate(AccountDTO accountDto);
    }
}
