using FinEdgeBackend.Interfaces;
using FinEdgeBackend.Models;
using OpenAI.Chat;
using System.ClientModel;

namespace FinEdgeBackend.Services
{
    public class GPTService(IConfiguration configuration) : IGPTService
    {
        private readonly IConfiguration _configuration = configuration;

        public async Task<FinancialRecommendation> Ask(string prompt, User currentUser)
        {
            string apiKey = _configuration.GetSection("Appsettings:OpenAIAPIKEY").Value!;
            string model = _configuration.GetSection("Appsettings:Model").Value!;

            ChatClient chatClient = new ChatClient(model, apiKey);
            ClientResult<ChatCompletion> completion = await chatClient.CompleteChatAsync(prompt);
            string response = completion.Value.Content[0].Text.Trim();

            return new FinancialRecommendation
            {
                Recommendation = response,
                UserID = currentUser.ID,
                User = currentUser
            };
        }
    }
}
