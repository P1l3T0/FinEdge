using FakeItEasy;
using FinEdgeBackend.Controllers;
using FinEdgeBackend.DTOs.Transactions;
using FinEdgeBackend.Interfaces;
using FinEdgeBackend.Models;
using Microsoft.AspNetCore.Mvc;

namespace FinEdgeTests.Controller
{
    public class TransactionControllerTest
    {
        private readonly ITransactionService _transactionService;
        private readonly ICategoryService _categoryService;
        private readonly IAccountService _accountService;
        private readonly IUserService _userService;
        private readonly INotificationService _notificationService;
        private readonly TransactionController _controller;

        public TransactionControllerTest()
        {
            _transactionService = A.Fake<ITransactionService>();
            _categoryService = A.Fake<ICategoryService>();
            _accountService = A.Fake<IAccountService>();
            _userService = A.Fake<IUserService>();
            _notificationService = A.Fake<INotificationService>();

            _controller = new TransactionController(_transactionService, _categoryService, _accountService, _userService, _notificationService);
        }

        [Fact]
        public async Task TransactionController_CreateTransaction_InvalidData_ReturnsBadRequest()
        {
            TransactionDTO transactionDto = new TransactionDTO() { Name = "", Amount = -1 };
            User user = new User() { ID = 1, Name = "Test User" };

            A.CallTo(() => _userService.GetCurrentUserAsync()).Returns(Task.FromResult(user));
            A.CallTo(() => _transactionService.Validate(transactionDto)).Returns(false);

            IActionResult result = await _controller.CreateTransaction(transactionDto);

            Assert.IsType<BadRequestResult>(result);
            A.CallTo(() => _notificationService.CreateNotificationAsync(A<Notification>.Ignored)).MustHaveHappenedOnceExactly();
        }

        [Fact]
        public async Task TransactionController_CreateTransaction_ValidData_ReturnsCreated()
        {
            TransactionDTO transactionDto = new TransactionDTO() { Name = "Test Transaction", Amount = 100, CategoryName = "Test Category", AccountName = "Test Account", IsRepeating = false };
            User user = new User() { ID = 1, Name = "Test User" };
            Category category = new Category() { ID = 1, Name = "Test Category" };
            Account account = new Account() { ID = 1, Name = "Test Account" };

            A.CallTo(() => _userService.GetCurrentUserAsync()).Returns(Task.FromResult(user));
            A.CallTo(() => _transactionService.Validate(transactionDto)).Returns(true);
            A.CallTo(() => _categoryService.GetCategoryForCurrentUserByNameAsync(transactionDto.CategoryName, user)).Returns(Task.FromResult(category));
            A.CallTo(() => _accountService.GetAccountForCurrentUserByNameAsync(transactionDto.AccountName, user)).Returns(Task.FromResult(account));
            A.CallTo(() => _transactionService.CreateTransactionAsync(A<Transaction>.Ignored)).Returns(Task.CompletedTask);
            A.CallTo(() => _notificationService.CreateNotificationAsync(A<Notification>.Ignored)).Returns(Task.CompletedTask);

            IActionResult result = await _controller.CreateTransaction(transactionDto);

            Assert.IsType<CreatedResult>(result);
            A.CallTo(() => _notificationService.CreateNotificationAsync(A<Notification>.Ignored)).MustHaveHappenedOnceExactly();
        }

        [Fact]
        public async Task TransactionController_GetAllTransactions_ReturnsOk()
        {
            User user = new User() { ID = 1, Name = "Test User" };

            List<Transaction> transactions = new List<Transaction>()
            {
                new Transaction() { ID = 1, Name = "Transaction1" },
                new Transaction() { ID = 2, Name = "Transaction2" }
            };

            List<Transaction> expenditureTransactions = new List<Transaction>()
            {
                new Transaction() { ID = 1, Name = "Expenditure1" },
                new Transaction() { ID = 2, Name = "Expenditure2" }
            };

            List<Transaction> incomeTransactions = new List<Transaction>()
            {
                new Transaction() { ID = 1, Name = "Income1" },
                new Transaction() { ID = 2, Name = "Income2" }
            };

            A.CallTo(() => _userService.GetCurrentUserAsync()).Returns(Task.FromResult(user));
            A.CallTo(() => _transactionService.GetAllTransactionsAsync(user)).Returns(Task.FromResult((ICollection<Transaction>)transactions));
            A.CallTo(() => _transactionService.GetAllExpenditureTransactionsAsync(user)).Returns(Task.FromResult((ICollection<Transaction>)expenditureTransactions));
            A.CallTo(() => _transactionService.GetAllIncomeTransactionsAsync(user)).Returns(Task.FromResult((ICollection<Transaction>)incomeTransactions));

            IActionResult result = await _controller.GetAllTransactions();

            Assert.IsType<OkObjectResult>(result);
        }

        [Fact]
        public async Task TransactionController_GetReports_ReturnsOk()
        {
            User user = new User() { ID = 1, Name = "Test User" };

            List<Transaction> incomeTransactions = new List<Transaction>()
            {
                new Transaction() { ID = 1, Name = "Income1" },
                new Transaction() { ID = 2, Name = "Income2" }
            };

            List<Transaction> expenditureTransactions = new List<Transaction>()
            {
                new Transaction() { ID = 1, Name = "Expenditure1" },
                new Transaction() { ID = 2, Name = "Expenditure2" }
            };

            A.CallTo(() => _userService.GetCurrentUserAsync()).Returns(Task.FromResult(user));
            A.CallTo(() => _transactionService.GetAllIncomeTransactionsAsync(user)).Returns(Task.FromResult((ICollection<Transaction>)incomeTransactions));
            A.CallTo(() => _transactionService.GetAllExpenditureTransactionsAsync(user)).Returns(Task.FromResult((ICollection<Transaction>)expenditureTransactions));
            A.CallTo(() => _transactionService.GetDailyBalanceForTransactions(incomeTransactions)).Returns(100);
            A.CallTo(() => _transactionService.GetWeeklyBalanceForTransactions(incomeTransactions)).Returns((700, 100));
            A.CallTo(() => _transactionService.GetMontlyBalanceForTransactions(incomeTransactions)).Returns((3000, 100));
            A.CallTo(() => _transactionService.GetDailyBalanceForTransactions(expenditureTransactions)).Returns(50);
            A.CallTo(() => _transactionService.GetWeeklyBalanceForTransactions(expenditureTransactions)).Returns((350, 50));
            A.CallTo(() => _transactionService.GetMontlyBalanceForTransactions(expenditureTransactions)).Returns((1500, 50));

            IActionResult result = await _controller.GetReports();

            Assert.IsType<OkObjectResult>(result);
        }

        [Fact]
        public async Task TransactionController_GetSankeyData_ReturnsOk()
        {
            User user = new User() { ID = 1, Name = "Test User" };
            TransactionSankeyChartDTO sankeyData = new TransactionSankeyChartDTO();

            A.CallTo(() => _userService.GetCurrentUserAsync()).Returns(Task.FromResult(user));
            A.CallTo(() => _transactionService.GetSankeyChartDataAsync(user.Categories)).Returns(sankeyData);

            IActionResult result = await _controller.GetSankeyData();

            OkObjectResult okResult = Assert.IsType<OkObjectResult>(result);
            TransactionSankeyChartDTO returnedSankeyData = Assert.IsType<TransactionSankeyChartDTO>(okResult.Value);

            Assert.Equal(sankeyData, returnedSankeyData);
        }

        [Fact]
        public async Task TransactionController_UpdateTransaction_InvalidData_ReturnsBadRequest()
        {
            TransactionDTO transactionDto = new TransactionDTO() { Name = "", Amount = -1 };
            User user = new User() { ID = 1, Name = "Test User" };

            A.CallTo(() => _userService.GetCurrentUserAsync()).Returns(Task.FromResult(user));
            A.CallTo(() => _transactionService.Validate(transactionDto)).Returns(false);

            IActionResult result = await _controller.UpdateTransaction(1, transactionDto);

            Assert.IsType<BadRequestResult>(result);
            A.CallTo(() => _notificationService.CreateNotificationAsync(A<Notification>.Ignored)).MustHaveHappenedOnceExactly();
        }

        [Fact]
        public async Task TransactionController_UpdateTransaction_ValidData_ReturnsNoContent()
        {
            TransactionDTO transactionDto = new TransactionDTO() { Name = "Updated Transaction", Amount = 200, CategoryName = "Test Category", AccountName = "Test Account", IsRepeating = false };
            Transaction transaction = new Transaction() { ID = 1, Name = "Test Transaction" };
            Category category = new Category() { ID = 1, Name = "Test Category" };
            Account dtoAccount = new Account() { ID = 1, Name = "Test Account" };
            Account originalAccount = new Account() { ID = 2, Name = "Original Account" };
            User user = new User() { ID = 1, Name = "Test User" };

            A.CallTo(() => _userService.GetCurrentUserAsync()).Returns(Task.FromResult(user));
            A.CallTo(() => _transactionService.Validate(transactionDto)).Returns(true);
            A.CallTo(() => _transactionService.GetTransactionByIdAsync(1)).Returns(Task.FromResult(transaction));
            A.CallTo(() => _categoryService.GetCategoryForCurrentUserByNameAsync(transactionDto.CategoryName, user)).Returns(Task.FromResult(category));
            A.CallTo(() => _accountService.GetAccountForCurrentUserByNameAsync(transactionDto.AccountName, user)).Returns(Task.FromResult(dtoAccount));
            A.CallTo(() => _transactionService.UpdateTranssactionAsync(transactionDto, transaction, category, dtoAccount, originalAccount, user)).Returns(Task.CompletedTask);
            A.CallTo(() => _notificationService.CreateNotificationAsync(A<Notification>.Ignored)).Returns(Task.CompletedTask);

            IActionResult result = await _controller.UpdateTransaction(1, transactionDto);

            Assert.IsType<NoContentResult>(result);
            A.CallTo(() => _notificationService.CreateNotificationAsync(A<Notification>.Ignored)).MustHaveHappenedOnceExactly();
        }

        [Fact]
        public async Task TransactionController_DeleteTransaction_ReturnsNoContent()
        {
            User user = new User() { ID = 1, Name = "Test User" };
            Category category = new Category() { ID = 1, Name = "Test Category" };
            Account account = new Account() { ID = 1, Name = "Test Account" };
            Transaction transaction = new Transaction() { ID = 1, Name = "Test Transaction", User = user, Account = account, Category = category };

            A.CallTo(() => _userService.GetCurrentUserAsync()).Returns(Task.FromResult(user));
            A.CallTo(() => _transactionService.GetTransactionByIdAsync(1)).Returns(Task.FromResult(transaction));
            A.CallTo(() => _transactionService.DeleteTransactionAsync(transaction)).Returns(Task.CompletedTask);
            A.CallTo(() => _notificationService.CreateNotificationAsync(A<Notification>.Ignored)).Returns(Task.CompletedTask);

            IActionResult result = await _controller.DeleteTransaction(1);

            Assert.IsType<NoContentResult>(result);
            A.CallTo(() => _notificationService.CreateNotificationAsync(A<Notification>.Ignored)).MustHaveHappenedOnceExactly();
        }
    }
}
