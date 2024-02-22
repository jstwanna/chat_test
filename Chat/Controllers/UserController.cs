using Microsoft.AspNetCore.Mvc;

namespace Chat.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        public UserController ()
        {

        }

        /// <summary>
        /// Получить информацию о пользователе
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public IActionResult GetUserInfo ()
        {
            return Ok();
        }

        /// <summary>
        /// Изменить данные пользователя
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public IActionResult ChangeUserData ()
        {
            return Ok();
        }

        /// <summary>
        /// Изменить пароль пользователя
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public IActionResult ChangeUserPassword ()
        {
            return Ok();
        }
    }
}
