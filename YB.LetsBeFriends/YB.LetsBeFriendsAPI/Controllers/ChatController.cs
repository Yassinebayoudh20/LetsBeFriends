using Microsoft.AspNetCore.Mvc;
using YB.LetsBeFriendsAPI.Dtos;
using YB.LetsBeFriendsAPI.Services;

namespace YB.LetsBeFriendsAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ChatController : ControllerBase
    {
        private readonly ChatService _chatService;

        public ChatController(ChatService chatService)
        {
            _chatService = chatService;
        }

        [HttpPost("register-user")]
        public IActionResult RegisterUser(UserDto model)
        {
            if (_chatService.AddUserToList(model.Username))
            {
                return NoContent();
            }

            return BadRequest("This name is Taken please choose an other one");
        }
    }
}
