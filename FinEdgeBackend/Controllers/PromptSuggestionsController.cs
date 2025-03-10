using FinEdgeBackend.Interfaces;
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
    }
}
