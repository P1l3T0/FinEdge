﻿using FinEdgeBackend.DTOs;
using FinEdgeBackend.Models;

namespace FinEdgeBackend.Interfaces
{
    public interface ICategoryService
    {
        Task<Category> CreateCategoryAsync(Category category);
        Task<Category> UpdateCategoryAsync(CategoryDTO categoryDto, Category category);
        Task<Category> GetCategoryByIdAsync(int categoryID);
        ICollection<Category> GetExpenditureCategories(ICollection<Category> categories);
        ICollection<Category> GetIncomeCategories(ICollection<Category> categories);
        Task DeleteCategoryAsync(Category category);
        decimal GetBalanceForExpenditureCategory(Category category);
        decimal GetBalanceForIncomeCategory(Category category);    
        decimal GetBudgetForExpenditureCategory(Category category);
        decimal GetBudgetForIncomeCategory(Category category);
        decimal GetBalanceForExpenditureCategories(ICollection<Category> categories);
        decimal GetBalanceForIncomeCategories(ICollection<Category> categories);
        decimal GetBudgetForExpenditureCategories(ICollection<Category> categories);
        decimal GetBudgetForIncomeCategories(ICollection<Category> categories);
        bool Validate(CategoryDTO categoryDto);
    }
}
