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
        Task<ICollection<AccountChartDTO>> GetAccountChartDataAsync(User currentUser);
        Task<AccountStatsDTO> GetAccountStatisticsAsync(User currentUser);
        Task DeleteAccountAsync(Account account);
        bool Validate(AccountDTO accountDto);
    }
}
