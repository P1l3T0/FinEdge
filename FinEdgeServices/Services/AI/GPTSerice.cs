using FinEdgeData.DTOs;
using FinEdgeData.Models;
using FinEdgeServices.Interfaces;
using OpenAI.Chat;
using System.ClientModel;
using Microsoft.Extensions.Configuration;

namespace FinEdgeServices.Services
{
    public class GPTService(IConfiguration configuration) : IGPTService
    {
        private readonly IConfiguration _configuration = configuration;

        public async Task<GPTResponseDTO> Ask(string prompt, User currentUser)
        {
            string apiKey = _configuration.GetSection("Appsettings:OpenAIAPIKEY").Value!;
            string model = _configuration.GetSection("Appsettings:Model").Value!;

            ChatClient chatClient = new ChatClient(model, apiKey);
            ClientResult<ChatCompletion> completion = await chatClient.CompleteChatAsync(prompt);
            string response = completion.Value.Content[0].Text.Trim();

            return new GPTResponseDTO
            {
                Response = response
            };
        }
    }
}
