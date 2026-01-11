using ChatApp.Api.Models;
using ChatApp.Api.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.SemanticKernel;
using Microsoft.SemanticKernel.ChatCompletion;

namespace ChatApp.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ChatController : ControllerBase
    {
        public ILogger<ChatController> logger { get; set; }
        public readonly IChatService chatService;
        public ChatController(ILogger<ChatController> logger, IChatService chatService)
        {
            this.logger = logger;
            this.chatService = chatService;
        }

        [HttpPost]
        public async Task<IActionResult> Chat([FromBody] ChatRequest request, [FromServices] Kernel kernel, [FromServices] PromptExecutionSettings promptExecutionSettings)
        {
            try
            {
                var chatCompletionService = kernel.GetRequiredService<IChatCompletionService>();

                // Build chat history from request
                var history = new ChatHistory(systemMessage: "You are a friendly AI chatbot that helps users with their questions. Always format response using markdown");
                foreach (var item in request.ChatHistory)
                {
                    var role = item.Role.ToLower() switch
                    {
                        "user" => AuthorRole.User,
                        "assistant" => AuthorRole.Assistant,
                        "system" => AuthorRole.System,
                        _ => AuthorRole.User
                    };
                    history.Add(new ChatMessageContent(role, item.Content));
                }

                // Add current user message
                history.AddUserMessage(request.Prompt);

                var response = await chatCompletionService.GetChatMessageContentAsync(history, promptExecutionSettings);

                return Ok(response);
            }
            catch (Exception ex)
            {
                logger.LogError(ex, "Error processing chat message");
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while processing your request.");
            }
        }


    }
}
