namespace ChatApp.Api.Models
{
    public class ChatRequest
    {
        public string Prompt { get; set; } = string.Empty;
        public List<ChatHistoryItem> ChatHistory { get; set; } = [];
    }

    public class ChatHistoryItem
    {
        public string Role { get; set; } = string.Empty;
        public string Content { get; set; } = string.Empty;
    }
}
