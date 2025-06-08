using FakeItEasy;
using FinEdgeBackend.Controllers;
using FinEdgeServices.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace FinEdgeTests.Controller
{
    public class PromptSuggestionsControllerTest
    {
        private readonly IPromptSuggestionsService _promptSuggestionsService;
        private readonly PromptSuggestionsController _controller;

        public PromptSuggestionsControllerTest()
        {
            _promptSuggestionsService = A.Fake<IPromptSuggestionsService>();
            _controller = new PromptSuggestionsController(_promptSuggestionsService);
        }

        [Fact]
        public void PromptSuggestionsController_ReturnsOk()
        {
            List<string> suggestion = new List<string>() { "Suggestion 1", "Suggestion 2", "Suggestion 3" };

            A.CallTo(() => _promptSuggestionsService.GetPromptSuggestions()).Returns(suggestion);

            IActionResult result = _controller.GetPromptSuggestions();

            Assert.IsType<OkObjectResult>(result);
        }
    }
}
