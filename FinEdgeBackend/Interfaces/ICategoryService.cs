using FinEdgeBackend.DTOs;
using FinEdgeBackend.Models;

namespace FinEdgeBackend.Interfaces
{
    public interface ICategoryService
    {
        Task<Category> CreateCategoryAsync(Category category);
        Task<Category> UpdateCategoryAsync(CategoryDTO categoryDto, Category category);
        Task<Category> GetCategoryById(int categoryID);
        Task<ICollection<Category>> GetAllCategoriesForCurrentUser(User currentUser);
        bool Validate(CategoryDTO categoryDto);
        void DeleteCategory(Category category);
    }
}
