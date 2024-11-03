using FinEdgeBackend.DTOs;
using FinEdgeBackend.Models;

namespace FinEdgeBackend.Interfaces
{
    public interface ISubcategoryService
    {
        Task<Subcategory> CreateSubcategoryAsync(Subcategory subcategory);
        Task<Subcategory> UpdateSubcategoryAsync(SubcategoryDTO subcategoryDto, Subcategory subcategory);
        Task<Subcategory> GetSubcategoriesByCategoryIdAsync(int categoryID);
        Task DeleteSubcategoryAsync(Subcategory subcategory);
    }
}
