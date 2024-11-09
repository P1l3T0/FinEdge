using FinEdgeBackend.Data;
using FinEdgeBackend.Interfaces;
using FinEdgeBackend.Models;

namespace FinEdgeBackend.Services
{
    public class SnapshotService(DataContext dataContext, IUserService userService, ICategoryService categoryService) : ISnapshotService
    {
        private readonly DataContext _dataContext = dataContext;
        private readonly IUserService _userService = userService;
        private readonly ICategoryService _categoryService = categoryService;

        public async Task GenerateMonthlySnapshotsAsync(int userID)
        {
            string currentMonthName = DateTime.Now.ToString("MMMM");

            User currentUser = await _userService.GetUserByIdAsync(userID);
            ICollection<Category> categories = await _categoryService.GetAllCategoriesForCurrentUserAsync(currentUser);

            foreach (Category category in categories)
            {
                decimal totalIncome = _categoryService.GetMonthlyBalanceForIncomeCategories(category);
                decimal totalExpenses = _categoryService.GetMonthlyBalanceForExpenditureCategories(category);

                CategorySnapshot categorySnapshot =  new CategorySnapshot
                {
                    CategoryID = category.ID,
                    MonthName = currentMonthName,
                    TotalIncome = totalIncome,
                    TotalExpenses = totalExpenses,
                    DateCreated = category.DateCreated,
                };

                _dataContext.CategorySnapshots.Add(categorySnapshot);
                await _dataContext.SaveChangesAsync();

                category.Balance = 0;
            }

            await _dataContext.SaveChangesAsync();
        }
    }
}
