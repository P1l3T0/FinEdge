using FinEdgeBackend.DTOs;
using FinEdgeBackend.Enums;
using FinEdgeBackend.Interfaces;
using FinEdgeBackend.Models;
using Microsoft.AspNetCore.Mvc;

namespace FinEdgeBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AccountsController(IUserService userService, IAccountService accountService) : Controller
    {
        private readonly IUserService _userService = userService;
        private readonly IAccountService _accountService = accountService;

        [HttpPost]
        [Route("create")]
        public async Task<IActionResult> CreateAccount([FromBody] AccountDTO accountDto)
        {
            if (string.IsNullOrEmpty(accountDto.Name) || string.IsNullOrEmpty(accountDto.AccountType) || 
                decimal.IsNegative((decimal)accountDto.Balance!) || !accountDto.Balance.HasValue)
            {
                return BadRequest("Error with the account fields!");
            }

            User? currentUser = await _userService.GetCurrentUserAsync();
            currentUser.TotalBalance += accountDto.Balance;

            await _accountService.CreateAccountAsync(new Account
            {
                UserID = currentUser.ID,
                Name = accountDto.Name,
                Balance = accountDto.Balance,
                Currency = accountDto.Currency,
                DateCreated = DateTime.UtcNow,
                AccountType = (AccountType)Enum.Parse(typeof(AccountType), accountDto.AccountType!),
            });

            return Created();
        }

        [HttpGet]
        [Route("user/get-all")]
        public async Task<IActionResult> GetAccountsForUser()
        {
            User? currentUser = await _userService.GetCurrentUserAsync();
            ICollection<Account> accounts = await _accountService.GetAllAccountsForUserAsync(currentUser);

            return Ok(accounts);
        }
    }
}
