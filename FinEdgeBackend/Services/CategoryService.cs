using FinEdgeBackend.Data;
using FinEdgeBackend.DTOs;
using FinEdgeBackend.Interfaces;
using FinEdgeBackend.Models;
using Microsoft.EntityFrameworkCore;

namespace FinEdgeBackend.Services
{
    public class CategoryService(DataContext dataContext) : ICategoryService
    {
        private readonly DataContext _dataContext = dataContext;

        public async Task CreateCategoryAsync(Category category)
        {
            _dataContext.Categories.Add(category);
            await _dataContext.SaveChangesAsync();
        }

        public async Task UpdateCategoryAsync(CategoryDTO categoryDto, Category category)
        {
            category.Name = categoryDto.Name;
            category.Currency = categoryDto.Currency;
            category.Budget = categoryDto.Budget;
            category.IsIncome = categoryDto.IsIncome;
            category.Color = categoryDto.Color;

            _dataContext.Categories.Update(category);
            await _dataContext.SaveChangesAsync();
        }

        public async Task<Category> GetCategoryForCurrentUserByIdAsync(int categoryID, User currentUser)
        {
            Category? category = await _dataContext.Categories
                .Include(c => c.User)
                .FirstOrDefaultAsync(c => c.ID == categoryID && c.User!.Equals(currentUser));

            return category!;
        }

        public async Task<Category> GetCategoryForCurrentUserByNameAsync(string categoryName, User currentUser)
        {
            Category? category = await _dataContext.Categories
                .Include(c => c.User)
                .FirstOrDefaultAsync(c => c.Name == categoryName && c.User!.Equals(currentUser));

            return category!;
        }

        public async Task<ICollection<Category>> GetAllCategoriesForCurrentUserAsync(User currentUser)
        {
            ICollection<Category> categories = await _dataContext.Categories.Where(c => c.User!.Equals(currentUser)).ToListAsync();
            return categories;
        }

        public ICollection<Category> GetExpenditureCategories(ICollection<Category> categories)
        {
            return categories.Where(category => !category.IsIncome).ToList();
        }

        public ICollection<Category> GetIncomeCategories(ICollection<Category> categories)
        {
            return categories.Where(category => category.IsIncome).ToList();
        }

        public ICollection<CategoryInfoDTO> GetCategoryInfo(ICollection<Category> categories)
        {
            return categories
                .Select(c => new CategoryInfoDTO
                {
                    Name = c.Name,
                    Ammount = c.Balance ?? 0,
                    Color = c.Color,
                })
                .ToList();
        }

        public async Task DeleteCategoryAsync(Category category)
        {
            _dataContext.Categories.Remove(category);
            await _dataContext.SaveChangesAsync();
        }

        public async Task DeleteAllCategoriesAsync(ICollection<Category> categories)
        {
            _dataContext.Categories.RemoveRange(categories);
            await _dataContext.SaveChangesAsync();
        }

        public decimal GetBalanceForExpenditureCategory(Category category)
        {
            return !category.IsIncome ? (decimal)category.Balance! : 0;
        }

        public decimal GetBalanceForIncomeCategory(Category category)
        {
            return category.IsIncome ? (decimal)category.Balance! : 0;
        }

        public decimal GetBudgetForExpenditureCategory(Category category)
        {
            return !category.IsIncome ? (decimal)category.Budget! : 0;
        }

        public decimal GetBudgetForIncomeCategory(Category category)
        {
            return category.IsIncome ? (decimal)category.Budget! : 0;
        }

        public decimal GetBalanceForExpenditureCategories(ICollection<Category> categories)
        {
            return categories.Sum(category => category.Balance ?? 0);
        }

        public decimal GetBalanceForIncomeCategories(ICollection<Category> categories)
        {
            return categories.Sum(category => category.Balance ?? 0);
        }

        public decimal GetBudgetForExpenditureCategories(ICollection<Category> categories)
        {
            return categories.Sum(category => category.Budget ?? 0);
        }

        public decimal GetBudgetForIncomeCategories(ICollection<Category> categories)
        {
            return categories.Sum(category => category.Budget ?? 0);
        }

        public decimal GetMonthlyBalanceForIncomeCategories(Category category)
        {
            return category.Transactions!
                .Where(t => t.CategoryID == category.ID
                    && t.DateCreated.Month == DateTime.Now.Month
                    && t.DateCreated.Year == DateTime.Now.Year
                    && t.Category!.IsIncome)
                .Sum(t => t.Amount ?? 0);
        }

        public decimal GetMonthlyBalanceForExpenditureCategories(Category category)
        {
            return category.Transactions!
                .Where(t => t.CategoryID == category.ID
                    && t.DateCreated.Month == DateTime.Now.Month
                    && t.DateCreated.Year == DateTime.Now.Year
                    && !t.Category!.IsIncome)
                .Sum(t => t.Amount ?? 0);
        }

        public bool Validate(CategoryDTO categoryDto)
        {
            if (string.IsNullOrEmpty(categoryDto.Name) || decimal.IsNegative((decimal)categoryDto.Budget!))
            {
                return false;
            }

            return true;
        }
    }
}
