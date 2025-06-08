using FinEdgeServices.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace FinEdgeBackend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PromptSuggestionsController(IPromptSuggestionsService promptSuggestionsService) : Controller
    {
        private readonly IPromptSuggestionsService _promptSuggestionsService = promptSuggestionsService;

        [HttpGet]
        [Route("get")]
        [ProducesResponseType(200, Type = typeof(ICollection<string>))]
        public IActionResult GetPromptSuggestions()
        {
            ICollection<string> suggestions = _promptSuggestionsService.GetPromptSuggestions();
            return Ok(suggestions);
        }

        [HttpGet]
        [Route("get-account-suggestions")]
        [ProducesResponseType(200, Type = typeof(ICollection<string>))]
        public IActionResult GetAccountSuggestions()
        {
            ICollection<string> suggestions = _promptSuggestionsService.GetAccountSuggestions();
            return Ok(suggestions);
        }

        [HttpGet]
        [Route("get-category-suggestions")]
        [ProducesResponseType(200, Type = typeof(ICollection<string>))]
        public IActionResult GetCategorySuggestions()
        {
            ICollection<string> suggestions = _promptSuggestionsService.GetCategorySuggestions();
            return Ok(suggestions);
        }

        [HttpGet]
        [Route("get-transaction-suggestions")]
        [ProducesResponseType(200, Type = typeof(ICollection<string>))]
        public IActionResult GetTransactionSuggestions()
        {
            ICollection<string> suggestions = _promptSuggestionsService.GetTransactionSuggestions();
            return Ok(suggestions);
        }
    }
}
