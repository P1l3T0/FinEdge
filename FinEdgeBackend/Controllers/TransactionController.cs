using FinEdgeBackend.DTOs;
using FinEdgeBackend.Interfaces;
using FinEdgeBackend.Models;
using Microsoft.AspNetCore.Mvc;

namespace FinEdgeBackend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TransactionController(ITransactionService transactionService ,ICategoryService categoryService, IAccountService accountService) : Controller
    {
        private readonly ITransactionService _transactionService = transactionService;
        private readonly ICategoryService _categoryService = categoryService;
        private readonly IAccountService _accountService = accountService;
        private readonly IUserService _userService = userService;

        [HttpPost]
        [Route("create")]
        public async Task<IActionResult> CreateTransaction([FromBody] TransactionDTO transactionDto)
        {
            if (!_transactionService.Validate(transactionDto))
            {
                return BadRequest("Error with the transactionDto fields");
            }

            User currentUser = await _userService.GetCurrentUserAsync();
            Category category = await _categoryService.GetCategoryForCurrentUserByNameAsync(transactionDto.CategoryName!, currentUser);
            Account account = await _accountService.GetAccountForCurrentUserByNameAsync(transactionDto.AccountName!, currentUser);

            category.Balance += transactionDto.Amount;

            if (category.IsIncome)
            {
                account.Balance += transactionDto.Amount;
                currentUser.TotalBalance += transactionDto.Amount;
            } 
            else
            {
            account.Balance -= transactionDto.Amount;
            currentUser.TotalBalance -= transactionDto.Amount;
            }

            await _transactionService.CreateTransactionAsync(new Transaction
            {
                Name = transactionDto.Name,
                Amount = transactionDto.Amount,
                UserID = currentUser.ID,
                User = currentUser,
                AccountID = account.ID,
                AccountName = account.Name,
                Account = account,
                CategoryID = category.ID,
                Category = category,
                CategoryName = category.Name,
            });

            return Created();
        }
    }
}
