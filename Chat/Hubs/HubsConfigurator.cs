namespace Chat.Hubs
{
    public static class HubsConfigurator
    {
        public static IEndpointRouteBuilder ConfigureHubs (this IEndpointRouteBuilder app)
        {
            app.MapHub<ChatHub>("/hub/chat");

            return app;
        }
    }
}
