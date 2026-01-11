using Microsoft.SemanticKernel.ChatCompletion;

namespace ChatApp.Api.Models
{
    public class ChatModel
    {
        public ChatHistory ChatHistory { get; set; } = [];
        public string Prompt { get; set; } = String.Empty;
        public ChatModel()
        {
            
        }

        public ChatModel(string systemMessage)
        {
            ChatHistory = new ChatHistory(systemMessage);
        }
    }
}
