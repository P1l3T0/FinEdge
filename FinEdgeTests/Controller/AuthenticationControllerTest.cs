using FinEdgeData.Enums;
using FinEdgeData.DTOs;
using FinEdgeData.Models;
using FinEdgeServices.Interfaces;
using FinEdgeBackend.Controllers;
using Microsoft.AspNetCore.Mvc;
using FakeItEasy;
using Microsoft.AspNetCore.Http;

namespace FinEdgeTests.Controller
{
    public class AuthenticationControllerTest
    {
        private readonly IUserService _userService;
        private readonly IJwtService _jwtService;
        private readonly IAuthService _authService;
        private readonly IRefreshTokenService _refreshTokenService;
        private readonly AuthenticationController _controller;

        public AuthenticationControllerTest()
        {
            _userService = A.Fake<IUserService>();
            _jwtService = A.Fake<IJwtService>();
            _authService = A.Fake<IAuthService>();
            _refreshTokenService = A.Fake<IRefreshTokenService>();

            _controller = new AuthenticationController(_userService, _jwtService, _refreshTokenService, _authService);
        }

        // Register

        [Fact]
        public async Task AuthenticationController_Register_ReturnsBadRequest_ForWeakPassword()
        {
            RegisterDTO registerDTO = new RegisterDTO()
            {
                Name = "John",
                Surname = "Doe",
                Email = "johndoe@gmail.com",
                MethodologyType = "FiftyThirtyTwenty",
                Password = "weakpassword"
            };

            A.CallTo(() => _userService.Validate(registerDTO.Email, registerDTO.Password, false)).Returns(false);

            IActionResult result = await _controller.Register(registerDTO);

            BadRequestObjectResult badRequestResult = Assert.IsType<BadRequestObjectResult>(result);
        }

        [Fact]
        public async Task AuthenticationController_Register_ReturnsBadRequest_ForInvalidEmail()
        {
            RegisterDTO registerDTO = new RegisterDTO()
            {
                Name = "John",
                Surname = "Doe",
                Email = "invalidemaildomain.com",
                MethodologyType = "FiftyThirtyTwenty",
                Password = "string123$"
            };

            A.CallTo(() => _userService.Validate(registerDTO.Email, registerDTO.Password, false)).Returns(false);

            IActionResult result = await _controller.Register(registerDTO);

            BadRequestObjectResult badRequestResult = Assert.IsType<BadRequestObjectResult>(result);
        }

        [Fact]
        public async Task AuthenticationController_Register_ReturnsOk()
        {
            // Arrange
            RegisterDTO registerDTO = new RegisterDTO()
            {
                Name = "John",
                Surname = "Doe",
                Email = "johndoe@gmail.com",
                MethodologyType = "FiftyThirtyTwenty",
                Password = "String123$"
            };

            User fakeUser = new User()
            {
                ID = 1,
                Name = registerDTO.Name,
                Surname = registerDTO.Surname,
                Email = registerDTO.Email,
                Password = BCrypt.Net.BCrypt.HashPassword(registerDTO.Password),
                MethodologyType = (MethodologyType)Enum.Parse(typeof(MethodologyType), registerDTO.MethodologyType!),
            };

            A.CallTo(() => _userService.Validate(registerDTO.Email, registerDTO.Password, false)).Returns(true);
            A.CallTo(() => _authService.RegisterAsync(registerDTO)).Returns(Task.FromResult(fakeUser));
            A.CallTo(() => _jwtService.GenerateAcessToken(fakeUser.ID)).Returns("fakeAccessToken");
            A.CallTo(() => _jwtService.GenerateRefreshToken(fakeUser.ID)).Returns("fakeRefreshToken");
            A.CallTo(() => _refreshTokenService.AddRefreshTokenAsync(A<RefreshToken>._));

            // Mock HttpContext & Response Cookies
            HttpContext httpContext = A.Fake<HttpContext>();
            HttpResponse response = A.Fake<HttpResponse>();
            IResponseCookies cookies = A.Fake<IResponseCookies>();

            A.CallTo(() => httpContext.Response).Returns(response);
            A.CallTo(() => response.Cookies).Returns(cookies);

            _controller.ControllerContext = new ControllerContext()
            {
                HttpContext = httpContext
            };

            // Act
            IActionResult result = await _controller.Register(registerDTO);

            // Assert
            OkObjectResult okResult = Assert.IsType<OkObjectResult>(result);
            User returnedUser = Assert.IsType<User>(okResult.Value);

            Assert.Equal(fakeUser.ID, returnedUser.ID);
            Assert.Equal(fakeUser.Email, returnedUser.Email);

            A.CallTo(() => cookies.Append(
                "AccessToken",
                "fakeAccessToken",
                A<CookieOptions>._)
            ).MustHaveHappened();

            A.CallTo(() => cookies.Append(
                "RefreshToken",
                "fakeRefreshToken",
                A<CookieOptions>._)
            ).MustHaveHappened();
        }

        // Login

        [Fact]
        public async Task AuthenticationController_Login_ReturnsBadRequest()
        {
            LoginDTO loginDTO = new LoginDTO()
            {
                Email = "johndoe@gmail.com",
                Password = "String123$"
            };

            User nullUser = null;

            A.CallTo(() => _authService.LoginAsync(loginDTO)).Returns(Task.FromResult(nullUser));

            IActionResult result = await _controller.Login(loginDTO);

            BadRequestResult badRequestResult = Assert.IsType<BadRequestResult>(result);
        }

        [Fact]
        public async Task AuthenticationController_Login_ReturnsOk()
        {
            LoginDTO loginDTO = new LoginDTO()
            {
                Email = "johndoe@gmail.com",
                Password = "String123$"
            };

            User fakeUser = new User()
            {
                ID = 1,
                Name = "John",
                Surname = "Doe",
                Email = loginDTO.Email,
                Password = BCrypt.Net.BCrypt.HashPassword(loginDTO.Password),
            };

            A.CallTo(() => _authService.LoginAsync(loginDTO)).Returns(Task.FromResult(fakeUser));
            A.CallTo(() => _jwtService.GenerateAcessToken(fakeUser.ID)).Returns("fakeAccessToken");
            A.CallTo(() => _jwtService.GenerateRefreshToken(fakeUser.ID)).Returns("fakeRefreshToken");
            A.CallTo(() => _refreshTokenService.AddRefreshTokenAsync(A<RefreshToken>._));

            HttpContext httpContext = A.Fake<HttpContext>();
            HttpResponse response = A.Fake<HttpResponse>();
            IResponseCookies cookies = A.Fake<IResponseCookies>();

            A.CallTo(() => httpContext.Response).Returns(response);
            A.CallTo(() => response.Cookies).Returns(cookies);

            _controller.ControllerContext = new ControllerContext()
            {
                HttpContext = httpContext
            };

            IActionResult result = await _controller.Login(loginDTO);

            OkObjectResult okResult = Assert.IsType<OkObjectResult>(result);
            User returnedUser = Assert.IsType<User>(okResult.Value);

            Assert.Equal(fakeUser.ID, returnedUser.ID);
            Assert.Equal(fakeUser.Email, returnedUser.Email);

            A.CallTo(() => cookies.Append(
                "AccessToken",
                "fakeAccessToken",
                A<CookieOptions>._)
            ).MustHaveHappened();

            A.CallTo(() => cookies.Append(
                "RefreshToken",
                "fakeRefreshToken",
                A<CookieOptions>._)
            ).MustHaveHappened();
        }

        // Refresh Token

        [Fact]
        public async Task AuthenticationController_GenerateNewRefreshToken_ReturnsUnauthorized()
        {
            HttpContext httpContext = A.Fake<HttpContext>();
            HttpRequest request = A.Fake<HttpRequest>();
            IRequestCookieCollection cookies = A.Fake<IRequestCookieCollection>();

            A.CallTo(() => cookies["RefreshToken"]).Returns(null);
            A.CallTo(() => request.Cookies).Returns(cookies);
            A.CallTo(() => httpContext.Request).Returns(request);

            _controller.ControllerContext = new ControllerContext()
            {
                HttpContext = httpContext
            };

            A.CallTo(() => _refreshTokenService.GetRefreshTokenAsync(A<string>._)).Returns(Task.FromResult<RefreshToken>(null));

            IActionResult result = await _controller.GenerateNewRefreshToken();

            UnauthorizedObjectResult unauthorizedResult = Assert.IsType<UnauthorizedObjectResult>(result);
            Assert.Equal("Invalid or expired refresh token.", unauthorizedResult.Value);
        }

        [Fact]
        public async Task AuthenticationController_GenerateNewRefreshToken_ReturnsOk()
        {
            string refreshTokenKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.KMUFsIDTnFmyG3nMiGM6H9FNFUROf3wh7SmqJp-QV30";
            string newAccessTokenKey = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE3NDE1MDE3MzMsImV4cCI6MTc3MzAzNzczMywiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSIsIkdpdmVuTmFtZSI6IkpvaG5ueSIsIlN1cm5hbWUiOiJSb2NrZXQiLCJFbWFpbCI6Impyb2NrZXRAZXhhbXBsZS5jb20iLCJSb2xlIjpbIk1hbmFnZXIiLCJQcm9qZWN0IEFkbWluaXN0cmF0b3IiXX0.xp737ONRz1WIgcrIkBK4FsVRe2TI4xs7O-xpD3LZIkE";
            string newRefreshTokenKey = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE3NDE1MDE3MzMsImV4cCI6MTc3MzAzNzczMywiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSIsIkdpdmVuTmFtZSI6IkpvaG5ueSIsIlN1cm5hbWUiOiJSb2NrZXQiLCJFbWFpbCI6Impyb2NrZXRAZXhhbXBsZS5jb20iLCJSb2xlIjpbIk1hbmFnZXIiLCJQcm9qZWN0IEFkbWluaXN0cmF0b3IiXX0.cmpS5dHow82bqSMRNLb5P_h5Dbh7buCfgQWV6PjTjd0";

            RefreshToken fakeStoredToken = new RefreshToken()
            {
                ID = 1,
                ExpiryDate = DateTime.Now.AddDays(1),
                Token = refreshTokenKey,
                IsRevoked = false,
                UserID = 1
            };

            RefreshToken newFakeStoredToken = new RefreshToken()
            {
                ID = 2,
                ExpiryDate = DateTime.Now.AddDays(1),
                Token = newRefreshTokenKey,
                IsRevoked = false,
                UserID = fakeStoredToken.UserID
            };

            User fakeUser = new User()
            {
                ID = 1,
                Name = "John",
                Surname = "Doe",
                Email = "johndoe@gmail.com",
            };

            HttpContext httpContext = A.Fake<HttpContext>();
            HttpRequest request = A.Fake<HttpRequest>();
            HttpResponse response = A.Fake<HttpResponse>();
            IRequestCookieCollection requestCookies = A.Fake<IRequestCookieCollection>();
            IResponseCookies responseCookies = A.Fake<IResponseCookies>();

            A.CallTo(() => requestCookies["RefreshToken"]).Returns(refreshTokenKey);
            A.CallTo(() => request.Cookies).Returns(requestCookies);
            A.CallTo(() => httpContext.Request).Returns(request);
            A.CallTo(() => httpContext.Response).Returns(response);
            A.CallTo(() => response.Cookies).Returns(responseCookies);

            _controller.ControllerContext = new ControllerContext()
            {
                HttpContext = httpContext
            };

            A.CallTo(() => _refreshTokenService.GetRefreshTokenAsync(refreshTokenKey)).Returns(Task.FromResult(fakeStoredToken));
            A.CallTo(() => _jwtService.GenerateRefreshToken(fakeStoredToken.UserID)).Returns(newRefreshTokenKey);
            A.CallTo(() => _jwtService.GenerateAcessToken(fakeStoredToken.UserID)).Returns(newAccessTokenKey);
            A.CallTo(() => _refreshTokenService.AddRefreshTokenAsync(newFakeStoredToken)).Returns(Task.FromResult(newFakeStoredToken));
            A.CallTo(() => _userService.GetUserByIdAsync(fakeStoredToken.UserID)).Returns(Task.FromResult(fakeUser));

            IActionResult result = await _controller.GenerateNewRefreshToken();

            OkObjectResult okResult = Assert.IsType<OkObjectResult>(result);

            A.CallTo(() => responseCookies.Delete("RefreshToken", A<CookieOptions>._)).MustHaveHappened();
            A.CallTo(() => responseCookies.Append("AccessToken", newAccessTokenKey, A<CookieOptions>._)).MustHaveHappened();
            A.CallTo(() => responseCookies.Append("RefreshToken", newRefreshTokenKey, A<CookieOptions>._)).MustHaveHappened();
        }

        // Logout

        [Fact]
        public async Task AuthenticationController_Logout_ReturnsOk()
        {
            HttpContext httpContext = A.Fake<HttpContext>();
            HttpResponse response = A.Fake<HttpResponse>();
            IResponseCookies cookies = A.Fake<IResponseCookies>();

            A.CallTo(() => httpContext.Response).Returns(response);
            A.CallTo(() => response.Cookies).Returns(cookies);

            _controller.ControllerContext = new ControllerContext()
            {
                HttpContext = httpContext
            };

            IActionResult result = await _controller.Logout();

            OkObjectResult okResult = Assert.IsType<OkObjectResult>(result);

            A.CallTo(() => cookies.Delete("AccessToken", A<CookieOptions>._)).MustHaveHappened();
            A.CallTo(() => cookies.Delete("RefreshToken", A<CookieOptions>._)).MustHaveHappened();
        }
    }
}
