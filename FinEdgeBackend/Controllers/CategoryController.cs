using FinEdgeBackend.DTOs;
using FinEdgeBackend.Enums;
using FinEdgeBackend.Interfaces;
using FinEdgeBackend.Models;
using Microsoft.AspNetCore.Mvc;

namespace FinEdgeBackend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CategoryController(ICategoryService categoryService, IUserService userService, INotificationService notificationService) : Controller
    {
        private readonly ICategoryService _categoryService = categoryService;
        private readonly IUserService _userService = userService;
        private readonly INotificationService _notificationService = notificationService;

        [HttpPost]
        [Route("create")]
        public async Task<IActionResult> CreateCategory([FromBody] CategoryDTO categoryDto)
        {
            User currentUser = await _userService.GetCurrentUserAsync();

            if (!_categoryService.Validate(categoryDto))
            {
                await _notificationService.CreateNotificationAsync(new Notification()
                {
                    Message = "Category must have a name and be a positive number!",
                    NotificationType = NotificationType.Error,
                    IsRead = false,
                    User = currentUser,
                    UserID = currentUser.ID
                });

                return BadRequest();
            }

            Category category = await _categoryService.GetCategoryForCurrentUserByNameAsync(categoryDto.Name!, currentUser);

            if (category is not null)
            {
                await _notificationService.CreateNotificationAsync(new Notification()
                {
                    Message = $"Category '{category.Name}' already exist!",
                    NotificationType = NotificationType.Error,
                    IsRead = false,
                    User = currentUser,
                    UserID = currentUser.ID
                });

                return BadRequest();
            }

            await _categoryService.CreateCategoryAsync(new Category()
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

            await _notificationService.CreateNotificationAsync(new Notification()
            {
                Message = $"Category '{categoryDto.Name}' created successfully!",
                NotificationType = NotificationType.Success,
                IsRead = false,
                User = currentUser,
                UserID = currentUser.ID
            });

            return Created();
        }

        [HttpGet]
        [Route("get-income")]
        public async Task<IActionResult> GetIncomeCategories()
        {
            User currentUser = await _userService.GetCurrentUserAsync();
            ICollection<Category> incomeCategories = _categoryService.GetIncomeCategories(currentUser.Categories!);

            (decimal balance, decimal budget, decimal averageBalance, decimal averageBudget) = _categoryService.GetDataForCategories(incomeCategories);

            return Ok(new
            {
                Categories = incomeCategories,
                Balance = balance,
                Budget = budget,
                AverageBalance = averageBalance,
                AverageBudget = averageBudget
            });
        }

        [HttpGet]
        [Route("get-expenditure")]
        public async Task<IActionResult> GetExpenditureCategories()
        {
            User currentUser = await _userService.GetCurrentUserAsync();
            ICollection<Category> expenditureCategories = _categoryService.GetExpenditureCategories(currentUser.Categories!);

            (decimal balance, decimal budget, decimal averageBalance, decimal averageBudget) = _categoryService.GetDataForCategories(expenditureCategories);

            return Ok(new
            {
                Categories = expenditureCategories,
                Balance = balance,
                Budget = budget,
                AverageBalance = averageBalance,
                AverageBudget = averageBudget
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
            User currentUser = await _userService.GetCurrentUserAsync();

            if (!_categoryService.Validate(categoryDto))
            {
                await _notificationService.CreateNotificationAsync(new Notification()
                {
                    Message = "Please fill in the category fields!",
                    NotificationType = NotificationType.Error,
                    IsRead = false,
                    User = currentUser,
                    UserID = currentUser.ID
                });

                return BadRequest();
            }

            Category category = await _categoryService.GetCategoryForCurrentUserByIdAsync(categoryID, currentUser);

            await _categoryService.UpdateCategoryAsync(categoryDto, category);

            await _notificationService.CreateNotificationAsync(new Notification()
            {
                Message = $"Category {category.Name} updated successfully!",
                NotificationType = NotificationType.Success,
                IsRead = false,
                User = currentUser,
                UserID = currentUser.ID
            });

            return NoContent();
        }

        [HttpDelete]
        [Route("delete/{categoryID}")]
        public async Task<IActionResult> DeleteCategory(int categoryID)
        {
            User currentUser = await _userService.GetCurrentUserAsync();
            Category category = await _categoryService.GetCategoryForCurrentUserByIdAsync(categoryID, currentUser);

            await _notificationService.CreateNotificationAsync(new Notification()
            {
                Message = $"Category {category.Name} deleted successfully!",
                NotificationType = NotificationType.Success,
                IsRead = false,
                User = currentUser,
                UserID = currentUser.ID
            });

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
