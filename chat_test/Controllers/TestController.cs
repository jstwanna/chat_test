using Microsoft.AspNetCore.Mvc;

namespace chat_test.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class TestController : ControllerBase
    {
        public string Test (string test)
        {
            return test;
        }
    }
}
