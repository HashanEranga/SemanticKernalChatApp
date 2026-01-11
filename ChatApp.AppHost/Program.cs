var builder = DistributedApplication.CreateBuilder(args);

// Add the .NET API backend
var api = builder.AddProject<Projects.ChatApp_Api>("api");

// Add the Angular frontend
var web = builder.AddNpmApp("web", "../ChatApp.Web", "start")
    .WithHttpEndpoint(port: 4200, isProxied: false)
    .WithExternalHttpEndpoints()
    .PublishAsDockerFile();

builder.Build().Run();
