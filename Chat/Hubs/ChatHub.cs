using Microsoft.AspNetCore.SignalR;

namespace Chat.Hubs
{
    public class ChatHub : Hub
    {
        private readonly ILogger<ChatHub> logger;

        public ChatHub (ILogger<ChatHub> logger)
        {
            this.logger = logger;
        }

        public async Task Send (string message)
        {
            logger.LogInformation(message);

            await Clients.All.SendAsync("Receive", message);
        }
    }
}
