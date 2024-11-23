using FinEdgeBackend.Models;

namespace FinEdgeBackend.Interfaces
{
    public interface IGPTService
    {
        public Task Ask(string prompt, User currentUser);
    }
}
