using FakeItEasy;
using FinEdgeBackend.Controllers;
using FinEdgeBackend.DTOs;
using FinEdgeBackend.Interfaces;
using FinEdgeBackend.Models;
using Microsoft.AspNetCore.Mvc;

namespace FinEdgeTests.Controller
{
    public class SubcategoryControllerTest
    {
        private readonly ISubcategoryService _subcategoryService;
        private readonly ICategoryService _categoryService;
        private readonly IUserService _userService;
        private readonly SubcategoryController _controller;

        public SubcategoryControllerTest()
        {
            _subcategoryService = A.Fake<ISubcategoryService>();
            _categoryService = A.Fake<ICategoryService>();
            _userService = A.Fake<IUserService>();

            _controller = new SubcategoryController(_subcategoryService, _categoryService, _userService);
        }

        [Fact]
        public async Task SubcategoryController_CreateSubcategory_InvalidData_ReturnsBadRequest()
        {
            SubcategoryDTO subcategoryDto = new SubcategoryDTO { Name = "" };

            A.CallTo(() => _subcategoryService.Validate(subcategoryDto)).Returns(false);

            IActionResult result = await _controller.CreateSubcategory(1, subcategoryDto);

            Assert.IsType<BadRequestObjectResult>(result);
        }

        [Fact]
        public async Task SubcategoryController_CreateSubcategory_ValidData_ReturnsCreated()
        {
            SubcategoryDTO subcategoryDto = new SubcategoryDTO { Name = "Test Subcategory" };
            User user = new User { ID = 1, Name = "Test User" };
            Category category = new Category { ID = 1, Name = "Test Category" };

            A.CallTo(() => _subcategoryService.Validate(subcategoryDto)).Returns(true);
            A.CallTo(() => _userService.GetCurrentUserAsync()).Returns(Task.FromResult(user));
            A.CallTo(() => _categoryService.GetCategoryForCurrentUserByIdAsync(1, user)).Returns(Task.FromResult(category));
            A.CallTo(() => _subcategoryService.CreateSubcategoryAsync(A<Subcategory>.Ignored)).Returns(Task.CompletedTask);

            IActionResult result = await _controller.CreateSubcategory(1, subcategoryDto);

            Assert.IsType<CreatedResult>(result);
        }

        [Fact]
        public async Task SubcategoryController_GetSubcategoriesForCategory_ReturnsOk()
        {
            List<Subcategory> subcategories = new List<Subcategory>
            {
                new Subcategory { ID = 1, Name = "Subcategory1" },
                new Subcategory { ID = 2, Name = "Subcategory2" }
            };

            A.CallTo(() => _subcategoryService.GetSubcategoriesByCategoryIdAsync(1)).Returns(Task.FromResult((ICollection<Subcategory>)subcategories));

            IActionResult result = await _controller.GetSubcategoriesForCategory(1);

            OkObjectResult okResult = Assert.IsType<OkObjectResult>(result);
            ICollection<Subcategory> returnedSubcategories = Assert.IsType<List<Subcategory>>(okResult.Value);

            Assert.Equal(subcategories.Count, returnedSubcategories.Count);
        }

        [Fact]
        public async Task SubcategoryController_UpdateSubcategory_InvalidData_ReturnsBadRequest()
        {
            SubcategoryDTO subcategoryDto = new SubcategoryDTO { Name = "" };

            A.CallTo(() => _subcategoryService.Validate(subcategoryDto)).Returns(false);

            IActionResult result = await _controller.UpdateSubcategory(1, subcategoryDto);

            Assert.IsType<BadRequestObjectResult>(result);
        }

        [Fact]
        public async Task SubcategoryController_UpdateSubcategory_ValidData_ReturnsNoContent()
        {
            SubcategoryDTO subcategoryDto = new SubcategoryDTO { Name = "Updated Subcategory" };
            Subcategory subcategory = new Subcategory { ID = 1, Name = "Subcategory" };

            A.CallTo(() => _subcategoryService.Validate(subcategoryDto)).Returns(true);
            A.CallTo(() => _subcategoryService.GetSubcategoryByIdAsync(1)).Returns(Task.FromResult(subcategory));
            A.CallTo(() => _subcategoryService.UpdateSubcategoryAsync(subcategoryDto, subcategory)).Returns(Task.CompletedTask);

            IActionResult result = await _controller.UpdateSubcategory(1, subcategoryDto);

            Assert.IsType<NoContentResult>(result);
        }

        [Fact]
        public async Task SubcategoryController_DeleteSubcategory_ReturnsNoContent()
        {
            Subcategory subcategory = new Subcategory { ID = 1, Name = "Subcategory" };

            A.CallTo(() => _subcategoryService.GetSubcategoryByIdAsync(1)).Returns(Task.FromResult(subcategory));
            A.CallTo(() => _subcategoryService.DeleteSubcategoryAsync(subcategory)).Returns(Task.CompletedTask);

            IActionResult result = await _controller.DeleteSubcategory(1);

            Assert.IsType<NoContentResult>(result);
        }
    }
}
