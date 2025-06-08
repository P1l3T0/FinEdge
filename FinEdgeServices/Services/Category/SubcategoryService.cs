using FinEdgeData.Data;
using FinEdgeData.Models;
using FinEdgeServices.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace FinEdgeServices.Services
{
    public class SubcategoryService(DataContext dataContext) : ISubcategoryService
    {
        private readonly DataContext _dataContext = dataContext;

        public async Task CreateSubcategoryAsync(Subcategory subcategory)
        {
            _dataContext.Subcategories.Add(subcategory);
            await _dataContext.SaveChangesAsync();
        }

        public async Task<Subcategory> GetSubcategoryByNameAsync(Category category, string subcategoryName)
        {
            Subcategory? subcategory = await _dataContext.Subcategories.FirstOrDefaultAsync(sc => sc.Name == subcategoryName && sc.CategoryID == category.ID);

            return subcategory!;
        }

        public List<KeyValuePair<string, ICollection<string>>> GetSubcategoryNamesByCategory(ICollection<Category> categories)
        {
            return categories.Select(category => new KeyValuePair<string, ICollection<string>>(
                    category.Name!,
                    category.Subcategories!.Select(sub => sub.Name!).ToList()
                ))
                .ToList();
        }
    }
}
