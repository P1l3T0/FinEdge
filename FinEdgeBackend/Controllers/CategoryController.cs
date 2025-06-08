using FinEdgeData.DTOs;
using FinEdgeData.Enums;
using FinEdgeData.Models;
using FinEdgeServices.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace FinEdgeBackend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CategoryController(ICategoryService categoryService, ISubcategoryService subcategoryService, IUserService userService, INotificationService notificationService) : Controller
    {
        private readonly ICategoryService _categoryService = categoryService;
        private readonly ISubcategoryService _subcategoryService = subcategoryService;
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
                    Title = "Category must have a name and be a positive number!",
                    Description = $"The Category with name {categoryDto.Name} and budget {categoryDto.Budget} {categoryDto.Currency} must have valid properties",
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
                    Title = $"Category '{category.Name}' already exist!",
                    Description = "There is already a Category that hhas this name",
                    NotificationType = NotificationType.Error,
                    IsRead = false,
                    User = currentUser,
                    UserID = currentUser.ID
                });

                return BadRequest();
            }

            Category createdCategory = await _categoryService.CreateCategoryAsync(new Category()
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

            if (!string.IsNullOrEmpty(categoryDto.Subcategories))
            {
                string[] categories = categoryDto.Subcategories.Split(new[] { ',', ' ' }, StringSplitOptions.RemoveEmptyEntries);

                foreach (string subcategoryName in categories)
                {
                    await _subcategoryService.CreateSubcategoryAsync(new Subcategory()
                    {
                        Name = subcategoryName,
                        Category = createdCategory,
                        CategoryID = createdCategory!.ID
                    });
                }
            }

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

        [HttpGet]
        [Route("get/chart-data")]
        public async Task<IActionResult> GetCategoryChartData()
        {
            User currentUser = await _userService.GetCurrentUserAsync();
            ICollection<CategoryChartDataDTO >categoryChartData = _categoryService.GetCategoryChartData(currentUser.Categories);

            return Ok(categoryChartData);
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
                    Title = "Please fill in the category fields!",
                    Description = $"The Category '{categoryDto.Name}' must have valid properties",
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
                Title = $"Category '{category.Name}' updated successfully!",
                Description = $"All changes to category '{category.Name}' have been saved successfully.",
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
                Title = $"Category '{category.Name}' deleted successfully!",
                Description = $"Category '{category.Name}' has been permanently removed from the system.",
                NotificationType = NotificationType.Success,
                IsRead = false,
                User = currentUser,
                UserID = currentUser.ID
            });

            await _categoryService.DeleteCategoryAsync(category);

            return NoContent();
        }
    }
}
