using FinEdgeData.Data;
using FinEdgeServices.Services;
using FinEdgeServices.Interfaces;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using DotNetEnv;
using DotNetEnv.Configuration;
using Hangfire;
using Hangfire.SqlServer;

var builder = WebApplication.CreateBuilder(args);

builder.Configuration
    .SetBasePath(builder.Environment.ContentRootPath)
    .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
    .AddEnvironmentVariables()
    .AddDotNetEnv(".env", LoadOptions.TraversePath())
    .Build();

builder.Services.AddCors();
builder.Services.AddControllers();
builder.Services.AddSignalR();

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

builder.Services.AddHangfire(config => config
    .SetDataCompatibilityLevel(CompatibilityLevel.Version_170)
    .UseSimpleAssemblyNameTypeSerializer()
    .UseRecommendedSerializerSettings()
    .UseSqlServerStorage(builder.Configuration.GetConnectionString("DefaultConnection"), new SqlServerStorageOptions
    {
        CommandBatchMaxTimeout = TimeSpan.FromMinutes(5),
        SlidingInvisibilityTimeout = TimeSpan.FromMinutes(5),
        QueuePollInterval = TimeSpan.Zero,
        UseRecommendedIsolationLevel = true,
        DisableGlobalLocks = true
    }));

builder.Services.AddAuthorization();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services!.AddDbContext<DataContext>(opt =>
{
    opt.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"));
});

builder.Services.AddHostedService<RepeatingTransactionsService>();

builder.Services.AddHangfire(config => config.UseSqlServerStorage(builder.Configuration.GetConnectionString("DefaultConnection")));
builder.Services.AddHangfireServer();

builder.Services.AddHttpContextAccessor();

builder.Services!.AddScoped<IUserService, UserService>();
builder.Services!.AddScoped<IJwtService, JwtService>();
builder.Services!.AddScoped<IAuthService, AuthService>();
builder.Services!.AddScoped<IAccountService, AccountService>();
builder.Services!.AddScoped<ICategoryService, CategoryService>();
builder.Services!.AddScoped<ISubcategoryService, SubcategoryService>();
builder.Services!.AddScoped<ITransactionService, TransactionService>();
builder.Services!.AddScoped<ISnapshotService, SnapshotService>();
builder.Services!.AddScoped<IRefreshTokenService, RefreshTokenService>();
builder.Services!.AddScoped<IGPTService, GPTService>();
builder.Services!.AddScoped<IFinancialRecommendationService, FinancialRecommendationService>();
builder.Services!.AddScoped<IPromptSuggestionsService, PromptSuggestionsService>();
builder.Services!.AddScoped<INotificationService, NotificationService>();
builder.Services!.AddHostedService<CategoryResetService>();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseRouting();

app.UseCors("AllowSpecificOrigin");

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();
app.MapHub<NotificationHub>("/notificationHub");

app.Run();
