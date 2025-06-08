using FinEdgeData.DTOs;
using FinEdgeData.Models;

namespace FinEdgeServices.Interfaces
{
    public interface IGPTService
    {
        public Task<GPTResponseDTO> Ask(string prompt, User currentUser);
    }
}
