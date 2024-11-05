using FinEdgeBackend.DTOs;
using FinEdgeBackend.Interfaces;
using FinEdgeBackend.Models;
using Microsoft.AspNetCore.Mvc;

namespace FinEdgeBackend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TransactionController(ITransactionService transactionService ,ICategoryService categoryService, IAccountService accountService, IUserService userService) : Controller
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

        [HttpGet]
        [Route("get/all")]
        public async Task<IActionResult> GetAllTransactions()
        {
            User currentUser = await _userService.GetCurrentUserAsync();
            ICollection<Transaction> transactions = await _transactionService.GetAllTransactionsAsync(currentUser);

            return Ok(transactions);
        }

        [HttpGet]
        [Route("get/expenditure")]
        public async Task<IActionResult> GetExpenditureTransactions()
        {
            User currentUser = await _userService.GetCurrentUserAsync();
            ICollection<Transaction> expenditureTransactions = await _transactionService.GetAllExpenditureTransactionsAsync(currentUser);

            return Ok(expenditureTransactions);
        }

        [HttpGet]
        [Route("get/income")]
        public async Task<IActionResult> GetIncomeTransactions()
        {
            User currentUser = await _userService.GetCurrentUserAsync();
            ICollection<Transaction> incomeTransactions = await _transactionService.GetAllIncomeTransactionsAsync(currentUser);

            return Ok(incomeTransactions);
        }

        [HttpDelete]
        [Route("delete")]
        public async Task<IActionResult> DeleteTransaction([FromQuery] int transactionID)
        {
            Transaction transaction = await _transactionService.GetTransactionByIdAsync(transactionID);
            Category category = transaction.Category!;
            Account account = transaction.Account!;
            User currentUser = transaction.User!;

            category.Balance -= transaction.Amount;

            if (category.IsIncome)
            {
                account.Balance -= transaction.Amount;
                currentUser.TotalBalance -= transaction.Amount;
            }
            else
            {
                account.Balance += transaction.Amount;
                currentUser.TotalBalance += transaction.Amount;
            }

            await _transactionService.DeleteTransactionAsync(transaction);

            return NoContent();
        }
    }
}
