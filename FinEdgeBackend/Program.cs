using FinEdgeBackend.Data;
using FinEdgeBackend.Interfaces;
using FinEdgeBackend.Interfaces.Auth;
using FinEdgeBackend.Services;
using FinEdgeBackend.Services.Auth;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors();
builder.Services.AddControllers();

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = "https://localhost:7167/",
            ValidAudience = "your-api-identifier",
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("e3d6623891a3c57d8fec2ff34d9f7c91adb38a43a2b8ac7cf1d62b65a2f23c0f"))
        };
    });

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigin", builder =>
    {
        builder.WithOrigins("http://localhost:5173")
            .AllowAnyHeader()
            .AllowAnyMethod()
            .AllowCredentials();
    });
});

builder.Services.AddAuthorization();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services!.AddDbContext<DataContext>(opt =>
{
    opt.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"));
});
builder.Services.AddHttpContextAccessor();

builder.Services!.AddScoped<IUserService, UserService>();
builder.Services!.AddScoped<IJwtService, JwtService>();
builder.Services!.AddScoped<IAuthService, AuthService>();
builder.Services!.AddScoped<IAccountService, AccountService>();
builder.Services!.AddScoped<IRefreshTokenService, RefreshTokenService>();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowSpecificOrigin");

app.UseHttpsRedirection();

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

app.Run();
