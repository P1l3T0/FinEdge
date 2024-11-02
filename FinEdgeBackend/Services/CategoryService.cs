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

        public async Task<Category> CreateCategoryAsync(Category category)
        {
            _dataContext.Categories.Add(category);
            await _dataContext.SaveChangesAsync();
            return null!;
        }

        public async Task<Category> UpdateCategoryAsync(CategoryDTO categoryDto, Category category)
        {
            category.Name = categoryDto.Name;
            category.Currency = categoryDto.Currency;
            //category.Balance = categoryDto.Balance;
            category.Budget = categoryDto.Budget;
            category.IsIncome = categoryDto.IsIncome;

            _dataContext.Categories.Update(category);
            await _dataContext.SaveChangesAsync();
            return null!;
        }

        public async Task<Category> GetCategoryByIdAsync(int categoryID)
        {
            Category? category = await _dataContext.Categories
                .Include(c => c.User)
                .FirstOrDefaultAsync(c => c.ID == categoryID);

            return category!;
        }

        public async Task<ICollection<Category>> GetAllCategoriesForCurrentUserAsync(User currentUser)
        {
            ICollection<Category> categories = await _dataContext.Categories.Where(c => c.User == currentUser).ToListAsync();
            return categories;
        }

        public async Task DeleteCategoryAsync(Category category)
        {
            _dataContext.Categories.Remove(category);
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

        public decimal GetBalanceForAllExpenditureCategories(ICollection<Category> categories)
        {
            decimal balance = categories
                .Where(category => !category.IsIncome)
                .Sum(category => category.Balance ?? 0);

            return balance;
        }

        public decimal GetBalanceForAllIncomeCategories(ICollection<Category> categories)
        {
            decimal balance = categories
                .Where(category => category.IsIncome)
                .Sum(category => category.Balance ?? 0);

            return balance;
        }

        public decimal GetBudgetForAllExpenditureCategories(ICollection<Category> categories)
        {
            decimal budget = categories
                .Where(category => !category.IsIncome)
                .Sum(category => category.Budget ?? 0);

            return budget;
        }

        public decimal GetBudgetForAllIncomeCategories(ICollection<Category> categories)
        {
            decimal budget = categories
                .Where(category => category.IsIncome)
                .Sum(category => category.Budget ?? 0);

            return budget;
        }

        public bool Validate(CategoryDTO categoryDto)
        {
            if (string.IsNullOrEmpty(categoryDto.Name))
            {
                return false;
            }

            return true;
        }
    }
}
