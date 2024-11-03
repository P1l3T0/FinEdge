using FinEdgeBackend.DTOs;
using FinEdgeBackend.Models;

namespace FinEdgeBackend.Interfaces
{
    public interface ISubcategoryService
    {
        Task<Subcategory> CreateSubcategoryAsync(Subcategory subcategory);
        Task<Subcategory> UpdateSubcategoryAsync(SubcategoryDTO subcategoryDto, Subcategory subcategory);
        Task<Subcategory> GetSubcategoryByIdAsync(int subcategoryID);
        Task<ICollection<Subcategory>> GetSubcategoriesByCategoryIdAsync(int categoryID);
        Task DeleteSubcategoryAsync(Subcategory subcategory);
        bool Validate(SubcategoryDTO subcategoryDto);
    }
}
