using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Logging;
using System;
using System.Security;
using System.Threading.Tasks;
using YB.LetsBeFriendsAPI.Dtos;
using YB.LetsBeFriendsAPI.Services;

namespace YB.LetsBeFriendsAPI.Hubs
{
    public class ChatHub : Hub
    {
        private readonly ChatService _chatService;
        private readonly ILogger<ChatHub> _logger;

        public ChatHub(ChatService chatService, ILogger<ChatHub> logger)
        {
            _chatService = chatService;
            _logger = logger;
        }

        public override async Task OnConnectedAsync()
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, "LetsBeFriends");
            await Clients.Caller.SendAsync("UserConnected");
            _logger.LogInformation("Connected to the Hub");

        }

        public override async Task OnDisconnectedAsync(Exception exception)
        {
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, "LetsBeFriends");
            string user = _chatService.GetUserByConnectionId(Context.ConnectionId);
            _chatService.RemoveUserFromList(user);
            await DisplayOnlineUsers();

            await base.OnDisconnectedAsync(exception);
            _logger.LogInformation("Disconnected to the Hub");
        }

        public async Task AddUserConnectionId(string username)
        {
            _chatService.AddUserConnectionId(username, Context.ConnectionId);
            await DisplayOnlineUsers();
        }

        public async Task ReceiveMessage(MessageDto message)
        {
            await Clients.Group("LetsBeFriends").SendAsync("NewMessage", message);
        }


        public async Task CreatePrivateChat(MessageDto message)
        {
            string privateGroupName = CreatePrivateGroupName(message.From,message.To);
            await Groups.AddToGroupAsync(Context.ConnectionId, privateGroupName);
            var toConnectionId = _chatService.GetConnectionIdByUser(message.To);
            await Groups.AddToGroupAsync(toConnectionId, privateGroupName);
            await Clients.Client(toConnectionId).SendAsync("OpenPrivateChat", message);
        }

        public async Task ReceivePrivateMessage(MessageDto message)
        {
            string privateGroupName = CreatePrivateGroupName(message.From, message.To);
            await Clients.Group(privateGroupName).SendAsync("NewPrivateMessage", message);
        }

        public async Task RemovePrivateChat(string from , string to)
        {
            string privateGroupName = CreatePrivateGroupName(from, to);
            await Clients.Group(privateGroupName).SendAsync("ClosePrivateChat");
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, privateGroupName);
            var toConnectionId = _chatService.GetConnectionIdByUser(Context.ConnectionId);
            await Groups.RemoveFromGroupAsync(toConnectionId, privateGroupName);
        }

        public string CreatePrivateGroupName(string from , string to )
        {
            var stringCompare = string.CompareOrdinal(from, to) < 0;
            return stringCompare ? $"{from}-{to}" : $"{to}-{from}";
        }

        private async Task DisplayOnlineUsers()
        {
            string[] onlineUsers = _chatService.GetOnlineUsers();
            await Clients.Groups("LetsBeFriends").SendAsync("OnlineUsers", onlineUsers);
        }
    }
}
