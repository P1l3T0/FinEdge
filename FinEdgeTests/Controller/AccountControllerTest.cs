using FakeItEasy;
using FinEdgeBackend.Controllers;
using FinEdgeBackend.DTOs.Accounts;
using FinEdgeBackend.Interfaces;
using FinEdgeBackend.Models;
using Microsoft.AspNetCore.Mvc;

namespace FinEdgeTests.Controller
{
    public class AccountControllerTest
    {
        private readonly IUserService _userService;
        private readonly IAccountService _accountService;
        private readonly INotificationService _notificationService;
        private readonly AccountsController _controller;

        public AccountControllerTest()
        {
            _userService = A.Fake<IUserService>();
            _accountService = A.Fake<IAccountService>();
            _notificationService = A.Fake<INotificationService>();

            _controller = new AccountsController(_userService, _accountService, _notificationService);
        }

        [Fact]
        public async Task AccountsController_CreateAccount_InvalidData_ReturnsBadRequest()
        {
            AccountDTO accountDto = new AccountDTO() { Name = "", Balance = -1 };
            User user = new User() { ID = 1, Name = "Test User" };

            A.CallTo(() => _userService.GetCurrentUserAsync()).Returns(Task.FromResult(user));
            A.CallTo(() => _accountService.Validate(accountDto)).Returns(false);

            IActionResult result = await _controller.CreateAccount(accountDto);

            Assert.IsType<BadRequestResult>(result);
            A.CallTo(() => _notificationService.CreateNotificationAsync(A<Notification>.Ignored)).MustHaveHappenedOnceExactly();
        }

        [Fact]
        public async Task AccountsController_CreateAccount_ExistingAccount_ReturnsBadRequest()
        {
            AccountDTO accountDto = new AccountDTO() { Name = "Test Account", Balance = 100, Currency = "USD", Color = "Blue", AccountType = "Savings" };
            User user = new User() { ID = 1, Name = "Test User", TotalBalance = 0 };
            Account account = new Account();

            A.CallTo(() => _userService.GetCurrentUserAsync()).Returns(Task.FromResult(user));
            A.CallTo(() => _accountService.Validate(accountDto)).Returns(true);
            A.CallTo(() => _accountService.GetAccountForCurrentUserByNameAsync(accountDto.Name, user)).Returns(Task.FromResult(account));
            A.CallTo(() => _accountService.CreateAccountAsync(A<Account>.Ignored)).Returns(Task.CompletedTask);

            IActionResult result = await _controller.CreateAccount(accountDto);

            Assert.IsType<BadRequestResult>(result);
            A.CallTo(() => _notificationService.CreateNotificationAsync(A<Notification>.Ignored)).MustHaveHappenedOnceExactly();
        }

        [Fact]
        public async Task AccountsController_CreateAccount_ValidData_ReturnsOk()
        {
            AccountDTO accountDto = new AccountDTO() { Name = "Test Account", Balance = 100, Currency = "USD", Color = "Blue", AccountType = "Savings" };
            User user = new User() { ID = 1, Name = "Test User", TotalBalance = 0 };

            A.CallTo(() => _userService.GetCurrentUserAsync()).Returns(Task.FromResult(user));
            A.CallTo(() => _accountService.Validate(accountDto)).Returns(true);
            A.CallTo(() => _accountService.GetAccountForCurrentUserByNameAsync(accountDto.Name, user)).Returns(Task.FromResult<Account>(null));
            A.CallTo(() => _accountService.CreateAccountAsync(A<Account>.Ignored)).Returns(Task.CompletedTask);

            IActionResult result = await _controller.CreateAccount(accountDto);

            Assert.IsType<OkObjectResult>(result);
        }

        [Fact]
        public async Task AccountsController_GetAccount_ReturnsOk()
        {
            Account account = new Account() { ID = 1, Name = "Test Account" };

            A.CallTo(() => _accountService.GetAccountByIdAsync(1)).Returns(Task.FromResult(account));

            IActionResult result = await _controller.GetAccount(1);

            OkObjectResult okResult = Assert.IsType<OkObjectResult>(result);
            Account returnedAccount = Assert.IsType<Account>(okResult.Value);

            Assert.Equal(account.ID, returnedAccount.ID);
        }

        [Fact]
        public async Task AccountsController_GetAccounts_ReturnsOk()
        {
            User user = new User() { ID = 1, Name = "Test User", Accounts = new List<Account> { new Account { Name = "Account1" }, new Account { Name = "Account2" } } };

            A.CallTo(() => _userService.GetCurrentUserAsync()).Returns(Task.FromResult(user));

            IActionResult result = await _controller.GetAccounts();

            OkObjectResult okResult = Assert.IsType<OkObjectResult>(result);
            ICollection<Account> returnedAccounts = Assert.IsType<List<Account>>(okResult.Value);

            Assert.Equal(user.Accounts.Count, returnedAccounts.Count);
        }

        [Fact]
        public async Task AccountsController_GetAccountChartData_ReturnsOk()
        {
            User user = new User() { ID = 1, Name = "Test User" };

            List<AccountChartDTO> chartData = new List<AccountChartDTO>()
            {
                new AccountChartDTO { Category = "Category1", Value = 100, Color = "red" },
                new AccountChartDTO { Category = "Category2", Value = 200, Color = "green" }
            };

            A.CallTo(() => _userService.GetCurrentUserAsync()).Returns(Task.FromResult(user));
            A.CallTo(() => _accountService.GetAccountChartDataAsync(user)).Returns(Task.FromResult((ICollection<AccountChartDTO>)chartData));

            IActionResult result = await _controller.GetAccountChartData();

            OkObjectResult okResult = Assert.IsType<OkObjectResult>(result);
            ICollection<AccountChartDTO> returnedChartData = Assert.IsType<List<AccountChartDTO>>(okResult.Value);

            Assert.Equal(chartData.Count, returnedChartData.Count);
        }

        [Fact]
        public async Task AccountsController_GetAccountStatistics_ReturnsOk()
        {
            User user = new User() { ID = 1, Name = "Test User" };
            AccountStatsDTO statistics = new AccountStatsDTO() { TotalBalance = 300, AverageBalance = 150 };

            A.CallTo(() => _userService.GetCurrentUserAsync()).Returns(Task.FromResult(user));
            A.CallTo(() => _accountService.GetAccountStatisticsAsync(user)).Returns(Task.FromResult(statistics));

            IActionResult result = await _controller.GetAccountStatistics();

            OkObjectResult okResult = Assert.IsType<OkObjectResult>(result);
            AccountStatsDTO returnedStatistics = Assert.IsType<AccountStatsDTO>(okResult.Value);

            Assert.Equal(statistics.TotalBalance, returnedStatistics.TotalBalance);
        }

        [Fact]
        public async Task AccountsController_UpdateAccount_InvalidData_ReturnsBadRequest()
        {
            AccountDTO accountDto = new AccountDTO() { Name = "", Balance = -1 };
            User user = new User() { ID = 1, Name = "Test User" };

            A.CallTo(() => _userService.GetCurrentUserAsync()).Returns(Task.FromResult(user));
            A.CallTo(() => _accountService.Validate(accountDto)).Returns(false);

            IActionResult result = await _controller.UpdateAccount(1, accountDto);

            Assert.IsType<BadRequestResult>(result);
            A.CallTo(() => _notificationService.CreateNotificationAsync(A<Notification>.Ignored)).MustHaveHappenedOnceExactly();
        }

        [Fact]
        public async Task AccountsController_UpdateAccount_ValidData_ReturnsNoContent()
        {
            AccountDTO accountDto = new AccountDTO() { Name = "Updated Account", Balance = 200, Currency = "USD", Color = "Red", AccountType = "Savings" };
            Account account = new Account() { ID = 1, Name = "Test Account" };
            User user = new User() { ID = 1, Name = "Test User" };

            A.CallTo(() => _userService.GetCurrentUserAsync()).Returns(Task.FromResult(user));
            A.CallTo(() => _accountService.Validate(accountDto)).Returns(true);
            A.CallTo(() => _accountService.GetAccountByIdAsync(1)).Returns(Task.FromResult(account));
            A.CallTo(() => _accountService.UpdateAccountAsync(accountDto, account)).Returns(Task.CompletedTask);
            A.CallTo(() => _notificationService.CreateNotificationAsync(A<Notification>.Ignored)).Returns(Task.CompletedTask);

            IActionResult result = await _controller.UpdateAccount(1, accountDto);

            Assert.IsType<NoContentResult>(result);
            A.CallTo(() => _notificationService.CreateNotificationAsync(A<Notification>.Ignored)).MustHaveHappenedOnceExactly();
        }

        [Fact]
        public async Task AccountsController_DeleteAccount_ReturnsNoContent()
        {
            User user = new User() { ID = 1, Name = "Test User", TotalBalance = 100 };
            Account account = new Account() { ID = 1, Name = "Test Account", Balance = 100, User = user };

            A.CallTo(() => _accountService.GetAccountByIdAsync(1)).Returns(Task.FromResult(account));
            A.CallTo(() => _accountService.DeleteAccountAsync(account)).Returns(Task.CompletedTask);
            A.CallTo(() => _notificationService.CreateNotificationAsync(A<Notification>.Ignored)).Returns(Task.CompletedTask);

            IActionResult result = await _controller.DeleteAccount(1);

            Assert.IsType<NoContentResult>(result);
            A.CallTo(() => _notificationService.CreateNotificationAsync(A<Notification>.Ignored)).MustHaveHappenedOnceExactly();
        }
    }
}
