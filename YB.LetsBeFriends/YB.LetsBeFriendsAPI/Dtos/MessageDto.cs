using System;

namespace YB.LetsBeFriendsAPI.Dtos
{
    public class MessageDto
    {
        public string From { get; set; }

        public string To { get; set; }

        public string Message { get; set; }

        public DateTime When { get; set; } = DateTime.UtcNow;
    }
}
