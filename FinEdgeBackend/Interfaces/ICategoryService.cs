using FinEdgeBackend.DTOs;
using FinEdgeBackend.Models;

namespace FinEdgeBackend.Interfaces
{
    public interface ICategoryService
    {
        Task<Category> CreateCategoryAsync(Category category);
        Task<Category> UpdateCategoryAsync(CategoryDTO categoryDto, Category category);
        Task<Category> GetCategoryByIdAsync(int categoryID);
        Task<ICollection<Category>> GetAllCategoriesForCurrentUserAsync(User currentUser);
        Task DeleteCategoryAsync(Category category);
        decimal GetBalanceForExpenditureCategory(Category category);
        decimal GetBalanceForIncomeCategory(Category category);    
        decimal GetBudgetForExpenditureCategory(Category category);
        decimal GetBudgetForIncomeCategory(Category category);
        decimal GetBalanceForAllExpenditureCategories(ICollection<Category> categories);
        decimal GetBalanceForAllIncomeCategories(ICollection<Category> categories);
        decimal GetBudgetForAllExpenditureCategories(ICollection<Category> categories);
        decimal GetBudgetForAllIncomeCategories(ICollection<Category> categories);
        bool Validate(CategoryDTO categoryDto);
    }
}
