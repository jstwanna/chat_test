using Chat.Data.Entities;
using Microsoft.Extensions.DependencyInjection;

namespace Chat.Data.Services
{
    public static class ServiceConfigurator
    {
        public static IServiceCollection ConfigureServices (this IServiceCollection services)
        {
            services.AddScoped<IUserRegistrationService, UserRegistrationService>();

            return services;
        }
    }
}
