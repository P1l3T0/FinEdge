using FinEdgeBackend.Data;
using FinEdgeBackend.DTOs;
using FinEdgeBackend.Interfaces;
using FinEdgeBackend.Models;
using Microsoft.EntityFrameworkCore;

namespace FinEdgeBackend.Services
{
    public class SubcategoryService(DataContext dataContext) : ISubcategoryService
    {
        private readonly DataContext _dataContext = dataContext;

        public async Task CreateSubcategoryAsync(Subcategory subcategory)
        {
            _dataContext.Subcategories.Add(subcategory);
            await _dataContext.SaveChangesAsync();
        }

        public async Task UpdateSubcategoryAsync(SubcategoryDTO subcategoryDto, Subcategory subcategory)
        {
            subcategory.Name = subcategoryDto.Name;

            _dataContext.Subcategories.Update(subcategory);
            await _dataContext.SaveChangesAsync();
        }

        public async Task<Subcategory> GetSubcategoryByIdAsync(int subcategoryID)
        {
            Subcategory? subcategory = await _dataContext.Subcategories.FirstOrDefaultAsync(sc => sc.ID == subcategoryID);

            return subcategory!;
        }

        public async Task<ICollection<Subcategory>> GetSubcategoriesByCategoryIdAsync(int categoryID)
        {
            Category? category = await _dataContext.Categories
                .Include(c => c.Subcategories)
                .FirstOrDefaultAsync(c => c.ID == categoryID);

            return category!.Subcategories!;
        }

        public async Task DeleteSubcategoryAsync(Subcategory subcategory)
        {
            _dataContext.Subcategories.Remove(subcategory);
            await _dataContext.SaveChangesAsync();
        }

        public bool Validate(SubcategoryDTO subcategoryDto)
        {
            if (string.IsNullOrEmpty(subcategoryDto.Name))
            {
                return false;
            }

            return true;
        }
    }
}
