using System.Collections.Generic;
using System.Linq;

namespace YB.LetsBeFriendsAPI.Services
{
    public class ChatService
    {
        private static readonly Dictionary<string, string> Users = new Dictionary<string, string>();

        public bool AddUserToList(string username)
        {
            lock (Users)
            {
                foreach (KeyValuePair<string, string> user in Users)
                {
                    if (Users.ContainsKey(username))
                    {
                        return false;
                    }
                }

                Users.Add(username, null);
                return true;
            }
        }

        public void AddUserConnectionId(string username, string connectionId)
        {
            lock (Users)
            {
                if (Users.ContainsKey(username))
                {
                    Users[username] = connectionId;
                }
            }
        }

        public string GetUserByConnectionId(string connectionId)
        {
            lock (Users)
            {
                return Users.Where(x => x.Value == connectionId).Select(x => x.Key).FirstOrDefault();
            }
        }

        public string GetConnectionIdByUser(string user)
        {
            lock (Users)
            {
                return Users.Where(x => x.Key == user).Select(x => x.Value).FirstOrDefault();
            }
        }

        public void RemoveUserFromList(string username)
        {
            lock (Users)
            {
                if (Users.ContainsKey(username))
                {
                    Users.Remove(username);
                }
            }
        }

        public string[] GetOnlineUsers()
        {
            lock (Users)
            {
                return Users.OrderBy(x => x.Key).Select(x => x.Key).ToArray();
            }
        }
    }
}
