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

            await _categoryService.CreateCategoryAsync(new Category
            {
                UserID = currentUser.ID,
                User = currentUser,
                Name = categoryDto.Name,
                Currency = categoryDto.Currency,
                Budget = categoryDto.Budget,
                IsIncome = categoryDto.IsIncome,
                DateCreated = DateTime.Now
            });

            return Created();
        }

        [HttpGet]
        [Route("get/income")]
        public async Task<IActionResult> GetIncomeCategories()
        {
            User currentUser = await _userService.GetCurrentUserAsync();
            ICollection<Category> incomeCategories = _categoryService.GetIncomeCategories(currentUser.Categories!);

            decimal totalBalance = _categoryService.GetBalanceForIncomeCategories(incomeCategories);
            decimal totalBudget = _categoryService.GetBudgetForIncomeCategories(incomeCategories);

            return Ok(new
            {
                Categories = incomeCategories,
                TotalBalance = totalBalance,
                TotalBudget = totalBudget
            });
        }

        [HttpGet]
        [Route("get/expenditure")]
        public async Task<IActionResult> GetExpenditureCategories()
        {
            User currentUser = await _userService.GetCurrentUserAsync();
            ICollection<Category> expenditureCategories = _categoryService.GetExpenditureCategories(currentUser.Categories!);

            decimal totalBalance = _categoryService.GetBalanceForExpenditureCategories(expenditureCategories);
            decimal totalBudget = _categoryService.GetBudgetForExpenditureCategories(expenditureCategories);

            return Ok(new
            {
                Categories = expenditureCategories,
                TotalBalance = totalBalance,
                TotalBudget = totalBudget
            });
        }

        [HttpPut]
        [Route("update")]
        public async Task<IActionResult> UpdateCategory([FromQuery] int categoryID, [FromBody] CategoryDTO categoryDto)
        {
            if (!_categoryService.Validate(categoryDto))
            {
                return BadRequest("Error with the account fields");
            }

            Category category = await _categoryService.GetCategoryByIdAsync(categoryID);

            await _categoryService.UpdateCategoryAsync(categoryDto, category);

            return NoContent();
        }

        [HttpDelete]
        [Route("delete")]
        public async Task<IActionResult> DeleteCategory([FromQuery] int categoryID)
        {
            Category category = await _categoryService.GetCategoryByIdAsync(categoryID);

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
