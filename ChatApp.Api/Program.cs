using ChatApp.Api.Services;
using Microsoft.SemanticKernel;
using Microsoft.SemanticKernel.Connectors.OpenAI;

var builder = WebApplication.CreateBuilder(args);

// Add service defaults & Aspire components.
builder.AddServiceDefaults();

// Add services to the container.
builder.Services.AddControllers();

// Add CORS for Angular frontend
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngular", policy =>
    {
        policy.WithOrigins("http://localhost:4200", "https://localhost:4200")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

builder.Services.AddKernel();
builder.Services.AddAzureOpenAIChatCompletion(
    endpoint: builder.Configuration["AzureOpenAI:Endpoint"]!,
    apiKey: builder.Configuration["AzureOpenAI:ApiKey"]!,
    deploymentName: builder.Configuration["AzureOpenAI:DeploymentName"]!);

builder.Services.AddSingleton<PromptExecutionSettings>(_ => new OpenAIPromptExecutionSettings
{
    Temperature = 0.7,
});

builder.Services.AddTransient<IChatService, ChatService>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

app.UseCors("AllowAngular");

app.MapDefaultEndpoints();
app.MapControllers();

app.Run();