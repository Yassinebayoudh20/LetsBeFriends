using System.ComponentModel.DataAnnotations;

namespace YB.LetsBeFriendsAPI.Dtos
{
    public class UserDto
    {
        [Required]
        [StringLength(15, MinimumLength = 3, ErrorMessage = "Name Must be at least {2}, and maximum {15} characters")]
        public string Username { get; set; }
    }
}
