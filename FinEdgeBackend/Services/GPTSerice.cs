using FinEdgeBackend.Interfaces;
using FinEdgeBackend.Models;
using OpenAI.Chat;
using System.ClientModel;
using FinEdgeBackend.Data;

namespace FinEdgeBackend.Services
{
    public class GPTService(IConfiguration configuration, DataContext dataContext) : IGPTService
    {
        private readonly IConfiguration _configuration = configuration;
        private readonly DataContext _dataContext = dataContext;

        public async Task Ask(string prompt, User currentUser)
        {
            string apiKey = _configuration.GetSection("Appsettings:OpenAIAPIKEY").Value!;
            string model = _configuration.GetSection("Appsettings:Model").Value!;

            ChatClient chatClient = new ChatClient(model, apiKey);
            ClientResult<ChatCompletion> completion = await chatClient.CompleteChatAsync(prompt);
            string response = completion.Value.Content[0].Text.Trim();

            _dataContext.FinancialRecommendations.Add(new FinancialRecommendation
            {
                Recommendation = response, 
                UserID = currentUser.ID,
                User = currentUser
            });

            await _dataContext.SaveChangesAsync();
        }
    }
}
