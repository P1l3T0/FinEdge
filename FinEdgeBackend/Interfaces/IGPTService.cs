using FinEdgeBackend.DTOs;
using FinEdgeBackend.Models;

namespace FinEdgeBackend.Interfaces
{
    public interface IGPTService
    {
        public Task<GPTResponseDTO> Ask(string prompt, User currentUser);
    }
}
