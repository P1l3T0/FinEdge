using FinEdgeBackend.DTOs;
using FinEdgeBackend.Enums;
using FinEdgeBackend.Interfaces;
using FinEdgeBackend.Models;
using Microsoft.AspNetCore.Mvc;

namespace FinEdgeBackend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TransactionController(ITransactionService transactionService ,ICategoryService categoryService, IAccountService accountService, IUserService userService, INotificationService notificationService) : Controller
    {
        private readonly ITransactionService _transactionService = transactionService;
        private readonly ICategoryService _categoryService = categoryService;
        private readonly IAccountService _accountService = accountService;
        private readonly IUserService _userService = userService;
        private readonly INotificationService _notificationService = notificationService;

        [HttpPost]
        [Route("create")]
        public async Task<IActionResult> CreateTransaction([FromBody] TransactionDTO transactionDto)
        {
            User currentUser = await _userService.GetCurrentUserAsync();

            if (!_transactionService.Validate(transactionDto))
            {
                await _notificationService.CreateNotificationAsync(new Notification()
                {
                    Title = "Please fill in the Transaction fields!",
                    NotificationType = NotificationType.Error,
                    IsRead = false,
                    User = currentUser,
                    UserID = currentUser.ID
                });

                return BadRequest();
            }

            Category category = await _categoryService.GetCategoryForCurrentUserByNameAsync(transactionDto.CategoryName!, currentUser);
            Account account = await _accountService.GetAccountForCurrentUserByNameAsync(transactionDto.AccountName!, currentUser);

            await _transactionService.UpdateUserBalanceAsync(true, transactionDto, null, currentUser, category, account);

            await _transactionService.CreateTransactionAsync(new Transaction()
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
                IsRepeating = transactionDto.IsRepeating,
                NextRepeatDate = transactionDto.IsRepeating ? DateTime.UtcNow.AddMonths(1) : null
            });

            await _notificationService.CreateNotificationAsync(new Notification()
            {
                Title = $"Transaction {transactionDto.Name} created successffuly",
                NotificationType = NotificationType.Success,
                IsRead = false,
                User = currentUser,
                UserID = currentUser.ID
            });

            return Created();
        }

        [HttpGet]
        [Route("get")]
        public async Task<IActionResult> GetAllTransactions()
        {
            User currentUser = await _userService.GetCurrentUserAsync();
            ICollection<Transaction> transactions = await _transactionService.GetAllTransactionsAsync(currentUser);
            ICollection<Transaction> expenditureTransactions = await _transactionService.GetAllExpenditureTransactionsAsync(currentUser);
            ICollection<Transaction> incomeTransactions = await _transactionService.GetAllIncomeTransactionsAsync(currentUser);

            return Ok(new
            {
                AllTransactions = transactions,
                IncomeTransactions = incomeTransactions,
                ExpenditureTransactions = expenditureTransactions
            });
        }

        [HttpGet]
        [Route("get/reports")]
        public async Task<IActionResult> GetReports()
        {
            User currentUser = await _userService.GetCurrentUserAsync();

            ICollection<Transaction> incomeTransactions = await _transactionService.GetAllIncomeTransactionsAsync(currentUser);
            ICollection<Transaction> expenditureTransactions = await _transactionService.GetAllExpenditureTransactionsAsync(currentUser);

            decimal dailyIncome = _transactionService.GetDailyBalanceForTransactions(incomeTransactions);
            (decimal weeklyIncome, decimal weeklyAverage) = _transactionService.GetWeeklyBalanceForTransactions(incomeTransactions);
            (decimal monthIncome, decimal monthAverage) = _transactionService.GetMontlyBalanceForTransactions(incomeTransactions);

            decimal dailySpendings = _transactionService.GetDailyBalanceForTransactions(expenditureTransactions);
            (decimal weeklySpendings, decimal weeklySpendingsAverage) = _transactionService.GetWeeklyBalanceForTransactions(expenditureTransactions);
            (decimal monthSpendings, decimal monthSpendingsAverage) = _transactionService.GetMontlyBalanceForTransactions(expenditureTransactions);

            return Ok(new
            {
                DailyIncome = dailyIncome,
                WeeklyIncome = weeklyIncome,
                WeeklyAverage = weeklyAverage,
                MonthlyIncome = monthIncome,
                MonthlyAverage = monthAverage,
                DailySpendings = dailySpendings,
                WeeklySpendings = weeklySpendings,
                WeeklySpendingsAverage = weeklySpendingsAverage,
                MonthlySpendings = monthSpendings,
                MonthlySpendingsAverage = monthSpendingsAverage
            });
        }

        [HttpPut]
        [Route("update/{transactionID}")]
        public async Task<IActionResult> UpdateTransaction(int transactionID, [FromBody] TransactionDTO transactionDto)
        {
            User currentUser = await _userService.GetCurrentUserAsync();

            if (!_transactionService.Validate(transactionDto))
            {
                await _notificationService.CreateNotificationAsync(new Notification()
                {
                    Title = "Please fill in the Transaction fields!",
                    NotificationType = NotificationType.Error,
                    IsRead = false,
                    User = currentUser,
                    UserID = currentUser.ID
                });

                return BadRequest();
            }

            Transaction transaction = await _transactionService.GetTransactionByIdAsync(transactionID);
            Category category = await _categoryService.GetCategoryForCurrentUserByNameAsync(transactionDto.CategoryName!, currentUser);
            Account dtoAccount = await _accountService.GetAccountForCurrentUserByNameAsync(transactionDto.AccountName!, currentUser);
            Account originalAccount = transaction.Account!;

            await _transactionService.UpdateTranssactionAsync(transactionDto, transaction, category, dtoAccount, originalAccount, currentUser);

            await _notificationService.CreateNotificationAsync(new Notification()
            {
                Title = $"Transaction {transactionDto.Name} updated successfully",
                NotificationType = NotificationType.Success,
                IsRead = false,
                User = currentUser,
                UserID = currentUser.ID
            });

            return NoContent();
        }

        [HttpDelete]
        [Route("delete/{transactionID}")]
        public async Task<IActionResult> DeleteTransaction(int transactionID)
        {
            Transaction transaction = await _transactionService.GetTransactionByIdAsync(transactionID);
            Category category = transaction.Category!;
            Account account = transaction.Account!;
            User currentUser = transaction.User!;

            await _transactionService.UpdateUserBalanceAsync(false, null, transaction, currentUser, category, account);

            await _transactionService.DeleteTransactionAsync(transaction);

            await _notificationService.CreateNotificationAsync(new Notification()
            {
                Title = $"Transaction {transaction.Name} deleted successfully",
                NotificationType = NotificationType.Success,
                IsRead = false,
                User = currentUser,
                UserID = currentUser.ID
            });

            return NoContent();
        }
    }
}
