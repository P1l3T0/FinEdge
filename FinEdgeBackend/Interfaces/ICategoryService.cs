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
        decimal GetBalanceForCategory(Category category);
        decimal GetBudgetForCategory(Category category);
        decimal GetBalanceForAllCategories(ICollection<Category> categories);
        decimal GetBudgetForAllCategories(ICollection<Category> categories);
        bool Validate(CategoryDTO categoryDto);
    }
}
