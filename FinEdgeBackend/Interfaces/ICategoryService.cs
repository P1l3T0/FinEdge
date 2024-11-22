using FinEdgeBackend.DTOs;
using FinEdgeBackend.Models;

namespace FinEdgeBackend.Interfaces
{
    public interface ICategoryService
    {
        Task CreateCategoryAsync(Category category);
        Task UpdateCategoryAsync(CategoryDTO categoryDto, Category category);
        Task<Category> GetCategoryForCurrentUserByIdAsync(int categoryID, User currentUser);
        Task<Category> GetCategoryForCurrentUserByNameAsync(string categoryName, User currentUser);
        Task<ICollection<Category>> GetAllCategoriesForCurrentUserAsync(User user);    
        ICollection<Category> GetExpenditureCategories(ICollection<Category> categories);
        ICollection<Category> GetIncomeCategories(ICollection<Category> categories);
        ICollection<CategoryInfoDTO> GetCategoryInfo(ICollection<Category> categories);
        Task DeleteCategoryAsync(Category category);
        Task DeleteAllCategoriesAsync(ICollection<Category> categories);
        decimal GetBalanceForExpenditureCategory(Category category);
        decimal GetBalanceForIncomeCategory(Category category);    
        decimal GetBudgetForExpenditureCategory(Category category);
        decimal GetBudgetForIncomeCategory(Category category);
        decimal GetBalanceForExpenditureCategories(ICollection<Category> categories);
        decimal GetBalanceForIncomeCategories(ICollection<Category> categories);
        decimal GetBudgetForExpenditureCategories(ICollection<Category> categories);
        decimal GetBudgetForIncomeCategories(ICollection<Category> categories);
        decimal GetMonthlyBalanceForIncomeCategories(Category category);
        decimal GetMonthlyBalanceForExpenditureCategories(Category category);
        bool Validate(CategoryDTO categoryDto);
    }
}
