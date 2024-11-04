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

        [HttpPost]
        [Route("create")]
        public async Task<IActionResult> CreateTransaction([FromBody] TransactionDTO transactionDto)
        {
            if (!_transactionService.Validate(transactionDto))
            {
                return BadRequest("Error with the transactionDto fields");
            }

            Category category = await _categoryService.GetCategoryByNameAsync(transactionDto.CategoryName!);
            Account account = await _accountService.GetAccountByNameAsync(transactionDto.AccountName!);
            User currentUser = category.User!;

            category.Balance += transactionDto.Amount;
            account.Balance -= transactionDto.Amount;
            currentUser.TotalBalance -= transactionDto.Amount;

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
