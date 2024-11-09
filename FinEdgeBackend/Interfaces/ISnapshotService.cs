namespace FinEdgeBackend.Interfaces
{
    public interface ISnapshotService
    {
        Task GenerateMonthlySnapshotsAsync(int userID);
    }
}
