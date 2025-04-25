using FinEdgeBackend.DTOs.Categories;
using FinEdgeBackend.Models;

namespace FinEdgeBackend.Interfaces
{
    public interface ICategoryService
    {
        Task<Category> CreateCategoryAsync(Category category);
        Task UpdateCategoryAsync(CategoryDTO categoryDto, Category category);
        Task<Category> GetCategoryForCurrentUserByIdAsync(int categoryID, User currentUser);
        Task<Category> GetCategoryForCurrentUserByNameAsync(string categoryName, User currentUser);
        Task<ICollection<Category>> GetAllCategoriesForCurrentUserAsync(User user);
        ICollection<Category> GetExpenditureCategories(ICollection<Category> categories);
        ICollection<Category> GetIncomeCategories(ICollection<Category> categories);
        ICollection<CategoryInfoDTO> GetCategoryInfo(ICollection<Category> categories);
        ICollection<CategoryChartDataDTO> GetCategoryChartData(ICollection<Category> categories);
        Task DeleteCategoryAsync(Category category);
        Task DeleteAllCategoriesAsync(ICollection<Category> categories);
        (decimal balance, decimal budget, decimal averageBalance, decimal averageBudget) GetDataForCategories(ICollection<Category> categories);
        decimal GetMonthlyBalanceForIncomeCategories(Category category);
        decimal GetMonthlyBalanceForExpenditureCategories(Category category);
        bool Validate(CategoryDTO categoryDto);
    }
}
