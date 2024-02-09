using Chat.Data.Database;
using Microsoft.AspNetCore.Mvc;

namespace Chat.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class TestController : ControllerBase
    {
        public string Test ([FromServices] DBContext dBContext, string test)
        {
            var ttt = dBContext.Users.ToArray();

            return test;
        }
    }
}
