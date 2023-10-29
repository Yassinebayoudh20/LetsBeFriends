using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using YB.LetsBeFriendsAPI.Hubs;
using YB.LetsBeFriendsAPI.Services;

WebApplicationBuilder builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

builder.Services.AddEndpointsApiExplorer();

builder.Services.AddSingleton<ChatService>();

builder.Services.AddSignalR();

builder.Services.AddCors();

WebApplication app = builder.Build();

app.UseCors(option => option.AllowAnyHeader().AllowCredentials().AllowAnyMethod().WithOrigins("http://localhost:4200"));

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.MapHub<ChatHub>("/hubs/chat");

app.Run();
