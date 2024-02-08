namespace Chat.Hubs
{
    public static class HubsConfigurator
    {
        public static WebApplication ConfigureHubs (this WebApplication app)
        {
            app.MapHub<ChatHub>("/hub/chat");

            return app;
        }
    }
}
