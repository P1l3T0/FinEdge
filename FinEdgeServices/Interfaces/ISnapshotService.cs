namespace FinEdgeServices.Interfaces
{
    public interface ISnapshotService
    {
        Task GenerateMonthlySnapshotsAsync(int userID);
    }
}
