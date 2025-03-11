using FakeItEasy;
using FinEdgeBackend.Controllers;
using FinEdgeBackend.DTOs.Categories;
using FinEdgeBackend.Interfaces;
using FinEdgeBackend.Models;
using Microsoft.AspNetCore.Mvc;

namespace FinEdgeTests.Controller
{
    public class CategoryControllerTest
    {
        private readonly ICategoryService _categoryService;
        private readonly IUserService _userService;
        private readonly INotificationService _notificationService;
        private readonly CategoryController _controller;

        public CategoryControllerTest()
        {
            _categoryService = A.Fake<ICategoryService>();
            _userService = A.Fake<IUserService>();
            _notificationService = A.Fake<INotificationService>();

            _controller = new CategoryController(_categoryService, _userService, _notificationService);
        }

        [Fact]
        public async Task CategoryController_CreateCategory_InvalidData_ReturnsBadRequest()
        {
            CategoryDTO categoryDto = new CategoryDTO() { Name = "", Budget = -1 };
            User user = new User() { ID = 1, Name = "Test User" };

            A.CallTo(() => _userService.GetCurrentUserAsync()).Returns(Task.FromResult(user));
            A.CallTo(() => _categoryService.Validate(categoryDto)).Returns(false);

            IActionResult result = await _controller.CreateCategory(categoryDto);

            Assert.IsType<BadRequestResult>(result);
            A.CallTo(() => _notificationService.CreateNotificationAsync(A<Notification>.Ignored)).MustHaveHappenedOnceExactly();
        }

        [Fact]
        public async Task CategoryController_CreateCategory_ExistingCategory_ReturnsBadRequest()
        {
            User user = new User() { ID = 1, Name = "Test User", TotalBalance = 0 };
            CategoryDTO categoryDto = new CategoryDTO() { Name = "Test Account", Budget = 100, Currency = "USD", Color = "Blue" };
            Category category = new Category();

            A.CallTo(() => _userService.GetCurrentUserAsync()).Returns(Task.FromResult(user));
            A.CallTo(() => _categoryService.Validate(categoryDto)).Returns(true);
            A.CallTo(() => _categoryService.GetCategoryForCurrentUserByNameAsync(category.Name, user)).Returns(Task.FromResult(category));

            IActionResult result = await _controller.CreateCategory(categoryDto);

            Assert.IsType<BadRequestResult>(result);
            A.CallTo(() => _notificationService.CreateNotificationAsync(A<Notification>.Ignored)).MustHaveHappenedOnceExactly();
        }

        [Fact]
        public async Task CategoryController_CreateCategory_ValidData_ReturnsCreated()
        {
            CategoryDTO categoryDto = new CategoryDTO() { Name = "Test Category", Budget = 100, Currency = "USD", IsIncome = true, Color = "Blue" };
            User user = new User() { ID = 1, Name = "Test User" };

            A.CallTo(() => _userService.GetCurrentUserAsync()).Returns(Task.FromResult(user));
            A.CallTo(() => _categoryService.Validate(categoryDto)).Returns(true);
            A.CallTo(() => _categoryService.GetCategoryForCurrentUserByNameAsync(categoryDto.Name, user)).Returns(Task.FromResult<Category>(null));
            A.CallTo(() => _categoryService.CreateCategoryAsync(A<Category>.Ignored)).Returns(Task.CompletedTask);
            A.CallTo(() => _notificationService.CreateNotificationAsync(A<Notification>.Ignored)).Returns(Task.CompletedTask);

            IActionResult result = await _controller.CreateCategory(categoryDto);

            Assert.IsType<CreatedResult>(result);
            A.CallTo(() => _notificationService.CreateNotificationAsync(A<Notification>.Ignored)).MustHaveHappenedOnceExactly();
        }

        [Fact]
        public async Task CategoryController_GetIncomeCategories_ReturnsOk()
        {
            User user = new User() { ID = 1, Name = "Test User" };
            List<Category> incomeCategories = new List<Category>
            {
                new Category() { ID = 1, Name = "Income1" },
                new Category() { ID = 2, Name = "Income2" }
            };

            A.CallTo(() => _userService.GetCurrentUserAsync()).Returns(Task.FromResult(user));
            A.CallTo(() => _categoryService.GetIncomeCategories(user.Categories)).Returns(incomeCategories);
            A.CallTo(() => _categoryService.GetDataForCategories(incomeCategories)).Returns((100, 200, 50, 100));

            IActionResult result = await _controller.GetIncomeCategories();

            Assert.IsType<OkObjectResult>(result);
        }

        [Fact]
        public async Task CategoryController_GetExpenditureCategories_ReturnsOk()
        {
            User user = new User() { ID = 1, Name = "Test User" };
            List<Category> expenditureCategories = new List<Category>
            {
                new Category() { ID = 1, Name = "Expenditure1" },
                new Category() { ID = 2, Name = "Expenditure2" }
            };

            A.CallTo(() => _userService.GetCurrentUserAsync()).Returns(Task.FromResult(user));
            A.CallTo(() => _categoryService.GetExpenditureCategories(user.Categories)).Returns(expenditureCategories);
            A.CallTo(() => _categoryService.GetDataForCategories(expenditureCategories)).Returns((100, 200, 50, 100));

            IActionResult result = await _controller.GetExpenditureCategories();

            Assert.IsType<OkObjectResult>(result);
        }

        [Fact]
        public async Task CategoryController_GetInfoForCategories_ReturnsOk()
        {
            User user = new User() { ID = 1, Name = "Test User" };

            List<Category> incomeCategories = new List<Category>()
            {
                new Category() { ID = 1, Name = "Income1" },
                new Category() { ID = 2, Name = "Income2" }
            };

            List<Category> expenditureCategories = new List<Category>()
            {
                new Category() { ID = 1, Name = "Expenditure1" },
                new Category() { ID = 2, Name = "Expenditure2" }
            };

            List<CategoryInfoDTO> incomeInfo = new List<CategoryInfoDTO>()
            {
                new CategoryInfoDTO() { Name = "Income1", Ammount = 100 },
                new CategoryInfoDTO() { Name = "Income2", Ammount = 200 }
            };

            List<CategoryInfoDTO> expenditureInfo = new List<CategoryInfoDTO>
            {
                new CategoryInfoDTO() { Name = "Expenditure1", Ammount = 100 },
                new CategoryInfoDTO() { Name = "Expenditure2", Ammount = 200 }
            };

            A.CallTo(() => _userService.GetCurrentUserAsync()).Returns(Task.FromResult(user));
            A.CallTo(() => _categoryService.GetIncomeCategories(user.Categories)).Returns(incomeCategories);
            A.CallTo(() => _categoryService.GetExpenditureCategories(user.Categories)).Returns(expenditureCategories);
            A.CallTo(() => _categoryService.GetCategoryInfo(incomeCategories)).Returns(incomeInfo);
            A.CallTo(() => _categoryService.GetCategoryInfo(expenditureCategories)).Returns(expenditureInfo);

            IActionResult result = await _controller.GetInfoForCategories();

            Assert.IsType<OkObjectResult>(result);
        }

        [Fact]
        public async Task CategoryController_GetCategoryChartData_ReturnsOk()
        {
            User user = new User() { ID = 1, Name = "Test User" };

            List<CategoryChartDataDTO> chartData = new List<CategoryChartDataDTO>()
            {
                new CategoryChartDataDTO() { Name = "Category1", Balance = 100 },
                new CategoryChartDataDTO() { Name = "Category2", Balance = 200 }
            };

            A.CallTo(() => _userService.GetCurrentUserAsync()).Returns(Task.FromResult(user));
            A.CallTo(() => _categoryService.GetCategoryChartData(user.Categories)).Returns(chartData);

            IActionResult result = await _controller.GetCategoryChartData();

            OkObjectResult okResult = Assert.IsType<OkObjectResult>(result);
            ICollection<CategoryChartDataDTO> returnedChartData = Assert.IsType<List<CategoryChartDataDTO>>(okResult.Value);

            Assert.Equal(chartData.Count, returnedChartData.Count);
        }

        [Fact]
        public async Task CategoryController_UpdateCategory_InvalidData_ReturnsBadRequest()
        {
            CategoryDTO categoryDto = new CategoryDTO() { Name = "", Budget = -1 };
            User user = new User() { ID = 1, Name = "Test User" };

            A.CallTo(() => _userService.GetCurrentUserAsync()).Returns(Task.FromResult(user));
            A.CallTo(() => _categoryService.Validate(categoryDto)).Returns(false);

            IActionResult result = await _controller.UpdateCategory(1, categoryDto);

            Assert.IsType<BadRequestResult>(result);
            A.CallTo(() => _notificationService.CreateNotificationAsync(A<Notification>.Ignored)).MustHaveHappenedOnceExactly();
        }

        [Fact]
        public async Task CategoryController_UpdateCategory_ValidData_ReturnsNoContent()
        {
            CategoryDTO categoryDto = new CategoryDTO() { Name = "Updated Category", Budget = 200, Currency = "USD", IsIncome = true, Color = "Red" };
            Category category = new Category() { ID = 1, Name = "Test Category" };
            User user = new User() { ID = 1, Name = "Test User" };

            A.CallTo(() => _userService.GetCurrentUserAsync()).Returns(Task.FromResult(user));
            A.CallTo(() => _categoryService.Validate(categoryDto)).Returns(true);
            A.CallTo(() => _categoryService.GetCategoryForCurrentUserByIdAsync(1, user)).Returns(Task.FromResult(category));
            A.CallTo(() => _categoryService.UpdateCategoryAsync(categoryDto, category)).Returns(Task.CompletedTask);
            A.CallTo(() => _notificationService.CreateNotificationAsync(A<Notification>.Ignored)).Returns(Task.CompletedTask);

            IActionResult result = await _controller.UpdateCategory(1, categoryDto);

            Assert.IsType<NoContentResult>(result);
            A.CallTo(() => _notificationService.CreateNotificationAsync(A<Notification>.Ignored)).MustHaveHappenedOnceExactly();
        }

        [Fact]
        public async Task CategoryController_DeleteCategory_ReturnsNoContent()
        {
            Category category = new Category() { ID = 1, Name = "Test Category" };
            User user = new User() { ID = 1, Name = "Test User" };

            A.CallTo(() => _userService.GetCurrentUserAsync()).Returns(Task.FromResult(user));
            A.CallTo(() => _categoryService.GetCategoryForCurrentUserByIdAsync(1, user)).Returns(Task.FromResult(category));
            A.CallTo(() => _categoryService.DeleteCategoryAsync(category)).Returns(Task.CompletedTask);
            A.CallTo(() => _notificationService.CreateNotificationAsync(A<Notification>.Ignored)).Returns(Task.CompletedTask);

            IActionResult result = await _controller.DeleteCategory(1);

            Assert.IsType<NoContentResult>(result);
            A.CallTo(() => _notificationService.CreateNotificationAsync(A<Notification>.Ignored)).MustHaveHappenedOnceExactly();
        }

        [Fact]
        public async Task CategoryController_DeleteAllCategories_ReturnsNoContent()
        {
            User user = new User() { ID = 1, Name = "Test User", Categories = new List<Category> { new Category { Name = "Category1" }, new Category { Name = "Category2" } } };

            A.CallTo(() => _userService.GetCurrentUserAsync()).Returns(Task.FromResult(user));
            A.CallTo(() => _categoryService.DeleteAllCategoriesAsync(user.Categories)).Returns(Task.CompletedTask);
            A.CallTo(() => _notificationService.CreateNotificationAsync(A<Notification>.Ignored)).Returns(Task.CompletedTask);

            IActionResult result = await _controller.DeleteAllCategories();

            Assert.IsType<NoContentResult>(result);
            A.CallTo(() => _notificationService.CreateNotificationAsync(A<Notification>.Ignored)).MustHaveHappenedOnceExactly();
        }
    }
}
