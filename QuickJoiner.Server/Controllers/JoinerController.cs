using System.Text.Json;
using System.Text.Json.Nodes;
using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Mvc;
using QuickJoiner.Server.Service;

namespace QuickJoiner.Server.Controllers
{
    [ApiController]
    [Route("Join")]
    [Produces("application/json")]
    public class JoinerController : ControllerBase
    {
        private readonly ILogger<WeatherForecastController> _logger;
        private JoinerService _joinerService;

        public JoinerController(ILogger<WeatherForecastController> logger, JoinerService joinerService)
        {
            _logger = logger;
            _joinerService = joinerService;
        }

        [HttpPost("Combine")]
        [Produces("application/json")]
        public IActionResult CombineAsync([FromForm] IFormFile file1, [FromForm] string header1, [FromForm] IFormFile file2, [FromForm] string header2)
        {
            if (file1 is null || file1.Length == 0 || file2 is null || file2.Length == 0 || string.IsNullOrEmpty(header1) || string.IsNullOrEmpty(header2))
                return BadRequest("Files cannot be null.");

            try
            {
                var combined = _joinerService.Combine(file1, header1, file2, header2);
                return Ok(combined);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while processing the request.");
                return StatusCode(500, "Internal server error.");
            }
        }
    }
}