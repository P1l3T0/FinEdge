using FinEdgeData.DTOs;
using FinEdgeData.Models;
using FinEdgeServices.Interfaces;
using FinEdgeBackend.Controllers;
using Microsoft.AspNetCore.Mvc;
using FakeItEasy;

namespace FinEdgeTests.Controller
{
    public class FinancialRecommendationControllerrTest
    {
        private readonly IGPTService _gPTService;
        private readonly IUserService _userService;
        private readonly ITransactionService _transactionService;
        private readonly IFinancialRecommendationService _financialRecommendationService;
        private readonly INotificationService _notificationService;
        private readonly FinancialRecommendationController _controller;

        public FinancialRecommendationControllerrTest()
        {
            _gPTService = A.Fake<IGPTService>();
            _userService = A.Fake<IUserService>();
            _transactionService = A.Fake<ITransactionService>();
            _financialRecommendationService = A.Fake<IFinancialRecommendationService>();
            _notificationService = A.Fake<INotificationService>();

            _controller = new FinancialRecommendationController(_gPTService, _userService, _transactionService, _financialRecommendationService, _notificationService);
        }

        [Fact]
        public async Task CreateFinancialRecommendation_ReturnsBadRequest()
        {
            PromptRequest promptRequest = new PromptRequest() { Prompt = "Test Prompt", DateString = "invalid-date" };
            User user = new User() { ID = 1, Name = "Test User" };

            A.CallTo(() => _userService.GetCurrentUserAsync()).Returns(Task.FromResult(user));

            IActionResult result = await _controller.CreateFinancialRecommendation(promptRequest);

            Assert.IsType<BadRequestResult>(result);
            A.CallTo(() => _notificationService.CreateNotificationAsync(A<Notification>._)).MustHaveHappenedOnceExactly();
        }

        [Fact]
        public async Task CreateFinancialRecommendation_ReturnsOk()
        {
            string samplePrompt = "sample prompt";
            PromptRequest promptRequest = new PromptRequest() { Prompt = "Test Prompt", DateString = "2025-03-09" };
            User user = new User() { ID = 1, Name = "Test User", Transactions = new List<Transaction>(), Accounts = new List<Account>(), Categories = new List<Category>() };
            GPTResponseDTO gptResponse = new GPTResponseDTO() { Response = "Test Response" };
            FinancialRecommendation recommendation = new FinancialRecommendation() { ID = 1, Title = "Test Prompt", ResponseContent = "Test Response", UserID = 1 };

            A.CallTo(() => _userService.GetCurrentUserAsync()).Returns(Task.FromResult(user));
            A.CallTo(() => _gPTService.Ask(samplePrompt, user)).Returns(Task.FromResult(gptResponse));
            A.CallTo(() => _financialRecommendationService.CreateRecommendationAsync(A<FinancialRecommendation>.Ignored)).Returns(Task.FromResult(recommendation));
            A.CallTo(() => _notificationService.CreateNotificationAsync(A<Notification>.Ignored)).Returns(Task.CompletedTask);
            A.CallTo(() => _financialRecommendationService.GetLatestFinancialRecommendation(user.FinancialRecommendations)).Returns(recommendation);

            IActionResult result = await _controller.CreateFinancialRecommendation(promptRequest);

            OkObjectResult okResult = Assert.IsType<OkObjectResult>(result);
            FinancialRecommendation returnedRecommendation = Assert.IsType<FinancialRecommendation>(okResult.Value);
            Assert.Equal(recommendation.ID, returnedRecommendation.ID);
            A.CallTo(() => _notificationService.CreateNotificationAsync(A<Notification>.Ignored)).MustHaveHappenedOnceExactly();
        }

        [Fact]
        public async Task DeleteFinancialRecommendations_ReturnsNoContent()
        {
            User user = new User() { ID = 1, Name = "Test User", FinancialRecommendations = new List<FinancialRecommendation>() };

            A.CallTo(() => _userService.GetCurrentUserAsync()).Returns(Task.FromResult(user));
            A.CallTo(() => _financialRecommendationService.DeleteRecommendationsAsync(user.FinancialRecommendations)).Returns(Task.CompletedTask);
            A.CallTo(() => _notificationService.CreateNotificationAsync(A<Notification>.Ignored)).Returns(Task.CompletedTask);

            IActionResult result = await _controller.DeleteFinancialRecommendations();

            Assert.IsType<NoContentResult>(result);
            A.CallTo(() => _notificationService.CreateNotificationAsync(A<Notification>.Ignored)).MustHaveHappenedOnceExactly();
        }
    }
}
