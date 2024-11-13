using FinEdgeBackend.DTOs;
using FinEdgeBackend.Enums;
using FinEdgeBackend.Interfaces;
using FinEdgeBackend.Models;
using Microsoft.AspNetCore.Mvc;

namespace FinEdgeBackend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AccountsController(IUserService userService, IAccountService accountService) : Controller
    {
        private readonly IUserService _userService = userService;
        private readonly IAccountService _accountService = accountService;

        [HttpPost]
        [Route("create")]
        public async Task<IActionResult> CreateAccount([FromBody] AccountDTO accountDto)
        {
            if (!_accountService.Validate(accountDto))
            {
                return BadRequest("Error with the account fields");
            }

            User currentUser = await _userService.GetCurrentUserAsync();
            Account account = await _accountService.GetAccountForCurrentUserByNameAsync(accountDto.Name!, currentUser);

            if (account is not null)
            {
                return BadRequest($"Account '{account.Name}' already exist!");
            }

            currentUser.TotalBalance += accountDto.Balance;

            account = await _accountService.CreateAccountAsync(new Account
            {
                UserID = currentUser.ID,
                User = currentUser,
                Name = accountDto.Name,
                Balance = accountDto.Balance,
                Currency = accountDto.Currency,
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
            ICollection<Account> accounts = currentUser.Accounts!;

            return Ok(accounts);
        }

        [HttpPut]
        [Route("update")]
        public async Task<IActionResult> UpdateAccount([FromQuery] int accountID, [FromBody] AccountDTO accountDto)
        {
            if (!_accountService.Validate(accountDto))
            {
                return BadRequest("Error with the account fields");
            }

            Account account = await _accountService.GetAccountByIdAsync(accountID);

            await _accountService.UpdateAccountAsync(accountDto, account);

            return NoContent();
        }

        [HttpDelete]
        [Route("delete")]
        public async Task<IActionResult> DeleteAccount([FromQuery] int accountID)
        {
            Account account = await _accountService.GetAccountByIdAsync(accountID);
            User currentUser = account.User!;

            currentUser.TotalBalance -= account.Balance;

            await _accountService.DeleteAccountAsync(account);

            return NoContent();
        }
    }
}
