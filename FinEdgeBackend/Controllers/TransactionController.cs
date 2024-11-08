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

            await _transactionService.UpdateUserBalanceAsync(true, transactionDto, null, currentUser, category, account);

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

        [HttpGet]
        [Route("get/income/amount")]
        public async Task<IActionResult> GetIncomeBalance()
        {
            User currentUser = await _userService.GetCurrentUserAsync();
            ICollection<Transaction> incomeTransactions = await _transactionService.GetAllIncomeTransactionsAsync(currentUser);

            decimal dailyIncome = _transactionService.GetDailyBalanceForTransactions(incomeTransactions);
            (decimal weeklyIncome, decimal weeklyAverage) = _transactionService.GetWeeklyBalanceForTransactions(incomeTransactions);
            (decimal monthIncome, decimal monthAverage) = _transactionService.GetMontlyBalanceForTransactions(incomeTransactions);

            return Ok(new
            {
                DailyIncome = dailyIncome,
                WeeklyIncome = weeklyIncome,
                WeeklyAverage = weeklyAverage,
                MonthlyIncome = monthIncome,
                MonthlyAverage = monthAverage
            });
        }

        [HttpGet]
        [Route("get/expenditure/amount")]
        public async Task<IActionResult> GetExpenditureBalance()
        {
            User currentUser = await _userService.GetCurrentUserAsync();
            ICollection<Transaction> expenditureTransactions = await _transactionService.GetAllExpenditureTransactionsAsync(currentUser);

            decimal dailySpendings = _transactionService.GetDailyBalanceForTransactions(expenditureTransactions);
            (decimal weeklySpendings, decimal weeklyAverage) = _transactionService.GetWeeklyBalanceForTransactions(expenditureTransactions);
            (decimal monthSpendings, decimal monthAverage) = _transactionService.GetMontlyBalanceForTransactions(expenditureTransactions);

            return Ok(new
            {
                DailySpendings = dailySpendings,
                WeeklySpendings = weeklySpendings,
                WeeklyAverage = weeklyAverage,
                MonthlySpendings = monthSpendings,
                MonthlyAverage = monthAverage
            });
        }

        [HttpPut]
        [Route("update")]
        public async Task<IActionResult> UpdateTransaction([FromQuery] int transactionID, [FromBody] TransactionDTO transactionDto)
        {
            if (!_transactionService.Validate(transactionDto))
            {
                return BadRequest("Error with the transactionDto fields");
            }

            User currentUser = await _userService.GetCurrentUserAsync();
            Transaction transaction = await _transactionService.GetTransactionByIdAsync(transactionID);
            Category category = await _categoryService.GetCategoryForCurrentUserByNameAsync(transactionDto.CategoryName!, currentUser);
            Account account = await _accountService.GetAccountForCurrentUserByNameAsync(transactionDto.AccountName!, currentUser);

            await _transactionService.UpdateTranssactionAsync(transactionDto, transaction, category, account);

            return NoContent();
        }

        [HttpDelete]
        [Route("delete")]
        public async Task<IActionResult> DeleteTransaction([FromQuery] int transactionID)
        {
            Transaction transaction = await _transactionService.GetTransactionByIdAsync(transactionID);
            Category category = transaction.Category!;
            Account account = transaction.Account!;
            User currentUser = transaction.User!;

            await _transactionService.UpdateUserBalanceAsync(false, null, transaction, currentUser, category, account);

            await _transactionService.DeleteTransactionAsync(transaction);

            return NoContent();
        }
    }
}
