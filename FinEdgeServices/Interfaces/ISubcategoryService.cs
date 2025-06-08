using FinEdgeData.Models;

namespace FinEdgeServices.Interfaces
{
    public interface ISubcategoryService
    {
        Task CreateSubcategoryAsync(Subcategory subcategory);
        Task<Subcategory> GetSubcategoryByNameAsync(Category category, string name);
        List<KeyValuePair<string, ICollection<string>>> GetSubcategoryNamesByCategory(ICollection<Category> categories);
    }
}
