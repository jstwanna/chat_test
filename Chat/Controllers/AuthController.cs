using Chat.Data.Database;
using Chat.Data.Models.Account;
using Chat.Data.Models.Auth;
using LinqToDB;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace Chat.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly JwtSettings jwtSettings;
        private readonly DBContext dBContext;

        const int keySize = 64;
        const int iterations = 350000;
        static HashAlgorithmName hashAlgorithm = HashAlgorithmName.SHA512;

        public AuthController (IOptions<JwtSettings> jwtOptions, DBContext dBContext)
        {
            jwtSettings = jwtOptions.Value;
            this.dBContext = dBContext;
        }

        [HttpPost]
        public async Task<IActionResult> Login (AuthModel model)
        {
            if (!string.IsNullOrEmpty(model.Mail) && !string.IsNullOrEmpty(model.Password))
            {
                var user = await dBContext.Users.Where(w => w.Mail == model.Mail).FirstOrDefaultAsync();

                if (user != null)
                {
                    var hashedPass = HashPasword(model.Password, Convert.FromBase64String(user.PasswordSalt));

                    if (hashedPass == user.PasswordHash)
                    {
                        var token = CreateToken(user.Id, user.Name, user.Surname, jwtSettings);

                        return Ok(token);
                    }
                    return Unauthorized("Неверные данные");
                }
                return Unauthorized("Пользователь не найден");
            }
            return Unauthorized("Не указана почта или пароль");
        }

        public async Task<IActionResult> Registration (RegModel model)
        {
            try
            {
                var existedUserWithLogin = await dBContext.Users.Where(w => w.Mail == model.Mail).FirstOrDefaultAsync();

                if (existedUserWithLogin != null)
                {
                    return BadRequest("Указанная почта уже используется");
                }

                var salt = GetRandomSalt();
                var pass = HashPasword(model.Password, salt);

                var newUser = dBContext.Users
                    .Value(v => v.Mail, model.Mail)
                    .Value(v => v.Name, model.Name)
                    .Value(v => v.Surname, model.Surname)
                    .Value(v => v.PasswordHash, pass)
                    .Value(v => v.PasswordSalt, Convert.ToBase64String(salt));

                var userId = await newUser.InsertAsync();

                var token = CreateToken(userId, model.Name, model.Surname, jwtSettings);

                return Ok(token);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        private static string CreateToken (int id, string name, string surname, JwtSettings jwtSettings)
        {
            var key = Encoding.UTF8.GetBytes(jwtSettings.Key);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                    new Claim("Id", id.ToString()),
                    new Claim("name", name),
                    new Claim("surname", surname),
                }),
                Expires = DateTime.UtcNow.AddMinutes(60),
                Issuer = jwtSettings.Issuer,
                Audience = jwtSettings.Audience,
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256)
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);
            var jwtToken = tokenHandler.WriteToken(token);

            return jwtToken;
        }

        private static string HashPasword (string password, byte[] salt)
        {
            var hash = Rfc2898DeriveBytes.Pbkdf2(
                Encoding.UTF8.GetBytes(password),
            salt,
                iterations,
                hashAlgorithm,
                keySize);
            return Convert.ToHexString(hash);
        }

        private static byte[] GetRandomSalt ()
        {
            return RandomNumberGenerator.GetBytes(keySize);
        }
    }
}
