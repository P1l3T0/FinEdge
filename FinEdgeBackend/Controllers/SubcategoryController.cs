using FinEdgeBackend.DTOs;
using FinEdgeBackend.Interfaces;
using FinEdgeBackend.Models;
using Microsoft.AspNetCore.Mvc;

namespace FinEdgeBackend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class SubcategoryController(ISubcategoryService subcategoryService, ICategoryService categoryService, IUserService userService) : Controller
    {
        private readonly ISubcategoryService _subcategoryService = subcategoryService;
        private readonly ICategoryService _categoryService = categoryService;
        private readonly IUserService _userService = userService;

        [HttpPost]
        [Route("create")]
        public async Task<IActionResult> CreateSubcategory([FromQuery] int categoryID, [FromBody] SubcategoryDTO subcategoryDto)
        {
            if (!_subcategoryService.Validate(subcategoryDto))
            {
                return BadRequest("Subcategory must have a name!");
            }

            User currentUser = await _userService.GetCurrentUserAsync();
            Category category = await _categoryService.GetCategoryForCurrentUserByIdAsync(categoryID, currentUser);

            await _subcategoryService.CreateSubcategoryAsync(new Subcategory()
            {
                Name = subcategoryDto.Name,
                CategoryID = categoryID,
                Category = category
            });

            return Created();
        }

        [HttpGet]
        [Route("get")]
        public async Task<IActionResult> GetSubcategoriesForCategory([FromQuery] int categoryID)
        {
            ICollection<Subcategory> subcategories = await _subcategoryService.GetSubcategoriesByCategoryIdAsync(categoryID);

            return Ok(subcategories);
        }

        [HttpPut]
        [Route("update")]
        public async Task<IActionResult> UpdateSubcategory([FromQuery] int subcategoryID, [FromBody] SubcategoryDTO subcategoryDto)
        {
            if (!_subcategoryService.Validate(subcategoryDto))
            {
                return BadRequest("Subcategory must have a name!");
            }

            Subcategory subcategory = await _subcategoryService.GetSubcategoryByIdAsync(subcategoryID);

            await _subcategoryService.UpdateSubcategoryAsync(subcategoryDto, subcategory);

            return NoContent();
        }

        [HttpDelete]
        [Route("delete")]
        public async Task<IActionResult> DeleteSubcategory([FromQuery] int subcategoryID)
        {
            Subcategory subcategory = await _subcategoryService.GetSubcategoryByIdAsync(subcategoryID);

            await _subcategoryService.DeleteSubcategoryAsync(subcategory);

            return NoContent();
        }
    }
}
