using FinEdgeBackend.DTOs.Accounts;
using FinEdgeBackend.Enums;
using FinEdgeBackend.Interfaces;
using FinEdgeBackend.Models;
using Microsoft.AspNetCore.Mvc;

namespace FinEdgeBackend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AccountsController(IUserService userService, IAccountService accountService, INotificationService notificationService) : Controller
    {
        private readonly IUserService _userService = userService;
        private readonly IAccountService _accountService = accountService;
        private readonly INotificationService _notificationService = notificationService;

        [HttpPost]
        [Route("create")]
        public async Task<IActionResult> CreateAccount([FromBody] AccountDTO accountDto)
        {
            User currentUser = await _userService.GetCurrentUserAsync();

            if (!_accountService.Validate(accountDto))
            {
                await _notificationService.CreateNotificationAsync(new Notification()
                {
                    Message = "Please fill in the account fields!",
                    NotificationType = NotificationType.Error,
                    IsRead = false,
                    User = currentUser,
                    UserID = currentUser.ID
                });

                return BadRequest();
            }

            Account account = await _accountService.GetAccountForCurrentUserByNameAsync(accountDto.Name!, currentUser);

            if (account is not null)
            {
                await _notificationService.CreateNotificationAsync(new Notification()
                {
                    Message = $"Account '{account.Name}' already exist!",
                    NotificationType = NotificationType.Error,
                    IsRead = false,
                    User = currentUser,
                    UserID = currentUser.ID
                });

                return BadRequest();
            }

            currentUser.TotalBalance += accountDto.Balance;

            await _accountService.CreateAccountAsync(new Account()
            {
                UserID = currentUser.ID,
                User = currentUser,
                Name = accountDto.Name,
                Balance = accountDto.Balance,
                Currency = accountDto.Currency,
                DateCreated = DateTime.Now,
                AccountType = (AccountType)Enum.Parse(typeof(AccountType), accountDto.AccountType!),
            });

            await _notificationService.CreateNotificationAsync(new Notification()
            {
                Message = $"Successfully created Account {accountDto!.Name}!",
                NotificationType = NotificationType.Success,
                IsRead = false,
                User = currentUser,
                UserID = currentUser.ID
            });

            return Ok(account);
        }

        [HttpGet]
        [Route("get")]
        public async Task<IActionResult> GetAccount([FromQuery] int accountID)
        {
            Account account = await _accountService.GetAccountByIdAsync(accountID);

            return Ok(account);
        }

        [HttpGet]
        [Route("get-all")]
        public async Task<IActionResult> GetAccounts()
        {
            User currentUser = await _userService.GetCurrentUserAsync();
            ICollection<Account> accounts = currentUser.Accounts!;

            return Ok(accounts);
        }

        [HttpGet]
        [Route("get-summaries")]
        public async Task<IActionResult> GetAccountSummaries()
        {
            User currentUser = await _userService.GetCurrentUserAsync();
            IEnumerable<AccountSummaryDTO> summaries = await _accountService.GetAccountSummariesAsync(currentUser);

            return Ok(summaries);
        }

        [HttpPut]
        [Route("update/{accountID}")]
        public async Task<IActionResult> UpdateAccount(int accountID, [FromBody] AccountDTO accountDto)
        {
            User currentUser = await _userService.GetCurrentUserAsync();

            if (!_accountService.Validate(accountDto))
            {
                await _notificationService.CreateNotificationAsync(new Notification()
                {
                    Message = "Please fill in the account fields!",
                    NotificationType = NotificationType.Error,
                    IsRead = false,
                    User = currentUser,
                    UserID = currentUser.ID
                });

                return BadRequest();
            }

            Account account = await _accountService.GetAccountByIdAsync(accountID);

            await _accountService.UpdateAccountAsync(accountDto, account);

            await _notificationService.CreateNotificationAsync(new Notification()
            {
                Message = $"Account {account.Name} updated successfully!",
                NotificationType = NotificationType.Success,
                IsRead = false,
                User = currentUser,
                UserID = currentUser.ID
            });

            return NoContent();
        }

        [HttpDelete]
        [Route("delete/{accountID}")]
        public async Task<IActionResult> DeleteAccount(int accountID)
        {
            Account account = await _accountService.GetAccountByIdAsync(accountID);
            User currentUser = account.User!;

            currentUser.TotalBalance -= account.Balance;

            await _notificationService.CreateNotificationAsync(new Notification()
            {
                Message = $"Account {account.Name} deleted successfully!",
                NotificationType = NotificationType.Success,
                IsRead = false,
                User = currentUser,
                UserID = currentUser.ID
            });

            await _accountService.DeleteAccountAsync(account);

            return NoContent();
        }
    }
}
