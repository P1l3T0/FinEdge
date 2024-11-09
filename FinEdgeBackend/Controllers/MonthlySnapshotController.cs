using FinEdgeBackend.Interfaces;
using Hangfire;
using Microsoft.AspNetCore.Mvc;

namespace FinEdgeBackend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class MonthlySnapshotController : Controller
    {
        [HttpPost]
        [Route("create")]
        public async Task<IActionResult> CreateSnapshot([FromQuery] int userID)
        {
            // For future me - pass the user ID from a button click in order for this operation to work

            RecurringJob.AddOrUpdate<ISnapshotService>(
                "monthly-snapshot",
                service => service.GenerateMonthlySnapshotsAsync(userID),
                Cron.Minutely()
            );

            return Ok();
        }
    }
}
