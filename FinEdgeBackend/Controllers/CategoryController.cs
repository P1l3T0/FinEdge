﻿using FinEdgeBackend.DTOs;
using FinEdgeBackend.Interfaces;
using FinEdgeBackend.Models;
using Microsoft.AspNetCore.Mvc;

namespace FinEdgeBackend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CategoryController(ICategoryService categoryService, IUserService userService) : Controller
    {
        private readonly ICategoryService _categoryService = categoryService;
        private readonly IUserService _userService = userService;

        [HttpPost]
        [Route("create")]
        public async Task<IActionResult> CreateCategory([FromBody] CategoryDTO categoryDto)
        {
            if (!_categoryService.Validate(categoryDto))
            {
                return BadRequest("Category must have name and be a positive number!");
            }

            User currentUser = await _userService.GetCurrentUserAsync();
            Category category = await _categoryService.GetCategoryForCurrentUserByNameAsync(categoryDto.Name!, currentUser);

            if (category is not null)
            {
                return BadRequest($"Category '{category.Name}' already exist!");
            }

            await _categoryService.CreateCategoryAsync(new Category
            {
                UserID = currentUser.ID,
                User = currentUser,
                Name = categoryDto.Name,
                Currency = categoryDto.Currency,
                Budget = categoryDto.Budget,
                IsIncome = categoryDto.IsIncome,
                Color = categoryDto.Color,
                DateCreated = DateTime.Now
            });

            return Created();
        }

        [HttpGet]
        [Route("get")]
        public async Task<IActionResult> GetCategories()
        {
            User currentUser = await _userService.GetCurrentUserAsync();
            ICollection<Category> incomeCategories = _categoryService.GetIncomeCategories(currentUser.Categories!);
            ICollection<Category> expenditureCategories = _categoryService.GetExpenditureCategories(currentUser.Categories!);

            decimal totalIncomeBalance = _categoryService.GetBalanceForIncomeCategories(incomeCategories);
            decimal totalIncomeBudget = _categoryService.GetBudgetForIncomeCategories(incomeCategories);

            decimal totalExpenditureBalance = _categoryService.GetBalanceForExpenditureCategories(expenditureCategories);
            decimal totalExpenditureBudget = _categoryService.GetBudgetForExpenditureCategories(expenditureCategories);

            return Ok(new
            {
                IncomeCategories = incomeCategories,
                ExpenditureCategories = expenditureCategories,
                TotalIncomeBalance = totalIncomeBalance,
                TotalIncomeBudget = totalIncomeBudget,
                TotalExpenditureBalance = totalExpenditureBalance,
                TotalExpenditureBudget = totalExpenditureBudget
            });
        }

        [HttpGet]
        [Route("get/info")]
        public async Task<IActionResult> GetInfoForCategories()
        {
            User currentUser = await _userService.GetCurrentUserAsync();
            ICollection<Category> incomeCategories = _categoryService.GetIncomeCategories(currentUser.Categories!);
            ICollection<Category> expenditureCategories = _categoryService.GetExpenditureCategories(currentUser.Categories!);

            ICollection<CategoryInfoDTO> incomeInfo = _categoryService.GetCategoryInfo(incomeCategories);
            ICollection<CategoryInfoDTO> expenditureInfo = _categoryService.GetCategoryInfo(expenditureCategories);

            decimal totalIncome = incomeInfo.Sum(i => i.Ammount);
            decimal totalExpense= expenditureInfo.Sum(i => i.Ammount);

            return Ok(new
            {
                IncomeInfo = incomeInfo,
                ExpenditureInfo = expenditureInfo
            });
        }

        [HttpPut]
        [Route("update/{categoryID}")]
        public async Task<IActionResult> UpdateCategory(int categoryID, [FromBody] CategoryDTO categoryDto)
        {
            if (!_categoryService.Validate(categoryDto))
            {
                return BadRequest("Error with the account fields");
            }

            User currentUser = await _userService.GetCurrentUserAsync();
            Category category = await _categoryService.GetCategoryForCurrentUserByIdAsync(categoryID, currentUser);

            await _categoryService.UpdateCategoryAsync(categoryDto, category);

            return NoContent();
        }

        [HttpDelete]
        [Route("delete/{categoryID}")]
        public async Task<IActionResult> DeleteCategory(int categoryID)
        {
            User currentUser = await _userService.GetCurrentUserAsync();
            Category category = await _categoryService.GetCategoryForCurrentUserByIdAsync(categoryID, currentUser);

            await _categoryService.DeleteCategoryAsync(category);

            return NoContent();
        }

        [HttpDelete]
        [Route("delete-all")]
        public async Task<IActionResult> DeleteAllCategories()
        {
            User currentUser = await _userService.GetCurrentUserAsync();

            await _categoryService.DeleteAllCategoriesAsync(currentUser.Categories!);

            return NoContent();
        }
    }
}
