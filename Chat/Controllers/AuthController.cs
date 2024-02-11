using Chat.Data.Models.Account;
using Chat.Data.Models.Auth;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Chat.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        [HttpPost]
        public IActionResult CreateToken ([FromServices] IOptions<JwtSettings> jwtOptions, AuthModel model)
        {
            var jwtSettings = jwtOptions.Value;

            if (model.UserName != null && model.Password != null)
            {
                var key = Encoding.UTF8.GetBytes(jwtSettings.Key);

                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(new[]
                    {
                    new Claim("Id", Guid.NewGuid().ToString()),
                }),
                    Expires = DateTime.UtcNow.AddMinutes(10),
                    Issuer = jwtSettings.Issuer,
                    Audience = jwtSettings.Audience,
                    SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256)
                };

                var tokenHandler = new JwtSecurityTokenHandler();
                var token = tokenHandler.CreateToken(tokenDescriptor);
                var jwtToken = tokenHandler.WriteToken(token);

                return Ok(jwtToken);
            }

            return Unauthorized();
        }
    }
}
