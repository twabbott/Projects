using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CookieAuthenticationApi.Services
{
    public class DummyUserService: IUserService
    {
        // Using C#'s new tuple syntax
        private Dictionary<string, (string PasswordHash, User User)> _users =
            new Dictionary<string, (string PasswordHash, User User)>();

        public DummyUserService(IDictionary<string, string> dummyUsers)
        {
            foreach (var user in dummyUsers)
            {
                // Need to add NuGet package: BCrypt.Net-Next
                // Hash the password with BCrypt's HashPassword function.  You can use any secure
                // hash function.
                _users.Add(
                    user.Key.ToLower(),
                    (BCrypt.Net.BCrypt.HashPassword(user.Value), new User(user.Key, user.Value)));
            }
        }

        public Task<bool> ValidateCredentials(string username, string password, out User user)
        {
            user = null;
            var key = username.ToLower();
            if (_users.ContainsKey(key))
            {
                var hash = _users[key].PasswordHash;
                if (BCrypt.Net.BCrypt.Verify(password, hash))
                {
                    user = _users[key].User;
                    return Task.FromResult(true);
                }
            }

            // No such user.
            return Task.FromResult(false);
        }
    }
}
