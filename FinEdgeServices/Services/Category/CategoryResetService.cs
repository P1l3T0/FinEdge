using FinEdgeData.Data;
using FinEdgeData.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.DependencyInjection;

namespace FinEdgeServices.Services
{
    public class CategoryResetService : BackgroundService
    {
        private readonly IServiceProvider _serviceProvider;

        public CategoryResetService(IServiceProvider serviceProvider)
        {
            _serviceProvider = serviceProvider;
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            while (!stoppingToken.IsCancellationRequested)
            {
                DateTime now = DateTime.Now;
                DateTime nextMonth = new DateTime(now.Year, now.Month, 1).AddMonths(1);
                TimeSpan delay = nextMonth - now;

                await Task.Delay(delay, stoppingToken);

                using (IServiceScope scope = _serviceProvider.CreateScope())
                {
                    DataContext dbContext = scope.ServiceProvider.GetRequiredService<DataContext>();
                    var categories = await dbContext.Categories.ToListAsync(stoppingToken);

                    foreach (Category category in categories)
                    {
                        category.Balance = 0;
                        category.Budget = 0;
                    }

                    await dbContext.SaveChangesAsync(stoppingToken);
                }
            }
        }
    }
}
