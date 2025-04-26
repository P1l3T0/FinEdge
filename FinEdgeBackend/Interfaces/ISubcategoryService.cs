using FinEdgeBackend.DTOs;
using FinEdgeBackend.Models;

namespace FinEdgeBackend.Interfaces
{
    public interface ISubcategoryService
    {
        Task CreateSubcategoryAsync(Subcategory subcategory);
        Task UpdateSubcategoryAsync(SubcategoryDTO subcategoryDto, Subcategory subcategory);
        Task<Subcategory> GetSubcategoryByIdAsync(int subcategoryID);
        Task<Subcategory> GetSubcategoryByNameAsync(Category category, string name);
        Task<ICollection<Subcategory>> GetSubcategoriesByCategoryIdAsync(int categoryID);
        List<KeyValuePair<string, ICollection<string>>> GetSubcategoryNamesByCategory(ICollection<Category> categories);
        Task DeleteSubcategoryAsync(Subcategory subcategory);
        bool Validate(SubcategoryDTO subcategoryDto);
    }
}
