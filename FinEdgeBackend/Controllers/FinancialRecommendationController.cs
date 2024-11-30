using FinEdgeBackend.DTOs;
using FinEdgeBackend.Interfaces;
using FinEdgeBackend.Models;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;

namespace FinEdgeBackend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class FinancialRecommendationController(IGPTService gPTService, IUserService userService, ITransactionService transactionService, IFinancialRecommendationService financialRecommendationService) : Controller
    {
        private readonly IGPTService _gPTService = gPTService;
        private readonly IUserService _userSerice = userService;
        private readonly ITransactionService _transactionService = transactionService;
        private readonly IFinancialRecommendationService _financialRecommendationService = financialRecommendationService;

        [HttpGet]
        [Route("get")]
        [ProducesResponseType(200, Type = typeof(ICollection<FinancialRecommendation>))]
        public async Task<IActionResult> GetFinancialRecommendations()
        {
            User currentUser = await _userSerice.GetCurrentUserAsync();
            ICollection<FinancialRecommendation> financialRecommendations = currentUser.FinancialRecommendations;

            return Ok(financialRecommendations);
        }

        [HttpPost]
        [Route("create")]
        public async Task<IActionResult> CreateFinancialRecommendation([FromBody] DateRequest dateRequest)
        {
            if (!DateTime.TryParse(dateRequest.DateString, out DateTime parsedDate))
            {
                return BadRequest("Invalid date. Please use a valid date.");
            }

            User currentUser = await _userSerice.GetCurrentUserAsync();
            ICollection<Transaction> transactions = _transactionService.GetTransactionsFromSpecifiedDate(currentUser.Transactions, parsedDate);

            string accountsJson = JsonSerializer.Serialize(currentUser.Accounts, new JsonSerializerOptions { WriteIndented = true });
            string categoriesJson = JsonSerializer.Serialize(currentUser.Categories, new JsonSerializerOptions { WriteIndented = true });
            string transactionsJson = JsonSerializer.Serialize(transactions, new JsonSerializerOptions { WriteIndented = true });

            string prompt = @$"
                I am a user managing my personal finances and tracking all my spending habits. Here's an overview of my financial data:
                Accounts: {accountsJson}, Categories: {categoriesJson}, Transactions: {transactionsJson}. All the transactions are from {parsedDate} until today.

                The main issues that concern me as a user are: 
                - I want to know if my spendings and allocation of finances align with my chosen financial methodology: {currentUser.MethodologyType}. If my spending habbits do not align with the category, please provide suggestions on how to fix them.
                - Identify any unusually high spending in the past week or month and suggest ways to avoid it.
                - Highlight categories where spending is close to or has exceeded the budget (if it is an income category, that is good).
                - Flag recurring transactions or subscriptions that might not be necessary.
                - Recommend ways to manage cash flow better and align expenses with income.
                - Suggest practical tips to save money or optimize spending in overspent categories.
                - If there are opportunities to grow savings or invest, provide recommendations.

                Also I want your response to always start with something like 'Recommendations based on data from {parsedDate.ToShortDateString()} to today (or similar sentences). The responsse should include how much money has been spent overall, on what categories 
                and suggestions based on the above list. Please respond in small plain text (maximum of 3-4 sentences only), without any formatting, such as bold text, dashes, slashes, numbering, ordered/unordered list, or special characters. A simple, clear explanation is enough.".Trim();

            GPTResponseDTO gPTResponse =  await _gPTService.Ask(prompt, currentUser);

            await _financialRecommendationService.CreateRecommendationAsync(new FinancialRecommendation
            {
                Recommendation = gPTResponse.Response,
                UserID = currentUser.ID,
                User = currentUser
            }); 

            return Created();
        }

        [HttpDelete]
        [Route("delete")]
        public async Task<IActionResult> DeleteFinancialRecommendations()
        {
            User currentUser = await _userSerice.GetCurrentUserAsync();
            ICollection<FinancialRecommendation> financialRecommendations = currentUser.FinancialRecommendations;

            await _financialRecommendationService.DeleteRecommendationsAsync(financialRecommendations);

            return NoContent();
        }
    }
}
