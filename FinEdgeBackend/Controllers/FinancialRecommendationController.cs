using FinEdgeBackend.DTOs;
using FinEdgeBackend.Enums;
using FinEdgeBackend.Interfaces;
using FinEdgeBackend.Models;
using FinEdgeBackend.Models.PromptData;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;

namespace FinEdgeBackend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class FinancialRecommendationController(IGPTService gPTService, IUserService userService, ITransactionService transactionService, 
        IFinancialRecommendationService financialRecommendationService, INotificationService notificationService) : Controller
    {
        private readonly IGPTService _gPTService = gPTService;
        private readonly IUserService _userSerice = userService;
        private readonly ITransactionService _transactionService = transactionService;
        private readonly IFinancialRecommendationService _financialRecommendationService = financialRecommendationService;
        private readonly INotificationService _notificationService = notificationService;

        [HttpGet]
        [Route("get")]
        [ProducesResponseType(200, Type = typeof(FinancialRecommendation))]
        public async Task<IActionResult> GetFinancialRecommendations()
        {
            User currentUser = await _userSerice.GetCurrentUserAsync();
            FinancialRecommendation latestRecommendation = _financialRecommendationService.GetLatestFinancialRecommendation(currentUser.FinancialRecommendations);

            return Ok(latestRecommendation);
        }

        [HttpPost]
        [Route("create")]
        public async Task<IActionResult> CreateFinancialRecommendation([FromBody] PromptRequest promptRequestData)
        {
            User currentUser = await _userSerice.GetCurrentUserAsync();

            if (!DateTime.TryParse(promptRequestData.DateString, out DateTime parsedDate))
            {
                await _notificationService.CreateNotificationAsync(new Notification()
                {
                    Message = "Invalid date. Please use a valid date!",
                    NotificationType = NotificationType.Error,
                    IsRead = false,
                    User = currentUser,
                    UserID = currentUser.ID
                });

                return BadRequest();
            }

            ICollection<Transaction> transactions = _transactionService.GetTransactionsFromSpecifiedDate(currentUser.Transactions, parsedDate);

            JsonSerializerOptions options = new JsonSerializerOptions { WriteIndented = true };

            string accountsJson = JsonSerializer.Serialize(currentUser.Accounts, options);
            string categoriesJson = JsonSerializer.Serialize(currentUser.Categories, options);
            string transactionsJson = JsonSerializer.Serialize(transactions, options);

            string allData = string.Join(",", accountsJson, categoriesJson, transactionsJson);

            string textTweaks = @$"I want your response to always start with something like 'Recommendations based on data from {parsedDate.ToShortDateString()} to today (or similar sentences). 
                Please respond in small plain text (maximum of 3-4 sentences only), without any formatting, such as bold text, dashes, slashes, numbering, ordered/unordered list, or special characters. 
                A simple, clear explanation is enough.";

            string prompt = string.Join(" ", promptRequestData.Prompt!, allData, textTweaks).Trim();

            GPTResponseDTO gPTResponse = await _gPTService.Ask(prompt, currentUser);

            await _financialRecommendationService.CreateRecommendationAsync(new FinancialRecommendation()
            {
                Title = promptRequestData.Prompt,
                ResponseContent = gPTResponse.Response,
                UserID = currentUser.ID,
                User = currentUser
            });

            await _notificationService.CreateNotificationAsync(new Notification()
            {
                Message = "Recommendation created successfully!",
                NotificationType = NotificationType.Success,
                IsRead = false,
                User = currentUser,
                UserID = currentUser.ID
            });

            return Created();
        }

        [HttpDelete]
        [Route("delete")]
        public async Task<IActionResult> DeleteFinancialRecommendations()
        {
            User currentUser = await _userSerice.GetCurrentUserAsync();

            await _financialRecommendationService.DeleteRecommendationsAsync(currentUser.FinancialRecommendations);

            return NoContent();
        }
    }
}
