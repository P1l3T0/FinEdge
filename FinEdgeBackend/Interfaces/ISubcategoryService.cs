using FinEdgeBackend.DTOs;
using FinEdgeBackend.Models;

namespace FinEdgeBackend.Interfaces
{
    public interface ISubcategoryService
    {
        Task CreateSubcategoryAsync(Subcategory subcategory);
        Task UpdateSubcategoryAsync(SubcategoryDTO subcategoryDto, Subcategory subcategory);
        Task<Subcategory> GetSubcategoryByIdAsync(int subcategoryID);
        Task<ICollection<Subcategory>> GetSubcategoriesByCategoryIdAsync(int categoryID);
        Task DeleteSubcategoryAsync(Subcategory subcategory);
        bool Validate(SubcategoryDTO subcategoryDto);
    }
}
