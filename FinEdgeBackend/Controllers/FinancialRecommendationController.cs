using FinEdgeBackend.Interfaces;
using FinEdgeBackend.Models;
using Microsoft.AspNetCore.Mvc;

namespace FinEdgeBackend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class FinancialRecommendationController(IGPTService gPTService, IUserService userService) : Controller
    {
        private readonly IGPTService _gPTService = gPTService;
        private readonly IUserService _userSerice = userService;

        [HttpGet]
        [Route("get")]
        public async Task<IActionResult> GetFinancialRecommendation()
        {
            User currentUser = await _userSerice.GetCurrentUserAsync();

            string propt = @$"I am a user who wants to keep track of all of my finances, so I have created the following accounts {currentUser.Accounts}, categories: {currentUser.Categories} and transactions: {currentUser.Transactions}.
                    I want to get information based on how much money I have spent in the last week and if a transaction appears unusually higher price and makes a category go beyond its declared budget, I want some recommendations what to do next time
                    so I don't spend that much money";

            FinancialRecommendation financialRecommendation = await _gPTService.Ask(propt, currentUser);

            return Ok(financialRecommendation);
        }
    }
}
