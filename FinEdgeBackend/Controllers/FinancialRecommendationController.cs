﻿using FinEdgeBackend.DTOs;
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

        [HttpPost]
        [Route("create")]
        public async Task<IActionResult> CreateFinancialRecommendation([FromBody] PromptRequest promptRequestData)
        {
            User currentUser = await _userSerice.GetCurrentUserAsync();

            if (!DateTime.TryParse(promptRequestData.DateString, out DateTime parsedDate))
            {
                await _notificationService.CreateNotificationAsync(new Notification()
                {
                    Title = "Invalid date. Please use a valid date!",
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

            string rules = @$"I want your response to always be in the scope of the project, that is Financial Recommendations, any other out-of-scope prompts need to turneed down with a sentence like 'This request is out of scrope for me', 
                        start with something like 'Recommendations based on data from {parsedDate.ToShortDateString()} to today (or similar sentences).";
            string textTweaks = @$"Please respond in short plain text (maximum of 3-4 sentences only), without any formatting, such as bold text, dashes, slashes, numbering, ordered/unordered list, or special characters.";

            string prompt = string.Join(" ", promptRequestData.Prompt!, allData, rules, textTweaks).Trim();

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
                Title = "Recommendation created successfully!",
                Description = $"Recommendation for prompt '{promptRequestData.Prompt}' has been successfully created",
                NotificationType = NotificationType.Success,
                IsRead = false,
                User = currentUser,
                UserID = currentUser.ID
            });

            FinancialRecommendation latestRecommendation = _financialRecommendationService.GetLatestFinancialRecommendation(currentUser.FinancialRecommendations);

            return Ok(latestRecommendation);
        }

        [HttpDelete]
        [Route("delete")]
        public async Task<IActionResult> DeleteFinancialRecommendations()
        {
            User currentUser = await _userSerice.GetCurrentUserAsync();

            await _financialRecommendationService.DeleteRecommendationsAsync(currentUser.FinancialRecommendations);

            await _notificationService.CreateNotificationAsync(new Notification()
            {
                Title = "Recommendation deleted successfully!",
                Description = "All recommendations have been permanently removed from the system.",
                NotificationType = NotificationType.Success,
                IsRead = false,
                User = currentUser,
                UserID = currentUser.ID
            });

            return NoContent();
        }
    }
}
