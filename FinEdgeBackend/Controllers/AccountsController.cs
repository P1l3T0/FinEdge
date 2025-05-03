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
                    Title = "Please fill in the Account fields!",
                    Description = "The Account needs to have a Name and positive Balance!",
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
                    Title = $"Account '{account.Name}' already exist!",
                    Description = "New Accounts cannot have the same name as already existing ones!",
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
                Color = accountDto.Color,
                DateCreated = DateTime.Now,
                AccountType = (AccountType)Enum.Parse(typeof(AccountType), accountDto.AccountType!),
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

            return Ok(currentUser.Accounts!);
        }

        [HttpGet]
        [Route("get-chart-data")]
        public async Task<IActionResult> GetAccountChartData()
        {
            User currentUser = await _userService.GetCurrentUserAsync();
            ICollection<AccountChartDTO> chartData = await _accountService.GetAccountChartDataAsync(currentUser);

            return Ok(chartData);
        }

        [HttpGet]
        [Route("get-statistics")]
        public async Task<IActionResult> GetAccountStatistics()
        {
            User currentUser = await _userService.GetCurrentUserAsync();
            AccountStatsDTO statistics = await _accountService.GetAccountStatisticsAsync(currentUser);

            return Ok(statistics);
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
                    Title = "Please fill in the Account fields!",
                    Description = $"The Account {accountDto.Name} needs to have a Name and positive Balance!",
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
                Title = $"Account {account.Name} updated successfully!",
                Description = $"All changes to account '{account.Name}' have been saved successfully.",
                NotificationType = NotificationType.Info,
                IsRead = false,
                User = currentUser,
                UserID = currentUser.ID
            });

            return NoContent();
        }

        [HttpPut]
        [Route("update/transfer/{accountID}")]
        public async Task<IActionResult> TransferMoneyBetweenAccounts(int accountID, [FromBody] AccountTransferDTO accountDto)
        {
            User currentUser = await _userService.GetCurrentUserAsync();

            Account sourceAccount = await _accountService.GetAccountByIdAsync(accountID);
            Account targetAccount = await _accountService.GetAccountForCurrentUserByNameAsync(accountDto.TargetAccountName!, currentUser);

            await _accountService.TransferBalanceBetweenAccountsAsync(sourceAccount, targetAccount, accountDto.Amount);

            await _notificationService.CreateNotificationAsync(new Notification()
            {
                Title = $"Account {targetAccount.Name} updated successfully!",
                Description = $"Successfully transfered {accountDto.Amount}  BGN from {sourceAccount.Name} to {targetAccount.Name}",
                NotificationType = NotificationType.Info,
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
                Title = $"Account {account.Name} deleted successfully!",
                Description = $"Account '{account.Name}' has been permanently removed from the system.",
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
