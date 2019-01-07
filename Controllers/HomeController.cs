using Microsoft.AspNetCore.Mvc;

namespace Wrapper.Controllers
{
    [Route("api/home")]
    public class HomeController : Controller
    {
        [HttpGet("configuration")]
        public IActionResult Configuration()
        {
            return Json(Startup.Config);
        }
    }
}
