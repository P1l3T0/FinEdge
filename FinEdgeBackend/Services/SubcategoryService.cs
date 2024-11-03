using FinEdgeBackend.DTOs;
using FinEdgeBackend.Interfaces;
using FinEdgeBackend.Models;

namespace FinEdgeBackend.Services
{
    public class SubcategoryService : ISubcategoryService
    {
        public Task<Subcategory> CreateSubcategoryAsync(Subcategory subcategory)
        {
            throw new NotImplementedException();
        }

        public Task<Subcategory> UpdateSubcategoryAsync(SubcategoryDTO subcategoryDto, Subcategory subcategory)
        {
            throw new NotImplementedException();
        }

        public Task<Subcategory> GetSubcategoriesByCategoryIdAsync(int categoryID)
        {
            throw new NotImplementedException();
        }

        public Task DeleteSubcategoryAsync(Subcategory subcategory)
        {
            throw new NotImplementedException();
        }
    }
}
